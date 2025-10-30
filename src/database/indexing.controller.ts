import { Controller, Post, Get, Delete, Query } from '@nestjs/common';
import { IndexingService } from './indexing.service';

@Controller('indexing')
export class IndexingController {
  constructor(private readonly indexingService: IndexingService) {}

  // Exercise endpoints for step-by-step learning
  @Post('exercise/basic')
  async createBasicIndexes() {
    return this.indexingService.createBasicIndexes();
  }

  @Post('exercise/compound')
  async createCompoundIndexes() {
    return this.indexingService.createCompoundIndexes();
  }

  @Post('exercise/text')
  async createTextIndexes() {
    return this.indexingService.createTextIndexes();
  }

  @Post('exercise/specialized')
  async createSpecializedIndexes() {
    return this.indexingService.createSpecializedIndexes();
  }

  @Post('exercise/ttl')
  async createTTLIndexes() {
    return this.indexingService.createTTLIndexes();
  }

  @Post('exercise/geospatial')
  async createGeospatialIndexes() {
    return this.indexingService.createGeospatialIndexes();
  }

  @Post('exercise/multikey')
  async createMultikeyIndexes() {
    return this.indexingService.createMultikeyIndexes();
  }

  @Post('exercise/hashed')
  async createHashedIndexes() {
    return this.indexingService.createHashedIndexes();
  }

  @Post('exercise/wildcard')
  async createWildcardIndexes() {
    return this.indexingService.createWildcardIndexes();
  }

  @Post('exercise/collation')
  async createCollationIndexes() {
    return this.indexingService.createCollationIndexes();
  }

  @Post('exercise/unique')
  async createUniqueIndexes() {
    return this.indexingService.createUniqueIndexes();
  }

  @Get('exercise/performance-advanced')
  async analyzeAdvancedIndexPerformance() {
    return this.indexingService.analyzeAdvancedIndexPerformance();
  }

  @Get('exercise/performance')
  async analyzeIndexPerformance() {
    return this.indexingService.analyzeIndexPerformance();
  }

  // Complete exercise workflow
  @Post('exercise/complete')
  async runCompleteIndexingExercise() {
    return this.indexingService.runCompleteIndexingExercise();
  }

  @Post('exercise/advanced')
  async runAdvancedIndexingExercise() {
    return this.indexingService.runAdvancedIndexingExercise();
  }

  // Utility endpoints
  @Get('indexes')
  async getAllIndexes() {
    return this.indexingService.getAllIndexes();
  }

  @Delete('indexes')
  async dropAllCustomIndexes() {
    return this.indexingService.dropAllCustomIndexes();
  }

