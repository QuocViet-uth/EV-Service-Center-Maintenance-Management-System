# Database Documentation

## Overview

This document provides an overview of the database design for the Electric Vehicle Service Management System. It outlines the schema, relationships, and key design decisions made during the development of the database.

## Database Schema

The database is designed to manage various entities related to electric vehicle services, including customers, vehicles, service centers, staff, appointments, work orders, and more. The schema is based on the Entity-Relationship Diagram (ERD) provided in the project.

### Entities and Attributes

1. **Customer**
   - `customer_id`: UUID (Primary Key)
   - `full_name`: varchar
   - `email`: varchar
   - `phone`: varchar
   - `address`: text
   - `created_at`: datetime
   - `updated_at`: datetime

2. **Vehicle**
   - `vehicle_id`: UUID (Primary Key)
   - `vin`: varchar (Unique)
   - `customer_id`: UUID (Foreign Key)
   - `make`: varchar
   - `model`: varchar
   - `year`: int
   - `battery_kwh`: decimal
   - `odometer_km`: int
   - `registration_no`: varchar
   - `purchase_date`: date
   - `warranty_expiry`: date
   - `created_at`: datetime

3. **ServiceCenter**
   - `center_id`: UUID (Primary Key)
   - `name`: varchar
   - `address`: text
   - `phone`: varchar
   - `operating_hours`: text
   - `min_part_stock_threshold`: int
   - `created_at`: datetime

4. **Staff**
   - `staff_id`: UUID (Primary Key)
   - `center_id`: UUID (Foreign Key)
   - `role`: varchar
   - `name`: varchar
   - `email`: varchar
   - `phone`: varchar
   - `password_hash`: varchar
   - `hire_date`: date
   - `active_flag`: boolean

5. **Certification**
   - `cert_id`: UUID (Primary Key)
   - `staff_id`: UUID (Foreign Key)
   - `cert_name`: varchar
   - `provider`: varchar
   - `valid_from`: date
   - `valid_to`: date
   - `document_url`: varchar

6. **ServiceType**
   - `service_type_id`: UUID (Primary Key)
   - `name`: varchar
   - `description`: text
   - `base_duration_minutes`: int
   - `base_price`: decimal

7. **ServicePackage**
   - `package_id`: UUID (Primary Key)
   - `name`: varchar
   - `description`: text
   - `price`: decimal
   - `duration_months`: int
   - `km_interval`: int

8. **Appointment**
   - `appointment_id`: UUID (Primary Key)
   - `customer_id`: UUID (Foreign Key)
   - `vehicle_id`: UUID (Foreign Key)
   - `center_id`: UUID (Foreign Key)
   - `service_type_id`: UUID (Foreign Key)
   - `package_id`: UUID (Foreign Key)
   - `scheduled_start`: datetime
   - `scheduled_end`: datetime
   - `status`: varchar
   - `created_at`: datetime
   - `updated_at`: datetime

9. **WorkOrder**
   - `workorder_id`: UUID (Primary Key)
   - `appointment_id`: UUID (Foreign Key)
   - `assigned_by_staff_id`: UUID (Foreign Key)
   - `assigned_tech_id`: UUID (Foreign Key)
   - `status`: varchar
   - `estimated_hours`: decimal
   - `actual_hours`: decimal
   - `started_at`: datetime
   - `completed_at`: datetime
   - `notes`: text

10. **ChecklistItem**
    - `checklist_item_id`: UUID (Primary Key)
    - `name`: varchar
    - `description`: text
    - `required_flag`: boolean

11. **ServiceChecklistRecord**
    - `record_id`: UUID (Primary Key)
    - `workorder_id`: UUID (Foreign Key)
    - `checklist_item_id`: UUID (Foreign Key)
    - `status`: varchar
    - `notes`: text
    - `checked_by_staff_id`: UUID (Foreign Key)
    - `checked_at`: datetime

12. **Part**
    - `part_id`: UUID (Primary Key)
    - `sku`: varchar (Unique)
    - `name`: varchar
    - `description`: text
    - `unit_price`: decimal
    - `total_qty_on_hand`: int

