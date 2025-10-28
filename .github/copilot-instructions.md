# NestJS MongoDB Atlas Real-Time Analytics Learning Project

This project is designed to help students learn real-time MongoDB Atlas analytics using NestJS.

## Project Overview
- **Framework**: NestJS with TypeScript
- **Database**: MongoDB Atlas with real-time analytics
- **Real-time**: WebSockets for live data updates
- **Purpose**: Educational platform for learning MongoDB analytics

## Development Guidelines
- Use TypeScript for all source code
- Follow NestJS best practices and patterns
- Implement proper error handling and validation
- Use environment variables for configuration
- Include comprehensive logging for learning purposes

## Project Structure
- `src/analytics/` - Analytics modules and services
- `src/database/` - MongoDB connection and schemas
- `src/websockets/` - Real-time WebSocket gateway
- `src/config/` - Configuration management
- `src/common/` - Shared utilities and decorators

## Key Features Implemented
- ✅ MongoDB Atlas connection with proper error handling
- ✅ Real-time data aggregation pipelines
- ✅ WebSocket gateway for live updates
- ✅ Sample analytics endpoints for learning
- ✅ Environment-based configuration
- ✅ Docker support for development

## Setup Instructions
1. Update `.env` file with your MongoDB Atlas connection string
2. Run `npm install` to install dependencies
3. Run `npm run start:dev` to start development server
4. Access the application at http://localhost:3000

## Learning Features
- User activity tracking with aggregation pipelines
- Sales data analytics with trend analysis
- Real-time dashboard updates via WebSockets
- Sample API endpoints for hands-on learning