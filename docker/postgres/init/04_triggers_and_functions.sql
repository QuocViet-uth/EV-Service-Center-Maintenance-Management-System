CREATE OR REPLACE FUNCTION update_vehicle_odometer()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.odometer_km < OLD.odometer_km THEN
        RAISE EXCEPTION 'New odometer value cannot be less than the old value';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER vehicle_odometer_check
BEFORE UPDATE ON Vehicle
FOR EACH ROW
EXECUTE FUNCTION update_vehicle_odometer();

CREATE OR REPLACE FUNCTION log_workorder_status_change()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO WorkOrderStatusLog (workorder_id, old_status, new_status, changed_at)
    VALUES (OLD.workorder_id, OLD.status, NEW.status, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER workorder_status_change
AFTER UPDATE ON WorkOrder
FOR EACH ROW
WHEN (OLD.status IS DISTINCT FROM NEW.status)
EXECUTE FUNCTION log_workorder_status_change();