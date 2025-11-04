ALTER TABLE "Vehicle" 
  ADD CONSTRAINT "fk_vehicle_customer" 
  FOREIGN KEY ("customer_id") 
  REFERENCES "Customer" ("customer_id") 
  ON DELETE CASCADE;

ALTER TABLE "Appointment" 
  ADD CONSTRAINT "fk_appointment_customer" 
  FOREIGN KEY ("customer_id") 
  REFERENCES "Customer" ("customer_id") 
  ON DELETE CASCADE;

ALTER TABLE "Appointment" 
  ADD CONSTRAINT "fk_appointment_vehicle" 
  FOREIGN KEY ("vehicle_id") 
  REFERENCES "Vehicle" ("vehicle_id") 
  ON DELETE CASCADE;

ALTER TABLE "Appointment" 
  ADD CONSTRAINT "fk_appointment_service_center" 
  FOREIGN KEY ("center_id") 
  REFERENCES "ServiceCenter" ("center_id") 
  ON DELETE CASCADE;

ALTER TABLE "WorkOrder" 
  ADD CONSTRAINT "fk_workorder_appointment" 
  FOREIGN KEY ("appointment_id") 
  REFERENCES "Appointment" ("appointment_id") 
  ON DELETE CASCADE;

ALTER TABLE "WorkOrder" 
  ADD CONSTRAINT "fk_workorder_assigned_by" 
  FOREIGN KEY ("assigned_by_staff_id") 
  REFERENCES "Staff" ("staff_id") 
  ON DELETE SET NULL;

ALTER TABLE "WorkOrder" 
  ADD CONSTRAINT "fk_workorder_assigned_tech" 
  FOREIGN KEY ("assigned_tech_id") 
  REFERENCES "Staff" ("staff_id") 
  ON DELETE SET NULL;

ALTER TABLE "ServiceChecklistRecord" 
  ADD CONSTRAINT "fk_service_checklist_workorder" 
  FOREIGN KEY ("workorder_id") 
  REFERENCES "WorkOrder" ("workorder_id") 
  ON DELETE CASCADE;

ALTER TABLE "ServiceChecklistRecord" 
  ADD CONSTRAINT "fk_service_checklist_item" 
  FOREIGN KEY ("checklist_item_id") 
  REFERENCES "ChecklistItem" ("checklist_item_id") 
  ON DELETE CASCADE;

ALTER TABLE "PartUsage" 
  ADD CONSTRAINT "fk_part_usage_workorder" 
  FOREIGN KEY ("workorder_id") 
  REFERENCES "WorkOrder" ("workorder_id") 
  ON DELETE CASCADE;

ALTER TABLE "PartUsage" 
  ADD CONSTRAINT "fk_part_usage_part" 
  FOREIGN KEY ("part_id") 
  REFERENCES "Part" ("part_id") 
  ON DELETE CASCADE;

ALTER TABLE "Inventory" 
  ADD CONSTRAINT "fk_inventory_service_center" 
  FOREIGN KEY ("center_id") 
  REFERENCES "ServiceCenter" ("center_id") 
  ON DELETE CASCADE;

ALTER TABLE "Inventory" 
  ADD CONSTRAINT "fk_inventory_part" 
  FOREIGN KEY ("part_id") 
  REFERENCES "Part" ("part_id") 
  ON DELETE CASCADE;

ALTER TABLE "InventoryTxn" 
  ADD CONSTRAINT "fk_inventory_txn_inventory" 
  FOREIGN KEY ("inventory_id") 
  REFERENCES "Inventory" ("inventory_id") 
  ON DELETE CASCADE;

ALTER TABLE "InventoryTxn" 
  ADD CONSTRAINT "fk_inventory_txn_part" 
  FOREIGN KEY ("part_id") 
  REFERENCES "Part" ("part_id") 
  ON DELETE CASCADE;

ALTER TABLE "Invoice" 
  ADD CONSTRAINT "fk_invoice_workorder" 
  FOREIGN KEY ("workorder_id") 
  REFERENCES "WorkOrder" ("workorder_id") 
  ON DELETE CASCADE;

ALTER TABLE "Invoice" 
  ADD CONSTRAINT "fk_invoice_customer" 
  FOREIGN KEY ("customer_id") 
  REFERENCES "Customer" ("customer_id") 
  ON DELETE CASCADE;

ALTER TABLE "Payment" 
  ADD CONSTRAINT "fk_payment_invoice" 
  FOREIGN KEY ("invoice_id") 
  REFERENCES "Invoice" ("invoice_id") 
  ON DELETE CASCADE;

ALTER TABLE "ChatMessage" 
  ADD CONSTRAINT "fk_chat_message_appointment" 
  FOREIGN KEY ("appointment_id") 
  REFERENCES "Appointment" ("appointment_id") 
  ON DELETE CASCADE;

ALTER TABLE "ChatMessage" 
  ADD CONSTRAINT "fk_chat_message_from_customer" 
  FOREIGN KEY ("from_customer_id") 
  REFERENCES "Customer" ("customer_id") 
  ON DELETE SET NULL;

ALTER TABLE "ChatMessage" 
  ADD CONSTRAINT "fk_chat_message_from_staff" 
  FOREIGN KEY ("from_staff_id") 
  REFERENCES "Staff" ("staff_id") 
  ON DELETE SET NULL;

ALTER TABLE "AIRecommendation" 
  ADD CONSTRAINT "fk_ai_recommendation_service_center" 
  FOREIGN KEY ("center_id") 
  REFERENCES "ServiceCenter" ("center_id") 
  ON DELETE CASCADE;

ALTER TABLE "AIRecommendation" 
  ADD CONSTRAINT "fk_ai_recommendation_part" 
  FOREIGN KEY ("part_id") 
  REFERENCES "Part" ("part_id") 
  ON DELETE CASCADE;