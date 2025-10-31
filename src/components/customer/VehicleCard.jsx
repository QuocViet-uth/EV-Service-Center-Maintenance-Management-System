import Card from "../common/Card";

export default function VehicleCard({ vehicle }) {
  if (!vehicle) return null;
  return (
    <Card title={`${vehicle.model} — ${vehicle.vin}`}>
      <div className="flex flex-col gap-2">
        <div className="text-zinc-300">Mileage: <span className="font-semibold text-white">{vehicle.mileage} km</span></div>
        <div className="text-zinc-300">Battery: <span className="font-semibold text-white">{vehicle.batteryHealth}%</span></div>
        <div className="text-zinc-300">Last service: <span className="font-semibold">{vehicle.lastService}</span></div>
      </div>
    </Card>
  );
}
