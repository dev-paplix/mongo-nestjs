import { Controller, Post, Get, Query, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('user-activities')
  async seedUserActivities(@Query('count') count: string = '50') {
    const activityCount = parseInt(count, 10) || 50;
    return this.seedService.seedUserActivities(activityCount);
  }

  @Post('sales-data')
  async seedSalesData(@Query('count') count: string = '30') {
    const salesCount = parseInt(count, 10) || 30;
    return this.seedService.seedSalesData(salesCount);
  }

  @Post('all')
  async seedAllData(
    @Query('userActivities') userActivities: string = '50',
    @Query('salesData') salesData: string = '30',
  ) {
    const userActivityCount = parseInt(userActivities, 10) || 50;
    const salesCount = parseInt(salesData, 10) || 30;
    return this.seedService.seedAllData(userActivityCount, salesCount);
  }

  @Get('stats')
  async getDataStats() {
    return this.seedService.getDataStats();
  }

  @Delete('clear')
  async clearAllData() {
    await this.seedService.clearAllData();
    return { message: 'All data cleared successfully', timestamp: new Date() };
  }
}