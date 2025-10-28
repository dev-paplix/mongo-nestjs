import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UserActivity, UserActivitySchema } from '../analytics/schemas/user-activity.schema';
import { SalesData, SalesDataSchema } from '../analytics/schemas/sales-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserActivity.name, schema: UserActivitySchema },
      { name: SalesData.name, schema: SalesDataSchema },
    ]),
  ],
  controllers: [SeedController],
  providers: [DatabaseService, SeedService],
  exports: [DatabaseService, SeedService],
})
export class DatabaseModule {}