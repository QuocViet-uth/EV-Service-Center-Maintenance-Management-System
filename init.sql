-- Database schema for EV Service Center Maintenance Management System
-- Based on the class diagram provided

-- Extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Roles types
CREATE TYPE user_role AS ENUM ('customer', 'staff', 'technician', 'admin');

-- Users base table
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    role user_role NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customers table (implements Customer class)
CREATE TABLE customers (
    customer_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicles table (implements Vehicle class)
CREATE TABLE vehicles (
    vehicle_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES customers(customer_id) ON DELETE CASCADE,
    model VARCHAR(100) NOT NULL,
    vin VARCHAR(17) UNIQUE NOT NULL,
    mileage INTEGER NOT NULL DEFAULT 0,
    year INTEGER,
    last_service_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Service centers
CREATE TABLE service_centers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(255) NOT NULL,
  address text,
  city varchar(128),
  phone varchar(50),
  timezone varchar(64) DEFAULT 'UTC',
  created_at timestamptz DEFAULT now()
);

-- Technicians & Staff records
CREATE TABLE staff_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  service_center_id uuid REFERENCES service_centers(id) ON DELETE SET NULL,
  is_technician boolean DEFAULT false,
  employment_started date,
  hourly_rate numeric(10,2),
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Certifications for technicians
CREATE TABLE certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id uuid REFERENCES staff_profiles(id) ON DELETE CASCADE,
  name varchar(255) NOT NULL,
  issuer varchar(255),
  valid_from date,
  valid_to date,
  notes text
);

-- Vehicles
CREATE TABLE vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  vin varchar(64) UNIQUE,
  make varchar(128),
  model varchar(128),
  year int,
  battery_kwh numeric(8,2),
  odometer_km bigint DEFAULT 0,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Services catalog (types of service offered)
CREATE TABLE services_catalog (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(255) NOT NULL,
  code varchar(64) UNIQUE,
  description text,
  base_price numeric(12,2) DEFAULT 0,
  estimated_minutes int DEFAULT 30,
  created_at timestamptz DEFAULT now()
);

-- Appointment status enum represented as a lookup table
CREATE TABLE appointment_statuses (
  code varchar(32) PRIMARY KEY,
  description text
);

INSERT INTO appointment_statuses(code, description) VALUES
('pending','Waiting for confirmation'),
('scheduled','Scheduled'),
('in_progress','Currently being serviced'),
('completed','Service completed'),
('cancelled','Cancelled')
ON CONFLICT DO NOTHING;

-- Appointments / Bookings
CREATE TABLE appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  vehicle_id uuid REFERENCES vehicles(id) ON DELETE SET NULL,
  service_center_id uuid REFERENCES service_centers(id) ON DELETE SET NULL,
  service_catalog_id uuid REFERENCES services_catalog(id) ON DELETE SET NULL,
  requested_at timestamptz DEFAULT now(),
  scheduled_at timestamptz,
  status_code varchar(32) REFERENCES appointment_statuses(code) DEFAULT 'pending',
  assigned_staff_id uuid REFERENCES staff_profiles(id),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Service orders (actual service instance when work is done)
CREATE TABLE service_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id uuid UNIQUE REFERENCES appointments(id) ON DELETE CASCADE,
  status varchar(32) DEFAULT 'open',
  total_amount numeric(12,2) DEFAULT 0,
  started_at timestamptz,
  finished_at timestamptz,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Items / service lines in an order
CREATE TABLE service_order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_order_id uuid REFERENCES service_orders(id) ON DELETE CASCADE,
  service_catalog_id uuid REFERENCES services_catalog(id) ON DELETE SET NULL,
  description text,
  unit_price numeric(12,2) DEFAULT 0,
  quantity int DEFAULT 1
);

-- Parts / spare items
CREATE TABLE parts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sku varchar(64) UNIQUE,
  name varchar(255) NOT NULL,
  description text,
  unit_price numeric(12,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Inventory per service center
CREATE TABLE inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_center_id uuid REFERENCES service_centers(id) ON DELETE CASCADE,
  part_id uuid REFERENCES parts(id) ON DELETE CASCADE,
  quantity int DEFAULT 0,
  min_quantity int DEFAULT 0,
  last_updated timestamptz DEFAULT now(),
  UNIQUE(service_center_id, part_id)
);

-- Parts used in a service order
CREATE TABLE parts_replacements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_order_id uuid REFERENCES service_orders(id) ON DELETE CASCADE,
  part_id uuid REFERENCES parts(id) ON DELETE SET NULL,
  quantity int DEFAULT 1,
  unit_price numeric(12,2) DEFAULT 0
);

