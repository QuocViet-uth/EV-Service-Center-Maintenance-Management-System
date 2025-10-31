import { useEffect, useState } from "react";
import { fetchVehicles } from "../../services/customerApi";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

export default function Profile() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles().then(setVehicles);
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Vehicle Profile</h2>

      {vehicles.map(v => (
        <Card key={v.vin} className="space-y-4">
          <div className="text-lg font-semibold">{v.model}</div>
          <div className="text-zinc-300">VIN: {v.vin}</div>

          <div className="flex gap-4">
            <div>
              <p className="text-sm text-zinc-400">Mileage</p>
              <p className="font-bold">{v.mileage} km</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Battery Health</p>
              <p className="font-bold">{v.batteryHealth}%</p>
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={() => alert("Update function will be enabled later!")}
            className="hover:text-red-500 mt-4"
          >
            Update Info
          </Button>
        </Card>
      ))}
    </div>
  );
}
