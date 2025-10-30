# MongoDB Indexing Exercises 📚

A comprehensive set of hands-on exercises to master **all types of MongoDB indexes** using real-world analytics data.

## 🎯 Learning Objectives

By completing these exercises, students will:
- Master **12 different types of MongoDB indexes**
- Learn when and how to create optimal indexes for various scenarios
- Analyze query performance using execution statistics
- Practice index optimization strategies for production workloads
- Understand advanced indexing concepts like TTL, geospatial, and wildcard indexes

## 📋 Prerequisites

1. **Server Running**: `npm run start:dev`
2. **Sample Data**: Run `curl -X POST "http://localhost:3000/seed/all"` to generate test data
3. **Basic MongoDB Knowledge**: Understanding of find, aggregate operations

## 🎓 Index Types Covered

### **Basic Indexes (Foundation)**
1. **Single Field Indexes** - Basic indexing on individual fields
2. **Compound Indexes** - Multi-field indexes with order importance
3. **Text Indexes** - Full-text search capabilities
4. **Sparse Indexes** - Indexes for optional fields
5. **Partial Indexes** - Filtered subset indexing

### **Advanced Indexes (Production-Ready)**
6. **TTL Indexes** - Automatic document expiration
7. **Geospatial Indexes (2dsphere)** - Location-based queries
8. **Multikey Indexes** - Array field indexing
9. **Hashed Indexes** - Even distribution for sharding
10. **Wildcard Indexes** - Dynamic schema support
11. **Collation Indexes** - Language and case sensitivity
12. **Unique Indexes** - Data uniqueness enforcement

## 🎓 Exercise Structure

### Exercise 1: Understanding Index Basics
**Endpoint**: `GET /indexing/learn/basics`
```bash
curl http://localhost:3000/indexing/learn/basics
```
**What you'll learn**:
- Index types and their use cases
- When to use single field vs compound indexes
- Understanding sparse and partial indexes

### Exercise 2: Analyzing Current State
**Endpoint**: `GET /indexing/indexes`
```bash
curl http://localhost:3000/indexing/indexes
```
**What you'll see**:
- Only `_id` indexes exist initially
- Baseline for comparison after creating indexes

## 🏋️‍♂️ Complete Exercise Catalog

### **Basic Exercises (Start Here)**

#### Exercise 1: Single Field Indexes
```bash
curl -X POST http://localhost:3000/indexing/exercise/basic
```
**Creates**: userId, timestamp, action, customerId, amount indexes

#### Exercise 2: Compound Indexes
```bash
curl -X POST http://localhost:3000/indexing/exercise/compound
```
**Creates**: Multi-field indexes like {userId: 1, timestamp: -1}

#### Exercise 3: Text Search Indexes
```bash
curl -X POST http://localhost:3000/indexing/exercise/text
```
**Creates**: Full-text search on product names and categories

#### Exercise 4: Sparse & Partial Indexes
```bash
curl -X POST http://localhost:3000/indexing/exercise/specialized
```
**Creates**: Indexes for optional fields and filtered subsets

### **Advanced Exercises (Production Scenarios)**

#### Exercise 5: TTL (Time To Live) Indexes
```bash
curl -X POST http://localhost:3000/indexing/exercise/ttl
```
**Learn**: Automatic data cleanup, session management
**Use Case**: Temporary data, cache expiration, log rotation

#### Exercise 6: Geospatial Indexes (2dsphere)
```bash
curl -X POST http://localhost:3000/indexing/exercise/geospatial
```
**Learn**: Location-based queries, proximity search
**Use Case**: Store locators, delivery zones, geo-analytics

#### Exercise 7: Multikey Indexes
```bash
curl -X POST http://localhost:3000/indexing/exercise/multikey
```
**Learn**: Array field indexing, tag systems
**Use Case**: Categories, skills, permissions, tags

#### Exercise 8: Hashed Indexes
```bash
curl -X POST http://localhost:3000/indexing/exercise/hashed
```
**Learn**: Even data distribution, sharding preparation
**Use Case**: Horizontal scaling, load balancing

#### Exercise 9: Wildcard Indexes
```bash
curl -X POST http://localhost:3000/indexing/exercise/wildcard
```
**Learn**: Dynamic schemas, flexible data structures
**Use Case**: JSON documents, varying field structures

#### Exercise 10: Collation Indexes
```bash
curl -X POST http://localhost:3000/indexing/exercise/collation
```
**Learn**: Case-insensitive queries, international text
**Use Case**: User names, search functionality, multilingual apps

#### Exercise 11: Unique Indexes
```bash
curl -X POST http://localhost:3000/indexing/exercise/unique
```
**Learn**: Data integrity, constraint enforcement
**Use Case**: Email uniqueness, username constraints

### **Performance Analysis**

#### Basic Performance Analysis
```bash
curl http://localhost:3000/indexing/exercise/performance
```

#### Advanced Performance Analysis
```bash
curl http://localhost:3000/indexing/exercise/performance-advanced
```
**Tests**: Geospatial queries, array searches, wildcard patterns, collation

## 🚀 Quick Start Options

### Option 1: Complete Basic Workflow (5 minutes)
```bash
# 1. Setup
curl -X POST "http://localhost:3000/seed/all?userActivities=100&salesData=50"

# 2. Learn basics
curl http://localhost:3000/indexing/learn/basics

# 3. Run basic exercises
curl -X POST http://localhost:3000/indexing/exercise/complete

# 4. View results
curl http://localhost:3000/indexing/indexes
```

