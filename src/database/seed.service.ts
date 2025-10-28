import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserActivity } from '../analytics/schemas/user-activity.schema';
import { SalesData } from '../analytics/schemas/sales-data.schema';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(UserActivity.name) private userActivityModel: Model<UserActivity>,
    @InjectModel(SalesData.name) private salesDataModel: Model<SalesData>,
  ) {}

  async seedUserActivities(count: number = 50) {
    this.logger.log(`Seeding ${count} user activities...`);

    const actions = ['login', 'logout', 'page_view', 'click', 'search', 'purchase', 'signup', 'profile_update'];
    const pages = ['/dashboard', '/products', '/analytics', '/profile', '/settings', '/help', '/checkout', '/catalog'];
    const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];
    const devices = ['desktop', 'mobile', 'tablet'];

    const activities = [];
    for (let i = 0; i < count; i++) {
      const timestamp = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Last 30 days
      
      activities.push({
        userId: `user_${Math.floor(Math.random() * 100) + 1}`,
        action: actions[Math.floor(Math.random() * actions.length)],
        page: pages[Math.floor(Math.random() * pages.length)],
        duration: Math.floor(Math.random() * 300000) + 1000, // 1s to 5min
        metadata: {
          browser: browsers[Math.floor(Math.random() * browsers.length)],
          device: devices[Math.floor(Math.random() * devices.length)],
          sessionId: `session_${Math.random().toString(36).substr(2, 9)}`,
          userAgent: 'Mozilla/5.0 (Learning Platform)',
        },
        timestamp,
      });
    }

    const result = await this.userActivityModel.insertMany(activities);
    this.logger.log(`✅ Created ${result.length} user activities`);
    return result;
  }

  async seedSalesData(count: number = 30) {
    this.logger.log(`Seeding ${count} sales records...`);

    const products = [
      { id: 'prod_001', name: 'Analytics Dashboard Pro', category: 'Software', basePrice: 299.99 },
      { id: 'prod_002', name: 'Data Visualization Tool', category: 'Software', basePrice: 199.99 },
      { id: 'prod_003', name: 'MongoDB Atlas Course', category: 'Education', basePrice: 99.99 },
      { id: 'prod_004', name: 'Real-time Monitoring', category: 'Software', basePrice: 149.99 },
      { id: 'prod_005', name: 'API Integration Kit', category: 'Development', basePrice: 79.99 },
      { id: 'prod_006', name: 'Business Intelligence Suite', category: 'Software', basePrice: 499.99 },
      { id: 'prod_007', name: 'Custom Dashboard', category: 'Service', basePrice: 1299.99 },
      { id: 'prod_008', name: 'Training Workshop', category: 'Education', basePrice: 249.99 },
    ];

    const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East', 'Africa'];
    const salesReps = ['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson', 'Eva Brown', 'Frank Miller'];

    const sales = [];
    for (let i = 0; i < count; i++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 5) + 1;
      const discount = Math.random() > 0.7 ? Math.random() * 0.2 : 0; // 30% chance of discount
      const amount = product.basePrice * quantity * (1 - discount);
      const timestamp = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Last 30 days

      sales.push({
        productId: product.id,
        productName: product.name,
        customerId: `customer_${Math.floor(Math.random() * 200) + 1}`,
        amount: Math.round(amount * 100) / 100, // Round to 2 decimal places
        quantity,
        category: product.category,
        region: regions[Math.floor(Math.random() * regions.length)],
        salesRep: salesReps[Math.floor(Math.random() * salesReps.length)],
        timestamp,
      });
    }

    const result = await this.salesDataModel.insertMany(sales);
    this.logger.log(`✅ Created ${result.length} sales records`);
    return result;
  }

  async clearAllData() {
    this.logger.log('Clearing all existing data...');
    await Promise.all([
      this.userActivityModel.deleteMany({}),
      this.salesDataModel.deleteMany({}),
    ]);
    this.logger.log('✅ All data cleared');
  }

  async seedAllData(userActivityCount: number = 50, salesCount: number = 30) {
    this.logger.log('🌱 Starting data seeding process...');
    
    try {
      // Clear existing data (optional)
      // await this.clearAllData();

      // Seed new data
      const [userActivities, salesData] = await Promise.all([
        this.seedUserActivities(userActivityCount),
        this.seedSalesData(salesCount),
      ]);

      this.logger.log(`🎉 Seeding completed successfully!`);
      this.logger.log(`📊 Created ${userActivities.length} user activities and ${salesData.length} sales records`);

      return {
        userActivities: userActivities.length,
        salesData: salesData.length,
        timestamp: new Date(),
      };
    } catch (error) {
      this.logger.error('❌ Seeding failed:', error);
      throw error;
    }
  }

  async getDataStats() {
    const [userActivityCount, salesCount] = await Promise.all([
      this.userActivityModel.countDocuments(),
      this.salesDataModel.countDocuments(),
    ]);

    return {
      userActivities: userActivityCount,
      salesData: salesCount,
      timestamp: new Date(),
    };
  }
}