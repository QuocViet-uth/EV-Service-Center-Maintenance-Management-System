import { useForm } from "react-hook-form";
import Card from "../common/Card";
import Button from "../common/Button";

export default function BookingForm({ onCreate }) {
  const { register, handleSubmit } = useForm({ defaultValues: { vin: "VIN001", serviceType: "Standard Maintenance", date: "" }});

  const submit = async (data) => {
    await onCreate(data);
  };

  return (
    <Card title="Create Booking">
      <form onSubmit={handleSubmit(submit)} className="space-y-3">
        <input {...register("vin")} placeholder="VIN" className="bg-transparent border border-zinc-700 rounded px-3 py-2 w-full" />
        <select {...register("serviceType")} className="bg-transparent border border-zinc-700 rounded px-3 py-2 w-full">
          <option>Standard Maintenance</option>
          <option>Battery Check</option>
          <option>Brake Service</option>
        </select>
        <input {...register("date")} type="datetime-local" className="bg-transparent border border-zinc-700 rounded px-3 py-2 w-full" />
        <div className="flex gap-2">
          <Button type="submit">Create</Button>
          <Button variant="ghost" onClick={() => {}}>Cancel</Button>
        </div>
      </form>
    </Card>
  );
}