  // Learning endpoints with explanations
  @Get('learn/basics')
  async learnBasics() {
    return {
      title: '📚 MongoDB Indexing Basics',
      concepts: [
        {
          concept: 'Single Field Index',
          description: 'Index on a single field to speed up queries on that field',
          example: 'db.collection.createIndex({ userId: 1 })',
          useCase: 'Find documents by a specific field value'
        },
        {
          concept: 'Compound Index',
          description: 'Index on multiple fields in a specific order',
          example: 'db.collection.createIndex({ userId: 1, timestamp: -1 })',
          useCase: 'Queries that filter by multiple fields'
        },
        {
          concept: 'Text Index',
          description: 'Special index for text search functionality',
          example: 'db.collection.createIndex({ title: "text", content: "text" })',
          useCase: 'Full-text search across string fields'
        },
        {
          concept: 'Sparse Index',
          description: 'Index that only includes documents with the indexed field',
          example: 'db.collection.createIndex({ email: 1 }, { sparse: true })',
          useCase: 'Fields that are not present in all documents'
        },
        {
          concept: 'Partial Index',
          description: 'Index that only includes documents matching a filter',
          example: 'db.collection.createIndex({ amount: 1 }, { partialFilterExpression: { amount: { $gt: 100 } } })',
          useCase: 'Index only a subset of documents'
        },
        {
          concept: 'TTL Index',
          description: 'Time To Live index that automatically deletes old documents',
          example: 'db.collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })',
          useCase: 'Automatic cleanup of temporary or session data'
        },
        {
          concept: 'Geospatial Index (2dsphere)',
          description: 'Index for geographic coordinate data and queries',
          example: 'db.collection.createIndex({ location: "2dsphere" })',
          useCase: 'Location-based queries (near, within, intersects)'
        },
        {
          concept: 'Multikey Index',
          description: 'Index on array fields, automatically created when indexing arrays',
          example: 'db.collection.createIndex({ tags: 1 })',
          useCase: 'Queries on array elements'
        },
        {
          concept: 'Hashed Index',
          description: 'Index using hash of field value, ensures even distribution',
          example: 'db.collection.createIndex({ userId: "hashed" })',
          useCase: 'Sharding key for even data distribution'
        },
        {
          concept: 'Wildcard Index',
          description: 'Index on all fields or subfields matching a pattern',
          example: 'db.collection.createIndex({ "metadata.$**": 1 })',
          useCase: 'Dynamic schemas with unknown field names'
        },
        {
          concept: 'Collation Index',
          description: 'Index with specific language and case sensitivity rules',
          example: 'db.collection.createIndex({ name: 1 }, { collation: { locale: "en", strength: 2 } })',
          useCase: 'Case-insensitive or language-specific sorting'
        },
        {
          concept: 'Unique Index',
          description: 'Index that enforces uniqueness constraint',
          example: 'db.collection.createIndex({ email: 1 }, { unique: true })',
          useCase: 'Ensure no duplicate values in indexed field'
        }
      ],
      tips: [
        'Indexes speed up reads but slow down writes',
        'Choose index order carefully for compound indexes',
        'Monitor index usage with explain() and profiler',
        'Drop unused indexes to save space and write performance',
        'Consider cardinality when creating indexes'
      ]
    };
  }

  @Get('learn/performance')
  async learnPerformance() {
    return {
      title: '⚡ Index Performance Analysis',
      metrics: [
        {
          metric: 'totalDocsExamined',
          description: 'Number of documents MongoDB had to examine',
          goodValue: 'Should be close to totalDocsReturned',
          badValue: 'Much higher than totalDocsReturned (full collection scan)'
        },
        {
          metric: 'totalDocsReturned',
          description: 'Number of documents returned by the query',
          note: 'This is your actual result set size'
        },
        {
          metric: 'executionTimeMillis',
          description: 'Time taken to execute the query in milliseconds',
          goodValue: 'Low values (< 100ms for simple queries)',
          badValue: 'High values indicate potential performance issues'
        },
        {
          metric: 'indexUsed',
          description: 'Which index was used for the query',
          goodValue: 'Specific index name',
          badValue: 'COLLSCAN (collection scan - no index used)'
        }
      ],
      commands: [
        {
          command: 'db.collection.find(query).explain("executionStats")',
          description: 'Get detailed execution statistics for a query'
        },
        {
          command: 'db.collection.getIndexes()',
          description: 'List all indexes on a collection'
        },
        {
          command: 'db.collection.totalIndexSize()',
          description: 'Get total size of all indexes'
        }
      ]
    };
  }