-- Service checklist templates
CREATE TABLE checklists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_catalog_id uuid REFERENCES services_catalog(id) ON DELETE CASCADE,
  item_order int,
  description text,
  required boolean DEFAULT true
);

-- Checklist per service order (records status)
CREATE TABLE checklist_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_order_id uuid REFERENCES service_orders(id) ON DELETE CASCADE,
  checklist_id uuid REFERENCES checklists(id) ON DELETE SET NULL,
  status varchar(32) DEFAULT 'pending',
  notes text
);

-- Invoices and payments
CREATE TABLE invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_order_id uuid UNIQUE REFERENCES service_orders(id) ON DELETE CASCADE,
  invoice_number varchar(64) UNIQUE NOT NULL,
  total_amount numeric(12,2) DEFAULT 0,
  issued_at timestamptz DEFAULT now(),
  status varchar(32) DEFAULT 'unpaid'
);

CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id uuid REFERENCES invoices(id) ON DELETE CASCADE,
  amount numeric(12,2) NOT NULL,
  method varchar(64),
  transaction_reference varchar(255),
  paid_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Reminders (periodic maintenance / payment reminders)
CREATE TABLE reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  vehicle_id uuid REFERENCES vehicles(id) ON DELETE CASCADE,
  type varchar(32), -- 'km'|'time'|'renewal'
  trigger_km bigint,
  next_date timestamptz,
  message text,
  sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Chat messages between users (lightweight)
CREATE TABLE chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  to_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  appointment_id uuid REFERENCES appointments(id) ON DELETE SET NULL,
  message text,
  created_at timestamptz DEFAULT now()
);

-- Simple audit log for important actions
CREATE TABLE audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  object_type varchar(128),
  object_id uuid,
  action varchar(64),
  details jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_vehicles_customer ON vehicles(customer_id);
CREATE INDEX IF NOT EXISTS idx_appointments_customer ON appointments(customer_id);
CREATE INDEX IF NOT EXISTS idx_inventory_center_part ON inventory(service_center_id, part_id);

-- Minimal seed data: roles, a sample service center, services, one user, customer, vehicle
INSERT INTO roles(name, description) VALUES
('customer','End customer/vehicle owner'),
('staff','Service center staff'),
('technician','Technician'),
('admin','Administrator')
ON CONFLICT DO NOTHING;

-- Sample service center
INSERT INTO service_centers(id, name, address, city, phone) VALUES
 (gen_random_uuid(), 'EV Service Center - Central', '123 Main St', 'Hanoi', '+84 24 0000 0000')
ON CONFLICT DO NOTHING;

-- Sample services
INSERT INTO services_catalog(name, code, description, base_price, estimated_minutes)
VALUES
 ('Basic Checkup','CHK_BASIC','Battery check, brakes, lights, basic diagnostics', 30.00, 45),
 ('Full Service','SRV_FULL','Full maintenance including battery inspection and software update', 120.00, 180),
 ('Battery Health Check','BAT_HEALTH','Detailed battery capacity and cell balance test', 60.00, 60)
ON CONFLICT DO NOTHING;

-- Sample user/customer
INSERT INTO users(full_name, email, phone, role_id)
SELECT 'Nguyen Van A', 'nva@example.com', '+84123456789', id FROM roles WHERE name='customer'
ON CONFLICT DO NOTHING;

-- Customer record for that user
INSERT INTO customers(user_id, address, preferred_payment)
SELECT u.id, 'Hanoi, Vietnam', '{"method":"e-wallet"}'::jsonb FROM users u WHERE u.email='nva@example.com'
ON CONFLICT DO NOTHING;

-- Sample vehicle
INSERT INTO vehicles(customer_id, vin, make, model, year, battery_kwh, odometer_km)
SELECT c.id, 'VIN1234567890', 'VinFast', 'VF e34', 2022, 42.0, 10500 FROM customers c
LIMIT 1
ON CONFLICT DO NOTHING;

-- Sample appointment
INSERT INTO appointments(customer_id, vehicle_id, service_center_id, service_catalog_id, scheduled_at, status_code, notes)
SELECT c.id, v.id, sc.id, s.id, now() + interval '3 days', 'scheduled', 'Customer requested morning slot'
FROM customers c
JOIN vehicles v ON v.customer_id = c.id
JOIN service_centers sc ON true LIMIT 1
JOIN services_catalog s ON true LIMIT 1
ON CONFLICT DO NOTHING;

-- End of init
