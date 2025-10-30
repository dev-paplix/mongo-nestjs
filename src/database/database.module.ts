import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { IndexingService } from './indexing.service';
import { IndexingController } from './indexing.controller';
import { UserActivity, UserActivitySchema } from '../analytics/schemas/user-activity.schema';
import { SalesData, SalesDataSchema } from '../analytics/schemas/sales-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserActivity.name, schema: UserActivitySchema },
      { name: SalesData.name, schema: SalesDataSchema },
    ]),
  ],
  controllers: [SeedController, IndexingController],
  providers: [DatabaseService, SeedService, IndexingService],
  exports: [DatabaseService, SeedService, IndexingService],
})
export class DatabaseModule {}