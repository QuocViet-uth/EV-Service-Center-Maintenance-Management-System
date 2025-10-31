import { useEffect, useState } from "react";
import { fetchVehicles, fetchReminders, fetchInvoices, fetchServiceHistory } from "../../services/customerApi";
import VehicleCard from "../../components/customer/VehicleCard";
import ReminderList from "../../components/customer/ReminderList";
import ServiceHistory from "../../components/customer/ServiceHistory";
import PaymentMock from "../../components/customer/PaymentMock";
import BookingForm from "../../components/customer/BookingForm";
import Card from "../../components/common/Card";

export default function CustomerDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchVehicles().then(setVehicles);
    fetchReminders().then(setReminders);
    fetchInvoices().then(setInvoices);
    fetchServiceHistory("VIN001").then(setHistory);
  }, []);

  const handleCreate = async (payload) => {
    // call createAppointment in services — dynamic import to prevent circular
    const { createAppointment } = await import("../../services/customerApi");
    await createAppointment(payload);
    // refresh appointments/invoices
    setInvoices(await fetchInvoices());
    alert("Booking created");
  };

  const handlePay = async (id) => {
    const { payInvoice } = await import("../../services/customerApi");
    await payInvoice(id);
    setInvoices(await fetchInvoices());
    alert("Paid invoice #" + id);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <h1 className="text-3xl font-semibold mb-4">Your Vehicles</h1>
          {vehicles.map(v => <VehicleCard key={v.vin} vehicle={v} />)}
          <div className="mt-6">
            <BookingForm onCreate={handleCreate} />
          </div>
        </div>

        <div className="col-span-1 space-y-4">
          <ReminderList reminders={reminders} />
          <PaymentMock invoices={invoices} onPay={handlePay} />
        </div>
      </div>

      <div>
        <ServiceHistory records={history} />
      </div>
    </div>
  );
}
