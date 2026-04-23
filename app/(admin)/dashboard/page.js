"use client";

import Link from "next/link";
import {
  CalendarDays,
  ChartNoAxesCombined,
  Ticket,
  TrendingUp,
} from "lucide-react";
import DarkStatusBadge from "@/components/shared/DarkStatusBadge";

const bookingRows = [
  ["TRX-A8F2K1", "MNL -> CEB", "Juan Dela Cruz"],
  ["TRX-B3X9P2", "MNL -> DVO", "Maria Santos"],
  ["TRX-C7M4R3", "MNL -> BIC", "Pedro Reyes"],
  ["TRX-D1N6T4", "MNL -> BTG", "Ana Lim"],
  ["TRX-E5K2W5", "MNL -> CEB", "Jose Garcia"],
];

const topRoutes = [
  { label: "MNL -> CEB", value: 312, fillClass: "w-[90%]" },
  { label: "MNL -> DVO", value: 241, fillClass: "w-[70%]" },
  { label: "MNL -> BIC", value: 158, fillClass: "w-[45%]" },
  { label: "MNL -> BTG", value: 103, fillClass: "w-[30%]" },
];

const cardClass = "rounded-xl border border-slate-700 bg-slate-800 p-4 md:p-5";

function StatCard({ icon: Icon, iconWrap, iconColor, value, label, trend, trendColor }) {
  return (
    <div className={cardClass}>
      <div className="mb-3 flex items-start justify-between">
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${iconWrap}`}>
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </span>
      </div>
      <p className="text-[22px] font-bold text-slate-100">{value}</p>
      <p className="mt-1 text-[11px] text-slate-400">{label}</p>
      <p className={`mt-1 text-[10px] ${trendColor}`}>{trend}</p>
    </div>
  );
}

export default function AdminDashboardDarkPage() {
  return (
    <div className="space-y-4">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-[18px] font-semibold text-slate-100">Dashboard</h1>
          <p className="mt-1 text-[12px] text-slate-500">Thursday, April 23, 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-blue-700 bg-blue-950 px-3 py-1 text-[10px] text-blue-300">Admin</span>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">JD</span>
        </div>
      </header>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Ticket} iconWrap="bg-blue-950" iconColor="text-blue-500" value="1,284" label="Total bookings" trend="+12% this month" trendColor="text-green-400" />
        <StatCard icon={TrendingUp} iconWrap="bg-green-950" iconColor="text-green-400" value="P84,200" label="Revenue today" trend="+8% vs yesterday" trendColor="text-green-400" />
        <StatCard icon={CalendarDays} iconWrap="bg-indigo-950" iconColor="text-indigo-400" value="38" label="Active schedules" trend="No change today" trendColor="text-slate-500" />
        <StatCard icon={ChartNoAxesCombined} iconWrap="bg-amber-950" iconColor="text-amber-300" value="24" label="Vehicles in service" trend="2 in maintenance" trendColor="text-red-300" />
      </section>

      <section className="grid gap-3 lg:grid-cols-2">
        <div className={cardClass}>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-100">Recent bookings</h2>
            <Link href="#" className="text-xs text-blue-400">View all -&gt;</Link>
          </div>
          <div className="grid grid-cols-3 border-b border-slate-700 pb-2 text-[10px] uppercase text-slate-500">
            <span>REF</span><span>ROUTE</span><span>PASSENGER</span>
          </div>
          {bookingRows.map((row) => (
            <div key={row[0]} className="grid h-10 grid-cols-3 items-center border-b border-slate-700 text-[11px] last:border-b-0">
              <span className="font-mono text-[10px] text-blue-400">{row[0]}</span>
              <span className="text-slate-100">{row[1]}</span>
              <span className="text-slate-400">{row[2]}</span>
            </div>
          ))}
        </div>

        <div className={cardClass}>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-100">Top routes</h2>
            <Link href="#" className="text-xs text-blue-400">Details -&gt;</Link>
          </div>
          <div className="space-y-3">
            {topRoutes.map((route) => (
              <div key={route.label} className="grid grid-cols-[1fr_80px_48px] items-center gap-3">
                <span className="text-[11px] text-slate-100">{route.label}</span>
                <div className="h-[5px] rounded bg-blue-950">
                  <div className={`h-[5px] rounded bg-blue-500 ${route.fillClass}`} />
                </div>
                <span className="text-right text-[11px] font-bold text-slate-100">{route.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-3 lg:grid-cols-2">
        <div className={cardClass}>
          <h2 className="mb-3 text-sm font-semibold text-slate-100">Schedule status today</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400"><span>On time</span><DarkStatusBadge status="on_time">32 trips</DarkStatusBadge></div>
            <div className="flex items-center justify-between text-[11px] text-slate-400"><span>Delayed</span><DarkStatusBadge status="delayed">4 trips</DarkStatusBadge></div>
            <div className="flex items-center justify-between text-[11px] text-slate-400"><span>Cancelled</span><DarkStatusBadge status="cancelled">2 trips</DarkStatusBadge></div>
            <div className="flex items-center justify-between text-[11px] text-slate-400"><span>Upcoming</span><DarkStatusBadge status="in_progress">18 trips</DarkStatusBadge></div>
          </div>
        </div>

        <div className={cardClass}>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-100">Maintenance alerts</h2>
            <Link href="#" className="text-xs text-blue-400">View logs -&gt;</Link>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400"><span>PR-A320 · Engine check</span><DarkStatusBadge status="scheduled">Scheduled</DarkStatusBadge></div>
            <div className="flex items-center justify-between text-[11px] text-slate-400"><span>PNR-002 · Brake service</span><DarkStatusBadge status="overdue">Overdue</DarkStatusBadge></div>
            <div className="flex items-center justify-between text-[11px] text-slate-400"><span>PR-B737 · Routine check</span><DarkStatusBadge status="done">Done</DarkStatusBadge></div>
            <div className="flex items-center justify-between text-[11px] text-slate-400"><span>PNR-005 · Wheel inspect</span><DarkStatusBadge status="in_progress">In progress</DarkStatusBadge></div>
          </div>
        </div>
      </section>
    </div>
  );
}
