-- Schema for EVService (MySQL). Matches JPA entities (Long ID auto-increment)
CREATE DATABASE IF NOT EXISTS evservice CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE evservice;

-- USERS (single-table inheritance via discriminator column user_type)
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS service_parts_usage;
DROP TABLE IF EXISTS parts;
DROP TABLE IF EXISTS service_records;
DROP TABLE IF EXISTS service_appointments;
DROP TABLE IF EXISTS technician_schedules;
DROP TABLE IF EXISTS maintenance_reminders;
DROP TABLE IF EXISTS chat_messages;
DROP TABLE IF EXISTS vehicles;
DROP TABLE IF EXISTS service_centers;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_type VARCHAR(50) NOT NULL,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  phone_number VARCHAR(50) NOT NULL,
  address VARCHAR(255),
  active TINYINT(1) DEFAULT 1,
  created_at DATETIME,
  updated_at DATETIME
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE service_centers (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  phone_number VARCHAR(50),
  email VARCHAR(150),
  active TINYINT(1) DEFAULT 1
) ENGINE=InnoDB;

CREATE TABLE vehicles (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  vin VARCHAR(100) NOT NULL UNIQUE,
  model VARCHAR(150) NOT NULL,
  brand VARCHAR(150) NOT NULL,
  year INT NOT NULL,
  color VARCHAR(50),
  license_plate VARCHAR(50),
  current_mileage INT,
  last_maintenance_mileage INT,
  last_maintenance_date DATE,
  maintenance_interval_km INT,
  maintenance_interval_days INT,
  service_package_expiry DATE,
  user_id BIGINT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  CONSTRAINT fk_vehicle_user FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE service_appointments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  customer_id BIGINT NOT NULL,
  vehicle_id BIGINT NOT NULL,
  service_center_id BIGINT NOT NULL,
  technician_id BIGINT NULL,
  service_type VARCHAR(50) NOT NULL,
  scheduled_date_time DATETIME NOT NULL,
  description TEXT,
  customer_notes TEXT,
  status VARCHAR(50) NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  CONSTRAINT fk_app_customer FOREIGN KEY (customer_id) REFERENCES users(id),
  CONSTRAINT fk_app_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
  CONSTRAINT fk_app_center FOREIGN KEY (service_center_id) REFERENCES service_centers(id),
  CONSTRAINT fk_app_technician FOREIGN KEY (technician_id) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE service_records (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  appointment_id BIGINT NOT NULL UNIQUE,
  vehicle_id BIGINT NOT NULL,
  mileage_at_service INT,
  vehicle_condition TEXT,
  work_performed TEXT,
  notes TEXT,
  battery_check VARCHAR(255),
  motor_check VARCHAR(255),
  charging_system_check VARCHAR(255),
  other_checks TEXT,
  start_time DATETIME,
  end_time DATETIME,
  created_at DATETIME,
  updated_at DATETIME,
  CONSTRAINT fk_record_app FOREIGN KEY (appointment_id) REFERENCES service_appointments(id),
  CONSTRAINT fk_record_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
) ENGINE=InnoDB;

CREATE TABLE parts (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  part_code VARCHAR(100) UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  manufacturer VARCHAR(150),
  quantity_in_stock INT DEFAULT 0,
  minimum_stock_level INT DEFAULT 0,
  unit_price DECIMAL(12,2) DEFAULT 0,
  ai_suggested_stock_level INT,
  service_center_id BIGINT,
  CONSTRAINT fk_parts_center FOREIGN KEY (service_center_id) REFERENCES service_centers(id)
) ENGINE=InnoDB;

CREATE TABLE service_parts_usage (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  service_record_id BIGINT NOT NULL,
  parts_id BIGINT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(12,2) DEFAULT 0,
  CONSTRAINT fk_usage_record FOREIGN KEY (service_record_id) REFERENCES service_records(id),
  CONSTRAINT fk_usage_parts FOREIGN KEY (parts_id) REFERENCES parts(id)
) ENGINE=InnoDB;

CREATE TABLE invoices (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  invoice_number VARCHAR(64) UNIQUE,
  service_record_id BIGINT NOT NULL UNIQUE,
  customer_id BIGINT NOT NULL,
  service_fee DECIMAL(12,2),
  parts_total DECIMAL(12,2),
  labor_cost DECIMAL(12,2),
  discount DECIMAL(12,2),
  tax DECIMAL(12,2),
  total_amount DECIMAL(12,2),
  payment_status VARCHAR(50),
  created_at DATETIME,
  updated_at DATETIME,
  CONSTRAINT fk_invoice_record FOREIGN KEY (service_record_id) REFERENCES service_records(id),
  CONSTRAINT fk_invoice_customer FOREIGN KEY (customer_id) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE payments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  transaction_id VARCHAR(64) UNIQUE,
  invoice_id BIGINT NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  status VARCHAR(50),
  payment_reference VARCHAR(255),
  payment_provider VARCHAR(100),
  paid_at DATETIME,
  created_at DATETIME,
  updated_at DATETIME,
  CONSTRAINT fk_payment_invoice FOREIGN KEY (invoice_id) REFERENCES invoices(id)
) ENGINE=InnoDB;

CREATE TABLE maintenance_reminders (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  vehicle_id BIGINT,
  reminder_type VARCHAR(50) NOT NULL,
  title VARCHAR(255),
  message TEXT,
  reminder_date_time DATETIME,
  sent TINYINT(1) DEFAULT 0,
  sent_at DATETIME,
  active TINYINT(1) DEFAULT 1,
  CONSTRAINT fk_rem_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_rem_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
) ENGINE=InnoDB;

CREATE TABLE chat_messages (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  sender_id BIGINT,
  receiver_id BIGINT,
  appointment_id BIGINT,
  message TEXT,
  is_read TINYINT(1) DEFAULT 0,
  CONSTRAINT fk_chat_sender FOREIGN KEY (sender_id) REFERENCES users(id),
  CONSTRAINT fk_chat_receiver FOREIGN KEY (receiver_id) REFERENCES users(id),
  CONSTRAINT fk_chat_appt FOREIGN KEY (appointment_id) REFERENCES service_appointments(id)
) ENGINE=InnoDB;

CREATE TABLE technician_schedules (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  technician_id BIGINT NOT NULL,
  work_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  shift_type VARCHAR(50),
  available TINYINT(1) DEFAULT 1,
  CONSTRAINT fk_sched_tech FOREIGN KEY (technician_id) REFERENCES users(id)
) ENGINE=InnoDB;

-- indexes
CREATE INDEX idx_vehicle_user ON vehicles(user_id);
CREATE INDEX idx_appt_customer ON service_appointments(customer_id);
CREATE INDEX idx_appt_center ON service_appointments(service_center_id);
CREATE INDEX idx_record_vehicle ON service_records(vehicle_id);

