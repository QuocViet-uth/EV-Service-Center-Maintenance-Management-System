INSERT INTO "Customer" (customer_id, full_name, email, phone, address, created_at, updated_at) VALUES
  (gen_random_uuid(), 'John Doe', 'john.doe@example.com', '123-456-7890', '123 Elm St, Springfield, IL', NOW(), NOW()),
  (gen_random_uuid(), 'Jane Smith', 'jane.smith@example.com', '987-654-3210', '456 Oak St, Springfield, IL', NOW(), NOW());

INSERT INTO "Vehicle" (vehicle_id, vin, customer_id, make, model, year, battery_kwh, odometer_km, registration_no, purchase_date, warranty_expiry, created_at) VALUES
  (gen_random_uuid(), '1HGCM82633A123456', (SELECT customer_id FROM "Customer" WHERE email = 'john.doe@example.com'), 'Honda', 'Accord', 2020, 60.0, 15000, 'ABC123', '2020-01-15', '2023-01-15', NOW()),
  (gen_random_uuid(), '1HGCM82633A654321', (SELECT customer_id FROM "Customer" WHERE email = 'jane.smith@example.com'), 'Toyota', 'Camry', 2021, 55.0, 10000, 'XYZ789', '2021-03-20', '2024-03-20', NOW());

INSERT INTO "ServiceCenter" (center_id, name, address, phone, operating_hours, min_part_stock_threshold, created_at) VALUES
  (gen_random_uuid(), 'Springfield Auto Service', '789 Maple St, Springfield, IL', '555-123-4567', 'Mon-Fri 8am-6pm', 10, NOW());

INSERT INTO "Staff" (staff_id, center_id, role, name, email, phone, password_hash, hire_date, active_flag) VALUES
  (gen_random_uuid(), (SELECT center_id FROM "ServiceCenter" WHERE name = 'Springfield Auto Service'), 'Technician', 'Alice Johnson', 'alice.johnson@example.com', '555-987-6543', 'hashed_password_1', '2022-01-10', TRUE),
  (gen_random_uuid(), (SELECT center_id FROM "ServiceCenter" WHERE name = 'Springfield Auto Service'), 'Manager', 'Bob Brown', 'bob.brown@example.com', '555-654-3210', 'hashed_password_2', '2021-05-15', TRUE);

INSERT INTO "ServiceType" (service_type_id, name, description, base_duration_minutes, base_price) VALUES
  (gen_random_uuid(), 'Oil Change', 'Change engine oil and filter', 30, 29.99),
  (gen_random_uuid(), 'Tire Rotation', 'Rotate tires for even wear', 45, 19.99);

INSERT INTO "ServicePackage" (package_id, name, description, price, duration_months, km_interval) VALUES
  (gen_random_uuid(), 'Basic Maintenance', 'Includes oil change and tire rotation', 49.99, 6, 10000);

INSERT INTO "Appointment" (appointment_id, customer_id, vehicle_id, center_id, service_type_id, package_id, scheduled_start, scheduled_end, status, created_at, updated_at) VALUES
  (gen_random_uuid(), (SELECT customer_id FROM "Customer" WHERE email = 'john.doe@example.com'), (SELECT vehicle_id FROM "Vehicle" WHERE vin = '1HGCM82633A123456'), (SELECT center_id FROM "ServiceCenter" WHERE name = 'Springfield Auto Service'), (SELECT service_type_id FROM "ServiceType" WHERE name = 'Oil Change'), (SELECT package_id FROM "ServicePackage" WHERE name = 'Basic Maintenance'), NOW() + INTERVAL '1 day', NOW() + INTERVAL '1 day' + INTERVAL '30 minutes', 'Scheduled', NOW(), NOW());

INSERT INTO "Part" (part_id, sku, name, description, unit_price, total_qty_on_hand) VALUES
  (gen_random_uuid(), 'PART001', 'Oil Filter', 'High-quality oil filter', 5.99, 100),
  (gen_random_uuid(), 'PART002', 'Engine Oil', 'Synthetic engine oil', 25.00, 50);

INSERT INTO "Inventory" (inventory_id, center_id, part_id, qty_on_hand, min_qty_threshold) VALUES
  (gen_random_uuid(), (SELECT center_id FROM "ServiceCenter" WHERE name = 'Springfield Auto Service'), (SELECT part_id FROM "Part" WHERE sku = 'PART001'), 50, 10),
  (gen_random_uuid(), (SELECT center_id FROM "ServiceCenter" WHERE name = 'Springfield Auto Service'), (SELECT part_id FROM "Part" WHERE sku = 'PART002'), 30, 5);