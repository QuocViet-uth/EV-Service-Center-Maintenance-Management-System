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
    battery_kwh DECIMAL NOT NULL,
    odometer_km INT NOT NULL,
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
    base_duration_minutes INT NOT NULL,
    base_price DECIMAL NOT NULL
);

CREATE TABLE ServicePackage (
    package_id UUID PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    price DECIMAL NOT NULL,
    duration_months INT NOT NULL,
    km_interval INT NOT NULL
);

CREATE TABLE Appointment (
    appointment_id UUID PRIMARY KEY,
    customer_id UUID REFERENCES Customer(customer_id) ON DELETE CASCADE,
    vehicle_id UUID REFERENCES Vehicle(vehicle_id) ON DELETE CASCADE,
    center_id UUID REFERENCES ServiceCenter(center_id) ON DELETE CASCADE,
    service_type_id UUID REFERENCES ServiceType(service_type_id) ON DELETE SET NULL,
    package_id UUID REFERENCES ServicePackage(package_id) ON DELETE SET NULL,
    scheduled_start TIMESTAMP NOT NULL,
    scheduled_end TIMESTAMP NOT NULL,
    status VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE WorkOrder (
    workorder_id UUID PRIMARY KEY,
    appointment_id UUID REFERENCES Appointment(appointment_id) ON DELETE CASCADE,
    assigned_by_staff_id UUID REFERENCES Staff(staff_id) ON DELETE SET NULL,
    assigned_tech_id UUID REFERENCES Staff(staff_id) ON DELETE SET NULL,
    status VARCHAR NOT NULL,
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
    required_flag BOOLEAN NOT NULL
);

CREATE TABLE ServiceChecklistRecord (
    record_id UUID PRIMARY KEY,
    workorder_id UUID REFERENCES WorkOrder(workorder_id) ON DELETE CASCADE,
    checklist_item_id UUID REFERENCES ChecklistItem(checklist_item_id) ON DELETE CASCADE,
    status VARCHAR NOT NULL,
    notes TEXT,
    checked_by_staff_id UUID REFERENCES Staff(staff_id) ON DELETE SET NULL,
    checked_at TIMESTAMP
);

CREATE TABLE Part (
    part_id UUID PRIMARY KEY,
    sku VARCHAR UNIQUE NOT NULL,
    name VARCHAR NOT NULL,
    description TEXT,
    unit_price DECIMAL NOT NULL,
    total_qty_on_hand INT NOT NULL
);

CREATE TABLE Inventory (
    inventory_id UUID PRIMARY KEY,
    center_id UUID REFERENCES ServiceCenter(center_id) ON DELETE CASCADE,
    part_id UUID REFERENCES Part(part_id) ON DELETE CASCADE,
    qty_on_hand INT NOT NULL,
    min_qty_threshold INT NOT NULL
);

CREATE TABLE PartUsage (
    usage_id UUID PRIMARY KEY,
    workorder_id UUID REFERENCES WorkOrder(workorder_id) ON DELETE CASCADE,
    part_id UUID REFERENCES Part(part_id) ON DELETE CASCADE,
    center_id UUID REFERENCES ServiceCenter(center_id) ON DELETE CASCADE,
    qty_used INT NOT NULL,
    unit_price DECIMAL NOT NULL,
    total_price DECIMAL NOT NULL
);

CREATE TABLE InventoryTxn (
    txn_id UUID PRIMARY KEY,
    inventory_id UUID REFERENCES Inventory(inventory_id) ON DELETE CASCADE,
    part_id UUID REFERENCES Part(part_id) ON DELETE CASCADE,
    center_id UUID REFERENCES ServiceCenter(center_id) ON DELETE CASCADE,
    change_qty INT NOT NULL,
    reason VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Invoice (
    invoice_id UUID PRIMARY KEY,
    workorder_id UUID REFERENCES WorkOrder(workorder_id) ON DELETE CASCADE,
    customer_id UUID REFERENCES Customer(customer_id) ON DELETE CASCADE,
    total_amount DECIMAL NOT NULL,
    tax DECIMAL NOT NULL,
    discount DECIMAL NOT NULL,
    status VARCHAR NOT NULL,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Payment (
    payment_id UUID PRIMARY KEY,
    invoice_id UUID REFERENCES Invoice(invoice_id) ON DELETE CASCADE,
    method VARCHAR NOT NULL,
    transaction_ref VARCHAR,
    amount DECIMAL NOT NULL,
    paid_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR NOT NULL
);

CREATE TABLE ChatMessage (
    chat_id UUID PRIMARY KEY,
    appointment_id UUID REFERENCES Appointment(appointment_id) ON DELETE CASCADE,
    from_customer_id UUID REFERENCES Customer(customer_id) ON DELETE SET NULL,
    from_staff_id UUID REFERENCES Staff(staff_id) ON DELETE SET NULL,
    message_text TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Notification (
    notification_id UUID PRIMARY KEY,
    target_type VARCHAR NOT NULL,
    target_id UUID NOT NULL,
    type VARCHAR NOT NULL,
    message TEXT NOT NULL,
    scheduled_at TIMESTAMP,
    sent_at TIMESTAMP,
    channel VARCHAR NOT NULL
);

CREATE TABLE AIRecommendation (
    rec_id UUID PRIMARY KEY,
    center_id UUID REFERENCES ServiceCenter(center_id) ON DELETE CASCADE,
    part_id UUID REFERENCES Part(part_id) ON DELETE CASCADE,
    suggested_min_stock INT NOT NULL,
    confidence_score DECIMAL NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);