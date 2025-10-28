import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { CreateUserActivityDto } from './dto/create-user-activity.dto';
import { CreateSalesDataDto } from './dto/create-sales-data.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  // User Activity Endpoints
  @Post('user-activity')
  async createUserActivity(@Body() createUserActivityDto: CreateUserActivityDto) {
    return this.analyticsService.createUserActivity(createUserActivityDto);
  }

  @Get('user-activity')
  async getUserActivities(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    return this.analyticsService.getUserActivities(limit, page);
  }

  @Get('user-activity/aggregated')
  async getAggregatedUserActivity() {
    return this.analyticsService.getAggregatedUserActivity();
  }

  // Sales Data Endpoints
  @Post('sales')
  async createSalesData(@Body() createSalesDataDto: CreateSalesDataDto) {
    return this.analyticsService.createSalesData(createSalesDataDto);
  }

  @Get('sales')
  async getSalesData(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    return this.analyticsService.getSalesData(limit, page);
  }

  @Get('sales/summary')
  async getSalesSummary() {
    return this.analyticsService.getSalesSummary();
  }

  @Get('sales/trends/:period')
  async getSalesTrends(@Param('period') period: string) {
    return this.analyticsService.getSalesTrends(period);
  }

  // Real-time Analytics
  @Get('realtime/dashboard')
  async getRealtimeDashboard() {
    return this.analyticsService.getRealtimeDashboard();
  }

  @Get('realtime/metrics')
  async getRealtimeMetrics() {
    return this.analyticsService.getRealtimeMetrics();
  }
}