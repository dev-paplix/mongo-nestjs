import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { UserActivity } from '../analytics/schemas/user-activity.schema';
import { SalesData } from '../analytics/schemas/sales-data.schema';

@Injectable()
export class IndexingService {
  private readonly logger = new Logger(IndexingService.name);

  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(UserActivity.name) private userActivityModel: Model<UserActivity>,
    @InjectModel(SalesData.name) private salesDataModel: Model<SalesData>,
  ) {}

  // Exercise 1: Basic Single Field Indexes
  async createBasicIndexes() {
    this.logger.log('📚 Exercise 1: Creating Basic Single Field Indexes');
    
    const results = [];
    
    try {
      // Index on userId for faster user lookups
      const userIdIndex = await this.userActivityModel.collection.createIndex(
        { userId: 1 },
        { name: 'idx_userId', background: true }
      );
      results.push({ collection: 'userActivities', index: 'userId', result: userIdIndex });

      // Index on timestamp for time-based queries
      const timestampIndex = await this.userActivityModel.collection.createIndex(
        { timestamp: -1 },
        { name: 'idx_timestamp_desc', background: true }
      );
      results.push({ collection: 'userActivities', index: 'timestamp', result: timestampIndex });

      // Index on action for filtering by activity type
      const actionIndex = await this.userActivityModel.collection.createIndex(
        { action: 1 },
        { name: 'idx_action', background: true }
      );
      results.push({ collection: 'userActivities', index: 'action', result: actionIndex });

      // Sales data indexes
      const customerIndex = await this.salesDataModel.collection.createIndex(
        { customerId: 1 },
        { name: 'idx_customerId', background: true }
      );
      results.push({ collection: 'salesData', index: 'customerId', result: customerIndex });

      const amountIndex = await this.salesDataModel.collection.createIndex(
        { amount: -1 },
        { name: 'idx_amount_desc', background: true }
      );
      results.push({ collection: 'salesData', index: 'amount', result: amountIndex });

      this.logger.log('✅ Basic indexes created successfully');
      return { exercise: 'Basic Single Field Indexes', results };
    } catch (error) {
      this.logger.error('❌ Failed to create basic indexes:', error);
      throw error;
    }
  }

  // Exercise 2: Compound Indexes
  async createCompoundIndexes() {
    this.logger.log('📚 Exercise 2: Creating Compound Indexes');
    
    const results = [];
    
    try {
      // Compound index for user activity queries by user and time
      const userTimeIndex = await this.userActivityModel.collection.createIndex(
        { userId: 1, timestamp: -1 },
        { name: 'idx_userId_timestamp', background: true }
      );
      results.push({ collection: 'userActivities', index: 'userId + timestamp', result: userTimeIndex });

      // Compound index for action and page queries
      const actionPageIndex = await this.userActivityModel.collection.createIndex(
        { action: 1, page: 1 },
        { name: 'idx_action_page', background: true }
      );
      results.push({ collection: 'userActivities', index: 'action + page', result: actionPageIndex });

      // Sales compound indexes
      const categoryRegionIndex = await this.salesDataModel.collection.createIndex(
        { category: 1, region: 1, timestamp: -1 },
        { name: 'idx_category_region_time', background: true }
      );
      results.push({ collection: 'salesData', index: 'category + region + timestamp', result: categoryRegionIndex });

      // Product sales performance index
      const productSalesIndex = await this.salesDataModel.collection.createIndex(
        { productId: 1, amount: -1 },
        { name: 'idx_product_amount', background: true }
      );
      results.push({ collection: 'salesData', index: 'productId + amount', result: productSalesIndex });

      this.logger.log('✅ Compound indexes created successfully');
      return { exercise: 'Compound Indexes', results };
    } catch (error) {
      this.logger.error('❌ Failed to create compound indexes:', error);
      throw error;
    }
  }

  // Exercise 3: Text Indexes for Search
  async createTextIndexes() {
    this.logger.log('📚 Exercise 3: Creating Text Indexes for Search');
    
    const results = [];
    
    try {
      // Text index on product name for search functionality
      const productTextIndex = await this.salesDataModel.collection.createIndex(
        { productName: 'text', category: 'text' },
        { 
          name: 'idx_product_text_search',
          weights: { productName: 10, category: 5 },
          background: true
        }
      );
      results.push({ collection: 'salesData', index: 'text search (productName + category)', result: productTextIndex });

      this.logger.log('✅ Text indexes created successfully');
      return { exercise: 'Text Indexes', results };
    } catch (error) {
      this.logger.error('❌ Failed to create text indexes:', error);
      throw error;
    }
  }

  // Exercise 4: Sparse and Partial Indexes
  async createSpecializedIndexes() {
    this.logger.log('📚 Exercise 4: Creating Specialized Indexes (Sparse & Partial)');
    
    const results = [];
    
    try {
      // Sparse index on duration (only for documents that have duration)
      const durationSparseIndex = await this.userActivityModel.collection.createIndex(
        { duration: 1 },
        { 
          name: 'idx_duration_sparse',
          sparse: true,
          background: true
        }
      );
      results.push({ collection: 'userActivities', index: 'duration (sparse)', result: durationSparseIndex });

      // Partial index for high-value sales only
      const highValueSalesIndex = await this.salesDataModel.collection.createIndex(
        { amount: -1, timestamp: -1 },
        { 
          name: 'idx_high_value_sales',
          partialFilterExpression: { amount: { $gte: 100 } },
          background: true
        }
      );
      results.push({ collection: 'salesData', index: 'high value sales (partial)', result: highValueSalesIndex });

      // Partial index for specific regions
      const specificRegionIndex = await this.salesDataModel.collection.createIndex(
        { region: 1, timestamp: -1 },
        { 
          name: 'idx_premium_regions',
          partialFilterExpression: { 
            region: { $in: ['North America', 'Europe'] } 
          },
          background: true
        }
      );
      results.push({ collection: 'salesData', index: 'premium regions (partial)', result: specificRegionIndex });

      this.logger.log('✅ Specialized indexes created successfully');
      return { exercise: 'Specialized Indexes', results };
    } catch (error) {
      this.logger.error('❌ Failed to create specialized indexes:', error);
      throw error;
    }
  }

  // Exercise 5: Index Analysis and Performance
  async analyzeIndexPerformance() {
    this.logger.log('📚 Exercise 5: Analyzing Index Performance');
    
    const results = [];
    
    try {
      // Get execution stats for a query without explain
      const startTime = Date.now();
      
      // Query 1: Find user activities by userId (should use idx_userId)
      const userQuery = await this.userActivityModel.find({ userId: 'user_50' }).explain('executionStats') as any;
      results.push({
        query: 'Find by userId',
        executionStats: {
          totalDocsExamined: userQuery.executionStats?.totalDocsExamined || 0,
          totalDocsReturned: userQuery.executionStats?.totalDocsReturned || 0,
          executionTimeMillis: userQuery.executionStats?.executionTimeMillis || 0,
          indexUsed: userQuery.executionStats?.executionStages?.inputStage?.indexName || 'COLLSCAN'
        }
      });

      // Query 2: Range query on timestamp (should use idx_timestamp_desc)
      const timeRangeQuery = await this.userActivityModel.find({
        timestamp: { 
          $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
        }
      }).limit(10).explain('executionStats') as any;
      
      results.push({
        query: 'Time range query',
        executionStats: {
          totalDocsExamined: timeRangeQuery.executionStats?.totalDocsExamined || 0,
          totalDocsReturned: timeRangeQuery.executionStats?.totalDocsReturned || 0,
          executionTimeMillis: timeRangeQuery.executionStats?.executionTimeMillis || 0,
          indexUsed: timeRangeQuery.executionStats?.executionStages?.inputStage?.indexName || 'COLLSCAN'
        }
      });

      // Query 3: Compound query (should use compound index)
      const compoundQuery = await this.userActivityModel.find({
        userId: 'user_25',
        action: 'page_view'
      }).explain('executionStats') as any;
      
      results.push({
        query: 'Compound query (userId + action)',
        executionStats: {
          totalDocsExamined: compoundQuery.executionStats?.totalDocsExamined || 0,
          totalDocsReturned: compoundQuery.executionStats?.totalDocsReturned || 0,
          executionTimeMillis: compoundQuery.executionStats?.executionTimeMillis || 0,
          indexUsed: compoundQuery.executionStats?.executionStages?.inputStage?.indexName || 'COLLSCAN'
        }
      });

      // Query 4: Text search (should use text index)
      const textSearchQuery = await this.salesDataModel.find({
        $text: { $search: 'dashboard analytics' }
      }).explain('executionStats') as any;
      
      results.push({
        query: 'Text search',
        executionStats: {
          totalDocsExamined: textSearchQuery.executionStats?.totalDocsExamined || 0,
          totalDocsReturned: textSearchQuery.executionStats?.totalDocsReturned || 0,
          executionTimeMillis: textSearchQuery.executionStats?.executionTimeMillis || 0,
          indexUsed: 'TEXT_INDEX'
        }
      });

      this.logger.log('✅ Index performance analysis completed');
      return { exercise: 'Index Performance Analysis', results };
    } catch (error) {
      this.logger.error('❌ Failed to analyze index performance:', error);
      throw error;
    }
  }

  // Exercise 6: TTL (Time To Live) Indexes
  async createTTLIndexes() {
    this.logger.log('📚 Exercise 6: Creating TTL (Time To Live) Indexes');
    
    const results = [];
    
    try {
      // TTL index for user sessions (expire after 24 hours)
      const sessionTTLIndex = await this.userActivityModel.collection.createIndex(
        { timestamp: 1 },
        { 
          name: 'idx_session_ttl',
          expireAfterSeconds: 86400, // 24 hours
          background: true
        }
      );
      results.push({ collection: 'userActivities', index: 'session TTL (24h)', result: sessionTTLIndex });

      this.logger.log('✅ TTL indexes created successfully');
      return { exercise: 'TTL (Time To Live) Indexes', results };
    } catch (error) {
      this.logger.error('❌ Failed to create TTL indexes:', error);
      throw error;
    }
  }

  // Exercise 7: 2dsphere Indexes for Geospatial Data
  async createGeospatialIndexes() {
    this.logger.log('📚 Exercise 7: Creating Geospatial (2dsphere) Indexes');
    
    const results = [];
    
    try {
      // First, let's add some geospatial data to our collections
      await this.addGeospatialData();

      // 2dsphere index for location-based queries
      const locationIndex = await this.salesDataModel.collection.createIndex(
        { location: '2dsphere' },
        { 
          name: 'idx_location_2dsphere',
          background: true
        }
      );
      results.push({ collection: 'salesData', index: 'location (2dsphere)', result: locationIndex });

      this.logger.log('✅ Geospatial indexes created successfully');
      return { exercise: 'Geospatial (2dsphere) Indexes', results };
    } catch (error) {
      this.logger.error('❌ Failed to create geospatial indexes:', error);
      throw error;
    }
  }

  // Exercise 8: Multikey Indexes
  async createMultikeyIndexes() {
    this.logger.log('📚 Exercise 8: Creating Multikey Indexes');
    
    const results = [];
    
    try {
      // Add array data for multikey indexing
      await this.addArrayData();

      // Index on tags array
      const tagsIndex = await this.userActivityModel.collection.createIndex(
        { tags: 1 },
        { 
          name: 'idx_tags_multikey',
          background: true
        }
      );
      results.push({ collection: 'userActivities', index: 'tags (multikey)', result: tagsIndex });

      // Index on skills array (for sales reps)
      const skillsIndex = await this.salesDataModel.collection.createIndex(
        { 'salesRepInfo.skills': 1 },
        { 
          name: 'idx_skills_multikey',
          background: true
        }
      );
      results.push({ collection: 'salesData', index: 'skills (multikey)', result: skillsIndex });

      this.logger.log('✅ Multikey indexes created successfully');
      return { exercise: 'Multikey Indexes', results };
    } catch (error) {
      this.logger.error('❌ Failed to create multikey indexes:', error);
      throw error;
    }
  }

  // Exercise 9: Hashed Indexes
  async createHashedIndexes() {
    this.logger.log('📚 Exercise 9: Creating Hashed Indexes');
    
    const results = [];
    
    try {
      // Hashed index on userId for sharding
      const hashedUserIndex = await this.userActivityModel.collection.createIndex(
        { userId: 'hashed' },
        { 
          name: 'idx_userId_hashed',
          background: true
        }
      );
      results.push({ collection: 'userActivities', index: 'userId (hashed)', result: hashedUserIndex });

      // Hashed index on productId
      const hashedProductIndex = await this.salesDataModel.collection.createIndex(
        { productId: 'hashed' },
        { 
          name: 'idx_productId_hashed',
          background: true
        }
      );
      results.push({ collection: 'salesData', index: 'productId (hashed)', result: hashedProductIndex });

      this.logger.log('✅ Hashed indexes created successfully');
      return { exercise: 'Hashed Indexes', results };
    } catch (error) {
      this.logger.error('❌ Failed to create hashed indexes:', error);
      throw error;
    }
  }

  // Exercise 10: Wildcard Indexes
  async createWildcardIndexes() {
    this.logger.log('📚 Exercise 10: Creating Wildcard Indexes');
    
    const results = [];
    
    try {
      // Wildcard index on metadata fields
      const metadataWildcardIndex = await this.userActivityModel.collection.createIndex(
        { 'metadata.$**': 1 },
        { 
          name: 'idx_metadata_wildcard',
          background: true
        }
      );
      results.push({ collection: 'userActivities', index: 'metadata wildcard', result: metadataWildcardIndex });

      this.logger.log('✅ Wildcard indexes created successfully');
      return { exercise: 'Wildcard Indexes', results };
    } catch (error) {
      this.logger.error('❌ Failed to create wildcard indexes:', error);
      throw error;
    }
  }

  // Exercise 11: Collation Indexes
  async createCollationIndexes() {
    this.logger.log('📚 Exercise 11: Creating Collation Indexes');
    
    const results = [];
    
    try {
      // Case-insensitive index on product names
      const caseInsensitiveIndex = await this.salesDataModel.collection.createIndex(
        { productName: 1 },
        { 
          name: 'idx_productName_case_insensitive',
          collation: { locale: 'en', strength: 2 },
          background: true
        }
      );
      results.push({ collection: 'salesData', index: 'productName (case-insensitive)', result: caseInsensitiveIndex });

      this.logger.log('✅ Collation indexes created successfully');
      return { exercise: 'Collation Indexes', results };
    } catch (error) {
      this.logger.error('❌ Failed to create collation indexes:', error);
      throw error;
    }
  }

  // Exercise 12: Unique Indexes
  async createUniqueIndexes() {
    this.logger.log('📚 Exercise 12: Creating Unique Indexes');
    
    const results = [];
    
    try {
      // Add email field for unique constraint
      await this.addUniqueConstraintData();

      // Unique index on email (sparse to allow multiple null values)
      const uniqueEmailIndex = await this.userActivityModel.collection.createIndex(
        { 'userInfo.email': 1 },
        { 
          name: 'idx_email_unique',
          unique: true,
          sparse: true,
          background: true
        }
      );
      results.push({ collection: 'userActivities', index: 'email (unique)', result: uniqueEmailIndex });

      this.logger.log('✅ Unique indexes created successfully');
      return { exercise: 'Unique Indexes', results };
    } catch (error) {
      this.logger.error('❌ Failed to create unique indexes:', error);
      throw error;
    }
  }

  // Helper method to add geospatial data
  private async addGeospatialData() {
    const locations = [
      { type: 'Point', coordinates: [-73.935242, 40.730610] }, // New York
      { type: 'Point', coordinates: [-118.243685, 34.052234] }, // Los Angeles
      { type: 'Point', coordinates: [-87.623177, 41.881832] }, // Chicago
      { type: 'Point', coordinates: [-95.358421, 29.749907] }, // Houston
      { type: 'Point', coordinates: [2.349014, 48.864716] }, // Paris
    ];

    await this.salesDataModel.updateMany(
      { location: { $exists: false } },
      [{ $set: { location: { $arrayElemAt: [locations, { $floor: { $multiply: [{ $rand: {} }, 5] } }] } } }]
    );
  }

  // Helper method to add array data for multikey indexing
  private async addArrayData() {
    const tagOptions = ['mobile', 'desktop', 'premium', 'new-user', 'returning', 'high-value'];
    const skillOptions = ['sales', 'technical', 'customer-service', 'analytics', 'leadership'];

    // Add tags to user activities
    await this.userActivityModel.updateMany(
      { tags: { $exists: false } },
      [{ 
        $set: { 
          tags: {
            $map: {
              input: { $range: [0, { $floor: { $add: [{ $multiply: [{ $rand: {} }, 3] }, 1] } }] },
              as: 'i',
              in: { $arrayElemAt: [tagOptions, { $floor: { $multiply: [{ $rand: {} }, 6] } }] }
            }
          }
        }
      }]
    );

    // Add skills to sales data
    await this.salesDataModel.updateMany(
      { 'salesRepInfo.skills': { $exists: false } },
      [{ 
        $set: { 
          'salesRepInfo.skills': {
            $map: {
              input: { $range: [0, { $floor: { $add: [{ $multiply: [{ $rand: {} }, 3] }, 2] } }] },
              as: 'i',
              in: { $arrayElemAt: [skillOptions, { $floor: { $multiply: [{ $rand: {} }, 5] } }] }
            }
          }
        }
      }]
    );
  }

  // Helper method to add unique constraint data
  private async addUniqueConstraintData() {
    const domains = ['gmail.com', 'yahoo.com', 'company.com', 'example.org'];
    
    await this.userActivityModel.updateMany(
      { 'userInfo.email': { $exists: false } },
      [{ 
        $set: { 
          'userInfo.email': {
            $concat: [
              'user',
              { $toString: { $floor: { $multiply: [{ $rand: {} }, 1000] } } },
              '@',
              { $arrayElemAt: [domains, { $floor: { $multiply: [{ $rand: {} }, 4] } }] }
            ]
          }
        }
      }]
    );
  }

  // Enhanced performance analysis for all index types
  async analyzeAdvancedIndexPerformance() {
    this.logger.log('📚 Advanced Index Performance Analysis');
    
    const results = [];
    
    try {
      // Test geospatial query
      const geoQuery = await this.salesDataModel.find({
        location: {
          $near: {
            $geometry: { type: 'Point', coordinates: [-73.935242, 40.730610] },
            $maxDistance: 10000 // 10km
          }
        }
      }).limit(5).explain('executionStats') as any;
      
      results.push({
        query: 'Geospatial near query',
        executionStats: {
          totalDocsExamined: geoQuery.executionStats?.totalDocsExamined || 0,
          totalDocsReturned: geoQuery.executionStats?.totalDocsReturned || 0,
          executionTimeMillis: geoQuery.executionStats?.executionTimeMillis || 0,
          indexUsed: geoQuery.executionStats?.executionStages?.inputStage?.indexName || 'COLLSCAN'
        }
      });

      // Test multikey array query
      const multikeyQuery = await this.userActivityModel.find({
        tags: { $in: ['premium', 'mobile'] }
      }).explain('executionStats') as any;
      
      results.push({
        query: 'Multikey array query',
        executionStats: {
          totalDocsExamined: multikeyQuery.executionStats?.totalDocsExamined || 0,
          totalDocsReturned: multikeyQuery.executionStats?.totalDocsReturned || 0,
          executionTimeMillis: multikeyQuery.executionStats?.executionTimeMillis || 0,
          indexUsed: multikeyQuery.executionStats?.executionStages?.inputStage?.indexName || 'COLLSCAN'
        }
      });

      // Test wildcard query
      const wildcardQuery = await this.userActivityModel.find({
        'metadata.browser': 'Chrome'
      }).explain('executionStats') as any;
      
      results.push({
        query: 'Wildcard metadata query',
        executionStats: {
          totalDocsExamined: wildcardQuery.executionStats?.totalDocsExamined || 0,
          totalDocsReturned: wildcardQuery.executionStats?.totalDocsReturned || 0,
          executionTimeMillis: wildcardQuery.executionStats?.executionTimeMillis || 0,
          indexUsed: wildcardQuery.executionStats?.executionStages?.inputStage?.indexName || 'COLLSCAN'
        }
      });

      // Test case-insensitive query
      const collationQuery = await this.salesDataModel.find({
        productName: { $regex: /dashboard/i }
      }).collation({ locale: 'en', strength: 2 }).explain('executionStats') as any;
      
      results.push({
        query: 'Case-insensitive collation query',
        executionStats: {
          totalDocsExamined: collationQuery.executionStats?.totalDocsExamined || 0,
          totalDocsReturned: collationQuery.executionStats?.totalDocsReturned || 0,
          executionTimeMillis: collationQuery.executionStats?.executionTimeMillis || 0,
          indexUsed: collationQuery.executionStats?.executionStages?.inputStage?.indexName || 'COLLSCAN'
        }
      });

      this.logger.log('✅ Advanced index performance analysis completed');
      return { exercise: 'Advanced Index Performance Analysis', results };
    } catch (error) {
      this.logger.error('❌ Failed to analyze advanced index performance:', error);
      throw error;
    }
  }

  // Complete advanced indexing exercise workflow
  async runAdvancedIndexingExercise() {
    this.logger.log('🎓 Running Advanced MongoDB Indexing Exercise');
    
    try {
      const results = [];

      // Step 1: Show initial state
      const initialIndexes = await this.getAllIndexes();
      results.push({ step: 1, title: 'Initial State', data: initialIndexes });

      // Step 2-5: Basic exercises
      const basicIndexes = await this.createBasicIndexes();
      results.push({ step: 2, title: 'Basic Indexes', data: basicIndexes });

      const compoundIndexes = await this.createCompoundIndexes();
      results.push({ step: 3, title: 'Compound Indexes', data: compoundIndexes });

      const textIndexes = await this.createTextIndexes();
      results.push({ step: 4, title: 'Text Indexes', data: textIndexes });

      const specializedIndexes = await this.createSpecializedIndexes();
      results.push({ step: 5, title: 'Specialized Indexes', data: specializedIndexes });

      // Step 6-12: Advanced exercises
      const ttlIndexes = await this.createTTLIndexes();
      results.push({ step: 6, title: 'TTL Indexes', data: ttlIndexes });

      const geospatialIndexes = await this.createGeospatialIndexes();
      results.push({ step: 7, title: 'Geospatial Indexes', data: geospatialIndexes });

      const multikeyIndexes = await this.createMultikeyIndexes();
      results.push({ step: 8, title: 'Multikey Indexes', data: multikeyIndexes });

      const hashedIndexes = await this.createHashedIndexes();
      results.push({ step: 9, title: 'Hashed Indexes', data: hashedIndexes });

      const wildcardIndexes = await this.createWildcardIndexes();
      results.push({ step: 10, title: 'Wildcard Indexes', data: wildcardIndexes });

      const collationIndexes = await this.createCollationIndexes();
      results.push({ step: 11, title: 'Collation Indexes', data: collationIndexes });

      const uniqueIndexes = await this.createUniqueIndexes();
      results.push({ step: 12, title: 'Unique Indexes', data: uniqueIndexes });

      // Step 13: Performance analysis
      const performanceAnalysis = await this.analyzeAdvancedIndexPerformance();
      results.push({ step: 13, title: 'Advanced Performance Analysis', data: performanceAnalysis });

      // Step 14: Final state
      const finalIndexes = await this.getAllIndexes();
      results.push({ step: 14, title: 'Final State', data: finalIndexes });

      this.logger.log('🎉 Advanced indexing exercise finished');
      return {
        exercise: 'Advanced MongoDB Indexing Exercise',
        totalSteps: 14,
        results,
        timestamp: new Date(),
        summary: {
          initialIndexCount: initialIndexes.userActivities.count + initialIndexes.salesData.count,
          finalIndexCount: finalIndexes.userActivities.count + finalIndexes.salesData.count,
          indexesCreated: (finalIndexes.userActivities.count + finalIndexes.salesData.count) - 
                         (initialIndexes.userActivities.count + initialIndexes.salesData.count)
        }
      };
    } catch (error) {
      this.logger.error('❌ Advanced indexing exercise failed:', error);
      throw error;
    }
  }

  // Get all indexes information
  async getAllIndexes() {
    this.logger.log('📋 Getting all indexes information');
    
    try {
      const userActivityIndexes = await this.userActivityModel.collection.indexes();
      const salesDataIndexes = await this.salesDataModel.collection.indexes();

      return {
        userActivities: {
          collection: 'useractivities',
          indexes: userActivityIndexes,
          count: userActivityIndexes.length
        },
        salesData: {
          collection: 'salesdatas',
          indexes: salesDataIndexes,
          count: salesDataIndexes.length
        },
        timestamp: new Date()
      };
    } catch (error) {
      this.logger.error('❌ Failed to get indexes:', error);
      throw error;
    }
  }

  // Drop all custom indexes (keep only _id)
  async dropAllCustomIndexes() {
    this.logger.log('🗑️ Dropping all custom indexes');
    
    try {
      const results = [];

      // Get current indexes
      const userActivityIndexes = await this.userActivityModel.collection.indexes();
      const salesDataIndexes = await this.salesDataModel.collection.indexes();

      // Drop user activity indexes (except _id_)
      for (const index of userActivityIndexes) {
        if (index.name !== '_id_') {
          await this.userActivityModel.collection.dropIndex(index.name);
          results.push({ collection: 'userActivities', droppedIndex: index.name });
        }
      }

      // Drop sales data indexes (except _id_)
      for (const index of salesDataIndexes) {
        if (index.name !== '_id_') {
          await this.salesDataModel.collection.dropIndex(index.name);
          results.push({ collection: 'salesData', droppedIndex: index.name });
        }
      }

      this.logger.log('✅ All custom indexes dropped');
      return { message: 'All custom indexes dropped', results };
    } catch (error) {
      this.logger.error('❌ Failed to drop indexes:', error);
      throw error;
    }
  }

  // Performance Monitoring: Good Practice - Bulk Insert with Optimized Operations
  async insertDataWithGoodPerformance(documentCount: number = 1000) {
    this.logger.log(`🚀 Inserting ${documentCount} documents with GOOD performance practices`);
    
    const startTime = Date.now();
    const batchSize = 100; // Optimal batch size
    const results = {
      strategy: 'Good Performance',
      documentCount,
      batchSize,
      metrics: {
        totalTime: 0,
        averageTimePerBatch: 0,
        documentsPerSecond: 0,
        memoryUsage: process.memoryUsage(),
        operationDetails: []
      }
    };

    try {
      // 1. Create optimal indexes first
      await this.createBasicIndexes();
      await this.createCompoundIndexes();

      // 2. Prepare data in batches
      const batches = [];
      for (let i = 0; i < documentCount; i += batchSize) {
        const batch = [];
        for (let j = 0; j < batchSize && (i + j) < documentCount; j++) {
          const doc = this.generateOptimizedDocument(i + j);
          batch.push(doc);
        }
        batches.push(batch);
      }

      // 3. Insert in optimized batches with monitoring
      for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
        const batchStartTime = Date.now();
        
        // Use ordered: false for better performance
        await this.userActivityModel.insertMany(batches[batchIndex], { 
          ordered: false
        });
        
        const batchEndTime = Date.now();
        const batchTime = batchEndTime - batchStartTime;
        
        results.metrics.operationDetails.push({
          batch: batchIndex + 1,
          documents: batches[batchIndex].length,
          timeMs: batchTime,
          docsPerSecond: Math.round((batches[batchIndex].length / batchTime) * 1000)
        });

        // Log progress every 10 batches
        if ((batchIndex + 1) % 10 === 0) {
          this.logger.log(`✅ Processed ${batchIndex + 1}/${batches.length} batches`);
        }
      }

      const endTime = Date.now();
      results.metrics.totalTime = endTime - startTime;
      results.metrics.averageTimePerBatch = results.metrics.totalTime / batches.length;
      results.metrics.documentsPerSecond = Math.round((documentCount / results.metrics.totalTime) * 1000);

      this.logger.log(`✅ Good performance insert completed: ${results.metrics.documentsPerSecond} docs/sec`);
      return results;

    } catch (error) {
      this.logger.error('❌ Good performance insert failed:', error);
      throw error;
    }
  }

  // Performance Monitoring: Poor Practice - Individual Inserts without Optimization
  async insertDataWithPoorPerformance(documentCount: number = 1000) {
    this.logger.log(`🐌 Inserting ${documentCount} documents with POOR performance practices`);
    
    const startTime = Date.now();
    const results = {
      strategy: 'Poor Performance',
      documentCount,
      batchSize: 1, // Single document inserts
      metrics: {
        totalTime: 0,
        averageTimePerDoc: 0,
        documentsPerSecond: 0,
        memoryUsage: process.memoryUsage(),
        operationDetails: []
      }
    };

    try {
      // 1. No indexes (worst case scenario)
      await this.dropAllCustomIndexes();

      // 2. Insert documents one by one (anti-pattern)
      for (let i = 0; i < documentCount; i++) {
        const docStartTime = Date.now();
        
        // Generate inefficient document structure
        const doc = this.generateInefficientDocument(i);
        
        // Use inefficient write concern
        await this.userActivityModel.create(doc);
        
        const docEndTime = Date.now();
        const docTime = docEndTime - docStartTime;
        
        if (i < 100 || i % 100 === 0) { // Record first 100 and every 100th
          results.metrics.operationDetails.push({
            document: i + 1,
            timeMs: docTime,
            cumulativeTimeMs: docEndTime - startTime
          });
        }

        // Log progress every 100 documents
        if ((i + 1) % 100 === 0) {
          const currentRate = Math.round(((i + 1) / (docEndTime - startTime)) * 1000);
          this.logger.log(`⏳ Processed ${i + 1}/${documentCount} documents (${currentRate} docs/sec)`);
        }
      }

      const endTime = Date.now();
      results.metrics.totalTime = endTime - startTime;
      results.metrics.averageTimePerDoc = results.metrics.totalTime / documentCount;
      results.metrics.documentsPerSecond = Math.round((documentCount / results.metrics.totalTime) * 1000);

      this.logger.log(`❌ Poor performance insert completed: ${results.metrics.documentsPerSecond} docs/sec`);
      return results;

    } catch (error) {
      this.logger.error('❌ Poor performance insert failed:', error);
      throw error;
    }
  }

  // Performance Comparison: Run Both Strategies and Compare
  async comparePerformanceStrategies(documentCount: number = 1000) {
    this.logger.log(`🏁 Comparing performance strategies with ${documentCount} documents`);
    
    try {
      // Clear collections for fair comparison
      await this.userActivityModel.deleteMany({});
      
      // Test good performance strategy
      const goodResults = await this.insertDataWithGoodPerformance(documentCount);
      
      // Clear collection again
      await this.userActivityModel.deleteMany({});
      
      // Test poor performance strategy
      const poorResults = await this.insertDataWithPoorPerformance(documentCount);

      // Calculate performance differences
      const comparison = {
        documentCount,
        goodPerformance: goodResults.metrics,
        poorPerformance: poorResults.metrics,
        performanceDifference: {
          speedImprovement: Math.round((goodResults.metrics.documentsPerSecond / poorResults.metrics.documentsPerSecond) * 100) / 100,
          timeReduction: Math.round(((poorResults.metrics.totalTime - goodResults.metrics.totalTime) / poorResults.metrics.totalTime) * 100),
          timeDifferenceMs: poorResults.metrics.totalTime - goodResults.metrics.totalTime
        },
        recommendations: [
          'Use bulk operations (insertMany) instead of individual inserts',
          'Create appropriate indexes before bulk inserts',
          'Use optimal batch sizes (50-100 documents)',
          'Use unordered inserts for better parallelization',
          'Optimize write concerns for bulk operations',
          'Monitor memory usage during large operations'
        ],
        timestamp: new Date()
      };

      this.logger.log(`📊 Performance comparison completed:`);
      this.logger.log(`   Good: ${goodResults.metrics.documentsPerSecond} docs/sec`);
      this.logger.log(`   Poor: ${poorResults.metrics.documentsPerSecond} docs/sec`);
      this.logger.log(`   Improvement: ${comparison.performanceDifference.speedImprovement}x faster`);

      return comparison;

    } catch (error) {
      this.logger.error('❌ Performance comparison failed:', error);
      throw error;
    }
  }

  // Advanced Performance Monitoring with Real-time Metrics
  async monitorQueryPerformance() {
    this.logger.log('📈 Starting advanced query performance monitoring');
    
    try {
      const testQueries = [
        {
          name: 'Simple Index Scan',
          query: () => this.userActivityModel.find({ userId: 'user_50' }),
          expectedIndex: 'idx_userId'
        },
        {
          name: 'Range Query',
          query: () => this.userActivityModel.find({
            timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
          }),
          expectedIndex: 'idx_timestamp_desc'
        },
        {
          name: 'Compound Index Query',
          query: () => this.userActivityModel.find({
            userId: 'user_25',
            action: 'page_view'
          }),
          expectedIndex: 'idx_action_page'
        },
        {
          name: 'Text Search',
          query: () => this.salesDataModel.find({
            $text: { $search: 'dashboard' }
          }),
          expectedIndex: 'TEXT'
        },
        {
          name: 'Aggregation Pipeline',
          query: () => this.userActivityModel.aggregate([
            { $match: { action: 'purchase' } },
            { $group: { _id: '$userId', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
          ]),
          expectedIndex: 'idx_action'
        }
      ];

      const results = [];

      for (const test of testQueries) {
        this.logger.log(`🔍 Testing: ${test.name}`);
        
        // Run query with explain
        const startTime = Date.now();
        const explainResult = await test.query().explain('executionStats') as any;
        const queryTime = Date.now() - startTime;

        // Extract performance metrics
        const stats = explainResult.executionStats || explainResult.stages?.[0]?.$cursor?.executionStats;
        
        const performance = {
          queryName: test.name,
          expectedIndex: test.expectedIndex,
          actualIndex: stats?.executionStages?.inputStage?.indexName || 
                      stats?.executionStages?.indexName ||
                      'COLLSCAN',
          executionTimeMs: stats?.executionTimeMillis || queryTime,
          totalDocsExamined: stats?.totalDocsExamined || 0,
          totalDocsReturned: stats?.totalDocsReturned || 0,
          keysExamined: stats?.totalKeysExamined || 0,
          indexUsed: (stats?.executionStages?.inputStage?.indexName || 
                     stats?.executionStages?.indexName) ? true : false,
          efficiency: stats?.totalDocsExamined > 0 ? 
                     Math.round((stats.totalDocsReturned / stats.totalDocsExamined) * 100) : 100,
          timestamp: new Date()
        };

        results.push(performance);

        // Log results
        const indexStatus = performance.indexUsed ? '✅ Index Used' : '❌ Collection Scan';
        this.logger.log(`   ${indexStatus}: ${performance.actualIndex}`);
        this.logger.log(`   Time: ${performance.executionTimeMs}ms, Docs: ${performance.totalDocsReturned}/${performance.totalDocsExamined}`);
      }

      return {
        title: 'Query Performance Monitoring Results',
        testCount: testQueries.length,
        results,
        summary: {
          queriesUsingIndexes: results.filter(r => r.indexUsed).length,
          averageExecutionTime: Math.round(results.reduce((sum, r) => sum + r.executionTimeMs, 0) / results.length),
          totalDocsExamined: results.reduce((sum, r) => sum + r.totalDocsExamined, 0),
          totalDocsReturned: results.reduce((sum, r) => sum + r.totalDocsReturned, 0),
          overallEfficiency: Math.round((results.reduce((sum, r) => sum + r.efficiency, 0) / results.length))
        },
        timestamp: new Date()
      };

    } catch (error) {
      this.logger.error('❌ Query performance monitoring failed:', error);
      throw error;
    }
  }

  // Generate optimized document for good performance testing
  private generateOptimizedDocument(index: number) {
    return {
      userId: `user_${Math.floor(index / 10)}`, // Predictable for indexing
      action: ['page_view', 'click', 'purchase', 'search'][index % 4],
      timestamp: new Date(Date.now() - (index * 1000)), // Sequential timestamps
      page: `/page-${Math.floor(index / 100)}`,
      duration: Math.floor(Math.random() * 300) + 10,
      // Minimal, well-structured data
      metadata: {
        browser: 'Chrome',
        device: 'desktop'
      }
    };
  }

  // Generate inefficient document for poor performance testing
  private generateInefficientDocument(index: number) {
    return {
      userId: `user_${Math.random().toString(36).substring(7)}_${index}`, // Random, non-indexable
      action: `action_${Math.random().toString(36).substring(7)}`, // Unique actions
      timestamp: new Date(Date.now() - Math.random() * 10000000), // Random timestamps
      page: `/page-${Math.random().toString(36).substring(7)}`, // Random pages
      duration: Math.floor(Math.random() * 300) + 10,
      // Oversized, unstructured data
      metadata: {
        browser: Math.random().toString(36).substring(7),
        device: Math.random().toString(36).substring(7),
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'.repeat(5),
        cookies: Array(50).fill(null).map(() => Math.random().toString(36).substring(7)),
        sessionData: {
          largeArray: Array(100).fill(null).map(() => ({
            id: Math.random().toString(36).substring(7),
            value: Math.random().toString(36).substring(7),
            nested: {
              data: Array(10).fill(null).map(() => Math.random().toString(36).substring(7))
            }
          }))
        }
      }
    };
  }

  // Complete indexing exercise workflow
  async runCompleteIndexingExercise() {
    this.logger.log('🎓 Running Complete Indexing Exercise');
    
    try {
      const results = [];

      // Step 1: Show initial state (no custom indexes)
      const initialIndexes = await this.getAllIndexes();
      results.push({ step: 1, title: 'Initial State', data: initialIndexes });

      // Step 2: Basic indexes
      const basicIndexes = await this.createBasicIndexes();
      results.push({ step: 2, title: 'Basic Indexes', data: basicIndexes });

      // Step 3: Compound indexes
      const compoundIndexes = await this.createCompoundIndexes();
      results.push({ step: 3, title: 'Compound Indexes', data: compoundIndexes });

      // Step 4: Text indexes
      const textIndexes = await this.createTextIndexes();
      results.push({ step: 4, title: 'Text Indexes', data: textIndexes });

      // Step 5: Specialized indexes
      const specializedIndexes = await this.createSpecializedIndexes();
      results.push({ step: 5, title: 'Specialized Indexes', data: specializedIndexes });

      // Step 6: Performance analysis
      const performanceAnalysis = await this.analyzeIndexPerformance();
      results.push({ step: 6, title: 'Performance Analysis', data: performanceAnalysis });

      // Step 7: Final state
      const finalIndexes = await this.getAllIndexes();
      results.push({ step: 7, title: 'Final State', data: finalIndexes });

      this.logger.log('🎉 Complete indexing exercise finished');
      return {
        exercise: 'Complete MongoDB Indexing Exercise',
        totalSteps: 7,
        results,
        timestamp: new Date(),
        summary: {
          initialIndexCount: initialIndexes.userActivities.count + initialIndexes.salesData.count,
          finalIndexCount: finalIndexes.userActivities.count + finalIndexes.salesData.count,
          indexesCreated: (finalIndexes.userActivities.count + finalIndexes.salesData.count) - 
                         (initialIndexes.userActivities.count + initialIndexes.salesData.count)
        }
      };
    } catch (error) {
      this.logger.error('❌ Complete indexing exercise failed:', error);
      throw error;
    }
  }
}