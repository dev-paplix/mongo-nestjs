# MongoDB Indexing Exercises 📚

A comprehensive set of hands-on exercises to master **all types of MongoDB indexes** using real-world analytics data.

## 🎯 Learning Objectives

By completing these exercises, students will:
- Master **12 different types of MongoDB indexes**
- Learn when and how to create optimal indexes for various scenarios
- Analyze query performance using execution statistics
- Practice index optimization strategies for production workloads
- Understand advanced indexing concepts like TTL, geospatial, and wildcard indexes
- **Compare good vs poor performance practices** with real-time metrics
- **Monitor and optimize database performance** in production scenarios

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

### **Performance Monitoring (Real-World Application)**
13. **Good Performance Practices** - Optimized bulk operations and indexing
14. **Poor Performance Demonstration** - Anti-patterns and inefficient operations
15. **Performance Comparison** - Side-by-side analysis with metrics
16. **Real-time Query Monitoring** - Live performance tracking

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

### Option 4: Performance Optimization Workshop (15 minutes)
```bash
# 1. Setup with sufficient data
curl -X POST "http://localhost:3000/seed/all?userActivities=500&salesData=200"

# 2. Create indexes for optimal performance
curl -X POST http://localhost:3000/indexing/exercise/basic
curl -X POST http://localhost:3000/indexing/exercise/compound

# 3. Monitor current query performance
curl http://localhost:3000/indexing/performance/monitor-queries

# 4. Test good performance practices
curl -X POST "http://localhost:3000/indexing/performance/good-insert?count=1000"

# 5. Test poor performance practices (smaller count!)
curl -X POST "http://localhost:3000/indexing/performance/poor-insert?count=500"

# 6. Direct comparison with recommendations
curl -X POST "http://localhost:3000/indexing/performance/compare?count=1000"
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

## ⚡ Performance Monitoring & Optimization

### **Understanding Performance Impact**
These exercises demonstrate **real-world performance differences** between optimized and unoptimized database operations.

#### **Exercise 13: Good Performance Data Insertion**
**Demonstrates**: Bulk operations, proper indexing, optimized batching
```bash
# Insert 1000 documents with best practices
curl -X POST "http://localhost:3000/indexing/performance/good-insert?count=1000"
```
**PowerShell**:
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/indexing/performance/good-insert?count=1000" -Method POST
```

**What happens**:
- ✅ Creates optimal indexes first
- ✅ Uses `insertMany()` with batch size of 100
- ✅ Uses unordered inserts for better parallelization
- ✅ Optimized write concerns for bulk operations
- ✅ Real-time performance metrics

**Expected Results**:
- **Speed**: 500-2000+ documents per second
- **Memory**: Efficient memory usage
- **Time**: Usually completes in under 2 seconds

#### **Exercise 14: Poor Performance Data Insertion**
**Demonstrates**: Single document inserts, no indexing, inefficient operations
```bash
# Insert 500 documents with poor practices (use smaller count!)
curl -X POST "http://localhost:3000/indexing/performance/poor-insert?count=500"
```
**PowerShell**:
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/indexing/performance/poor-insert?count=500" -Method POST
```

**What happens**:
- ❌ Removes all indexes first
- ❌ Uses individual `create()` calls
- ❌ No batching or optimization
- ❌ Inefficient document structures
- ❌ Bloated metadata and oversized documents

**Expected Results**:
- **Speed**: 10-50 documents per second
- **Memory**: High memory usage due to oversized documents
- **Time**: Can take 30+ seconds for 500 documents

#### **Exercise 15: Performance Strategy Comparison**
**Compares**: Both approaches side-by-side with quantified metrics
```bash
# Direct comparison with performance metrics
curl -X POST "http://localhost:3000/indexing/performance/compare?count=1000"
```
**PowerShell**:
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/indexing/performance/compare?count=1000" -Method POST
```

**What you'll see**:
```json
{
  "performanceDifference": {
    "speedImprovement": 15.5,  // Good practice is 15.5x faster
    "timeReduction": 94,       // 94% time reduction
    "timeDifferenceMs": 28500  // 28.5 seconds saved
  },
  "recommendations": [
    "Use bulk operations (insertMany) instead of individual inserts",
    "Create appropriate indexes before bulk inserts",
    "Use optimal batch sizes (50-100 documents)",
    "Use unordered inserts for better parallelization"
  ]
}
```

#### **Exercise 16: Real-time Query Performance Monitoring**
**Monitors**: Live query execution across all index types
```bash
# Monitor various query patterns and their performance
curl http://localhost:3000/indexing/performance/monitor-queries
```
**PowerShell**:
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/indexing/performance/monitor-queries"
```

**Tests performed**:
- Simple index scans
- Range queries with timestamps
- Compound index utilization
- Text search performance
- Aggregation pipeline efficiency

### **📊 Performance Insights**

#### **Typical Performance Differences**
| Operation | Good Practice | Poor Practice | Improvement |
|-----------|---------------|---------------|-------------|
| **Insert 1000 docs** | 0.5-2 seconds | 20-60 seconds | **10-100x faster** |
| **Simple query** | 1-5ms | 50-200ms | **10-40x faster** |
| **Range query** | 2-10ms | 100-500ms | **20-50x faster** |
| **Text search** | 5-20ms | 200-1000ms | **20-100x faster** |

#### **Key Optimization Strategies**
1. **Bulk Operations**: Use `insertMany()` instead of individual inserts
2. **Index First**: Create indexes before bulk data operations
3. **Batch Size**: Optimal batch sizes (50-100 documents)
4. **Write Concerns**: Use appropriate write concerns for bulk ops
5. **Unordered Inserts**: Enable parallelization with `ordered: false`
6. **Document Structure**: Keep documents lean and well-structured

#### **Production Best Practices**
- Monitor query performance with `explain()` regularly
- Use MongoDB Profiler to identify slow operations
- Create compound indexes for multi-field queries
- Use projection to limit returned fields
- Implement proper data archiving with TTL indexes
- Consider read preferences for read-heavy workloads

### **🚨 Warning: Resource Usage**
- **Good Performance**: Start with 100-1000 documents
- **Poor Performance**: Start with 50-500 documents (it's much slower!)
- Monitor your system resources during large operations
- The poor performance examples are intentionally inefficient for learning purposes

## 🧹 Cleanup and Reset

### Remove All Custom Indexes
```bash
curl -X DELETE http://localhost:3000/indexing/indexes
```

### Clear All Data
```bash
curl -X DELETE http://localhost:3000/seed/clear
```

