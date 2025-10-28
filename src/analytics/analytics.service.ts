import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserActivity } from './schemas/user-activity.schema';
import { SalesData } from './schemas/sales-data.schema';
import { CreateUserActivityDto } from './dto/create-user-activity.dto';
import { CreateSalesDataDto } from './dto/create-sales-data.dto';

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(
    @InjectModel(UserActivity.name) private userActivityModel: Model<UserActivity>,
    @InjectModel(SalesData.name) private salesDataModel: Model<SalesData>,
  ) {}

  // User Activity Methods
  async createUserActivity(createUserActivityDto: CreateUserActivityDto): Promise<UserActivity> {
    const createdActivity = new this.userActivityModel({
      ...createUserActivityDto,
      timestamp: new Date(),
    });
    const result = await createdActivity.save();
    this.logger.log(`Created user activity: ${result._id}`);
    return result;
  }

  async getUserActivities(limit: number = 10, page: number = 1): Promise<UserActivity[]> {
    const skip = (page - 1) * limit;
    return this.userActivityModel
      .find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async getAggregatedUserActivity() {
    return this.userActivityModel.aggregate([
      {
        $group: {
          _id: '$action',
          count: { $sum: 1 },
          avgDuration: { $avg: '$duration' },
        },
      },
      { $sort: { count: -1 } },
    ]);
  }

  // Sales Data Methods
  async createSalesData(createSalesDataDto: CreateSalesDataDto): Promise<SalesData> {
    const createdSale = new this.salesDataModel({
      ...createSalesDataDto,
      timestamp: new Date(),
    });
    const result = await createdSale.save();
    this.logger.log(`Created sales record: ${result._id}`);
    return result;
  }

  async getSalesData(limit: number = 10, page: number = 1): Promise<SalesData[]> {
    const skip = (page - 1) * limit;
    return this.salesDataModel
      .find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async getSalesSummary() {
    return this.salesDataModel.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$amount' },
          averageOrderValue: { $avg: '$amount' },
          totalTransactions: { $sum: 1 },
        },
      },
    ]);
  }

  async getSalesTrends(period: string) {
    let groupBy: any;
    
    switch (period) {
      case 'daily':
        groupBy = {
          year: { $year: '$timestamp' },
          month: { $month: '$timestamp' },
          day: { $dayOfMonth: '$timestamp' },
        };
        break;
      case 'monthly':
        groupBy = {
          year: { $year: '$timestamp' },
          month: { $month: '$timestamp' },
        };
        break;
      default:
        groupBy = {
          year: { $year: '$timestamp' },
        };
    }

    return this.salesDataModel.aggregate([
      {
        $group: {
          _id: groupBy,
          totalSales: { $sum: '$amount' },
          transactionCount: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': -1, '_id.month': -1, '_id.day': -1 } },
    ]);
  }

  // Real-time Analytics Methods
  async getRealtimeDashboard() {
    const [userActivityStats, salesStats] = await Promise.all([
      this.getRecentUserActivityStats(),
      this.getRecentSalesStats(),
    ]);

    return {
      userActivity: userActivityStats,
      sales: salesStats,
      timestamp: new Date(),
    };
  }

  async getRealtimeMetrics() {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    const [activeUsers, recentSales] = await Promise.all([
      this.userActivityModel.countDocuments({
        timestamp: { $gte: oneHourAgo },
      }),
      this.salesDataModel.aggregate([
        {
          $match: {
            timestamp: { $gte: oneHourAgo },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$amount' },
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    return {
      activeUsersLastHour: activeUsers,
      salesLastHour: recentSales[0] || { totalAmount: 0, count: 0 },
      timestamp: new Date(),
    };
  }

  private async getRecentUserActivityStats() {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    return this.userActivityModel.aggregate([
      {
        $match: {
          timestamp: { $gte: oneDayAgo },
        },
      },
      {
        $group: {
          _id: '$action',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);
  }

  private async getRecentSalesStats() {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    return this.salesDataModel.aggregate([
      {
        $match: {
          timestamp: { $gte: oneDayAgo },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$amount' },
          averageOrderValue: { $avg: '$amount' },
          totalOrders: { $sum: 1 },
        },
      },
    ]);
  }
}