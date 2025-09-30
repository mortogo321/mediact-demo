-- ========================================
-- Sample Data for Testing
-- ========================================

-- Insert sample users
-- Password: "password123" hashed with bcrypt
INSERT INTO users (name, email, password, role) VALUES
('Head Nurse Somchai', 'head@hospital.com', '$2b$10$rKZhZqYvZ5gJZ5wZ5wZ5wOeKqXqXqXqXqXqXqXqXqXqXqXqXqXqXq', 'head_nurse'),
('Nurse Arunee', 'arunee@hospital.com', '$2b$10$rKZhZqYvZ5gJZ5wZ5wZ5wOeKqXqXqXqXqXqXqXqXqXqXqXqXqXqXq', 'nurse'),
('Nurse Preeda', 'preeda@hospital.com', '$2b$10$rKZhZqYvZ5gJZ5wZ5wZ5wOeKqXqXqXqXqXqXqXqXqXqXqXqXqXqXq', 'nurse'),
('Nurse Wanna', 'wanna@hospital.com', '$2b$10$rKZhZqYvZ5gJZ5wZ5wZ5wOeKqXqXqXqXqXqXqXqXqXqXqXqXqXqXq', 'nurse');

-- Insert sample shifts for the next week
INSERT INTO shifts (date, start_time, end_time) VALUES
('2025-10-01', '08:00:00', '16:00:00'),
('2025-10-01', '16:00:00', '00:00:00'),
('2025-10-01', '00:00:00', '08:00:00'),
('2025-10-02', '08:00:00', '16:00:00'),
('2025-10-02', '16:00:00', '00:00:00'),
('2025-10-02', '00:00:00', '08:00:00'),
('2025-10-03', '08:00:00', '16:00:00'),
('2025-10-03', '16:00:00', '00:00:00'),
('2025-10-03', '00:00:00', '08:00:00');

-- Assign shifts to nurses
INSERT INTO shift_assignments (user_id, shift_id) VALUES
(2, 1), -- Arunee morning shift Oct 1
(3, 2), -- Preeda evening shift Oct 1
(4, 3), -- Wanna night shift Oct 1
(2, 4), -- Arunee morning shift Oct 2
(3, 5), -- Preeda evening shift Oct 2
(4, 6); -- Wanna night shift Oct 2

-- Insert sample leave request
INSERT INTO leave_requests (shift_assignment_id, reason, status) VALUES
(1, 'Personal emergency', 'pending'),
(3, 'Medical appointment', 'approved');