13. **Inventory**
    - `inventory_id`: UUID (Primary Key)
    - `center_id`: UUID (Foreign Key)
    - `part_id`: UUID (Foreign Key)
    - `qty_on_hand`: int
    - `min_qty_threshold`: int

14. **PartUsage**
    - `usage_id`: UUID (Primary Key)
    - `workorder_id`: UUID (Foreign Key)
    - `part_id`: UUID (Foreign Key)
    - `center_id`: UUID (Foreign Key)
    - `qty_used`: int
    - `unit_price`: decimal
    - `total_price`: decimal

15. **InventoryTxn**
    - `txn_id`: UUID (Primary Key)
    - `inventory_id`: UUID (Foreign Key)
    - `part_id`: UUID (Foreign Key)
    - `center_id`: UUID (Foreign Key)
    - `change_qty`: int
    - `reason`: varchar
    - `created_at`: datetime

16. **Invoice**
    - `invoice_id`: UUID (Primary Key)
    - `workorder_id`: UUID (Foreign Key)
    - `customer_id`: UUID (Foreign Key)
    - `total_amount`: decimal
    - `tax`: decimal
    - `discount`: decimal
    - `status`: varchar
    - `issued_at`: datetime

17. **Payment**
    - `payment_id`: UUID (Primary Key)
    - `invoice_id`: UUID (Foreign Key)
    - `method`: varchar
    - `transaction_ref`: varchar
    - `amount`: decimal
    - `paid_at`: datetime
    - `status`: varchar

18. **ChatMessage**
    - `chat_id`: UUID (Primary Key)
    - `appointment_id`: UUID (Foreign Key)
    - `from_customer_id`: UUID (Foreign Key)
    - `from_staff_id`: UUID (Foreign Key)
    - `message_text`: text
    - `sent_at`: datetime

19. **Notification**
    - `notification_id`: UUID (Primary Key)
    - `target_type`: varchar
    - `target_id`: UUID
    - `type`: varchar
    - `message`: text
    - `scheduled_at`: datetime
    - `sent_at`: datetime
    - `channel`: varchar

20. **AIRecommendation**
    - `rec_id`: UUID (Primary Key)
    - `center_id`: UUID (Foreign Key)
    - `part_id`: UUID (Foreign Key)
    - `suggested_min_stock`: int
    - `confidence_score`: decimal
    - `generated_at`: datetime
    - `notes`: text

## Relationships

- A **Customer** can own multiple **Vehicles**.
- A **Customer** can create multiple **Appointments**.
- A **Vehicle** can have multiple **Appointments**.
- A **ServiceCenter** employs multiple **Staff** members.
- An **Appointment** can create multiple **WorkOrders**.
- A **WorkOrder** can contain multiple **ServiceChecklistRecords**.
- A **WorkOrder** can use multiple **Parts**.
- A **Part** can be stocked in multiple **Inventories**.
- An **Inventory** can have multiple **InventoryTxns**.
- A **WorkOrder** generates an **Invoice**.
- An **Invoice** can have multiple **Payments**.
- An **Appointment** can have multiple **ChatMessages**.
- A **ServiceCenter** can hold multiple **Inventories**.
- A **Staff** member can hold multiple **Certifications**.
- A **ServiceCenter** can receive multiple **AIRecommendations**.

## Design Decisions

- The use of UUIDs as primary keys ensures uniqueness across distributed systems.
- Foreign key relationships are established to maintain data integrity and enforce referential constraints.
- The schema is designed to be extensible, allowing for future enhancements and additional features.

## Usage Instructions

To set up the database, follow these steps:

1. Ensure Docker is installed on your machine.
2. Navigate to the project directory.
3. Run `docker-compose up` to start the PostgreSQL and pgAdmin services.
4. Access pgAdmin at `http://localhost:8080` to manage the database.
5. Use the provided SQL scripts in the `docker/postgres/init` directory to initialize the database schema and seed data.

For further details, refer to the individual SQL scripts and migration files located in the `sql` directory.