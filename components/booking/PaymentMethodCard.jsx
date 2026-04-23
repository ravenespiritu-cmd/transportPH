import { Banknote, Building2, CreditCard, Wallet } from "lucide-react";

const icons = {
  gcash: Wallet,
  card: CreditCard,
  bank: Building2,
  cash: Banknote,
};

const labels = {
  gcash: "GCash",
  card: "Card",
  bank: "Bank Transfer",
  cash: "Cash on Counter",
};

export default function PaymentMethodCard({ method, selected, onSelect }) {
  const Icon = icons[method] || Wallet;
  return (
    <button
      type="button"
      onClick={() => onSelect(method)}
      className={`rounded-xl border p-4 text-left ${selected ? "border-[#006CE4] bg-[#EBF3FF]" : "border-[#E4E7ED] bg-white hover:border-blue-300"}`}
    >
      <div className="flex items-center gap-2 text-sm font-medium text-[#1A1A1A]">
        <Icon className="h-4 w-4 text-[#006CE4]" />
        {labels[method]}
      </div>
    </button>
  );
}