  @Get('learn/exercises')
  async getExerciseInstructions() {
    return {
      title: '🎓 MongoDB Indexing Exercises',
      description: 'Step-by-step exercises to master MongoDB indexing',
      prerequisites: [
        'Have sample data loaded (use /seed/all endpoint)',
        'Basic understanding of MongoDB queries',
        'Access to MongoDB Atlas or local MongoDB instance'
      ],
      exercises: [
        {
          number: 1,
          title: 'Basic Single Field Indexes',
          description: 'Create indexes on individual fields',
          endpoint: 'POST /indexing/exercise/basic',
          learningGoals: [
            'Understand single field indexes',
            'Learn ascending vs descending order',
            'See impact on query performance'
          ]
        },
        {
          number: 2,
          title: 'Compound Indexes',
          description: 'Create multi-field indexes',
          endpoint: 'POST /indexing/exercise/compound',
          learningGoals: [
            'Understand field order importance',
            'Learn prefix matching rules',
            'Optimize for multiple query patterns'
          ]
        },
        {
          number: 3,
          title: 'Text Indexes',
          description: 'Enable full-text search capabilities',
          endpoint: 'POST /indexing/exercise/text',
          learningGoals: [
            'Implement text search',
            'Understand text index weights',
            'Learn text search syntax'
          ]
        },
        {
          number: 4,
          title: 'Specialized Indexes',
          description: 'Sparse and partial indexes for specific use cases',
          endpoint: 'POST /indexing/exercise/specialized',
          learningGoals: [
            'Use sparse indexes for optional fields',
            'Create partial indexes for subsets',
            'Optimize storage and performance'
          ]
        },
        {
          number: 5,
          title: 'TTL (Time To Live) Indexes',
          description: 'Automatic document expiration',
          endpoint: 'POST /indexing/exercise/ttl',
          learningGoals: [
            'Implement automatic cleanup',
            'Understand TTL behavior',
            'Handle session and temporary data'
          ]
        },
        {
          number: 6,
          title: 'Geospatial Indexes',
          description: 'Location-based queries with 2dsphere',
          endpoint: 'POST /indexing/exercise/geospatial',
          learningGoals: [
            'Store and query geographic data',
            'Use proximity queries',
            'Understand coordinate systems'
          ]
        },
        {
          number: 7,
          title: 'Multikey Indexes',
          description: 'Indexing array fields',
          endpoint: 'POST /indexing/exercise/multikey',
          learningGoals: [
            'Index array elements',
            'Query arrays efficiently',
            'Understand multikey limitations'
          ]
        },
        {
          number: 8,
          title: 'Hashed Indexes',
          description: 'Even distribution for sharding',
          endpoint: 'POST /indexing/exercise/hashed',
          learningGoals: [
            'Prepare for sharding',
            'Ensure even data distribution',
            'Understand hash collisions'
          ]
        },
        {
          number: 9,
          title: 'Wildcard Indexes',
          description: 'Dynamic schema indexing',
          endpoint: 'POST /indexing/exercise/wildcard',
          learningGoals: [
            'Handle unknown field structures',
            'Index nested objects',
            'Manage flexible schemas'
          ]
        },
        {
          number: 10,
          title: 'Collation Indexes',
          description: 'Language and case sensitivity rules',
          endpoint: 'POST /indexing/exercise/collation',
          learningGoals: [
            'Case-insensitive queries',
            'Language-specific sorting',
            'Cultural text handling'
          ]
        },
        {
          number: 11,
          title: 'Unique Indexes',
          description: 'Enforce data uniqueness',
          endpoint: 'POST /indexing/exercise/unique',
          learningGoals: [
            'Prevent duplicate data',
            'Handle unique constraints',
            'Combine with sparse indexes'
          ]
        },
        {
          number: 12,
          title: 'Performance Analysis',
          description: 'Analyze query performance with explain()',
          endpoint: 'GET /indexing/exercise/performance',
          learningGoals: [
            'Read execution statistics',
            'Identify performance bottlenecks',
            'Validate index effectiveness'
          ]
        },
        {
          number: 13,
          title: 'Advanced Performance Analysis',
          description: 'Test all index types with real queries',
          endpoint: 'GET /indexing/exercise/performance-advanced',
          learningGoals: [
            'Compare different index types',
            'Understand query optimization',
            'Real-world performance testing'
          ]
        }
      ],
      workflow: [
        '1. Start with: GET /indexing/learn/basics',
        '2. Check current indexes: GET /indexing/indexes',
        '3. Run basic exercises (1-4): Basic, Compound, Text, Specialized',
        '4. Run advanced exercises (5-11): TTL, Geospatial, Multikey, Hashed, Wildcard, Collation, Unique',
        '5. Analyze performance: GET /indexing/exercise/performance',
        '6. Advanced performance: GET /indexing/exercise/performance-advanced',
        '7. Complete basic workflow: POST /indexing/exercise/complete',
        '8. Complete advanced workflow: POST /indexing/exercise/advanced',
        '9. Clean up: DELETE /indexing/indexes'
      ]
    };
  }
}