import { CreditCard, Search, ShieldCheck, UserCircle2 } from "lucide-react";

const cardClass = "rounded-xl border border-slate-700 bg-slate-800 p-4 md:p-5";

const permissionGroups = [
  {
    title: "Account & registration",
    icon: UserCircle2,
    iconWrap: "bg-blue-950 text-blue-400",
    items: [
      "Register with name, email, password",
      "Log in and receive JWT token",
      "Update own profile (name, phone, DOB)",
      "Change own password securely",
      "View own loyalty points",
    ],
  },
  {
    title: "Search & browse",
    icon: Search,
    iconWrap: "bg-indigo-950 text-indigo-400",
    items: [
      "Search schedules by origin, destination, date",
      "Filter by airline or railway",
      "Filter by seat class (economy/business/first)",
      "View available seats and prices",
      "View departure and arrival times",
    ],
  },
  {
    title: "Booking",
    icon: ShieldCheck,
    iconWrap: "bg-green-950 text-green-400",
    items: [
      "Book a seat on any available schedule",
      "Select seat class and number of passengers",
      "Receive unique booking reference (TRX-XXXXXXXX)",
      "View own booking history and details",
      "View booking status (pending/confirmed/cancelled)",
    ],
  },
  {
    title: "Payment & cancellation",
    icon: CreditCard,
    iconWrap: "bg-amber-950 text-amber-300",
    items: [
      "Pay for own booking (GCash, card, cash, bank)",
      "Booking auto-confirmed when payment = paid",
      "Cancel own booking anytime",
      "Refund request auto-created on cancellation",
      "View own payment and refund status",
    ],
  },
];

const steps = [
  "Register / Login",
  "Search schedules",
  "Select seat class",
  "Confirm booking",
  "Pay online",
  "Get e-ticket",
];

export default function PassengerRoleCard() {
  return (
    <div className="space-y-4">
      <section className={cardClass}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-sm font-bold text-white">P</div>
            <div>
              <p className="text-base font-semibold text-slate-100">Passenger</p>
              <p className="text-xs text-slate-400">Auto-assigned on register · Self-service access only</p>
            </div>
          </div>
          <span className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-500">role: passenger</span>
        </div>
      </section>

      <section className="rounded-lg border border-amber-800 bg-amber-950 px-3 py-2.5">
        <p className="flex items-start gap-2 text-[11px] text-amber-300">
          <span className="mt-0.5 inline-flex h-3.5 w-3.5 shrink-0 rounded-full bg-amber-500" />
          Passengers can only see and touch their own data. They have zero visibility into other passengers, revenue, vehicles, or system operations.
        </p>
      </section>

      <p className="text-[11px] uppercase tracking-widest text-slate-500">WHAT PASSENGERS CAN DO</p>

      <section className="grid gap-3 md:grid-cols-2">
        {permissionGroups.map((group) => {
          const Icon = group.icon;
          return (
            <article key={group.title} className={cardClass}>
              <div className="flex items-center gap-2">
                <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${group.iconWrap}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="text-sm font-semibold text-slate-100">{group.title}</h3>
              </div>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-slate-400">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </section>

      <section className={cardClass}>
        <p className="mb-3 text-[11px] uppercase tracking-widest text-slate-500">PASSENGER JOURNEY - STEP BY STEP</p>
        <div className="flex flex-wrap items-center gap-2">
          {steps.slice(0, 5).map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <div className="space-y-1">
                <span className="inline-flex rounded-lg border border-emerald-300 bg-[#0F6E56] px-3 py-1.5 text-[11px] text-white">{step}</span>
                <p className="text-[10px] text-slate-500">step {index + 1}</p>
              </div>
              {index < 4 ? <span className="text-slate-500">-&gt;</span> : null}
            </div>
          ))}
        </div>
        <div className="mt-3 space-y-1">
          <span className="inline-flex rounded-lg border border-emerald-300 bg-[#0F6E56] px-3 py-1.5 text-[11px] text-white">{steps[5]}</span>
          <p className="text-[10px] text-slate-500">step 6</p>
        </div>
      </section>
    </div>
  );
}
