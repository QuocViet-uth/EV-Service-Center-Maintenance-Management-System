import BookingForm from "../../components/customer/BookingForm";
export default function BookingPage() {
  const onCreate = async (d) => {
    const { createAppointment, fetchAppointments } = await import("../../services/customerApi");
    await createAppointment(d);
    alert("Booking created");
  };
  return (
    <div className="p-6">
      <BookingForm onCreate={onCreate} />
    </div>
  );
}
