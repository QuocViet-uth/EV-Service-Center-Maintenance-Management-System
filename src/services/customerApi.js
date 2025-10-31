// Simple mock data to simulate backend for customer flows
let appointments = [
  { id: 1, vin: "VIN001", serviceType: "Standard Maintenance", date: "2025-11-05T09:00", status: "pending", center: "Hanoi Center 1" },
  { id: 1, vin: "VIN001", serviceType: "Standard Maintenance", date: "2025-11-05T09:00", status: "processing", center: "Hanoi Center 1", progress: 45 }
];

let vehicles = [
  { vin: "VIN001", model: "E-Car S", mileage: 12400, batteryHealth: 92, lastService: "2025-10-15" }
];

let invoices = [
  { id: 1, appointmentId: 1, amount: 1500000, paid: false, date: "2025-10-28" }
];

export async function fetchVehicles() {
  return Promise.resolve([...vehicles]);
}
export async function fetchReminders() {
  // reminders derived from vehicles (mock)
  return Promise.resolve([
    { id: 1, vin: "VIN001", type: "mileage", due: "in 500 km", isSent: false }
  ]);
}
export async function fetchAppointments() {
  return Promise.resolve([...appointments]);
}
export async function createAppointment(payload) {
  const id = appointments.length + 1;
  const appt = { id, ...payload, status: "pending" };
  appointments.push(appt);
  // also create invoice mock
  invoices.push({ id: invoices.length + 1, appointmentId: id, amount: 1200000, paid: false, date: new Date().toISOString().slice(0,10) });
  return Promise.resolve(appt);
}
export async function fetchServiceHistory(vin) {
  // return a list of service records for VIN
  return Promise.resolve([
    { id: 1, vin, date: "2025-10-15", type: "Standard Maintenance", odometer: 11900, total: 1200000 },
    { id: 2, vin, date: "2024-12-10", type: "Battery Check", odometer: 6000, total: 800000 }
  ]);
}
export async function fetchInvoices() {
  return Promise.resolve([...invoices]);
}
export async function payInvoice(id) {
  const inv = invoices.find(i => i.id === id);
  if (inv) inv.paid = true;
  return Promise.resolve(inv);
}
export async function updateProgress(id, value) {
  const appt = appointments.find(a => a.id === id);
  if (appt) {
    appt.progress = value;
    if (value >= 100) appt.status = "completed";
  }
  return Promise.resolve(appt);
}
