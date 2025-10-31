import Card from "../common/Card";

export default function ServiceHistory({ records }) {
  return (
    <Card title="Service History">
      <ul className="space-y-3">
        {records.map(r => (
          <li key={r.id} className="p-3 border border-zinc-800 rounded">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{r.type}</div>
                <div className="text-sm text-zinc-400">{r.date} — {r.odometer} km</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{(r.total || 0).toLocaleString()} ₫</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
