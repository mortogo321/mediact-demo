# 📄 ระบบจัดเวรพยาบาล (Nurse Scheduling System)

ระบบจัดการเวรพยาบาลแบบครบวงจร รองรับการทำงานของพยาบาลและหัวหน้าพยาบาล พร้อมระบบขออนุมัติลา

## 🎯 คุณสมบัติหลัก

- 🔐 **ระบบ Authentication** - JWT-based authentication
- 👥 **จัดการบทบาท** - Head Nurse และ Nurse
- 📆 **สร้างและจัดการเวร** - หัวหน้าพยาบาลสร้างและจัดเวรให้ทีม
- 📋 **ดูตารางเวรส่วนตัว** - พยาบาลดูเวรของตัวเอง
- 🏖️ **ระบบขอลา** - พยาบาลขอลา หัวหน้าอนุมัติ/ปฏิเสธ
- 📱 **รองรับหลายแพลตฟอร์ม** - Web และ Mobile

## 📂 โครงสร้างโปรเจค

```
MediAct/
├── database/           # ข้อ 1: ฐานข้อมูล
│   ├── schema.sql     # SQL Schema
│   ├── seed.sql       # ข้อมูลตัวอย่าง
│   └── README.md      # คำอธิบายตารางและ ER Diagram
│
├── backend/            # ข้อ 2: Backend API (NestJS)
│   ├── src/
│   │   ├── auth/      # Authentication & JWT
│   │   ├── users/     # จัดการผู้ใช้
│   │   ├── shifts/    # จัดการเวร
│   │   ├── shift-assignments/  # มอบหมายเวร
│   │   └── leave-requests/     # คำขอลา
│   ├── package.json
│   └── README.md      # API Documentation
│
├── frontend/           # ข้อ 3: Web Frontend (Next.js/React)
│   ├── src/
│   │   ├── app/       # Next.js App Router
│   │   ├── components/
│   │   └── lib/       # API client & utilities
│   ├── package.json
│   └── README.md      # Frontend Setup Guide
│
└── mobile/             # ข้อ 4: Mobile App (Flutter) - Optional
    ├── lib/
    │   ├── models/
    │   ├── services/
    │   ├── screens/
    │   └── widgets/
    ├── pubspec.yaml
    └── README.md      # Mobile Setup Guide
```

## 🚀 Quick Start

### ข้อที่ 1: Setup Database

```bash
# สร้างฐานข้อมูล
cd database
mysql -u root -p -e "CREATE DATABASE nurse_scheduling;"

# Import schema
mysql -u root -p nurse_scheduling < schema.sql

# Import ข้อมูลตัวอย่าง
mysql -u root -p nurse_scheduling < seed.sql
```

**📖 เอกสารเพิ่มเติม:** [database/README.md](database/README.md)

---

### ข้อที่ 2: Setup Backend API

```bash
# เข้าไปที่โฟลเดอร์ backend
cd backend

# ติดตั้ง dependencies
npm install

# ตั้งค่า environment variables
cp .env.example .env
# แก้ไข .env ให้ตรงกับ database ของคุณ

# รัน API server
npm run start:dev
```

API จะรันที่: `http://localhost:8000`

**📖 เอกสารเพิ่มเติม:** [backend/README.md](backend/README.md)

**📚 Swagger API Documentation:** `http://localhost:8000/api/docs` (development only)

**API Endpoints:**
- `POST /auth/register` - สมัครสมาชิก
- `POST /auth/login` - เข้าสู่ระบบ
- `POST /shifts` - สร้างเวร (Head Nurse)
- `POST /shift-assignments` - จัดเวร (Head Nurse)
- `GET /my-schedule` - ดูเวรตัวเอง (Nurse)
- `POST /leave-requests` - ขอลา (Nurse)
- `GET /leave-requests` - ดูคำขอลา (Head Nurse)
- `PATCH /leave-requests/:id/approve` - อนุมัติ/ปฏิเสธ (Head Nurse)

---

### ข้อที่ 3: Setup Web Frontend

```bash
# เข้าไปที่โฟลเดอร์ frontend
cd frontend

# ติดตั้ง dependencies
npm install

# ตั้งค่า environment variables
cp .env.example .env.local
# แก้ไข NEXT_PUBLIC_API_URL ให้ชี้ไปที่ backend

# รัน development server
npm run dev
```

Web จะรันที่: `http://localhost:3000`

**📖 เอกสารเพิ่มเติม:** [frontend/README.md](frontend/README.md)

**Features:**
- 👩‍⚕️ **Nurse Dashboard** - ดูตารางเวร, ขอลา
- 👩‍⚕️ **Head Nurse Dashboard** - สร้างเวร, จัดเวร, อนุมัติการลา

---

### ข้อที่ 4: Setup Mobile App (Optional)

```bash
# เข้าไปที่โฟลเดอร์ mobile
cd mobile

# ติดตั้ง dependencies
flutter pub get

# รัน app (เลือก emulator หรือ device)
flutter run
```

**📖 เอกสารเพิ่มเติม:** [mobile/README.md](mobile/README.md)

**Features:**
- 📱 Login สำหรับพยาบาล
- 📅 ดูตารางเวรรายสัปดาห์
- 🏖️ ขออนุมัติลา

---

## 👥 Sample Login Credentials

| บทบาท | Email | Password |
|--------|-------|----------|
| หัวหน้าพยาบาล | head@hospital.com | password123 |
| พยาบาล | arunee@hospital.com | password123 |
| พยาบาล | preeda@hospital.com | password123 |
| พยาบาล | wanna@hospital.com | password123 |

## 🛠️ Tech Stack

### Backend (ข้อ 2)
- **Framework:** NestJS
- **Database:** MySQL + TypeORM
- **Authentication:** JWT (Passport)
- **Validation:** class-validator
- **API Documentation:** Swagger/OpenAPI

### Frontend (ข้อ 3)
- **Framework:** Next.js 14 (App Router)
- **UI Library:** React + TailwindCSS
- **State Management:** React Hooks
- **HTTP Client:** Axios

### Mobile (ข้อ 4)
- **Framework:** Flutter
- **State Management:** Provider
- **HTTP Client:** Dio
- **Storage:** SharedPreferences

## 📋 Database Schema

### Tables
1. **users** - ผู้ใช้งาน (พยาบาล, หัวหน้าพยาบาล)
2. **shifts** - เวรทำงาน
3. **shift_assignments** - การมอบหมายเวร
4. **leave_requests** - คำขอลา

**ER Diagram และรายละเอียด:** [database/README.md](database/README.md)

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token-based authentication
- ✅ Role-based access control (RBAC)
- ✅ Input validation and sanitization
- ✅ CORS protection

## 📦 Installation Summary

```bash
# 1. Clone repository
git clone <your-repo-url>
cd MediAct

# 2. Setup database
cd database
mysql -u root -p < schema.sql
mysql -u root -p < seed.sql

# 3. Setup backend
cd ../backend
npm install
cp .env.example .env
npm run start:dev

# 4. Setup frontend
cd ../frontend
npm install
cp .env.example .env.local
npm run dev

# 5. Setup mobile (optional)
cd ../mobile
flutter pub get
flutter run
```

## 📝 Notes

- Backend API รันที่ port `8000`
- Frontend Web รันที่ port `3000`
- Swagger Documentation: `http://localhost:8000/api/docs`
- ตรวจสอบให้แน่ใจว่า MySQL service กำลังรัน
- แก้ไข `.env` files ให้ตรงกับ environment ของคุณ
- Mobile app สำหรับพยาบาลเท่านั้น (Head Nurse ใช้ Web)
