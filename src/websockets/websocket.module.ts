import { Module } from '@nestjs/common';
import { AnalyticsGateway } from './analytics.gateway';
import { AnalyticsModule } from '../analytics/analytics.module';

@Module({
  imports: [AnalyticsModule],
  providers: [AnalyticsGateway],
})
export class WebsocketModule {}