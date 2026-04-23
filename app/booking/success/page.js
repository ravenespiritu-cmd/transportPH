"use client";

import { CheckCircle, Download } from "lucide-react";
import Link from "next/link";
import { formatPeso } from "@/lib/format";

export default function BookingSuccessPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white">
        <CheckCircle className="h-10 w-10" />
      </div>
      <h1 className="mt-4 text-3xl font-bold text-[#1A1A1A]">Booking Confirmed!</h1>
      <p className="mt-2 text-[#666666]">Your e-ticket has been sent to your email</p>

      <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
        <p className="mb-1 text-xs uppercase tracking-wider text-blue-400">Booking Reference</p>
        <p className="font-mono text-[28px] font-bold text-[#006CE4]">TRX-A8F2K1</p>
      </div>

      <div className="mt-4 rounded-xl border border-[#E4E7ED] bg-white p-6 text-left">
        <p className="mb-2 text-base font-semibold text-[#1A1A1A]">Trip details</p>
        <p className="text-sm text-[#666666]">Cebu Pacific · MNL -&gt; CEB · Thu, Apr 23, 2026 · 08:00</p>
        <p className="mt-2 text-sm text-[#666666]">Total paid: {formatPeso(2675)}</p>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button className="flex items-center gap-2 rounded-lg bg-[#006CE4] px-6 py-3 text-white">
          <Download className="h-4 w-4" />
          Download E-Ticket
        </button>
        <Link href="/bookings" className="rounded-lg border border-[#006CE4] px-6 py-3 text-[#006CE4] hover:bg-blue-50">
          View My Bookings
        </Link>
      </div>
    </div>
  );
}
