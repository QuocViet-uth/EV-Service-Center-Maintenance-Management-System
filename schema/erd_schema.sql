CREATE TABLE Customer (
    customer_id UUID PRIMARY KEY,
    full_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone VARCHAR,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Vehicle (
    vehicle_id UUID PRIMARY KEY,
    vin VARCHAR UNIQUE NOT NULL,
    customer_id UUID REFERENCES Customer(customer_id) ON DELETE CASCADE,
    make VARCHAR NOT NULL,
    model VARCHAR NOT NULL,
    year INT NOT NULL,
    battery_kwh DECIMAL,
    odometer_km INT,
    registration_no VARCHAR,
    purchase_date DATE,
    warranty_expiry DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ServiceCenter (
    center_id UUID PRIMARY KEY,
    name VARCHAR NOT NULL,
    address TEXT,
    phone VARCHAR,
    operating_hours TEXT,
    min_part_stock_threshold INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Staff (
    staff_id UUID PRIMARY KEY,
    center_id UUID REFERENCES ServiceCenter(center_id) ON DELETE CASCADE,
    role VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    email VARCHAR,
    phone VARCHAR,
    password_hash VARCHAR NOT NULL,
    hire_date DATE,
    active_flag BOOLEAN DEFAULT TRUE
);

CREATE TABLE Certification (
    cert_id UUID PRIMARY KEY,
    staff_id UUID REFERENCES Staff(staff_id) ON DELETE CASCADE,
    cert_name VARCHAR NOT NULL,
    provider VARCHAR NOT NULL,
    valid_from DATE,
    valid_to DATE,
    document_url VARCHAR
);

CREATE TABLE ServiceType (
    service_type_id UUID PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    base_duration_minutes INT,
    base_price DECIMAL
);

CREATE TABLE ServicePackage (
    package_id UUID PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    price DECIMAL,
    duration_months INT,
    km_interval INT
);

CREATE TABLE Appointment (
    appointment_id UUID PRIMARY KEY,
    customer_id UUID REFERENCES Customer(customer_id) ON DELETE CASCADE,
    vehicle_id UUID REFERENCES Vehicle(vehicle_id) ON DELETE CASCADE,
    center_id UUID REFERENCES ServiceCenter(center_id) ON DELETE CASCADE,
    service_type_id UUID REFERENCES ServiceType(service_type_id) ON DELETE SET NULL,
    package_id UUID REFERENCES ServicePackage(package_id) ON DELETE SET NULL,
    scheduled_start TIMESTAMP,
    scheduled_end TIMESTAMP,
    status VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE WorkOrder (
    workorder_id UUID PRIMARY KEY,
    appointment_id UUID REFERENCES Appointment(appointment_id) ON DELETE CASCADE,
    assigned_by_staff_id UUID REFERENCES Staff(staff_id) ON DELETE SET NULL,
    assigned_tech_id UUID REFERENCES Staff(staff_id) ON DELETE SET NULL,
    status VARCHAR,
    estimated_hours DECIMAL,
    actual_hours DECIMAL,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    notes TEXT
);

CREATE TABLE ChecklistItem (
    checklist_item_id UUID PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    required_flag BOOLEAN DEFAULT TRUE
);

CREATE TABLE ServiceChecklistRecord (
    record_id UUID PRIMARY KEY,
    workorder_id UUID REFERENCES WorkOrder(workorder_id) ON DELETE CASCADE,
    checklist_item_id UUID REFERENCES ChecklistItem(checklist_item_id) ON DELETE CASCADE,
    status VARCHAR,
    notes TEXT,
    checked_by_staff_id UUID REFERENCES Staff(staff_id) ON DELETE SET NULL,
    checked_at TIMESTAMP
);

CREATE TABLE Part (
    part_id UUID PRIMARY KEY,
    sku VARCHAR UNIQUE NOT NULL,
    name VARCHAR NOT NULL,
    description TEXT,
    unit_price DECIMAL,
    total_qty_on_hand INT
);

CREATE TABLE Inventory (
    inventory_id UUID PRIMARY KEY,
    center_id UUID REFERENCES ServiceCenter(center_id) ON DELETE CASCADE,
    part_id UUID REFERENCES Part(part_id) ON DELETE CASCADE,
    qty_on_hand INT,
    min_qty_threshold INT
);

CREATE TABLE PartUsage (
    usage_id UUID PRIMARY KEY,
    workorder_id UUID REFERENCES WorkOrder(workorder_id) ON DELETE CASCADE,
    part_id UUID REFERENCES Part(part_id) ON DELETE CASCADE,
    center_id UUID REFERENCES ServiceCenter(center_id) ON DELETE CASCADE,
    qty_used INT,
    unit_price DECIMAL,
    total_price DECIMAL
);

CREATE TABLE InventoryTxn (
    txn_id UUID PRIMARY KEY,
    inventory_id UUID REFERENCES Inventory(inventory_id) ON DELETE CASCADE,
    part_id UUID REFERENCES Part(part_id) ON DELETE CASCADE,
    center_id UUID REFERENCES ServiceCenter(center_id) ON DELETE CASCADE,
    change_qty INT,
    reason VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Invoice (
    invoice_id UUID PRIMARY KEY,
    workorder_id UUID REFERENCES WorkOrder(workorder_id) ON DELETE CASCADE,
    customer_id UUID REFERENCES Customer(customer_id) ON DELETE CASCADE,
    total_amount DECIMAL,
    tax DECIMAL,
    discount DECIMAL,
    status VARCHAR,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Payment (
    payment_id UUID PRIMARY KEY,
    invoice_id UUID REFERENCES Invoice(invoice_id) ON DELETE CASCADE,
    method VARCHAR,
    transaction_ref VARCHAR,
    amount DECIMAL,
    paid_at TIMESTAMP,
    status VARCHAR
);

CREATE TABLE ChatMessage (
    chat_id UUID PRIMARY KEY,
    appointment_id UUID REFERENCES Appointment(appointment_id) ON DELETE CASCADE,
    from_customer_id UUID REFERENCES Customer(customer_id) ON DELETE SET NULL,
    from_staff_id UUID REFERENCES Staff(staff_id) ON DELETE SET NULL,
    message_text TEXT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Notification (
    notification_id UUID PRIMARY KEY,
    target_type VARCHAR,
    target_id UUID,
    type VARCHAR,
    message TEXT,
    scheduled_at TIMESTAMP,
    sent_at TIMESTAMP,
    channel VARCHAR
);

CREATE TABLE AIRecommendation (
    rec_id UUID PRIMARY KEY,
    center_id UUID REFERENCES ServiceCenter(center_id) ON DELETE CASCADE,
    part_id UUID REFERENCES Part(part_id) ON DELETE CASCADE,
    suggested_min_stock INT,
    confidence_score DECIMAL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);