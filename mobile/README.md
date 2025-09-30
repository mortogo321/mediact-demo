# Nurse Scheduling Mobile App

Flutter mobile application for nurses to view their schedules and request leave.

## Features

- 🔐 **Login Authentication** - Secure login for nurses
- 📅 **View Schedule** - See assigned shifts with date and time
- 🏖️ **Request Leave** - Submit leave requests with reasons
- 📊 **Leave Status** - Track leave request status (Pending/Approved/Rejected)
- 🔄 **Pull to Refresh** - Update schedule with pull-down gesture
- 📱 **Mobile Optimized** - Native Android and iOS experience

## Prerequisites

- Flutter SDK (3.0.0 or higher)
- Dart SDK (3.0.0 or higher)
- Android Studio / Xcode
- Backend API running

## Installation

```bash
# Install dependencies
flutter pub get

# Check Flutter setup
flutter doctor
```

## Configuration

### API Endpoint

Update the API URL in `lib/services/api_service.dart`:

```dart
// For Android Emulator (default)
static const String baseUrl = 'http://10.0.2.2:8000';

// For iOS Simulator
static const String baseUrl = 'http://localhost:8000';

// For Physical Device (use your computer's IP)
static const String baseUrl = 'http://192.168.x.x:8000';
```

### Finding Your IP Address

**macOS/Linux:**
```bash
ifconfig | grep "inet "
```

**Windows:**
```bash
ipconfig
```

## Running the App

### Android Emulator
```bash
flutter run
```

### iOS Simulator
```bash
flutter run
```

### Physical Device

1. Enable USB Debugging (Android) or Trust Computer (iOS)
2. Connect device via USB
3. Run:
```bash
flutter devices
flutter run -d <device-id>
```

## Building APK

### Debug APK
```bash
flutter build apk --debug
```
Output: `build/app/outputs/flutter-apk/app-debug.apk`

### Release APK
```bash
flutter build apk --release
```
Output: `build/app/outputs/flutter-apk/app-release.apk`

### Install APK on Device
```bash
flutter install
```

## Project Structure

```
lib/
├── main.dart              # App entry point
├── models/                # Data models
│   ├── user.dart         # User model
│   ├── shift.dart        # Shift model
│   ├── schedule.dart     # Schedule model
│   └── leave_request.dart # Leave request model
├── services/              # Business logic
│   ├── auth_service.dart # Authentication & storage
│   └── api_service.dart  # API client (Dio)
├── screens/               # App screens
│   ├── login_screen.dart # Login page
│   └── schedule_screen.dart # Schedule list page
└── widgets/               # Reusable widgets
    └── shift_card.dart   # Shift card component
```

## Features Breakdown

### 1. Login Screen
- Email and password input
- Form validation
- Error handling
- Sample credentials display
- Automatic navigation after login

### 2. Schedule Screen
- Display all assigned shifts
- Show date, time, and leave status
- Pull-to-refresh functionality
- Empty state when no shifts
- Error handling with retry

### 3. Leave Request Dialog
- Modal dialog for leave request
- Date and time display
- Reason text input
- Submit and cancel actions

### 4. Shift Card Widget
- Date display with Thai locale
- Time range display
- Status badge (Pending/Approved/Rejected)
- Leave reason display
- Request leave button

## State Management

Uses **Provider** for state management:
- `AuthService` - Manages authentication state
- Local state with `setState()` for UI updates

## Data Persistence

Uses **SharedPreferences** for local storage:
- JWT access token
- User information (name, email, role)

## API Integration

### Endpoints Used

```dart
POST /auth/login
Body: { email, password }
Response: { access_token, user }

GET /my-schedule
Headers: Authorization Bearer <token>
Response: Array of schedules

POST /leave-requests
Body: { shift_assignment_id, reason }
Headers: Authorization Bearer <token>
```

## Dependencies

```yaml
# HTTP & API
dio: ^5.4.0              # HTTP client

# State Management
provider: ^6.1.1         # State management

# Storage
shared_preferences: ^2.2.2  # Local storage

# Date & Time
intl: ^0.18.1           # Internationalization
table_calendar: ^3.0.9   # Calendar widget (optional)
```

## Sample Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Nurse | arunee@hospital.com | password123 |
| Nurse | preeda@hospital.com | password123 |
| Nurse | wanna@hospital.com | password123 |

> **Note:** This app is for **nurses only**. Head nurses should use the web application.

### Build Errors
```bash
# Clean build
flutter clean
flutter pub get
flutter run
```

### Android SDK Issues
```bash
flutter doctor --android-licenses
```

### iOS Signing Issues
- Open `ios/Runner.xcworkspace` in Xcode
- Configure signing team