### Option 2: Complete Advanced Workflow (10 minutes)
```bash
# 1. Setup
curl -X POST "http://localhost:3000/seed/all?userActivities=200&salesData=100"

# 2. Run all 12 index types + analysis
curl -X POST http://localhost:3000/indexing/exercise/advanced

# 3. Test performance
curl http://localhost:3000/indexing/exercise/performance-advanced

# 4. View comprehensive results
curl http://localhost:3000/indexing/indexes
```

### Option 3: Step-by-Step Learning (20 minutes)
```bash
# Run each exercise individually to understand each index type
curl -X POST http://localhost:3000/indexing/exercise/basic
curl -X POST http://localhost:3000/indexing/exercise/compound
curl -X POST http://localhost:3000/indexing/exercise/text
curl -X POST http://localhost:3000/indexing/exercise/specialized
curl -X POST http://localhost:3000/indexing/exercise/ttl
curl -X POST http://localhost:3000/indexing/exercise/geospatial
curl -X POST http://localhost:3000/indexing/exercise/multikey
curl -X POST http://localhost:3000/indexing/exercise/hashed
curl -X POST http://localhost:3000/indexing/exercise/wildcard
curl -X POST http://localhost:3000/indexing/exercise/collation
curl -X POST http://localhost:3000/indexing/exercise/unique

# Analyze performance after each step
curl http://localhost:3000/indexing/exercise/performance
```

## 🎯 Real-World Index Applications

### **E-commerce Platform**
- **Product Search**: Text indexes on names/descriptions
- **User Profiles**: Unique indexes on email
- **Order History**: Compound indexes on {userId, orderDate}
- **Inventory**: TTL indexes for temporary reservations
- **Store Locator**: Geospatial indexes for locations

### **Social Media App**
- **User Feed**: Compound indexes on {userId, timestamp}
- **Hashtags**: Multikey indexes on tag arrays
- **User Search**: Collation indexes for case-insensitive names
- **Analytics**: Hashed indexes for sharding user data
- **Session Management**: TTL indexes for login sessions

### **IoT/Analytics Platform**
- **Sensor Data**: TTL indexes for data retention
- **Device Metadata**: Wildcard indexes for flexible schemas
- **Geographic Data**: Geospatial indexes for device locations
- **Time Series**: Compound indexes on {deviceId, timestamp}
- **Alert Conditions**: Partial indexes for active alerts

## 📊 Understanding Results

### Good Performance Indicators
- `totalDocsExamined` ≈ `totalDocsReturned`
- `executionTimeMillis` < 100ms for simple queries
- Specific index name used (not COLLSCAN)

### Poor Performance Indicators
- `totalDocsExamined` >> `totalDocsReturned`
- High `executionTimeMillis`
- COLLSCAN (full collection scan)

### Sample Good Result
```json
{
  "query": "Find by userId",
  "executionStats": {
    "totalDocsExamined": 5,
    "totalDocsReturned": 5,
    "executionTimeMillis": 2,
    "indexUsed": "idx_userId"
  }
}
```

### Sample Poor Result
```json
{
  "query": "Unindexed query",
  "executionStats": {
    "totalDocsExamined": 1000,
    "totalDocsReturned": 5,
    "executionTimeMillis": 45,
    "indexUsed": "COLLSCAN"
  }
}
```

## 🧹 Cleanup and Reset

### Remove All Custom Indexes
```bash
curl -X DELETE http://localhost:3000/indexing/indexes
```

### Clear All Data
```bash
curl -X DELETE http://localhost:3000/seed/clear
```

## 💡 Best Practices Learned

1. **Index Strategy**:
   - Create indexes based on query patterns
   - Monitor actual usage, not theoretical needs
   - Consider write performance impact

2. **Compound Index Design**:
   - Most selective field first
   - Sort fields at the end
   - Consider query prefix patterns

3. **Performance Monitoring**:
   - Use `explain()` to validate index usage
   - Monitor `totalDocsExamined`
   - Profile slow queries

4. **Index Maintenance**:
   - Drop unused indexes
   - Monitor index size
   - Use background builds for large collections

## 🎯 Advanced Challenges

Once you complete the basic exercises, try these challenges:

### Challenge 1: Query Optimization
Find queries in your application that are slow and optimize them with indexes.

### Challenge 2: Index Selection
Given multiple possible indexes, determine which MongoDB will choose and why.

### Challenge 3: Write Performance Impact
Measure how many indexes affect insert/update performance.

### Challenge 4: Partial Index Design
Create partial indexes for specific business requirements (e.g., active users only).

## 📚 Additional Resources

- [MongoDB Indexing Strategies](https://docs.mongodb.com/manual/indexes/)
- [Query Performance Analysis](https://docs.mongodb.com/manual/tutorial/analyze-query-performance/)
- [Index Build Performance](https://docs.mongodb.com/manual/core/index-creation/)

## 🎉 What Students Will Learn

After completing these exercises, students will have hands-on experience with:

### **Index Strategy & Design**
- Choosing the right index type for specific use cases
- Understanding the trade-offs between performance and storage
- Designing compound indexes for complex query patterns
- Planning indexes for scalability and sharding

### **Performance Optimization**
- Reading and interpreting explain() output
- Identifying query bottlenecks and solutions
- Measuring index effectiveness with real metrics
- Optimizing both read and write performance

### **Production-Ready Skills**
- TTL indexes for automatic data cleanup
- Geospatial indexes for location-based features
- Wildcard indexes for flexible schemas
- Unique constraints for data integrity
- Collation for international applications

### **Advanced MongoDB Concepts**
- Multikey index behavior and limitations
- Hashed indexes for horizontal scaling
- Index intersection and selection algorithms
- Background index builds and maintenance

Ready to become a MongoDB indexing expert! 🚀

---

**💡 Pro Tip**: Start with the basic workflow, then progress to advanced exercises. Each exercise builds upon previous knowledge and provides practical, real-world scenarios you'll encounter in production applications.