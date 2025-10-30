# NestJS MongoDB Atlas Real-Time Analytics Learning Project

A comprehensive learning platform built with NestJS and MongoDB Atlas to help students understand real-time analytics implementation.

## 🚀 Features

- **Real-time Analytics**: Live data updates using WebSockets
- **MongoDB Atlas Integration**: Production-ready cloud database connection
- **Sample Analytics Endpoints**: Ready-to-use API endpoints for learning
- **User Activity Tracking**: Monitor user interactions and behaviors
- **Sales Data Analytics**: Track and analyze sales performance
- **Real-time Dashboard**: Live metrics and KPI monitoring
- **Educational Structure**: Well-documented code for learning purposes
- **🆕 Indexing Exercises**: Comprehensive MongoDB indexing practice with performance analysis

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- VS Code (recommended)

## 🛠️ Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/analytics-db?retryWrites=true&w=majority
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

### Debug Mode
```bash
npm run start:debug
```

## 📚 API Endpoints

### Health Check
- `GET /` - Welcome message
- `GET /health` - Application health status

### User Activity Analytics
- `POST /analytics/user-activity` - Create user activity record
- `GET /analytics/user-activity` - Get user activities (paginated)
- `GET /analytics/user-activity/aggregated` - Get aggregated user activity stats

### Sales Data Analytics
- `POST /analytics/sales` - Create sales record
- `GET /analytics/sales` - Get sales data (paginated)
- `GET /analytics/sales/summary` - Get sales summary
- `GET /analytics/sales/trends/:period` - Get sales trends (daily/monthly/yearly)

### Real-time Analytics
- `GET /analytics/realtime/dashboard` - Get real-time dashboard data
- `GET /analytics/realtime/metrics` - Get real-time metrics

### 🆕 MongoDB Indexing Exercises
- `GET /indexing/learn/basics` - Learn indexing concepts
- `GET /indexing/learn/exercises` - Get exercise instructions
- `POST /indexing/exercise/basic` - Create basic single field indexes
- `POST /indexing/exercise/compound` - Create compound indexes
- `POST /indexing/exercise/text` - Create text search indexes
- `POST /indexing/exercise/specialized` - Create sparse and partial indexes
- `GET /indexing/exercise/performance` - Analyze query performance
- `POST /indexing/exercise/complete` - Run complete indexing workflow
- `GET /indexing/indexes` - View all current indexes
- `DELETE /indexing/indexes` - Remove all custom indexes

## 🔌 WebSocket Events

Connect to the WebSocket server to receive real-time updates:

### Client Events (Send)
- `requestDashboard` - Request dashboard data
- `requestMetrics` - Request current metrics

### Server Events (Receive)
- `dashboardUpdate` - Real-time dashboard data
- `metricsUpdate` - Updated metrics (every 5 seconds)
- `userActivityUpdate` - New user activity
- `salesDataUpdate` - New sales data

## 📊 Sample Data Structure

### User Activity
```json
{
  "userId": "user123",
  "action": "page_view",
  "page": "/dashboard",
  "duration": 5000,
  "metadata": {
    "browser": "Chrome",
    "device": "desktop"
  }
}
```

### Sales Data
```json
{
  "productId": "prod123",
  "productName": "Analytics Dashboard Pro",
  "customerId": "cust456",
  "amount": 299.99,
  "quantity": 1,
  "category": "Software",
  "region": "North America",
  "salesRep": "John Doe"
}
```

## 🎓 Learning Objectives

This project helps students learn:

1. **NestJS Framework**: Controllers, Services, Modules, and Decorators
2. **MongoDB Atlas**: Cloud database setup and connection
3. **Mongoose ODM**: Schema design and data modeling
4. **Real-time Features**: WebSocket implementation with Socket.IO
5. **Data Aggregation**: MongoDB aggregation pipelines
6. **API Design**: RESTful endpoints and data validation
7. **Environment Configuration**: Production-ready configuration management
8. **Error Handling**: Proper error handling and logging
9. **🆕 MongoDB Indexing**: Comprehensive indexing strategies and performance optimization

## 📚 Additional Learning Modules

### MongoDB Indexing Mastery
Complete hands-on exercises covering:
- Single field and compound indexes
- Text search indexes for full-text search
- Sparse and partial indexes for optimization
- Query performance analysis with explain()
- Index strategy and best practices

**Quick Start**: See [INDEXING_EXERCISES.md](./INDEXING_EXERCISES.md) for detailed instructions.

## 📁 Project Structure

```
src/
├── analytics/          # Analytics module
│   ├── dto/           # Data Transfer Objects
│   ├── schemas/       # MongoDB schemas
│   ├── analytics.controller.ts
│   ├── analytics.service.ts
│   └── analytics.module.ts
├── database/          # Database configuration
├── websockets/        # WebSocket gateway
├── app.controller.ts  # Main application controller
├── app.service.ts     # Main application service
├── app.module.ts      # Root module
└── main.ts           # Application entry point
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# Test coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Application port | `3000` |
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `WEBSOCKET_PORT` | WebSocket port | `3001` |
| `ENABLE_REAL_TIME_ANALYTICS` | Enable real-time features | `true` |
| `ANALYTICS_COLLECTION_INTERVAL` | Metrics collection interval (ms) | `5000` |

## 🔧 Development Tips

1. **MongoDB Atlas Setup**: Create a free cluster and get your connection string
2. **Sample Data**: Use the provided DTOs to create test data
3. **Real-time Testing**: Use a WebSocket client to test real-time features
4. **Aggregation Pipelines**: Study the aggregation examples in the service
5. **Error Handling**: Check logs for connection and validation errors

## 📖 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Socket.IO Documentation](https://socket.io/docs/)

## 🤝 Contributing

This is a learning project. Feel free to:
- Add more analytics features
- Improve documentation
- Create sample data generators
- Add more aggregation examples

## 📄 License

MIT License - feel free to use this project for educational purposes.