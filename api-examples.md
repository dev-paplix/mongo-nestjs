# Sample API Requests for NestJS MongoDB Analytics

## Prerequisites
Make sure your server is running: `npm run start:dev`
Default URL: http://localhost:3000

## Health Check
```bash
curl http://localhost:3000/health
```

## Seed Data (Create Dummy Data)

### Seed All Data (Recommended)
```bash
# Create 50 user activities and 30 sales records
curl -X POST "http://localhost:3000/seed/all"

# Custom counts
curl -X POST "http://localhost:3000/seed/all?userActivities=100&salesData=50"
```

### Seed Individual Data Types
```bash
# Seed user activities only
curl -X POST "http://localhost:3000/seed/user-activities?count=25"

# Seed sales data only
curl -X POST "http://localhost:3000/seed/sales-data?count=20"
```

### Get Data Statistics
```bash
curl http://localhost:3000/seed/stats
```

### Clear All Data (Be Careful!)
```bash
curl -X DELETE http://localhost:3000/seed/clear
```

## User Activity Analytics

### Create Individual User Activity
```bash
curl -X POST http://localhost:3000/analytics/user-activity \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_123",
    "action": "page_view",
    "page": "/dashboard",
    "duration": 5000,
    "metadata": {
      "browser": "Chrome",
      "device": "desktop"
    }
  }'
```

### Get User Activities (Paginated)
```bash
# Default (10 items, page 1)
curl http://localhost:3000/analytics/user-activity

# Custom pagination
curl "http://localhost:3000/analytics/user-activity?limit=20&page=2"
```

### Get Aggregated User Activity
```bash
curl http://localhost:3000/analytics/user-activity/aggregated
```

## Sales Data Analytics

### Create Individual Sales Record
```bash
curl -X POST http://localhost:3000/analytics/sales \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "prod_001",
    "productName": "Analytics Dashboard Pro",
    "customerId": "customer_456",
    "amount": 299.99,
    "quantity": 1,
    "category": "Software",
    "region": "North America",
    "salesRep": "John Doe"
  }'
```

### Get Sales Data (Paginated)
```bash
# Default (10 items, page 1)
curl http://localhost:3000/analytics/sales

# Custom pagination
curl "http://localhost:3000/analytics/sales?limit=20&page=2"
```

### Get Sales Summary
```bash
curl http://localhost:3000/analytics/sales/summary
```

### Get Sales Trends
```bash
# Daily trends
curl http://localhost:3000/analytics/sales/trends/daily

# Monthly trends
curl http://localhost:3000/analytics/sales/trends/monthly

# Yearly trends
curl http://localhost:3000/analytics/sales/trends/yearly
```

## Real-time Analytics

### Get Real-time Dashboard Data
```bash
curl http://localhost:3000/analytics/realtime/dashboard
```

### Get Real-time Metrics
```bash
curl http://localhost:3000/analytics/realtime/metrics
```

## Quick Start Workflow

1. **Start the server:**
   ```bash
   npm run start:dev
   ```

2. **Seed sample data:**
   ```bash
   curl -X POST "http://localhost:3000/seed/all?userActivities=100&salesData=50"
   ```

3. **Check data stats:**
   ```bash
   curl http://localhost:3000/seed/stats
   ```

4. **View dashboard:**
   ```bash
   curl http://localhost:3000/analytics/realtime/dashboard
   ```

5. **Test aggregations:**
   ```bash
   curl http://localhost:3000/analytics/user-activity/aggregated
   curl http://localhost:3000/analytics/sales/summary
   ```

## PowerShell Examples (Windows)

If you prefer PowerShell, replace `curl` with `Invoke-RestMethod`:

```powershell
# Seed all data
Invoke-RestMethod -Uri "http://localhost:3000/seed/all" -Method POST

# Get dashboard data
Invoke-RestMethod -Uri "http://localhost:3000/analytics/realtime/dashboard"

# Create user activity
$body = @{
    userId = "user_123"
    action = "login"
    page = "/dashboard"
    duration = 3000
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/analytics/user-activity" -Method POST -Body $body -ContentType "application/json"
```

## WebSocket Testing

To test real-time features, you can use a WebSocket client or browser console:

```javascript
// In browser console or WebSocket client
const socket = io('http://localhost:3000');

// Listen for real-time updates
socket.on('metricsUpdate', (data) => {
    console.log('Metrics Update:', data);
});

socket.on('dashboardUpdate', (data) => {
    console.log('Dashboard Update:', data);
});

// Request dashboard data
socket.emit('requestDashboard');
```