INSERT INTO "Customer" (customer_id, full_name, email, phone, address, created_at, updated_at) VALUES
  (gen_random_uuid(), 'John Doe', 'john.doe@example.com', '1234567890', '123 Elm St, Springfield', NOW(), NOW()),
  (gen_random_uuid(), 'Jane Smith', 'jane.smith@example.com', '0987654321', '456 Oak St, Springfield', NOW(), NOW());

INSERT INTO "ServiceCenter" (center_id, name, address, phone, operating_hours, min_part_stock_threshold, created_at) VALUES
  (gen_random_uuid(), 'Springfield Service Center', '789 Maple St, Springfield', '555-1234', 'Mon-Fri 8am-5pm', 10, NOW());

INSERT INTO "ServiceType" (service_type_id, name, description, base_duration_minutes, base_price) VALUES
  (gen_random_uuid(), 'Oil Change', 'Change engine oil and filter', 30, 29.99),
  (gen_random_uuid(), 'Tire Rotation', 'Rotate tires for even wear', 45, 19.99);

INSERT INTO "ServicePackage" (package_id, name, description, price, duration_months, km_interval) VALUES
  (gen_random_uuid(), 'Basic Maintenance', 'Includes oil change and tire rotation', 49.99, 6, 5000),
  (gen_random_uuid(), 'Premium Maintenance', 'Includes all basic services plus brake inspection', 89.99, 12, 10000);

INSERT INTO "Part" (part_id, sku, name, description, unit_price, total_qty_on_hand) VALUES
  (gen_random_uuid(), 'ENG-OIL-001', 'Engine Oil', 'High-quality engine oil', 25.00, 100),
  (gen_random_uuid(), 'TIRE-ROT-001', 'Tire Rotation', 'Service for tire rotation', 15.00, 50);

INSERT INTO "ChecklistItem" (checklist_item_id, name, description, required_flag) VALUES
  (gen_random_uuid(), 'Check Oil Level', 'Ensure oil level is within recommended range', TRUE),
  (gen_random_uuid(), 'Inspect Tires', 'Check tire pressure and tread depth', TRUE);