import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(@InjectConnection() private connection: Connection) {
    this.setupConnectionEvents();
  }

  private setupConnectionEvents() {
    this.connection.on('connected', () => {
      this.logger.log('✅ MongoDB Atlas connection established successfully');
    });

    this.connection.on('error', (error) => {
      this.logger.error('❌ MongoDB Atlas connection error:', error);
    });

    this.connection.on('disconnected', () => {
      this.logger.warn('⚠️ MongoDB Atlas connection disconnected');
    });
  }

  async getConnectionStatus() {
    return {
      status: this.connection.readyState === 1 ? 'connected' : 'disconnected',
      host: this.connection.host,
      name: this.connection.name,
      readyState: this.connection.readyState,
    };
  }

  async getDatabaseStats() {
    try {
      const stats = await this.connection.db.stats();
      return {
        collections: stats.collections,
        dataSize: stats.dataSize,
        storageSize: stats.storageSize,
        indexes: stats.indexes,
        indexSize: stats.indexSize,
      };
    } catch (error) {
      this.logger.error('Error fetching database stats:', error);
      throw error;
    }
  }

  async createSampleData() {
    this.logger.log('Creating sample data for learning purposes...');
    
    // This method can be used to seed the database with sample data
    // for educational purposes
    
    return {
      message: 'Sample data creation endpoint - implement seeding logic here',
      timestamp: new Date(),
    };
  }
}