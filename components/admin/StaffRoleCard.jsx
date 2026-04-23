import { CalendarDays, Bus, Wrench, Ticket } from "lucide-react";

const cardClass = "rounded-xl border border-slate-700 bg-slate-800 p-4 md:p-5";

const permissionGroups = [
  {
    title: "Schedule management",
    icon: CalendarDays,
    iconWrap: "bg-indigo-950 text-indigo-400",
    items: [
      "Create new trip schedules",
      "Update departure & arrival times",
      "Mark trips on_time / delayed / cancelled",
      "Assign vehicles to schedules",
    ],
  },
  {
    title: "Vehicle management",
    icon: Bus,
    iconWrap: "bg-amber-950 text-amber-300",
    items: [
      "Add and edit vehicles (aircraft/train)",
      "Update vehicle status",
      "View vehicle assignment per schedule",
      "View total & available seat counts",
    ],
  },
  {
    title: "Maintenance logs",
    icon: Wrench,
    iconWrap: "bg-red-950 text-red-300",
    items: [
      "Create maintenance log entries",
      "Update log status (scheduled/done)",
      "Record who performed the work",
      "View all vehicle maintenance history",
    ],
  },
  {
    title: "Booking visibility",
    icon: Ticket,
    iconWrap: "bg-green-950 text-green-400",
    items: [
      "View all passenger bookings",
      "Update booking status if needed",
      "View passenger manifest per schedule",
      "View seat class availability",
    ],
  },
];

export default function StaffRoleCard() {
  return (
    <div className="space-y-4">
      <section className={cardClass}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0F6E56] text-sm font-bold text-white">S</div>
            <div>
              <p className="text-base font-semibold text-slate-100">Staff</p>
              <p className="text-xs text-slate-400">Assigned by Admin · Operations & fleet management access</p>
            </div>
          </div>
          <span className="rounded-full border border-slate-700 px-3 py-1 font-mono text-[11px] text-slate-400">role: staff</span>
        </div>
      </section>

      <p className="text-[11px] uppercase tracking-widest text-slate-500">WHAT STAFF CAN DO</p>

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
    </div>
  );
}
