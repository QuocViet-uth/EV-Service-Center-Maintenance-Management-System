import { useEffect, useState } from "react";
import { fetchAppointments } from "../../services/customerApi";
import Card from "../../components/common/Card";

const statusColors = {
  pending: "text-yellow-400",
  processing: "text-blue-400",
  completed: "text-emerald-400",
};

export default function ServiceStatus() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments().then(setAppointments);
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Service Status</h2>

      <div className="grid gap-4">
        {appointments.map(item => (
          <Card key={item.id}>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{item.serviceType}</div>
                <div className="text-sm text-zinc-400">
                  {new Date(item.date).toLocaleString()}
                </div>
                <div className="text-sm">
                  Center: <span className="text-zinc-300">{item.center}</span>
                </div>
              </div>

              <div className={`${statusColors[item.status] ?? "text-gray-300"} font-bold`}>
                {item.status.toUpperCase()}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
