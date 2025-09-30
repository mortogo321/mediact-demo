# Nurse Scheduling API - Backend

NestJS-based REST API for the Nurse Scheduling System.

## Features

- 🔐 JWT Authentication
- 👥 Role-based Access Control (Nurse, Head Nurse)
- 📆 Shift Management
- 📋 Leave Request System
- 🗄️ MySQL Database with TypeORM
- 📚 Swagger API Documentation (non-production only)

## Prerequisites

- Node.js (v18 or higher)
- MySQL (v8 or higher)
- npm or yarn

## Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your database credentials
```

## Database Setup

```bash
# Create database
mysql -u root -p -e "CREATE DATABASE nurse_scheduling;"

# Run migrations (from database folder)
mysql -u root -p nurse_scheduling < ../database/schema.sql

# Seed sample data
mysql -u root -p nurse_scheduling < ../database/seed.sql
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The API will be available at `http://localhost:8000`

## API Documentation

📚 **Swagger UI is available in development mode at:**
```
http://localhost:8000/api/docs
```

This interactive documentation allows you to:
- View all available endpoints
- Test API calls directly in the browser
- See request/response schemas
- Authenticate with JWT tokens

> **Note:** Swagger is automatically disabled in production for security reasons (when `NODE_ENV=production`)

## API Endpoints

### Authentication

```
POST /auth/register - Register new user
POST /auth/login - Login and get JWT token
```

### Shifts (Head Nurse only)

```
POST /shifts - Create new shift
GET /shifts - Get all shifts
GET /shifts?start_date=2025-10-01&end_date=2025-10-31 - Get shifts by date range
```

### Shift Assignments (Head Nurse only)

```
POST /shift-assignments - Assign shift to nurse
```

### My Schedule (Nurse)

```
GET /my-schedule - Get logged-in nurse's schedule
GET /my-schedule?start_date=2025-10-01&end_date=2025-10-31 - Filter by date
```

### Leave Requests

```
POST /leave-requests - Request leave (Nurse)
GET /leave-requests - Get all leave requests (Head Nurse)
GET /leave-requests?status=pending - Filter by status
PATCH /leave-requests/:id/approve - Approve/reject leave (Head Nurse)
```

## Sample API Usage

### Register

```bash
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nurse Jane",
    "email": "jane@hospital.com",
    "password": "password123",
    "role": "nurse"
  }'
```

### Login

```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "head@hospital.com",
    "password": "password123"
  }'
```

### Create Shift (requires HEAD_NURSE role)

```bash
curl -X POST http://localhost:8000/shifts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "date": "2025-10-15",
    "start_time": "08:00:00",
    "end_time": "16:00:00"
  }'
```

### Assign Shift (requires HEAD_NURSE role)

```bash
curl -X POST http://localhost:8000/shift-assignments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "user_id": 2,
    "shift_id": 1
  }'
```

### Request Leave (requires NURSE role)

```bash
curl -X POST http://localhost:8000/leave-requests \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "shift_assignment_id": 1,
    "reason": "Medical appointment"
  }'
```

## Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── guards/          # JWT & Role guards
│   ├── decorators/      # Custom decorators
│   └── dto/             # Data transfer objects
├── users/               # User management
├── shifts/              # Shift management
├── shift-assignments/   # Shift assignment logic
├── leave-requests/      # Leave request handling
├── app.module.ts        # Main application module
└── main.ts              # Application entry point
```

## Testing Sample Credentials

| Role | Email | Password |
|------|-------|----------|
| Head Nurse | head@hospital.com | password123 |
| Nurse | arunee@hospital.com | password123 |
| Nurse | preeda@hospital.com | password123 |

## Technologies Used

- NestJS
- TypeORM
- MySQL
- Passport JWT
- Bcrypt
- Class Validator