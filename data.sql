USE evservice;

-- Seed one service center
INSERT INTO service_centers(name, address, phone_number, email, active) VALUES
('EV Service Center - HQ', '123 Main St', '+84 24 0000 0000', 'center@example.com', 1);

-- Seed one customer user
INSERT INTO users(user_type, username, email, password, full_name, phone_number, address, active, created_at, updated_at)
VALUES ('CUSTOMER','customer1','customer1@example.com','$2a$10$k2xwH2o5qVQb1','Customer One','0909000001','Hanoi',1, NOW(), NOW());

-- Attach a vehicle
INSERT INTO vehicles(vin, model, brand, year, color, license_plate, current_mileage, user_id, created_at, updated_at)
VALUES ('VIN0000000001','VF5','VinFast',2023,'Red','30A-12345',12000, 1, NOW(), NOW());

-- Simple appointment
INSERT INTO service_appointments(customer_id, vehicle_id, service_center_id, service_type, scheduled_date_time, status, created_at, updated_at)
VALUES (1,1,1,'MAINTENANCE', DATE_ADD(NOW(), INTERVAL 3 DAY), 'PENDING', NOW(), NOW());

