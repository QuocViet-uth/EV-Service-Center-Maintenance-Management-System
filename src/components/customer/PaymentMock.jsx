import Card from "../common/Card";
import Button from "../common/Button";

export default function PaymentMock({ invoices = [], onPay }) {
  return (
    <Card title="Invoices">
      <ul className="space-y-2">
        {invoices.map(inv => (
          <li key={inv.id} className="flex justify-between items-center">
            <div>
              <div className="text-zinc-200">#{inv.id} — {inv.date}</div>
              <div className="text-sm text-zinc-400">{inv.amount.toLocaleString()} ₫</div>
            </div>
            <div>
              {inv.paid ? <span className="text-emerald-400 font-semibold">Paid</span> : <Button onClick={() => onPay(inv.id)}>Pay</Button>}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
