import Card from "../common/Card";

export default function ReminderList({ reminders }) {
  return (
    <Card title="Reminders">
      <ul className="space-y-2">
        {reminders.map(r => (
          <li key={r.id} className="flex justify-between items-center">
            <div>
              <div className="text-zinc-300">{r.vin} — {r.type}</div>
              <div className="text-sm text-zinc-500">{r.due}</div>
            </div>
            <div className="text-sm text-emerald-400">{r.isSent ? "Sent" : "Pending"}</div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
