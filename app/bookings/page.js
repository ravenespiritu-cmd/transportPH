"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import StatusBadge from "@/components/shared/StatusBadge";
import { formatDate, formatPeso } from "@/lib/format";

const bookings = [
  { id: 1, status: "confirmed", route: "Manila -> Cebu", date: "2026-04-23T08:00:00", carrier: "Cebu Pacific · Economy", ref: "TRX-A8F2K1", amount: 2675, pax: 1 },
  { id: 2, status: "pending", route: "Manila -> Davao", date: "2026-04-24T14:30:00", carrier: "Philippine Airlines · Economy", ref: "TRX-B3X9P2", amount: 3525, pax: 1 },
  { id: 3, status: "cancelled", route: "Manila -> Bicol", date: "2026-04-26T10:30:00", carrier: "PNR · Economy", ref: "TRX-C7M4R3", amount: 820, pax: 1 },
];

export default function MyBookingsPage() {
  const [tab, setTab] = useState("all");
  const filtered = useMemo(() => bookings.filter((b) => tab === "all" || b.status === tab || (tab === "upcoming" && b.status !== "cancelled")), [tab]);
  return (
    <div className="min-h-screen bg-[#F5F7FA] px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">My Bookings</h1>
          <input placeholder="Search bookings..." className="rounded-lg border border-[#DCDFE6] px-4 py-2.5 text-sm" />
        </div>
        <div className="mb-4 flex gap-2">
          {["all", "upcoming", "completed", "cancelled"].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-1.5 text-sm capitalize ${tab === t ? "bg-[#006CE4] text-white" : "text-[#666666] hover:text-[#006CE4]"}`}>{t}</button>
          ))}
        </div>
        {filtered.map((booking) => (
          <article key={booking.id} className="mb-4 flex rounded-xl border border-[#E4E7ED] bg-white p-5 hover:shadow-sm">
            <span className={`mr-4 w-1 rounded-full ${booking.status === "confirmed" ? "bg-emerald-500" : booking.status === "pending" ? "bg-amber-400" : "bg-red-500"}`} />
            <div className="flex flex-1 flex-wrap items-start justify-between gap-3">
              <div>
                <StatusBadge status={booking.status} />
                <p className="mt-2 text-[17px] font-semibold text-[#1A1A1A]">{booking.route}</p>
                <p className="text-sm text-[#666666]">{formatDate(booking.date)} · 08:00</p>
                <p className="text-xs text-[#999999]">{booking.carrier}</p>
                <p className="font-mono text-xs text-blue-500">{booking.ref}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#1A1A1A]">{formatPeso(booking.amount)}</p>
                <p className="text-xs text-[#999999]">{booking.pax} passenger</p>
                <div className="mt-2 flex justify-end gap-2">
                  <Link href={`/bookings/${booking.id}`} className="rounded-lg border border-[#006CE4] px-3 py-1.5 text-xs text-[#006CE4]">View details</Link>
                  {booking.status !== "cancelled" ? <button className="rounded-lg border border-red-400 px-3 py-1.5 text-xs text-red-500">Cancel</button> : null}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
