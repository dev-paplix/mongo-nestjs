import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { AnalyticsService } from '../analytics/analytics.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AnalyticsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AnalyticsGateway');
  private connectedClients = new Set<string>();

  constructor(private readonly analyticsService: AnalyticsService) {
    // Emit real-time metrics every 5 seconds
    setInterval(() => {
      this.emitRealtimeMetrics();
    }, 5000);
  }

  handleConnection(client: Socket) {
    this.connectedClients.add(client.id);
    this.logger.log(`Client connected: ${client.id}. Total clients: ${this.connectedClients.size}`);
    
    // Send initial dashboard data to the new client
    this.sendDashboardData(client);
  }

  handleDisconnect(client: Socket) {
    this.connectedClients.delete(client.id);
    this.logger.log(`Client disconnected: ${client.id}. Total clients: ${this.connectedClients.size}`);
  }

  @SubscribeMessage('requestDashboard')
  async handleDashboardRequest(@MessageBody() data: any, client: Socket) {
    this.logger.log(`Dashboard data requested by client: ${client.id}`);
    await this.sendDashboardData(client);
  }

  @SubscribeMessage('requestMetrics')
  async handleMetricsRequest(@MessageBody() data: any, client: Socket) {
    this.logger.log(`Metrics data requested by client: ${client.id}`);
    const metrics = await this.analyticsService.getRealtimeMetrics();
    client.emit('metricsUpdate', metrics);
  }

  // Emit real-time metrics to all connected clients
  private async emitRealtimeMetrics() {
    if (this.connectedClients.size === 0) return;

    try {
      const metrics = await this.analyticsService.getRealtimeMetrics();
      this.server.emit('metricsUpdate', metrics);
      this.logger.debug(`Metrics broadcasted to ${this.connectedClients.size} clients`);
    } catch (error) {
      this.logger.error('Error emitting real-time metrics:', error);
    }
  }

  // Send dashboard data to a specific client
  private async sendDashboardData(client: Socket) {
    try {
      const dashboardData = await this.analyticsService.getRealtimeDashboard();
      client.emit('dashboardUpdate', dashboardData);
    } catch (error) {
      this.logger.error('Error sending dashboard data:', error);
      client.emit('error', { message: 'Failed to fetch dashboard data' });
    }
  }

  // Method to emit user activity updates
  async emitUserActivityUpdate(activity: any) {
    this.server.emit('userActivityUpdate', activity);
  }

  // Method to emit sales data updates
  async emitSalesDataUpdate(sale: any) {
    this.server.emit('salesDataUpdate', sale);
  }

  // Get connected clients count
  getConnectedClientsCount(): number {
    return this.connectedClients.size;
  }
}