# Nurse Scheduling Frontend

Next.js-based web application for the Nurse Scheduling System.

## Features

- 🔐 **Authentication** - Login with role-based routing
- 👩‍⚕️ **Nurse Dashboard** - View assigned shifts and request leave
- 👩‍⚕️ **Head Nurse Dashboard** - Create shifts, assign nurses, manage leave requests
- 📱 **Responsive Design** - Mobile-friendly interface with TailwindCSS
- 🎨 **Modern UI** - Clean and intuitive user interface

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running on http://localhost:8000

## Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Edit .env.local if needed (default: http://localhost:8000)
```

## Running the Application

```bash
# Development mode (runs on port 3001)
npm run dev

# Production build
npm run build
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── login/             # Login page
│   ├── nurse/             # Nurse pages
│   │   └── dashboard/     # Nurse schedule view
│   └── head-nurse/        # Head Nurse pages
│       ├── dashboard/     # Main dashboard
│       ├── shifts/
│       │   ├── create/    # Create shift form
│       │   └── assign/    # Assign shift form
│       └── leave-requests/ # Manage leave requests
│
├── components/            # Reusable components
│   └── Layout.tsx        # Main layout with header
│
├── lib/                   # Utilities
│   ├── api.ts            # API client (Axios)
│   └── auth.ts           # Authentication helpers
│
└── types/                 # TypeScript types
    └── index.ts          # Shared types
```

## User Roles & Features

### 👩‍⚕️ Nurse (พยาบาล)
- **Login**: `/login`
- **Dashboard**: `/nurse/dashboard`
- **Features**:
  - ดูตารางเวรของตัวเอง
  - ขออนุมัติลาสำหรับเวรที่ได้รับมอบหมาย
  - ดูสถานะคำขอลา (รออนุมัติ/อนุมัติ/ปฏิเสธ)

### 👩‍⚕️ Head Nurse (หัวหน้าพยาบาล)
- **Login**: `/login`
- **Dashboard**: `/head-nurse/dashboard`
- **Features**:
  - **สร้างเวร**: `/head-nurse/shifts/create`
    - กำหนดวันที่และช่วงเวลา
    - Quick select กะเช้า/บ่าย/ดึก
  - **จัดเวรพยาบาล**: `/head-nurse/shifts/assign`
    - เลือกเวรและพยาบาลที่จะมอบหมาย
  - **จัดการคำขอลา**: `/head-nurse/leave-requests`
    - ดูรายการคำขอลาทั้งหมด
    - อนุมัติหรือปฏิเสธคำขอลา
    - กรองตามสถานะ (รออนุมัติ/อนุมัติ/ปฏิเสธ)

## Sample Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Head Nurse | head@hospital.com | password123 |
| Nurse | arunee@hospital.com | password123 |
| Nurse | preeda@hospital.com | password123 |

## API Integration

The frontend communicates with the backend API using Axios. API configuration is in `src/lib/api.ts`:

- **Base URL**: Configured via `NEXT_PUBLIC_API_URL` environment variable
- **Authentication**: JWT token stored in localStorage
- **Automatic Headers**: Bearer token automatically added to requests

## Technologies Used

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **Date Formatting**: date-fns
- **State Management**: React Hooks (useState, useEffect)

## Development Notes

### Authentication Flow
1. User logs in via `/login`
2. JWT token and user info saved to localStorage
3. Automatic redirect based on role:
   - Nurse → `/nurse/dashboard`
   - Head Nurse → `/head-nurse/dashboard`
4. Protected routes check authentication on mount

### API Response Handling
```typescript
// Success
const response = await authApi.login(email, password);
const { access_token, user } = response.data;

// Error
catch (error: any) {
  const message = error.response?.data?.message || 'Default error';
}
```

## Building for Production

```bash
# Build the application
npm run build

# Run production server
npm start

# Or deploy to Vercel
vercel deploy
```

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```
