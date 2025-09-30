# Database Schema Documentation

## ตารางฐานข้อมูล

### 1. users
เก็บข้อมูลผู้ใช้และบทบาทในระบบ

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary Key |
| name | VARCHAR(255) | ชื่อผู้ใช้ |
| email | VARCHAR(255) | อีเมล (unique) |
| password | VARCHAR(255) | รหัสผ่าน (hashed) |
| role | ENUM | บทบาท: 'nurse' หรือ 'head_nurse' |
| created_at | TIMESTAMP | วันที่สร้าง |
| updated_at | TIMESTAMP | วันที่อัปเดตล่าสุด |

### 2. shifts
เก็บข้อมูลเวรทำงานที่สร้างโดยหัวหน้าพยาบาล

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary Key |
| date | DATE | วันที่เวร |
| start_time | TIME | เวลาเริ่มเวร |
| end_time | TIME | เวลาสิ้นสุดเวร |
| created_at | TIMESTAMP | วันที่สร้าง |
| updated_at | TIMESTAMP | วันที่อัปเดตล่าสุด |

### 3. shift_assignments
เก็บการมอบหมายเวรให้กับพยาบาล (Many-to-Many relationship)

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary Key |
| user_id | INT | Foreign Key -> users.id |
| shift_id | INT | Foreign Key -> shifts.id |
| created_at | TIMESTAMP | วันที่มอบหมาย |
| updated_at | TIMESTAMP | วันที่อัปเดตล่าสุด |

### 4. leave_requests
เก็บคำขอลาของพยาบาล

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary Key |
| shift_assignment_id | INT | Foreign Key -> shift_assignments.id |
| reason | TEXT | เหตุผลการลา |
| status | ENUM | สถานะ: 'pending', 'approved', 'rejected' |
| approved_by | INT | Foreign Key -> users.id (หัวหน้าที่อนุมัติ) |
| created_at | TIMESTAMP | วันที่ขอลา |
| updated_at | TIMESTAMP | วันที่อัปเดตล่าสุด |

## ER Diagram

```
users (1) ----< (N) shift_assignments (N) >---- (1) shifts
                          |
                          | (1)
                          |
                          v
                        (N) leave_requests
                          |
                          | (approved_by)
                          v
                        (1) users
```

## การติดตั้ง

```bash
# สร้างฐานข้อมูล
mysql -u root -p -e "CREATE DATABASE nurse_scheduling;"

# Import schema
mysql -u root -p nurse_scheduling < schema.sql

# Import sample data
mysql -u root -p nurse_scheduling < seed.sql
```

## Sample Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Head Nurse | head@hospital.com | password123 |
| Nurse | arunee@hospital.com | password123 |
| Nurse | preeda@hospital.com | password123 |
| Nurse | wanna@hospital.com | password123 |