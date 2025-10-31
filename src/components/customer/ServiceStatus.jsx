import { useEffect, useState } from "react";
import { fetchAppointments, updateProgress } from "../../services/customerApi";
import Card from "../../components/common/Card";
import ProgressBar from "../../components/customer/ProgressBar";
import Button from "../../components/common/Button";

export default function ServiceStatus() {
  const [appointments, setAppointments] = useState([]);

  const load = () => fetchAppointments().then(setAppointments);

  useEffect(() => {
    load();
    const interval = setInterval(() => {
      // auto refresh every 4s to simulate live tracking
      load();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const onBoost = async (id) => {
    const item = appointments.find(a => a.id === id);
    if (item.progress < 100) {
      await updateProgress(id, item.progress + 10);
      load();
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Service Status</h2>
      <span className={`uppercase text-sm font-bold
    ${item.status === "processing" ? "animate-breath text-red-400" : ""}
    ${item.status === "pending" ? "text-yellow-300" : ""}
    ${item.status === "completed" ? "text-emerald-400" : ""}
    `}>
        {item.status}
    </span>

      <div className="grid gap-6">
        {appointments.map(item => (
          <Card key={item.id}>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-lg">{item.serviceType}</div>
                <div className="text-sm text-zinc-500">
                  {new Date(item.date).toLocaleString()}
                </div>
                <div className="text-xs text-zinc-400">
                  Center: {item.center}
                </div>
              </div>
              <div className="text-right">
                <span className="uppercase text-red-400 text-xs font-bold">
                  {item.status}
                </span>
              </div>
            </div>

            {/* Progress area */}
            {item.status !== "completed" ? (
              <div className="mt-4">
                <ProgressBar progress={item.progress} />
                <p className="text-zinc-300 mt-1 text-sm">{item.progress}%</p>
                <Button
                  onClick={() => onBoost(item.id)}
                  className="mt-3 bg-zinc-900 border border-red-900 hover:bg-red-700"
                >
                  Boost Progress +10%
                </Button>
              </div>
            ) : (
              <p className="text-emerald-400 font-semibold mt-4">✅ COMPLETED</p>
            )}
          </Card>
        ))}
      </div>
    </div>

  );
}
