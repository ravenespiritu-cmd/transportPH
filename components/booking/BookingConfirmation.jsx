import Link from "next/link";
import { CheckCircle2, Download, Ticket } from "lucide-react";
import { formatPeso } from "@/lib/format";

export default function BookingConfirmation({ booking }) {
  if (!booking) return null;
  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5 text-center">
      <CheckCircle2 className="mx-auto mb-2 h-10 w-10 animate-pulse text-emerald-600" />
      <p className="text-lg font-semibold text-slate-900">Booking Successful</p>
      <p className="mt-2 font-mono text-sm text-blue-600">{booking.booking_ref}</p>
      <p className="mt-1 text-sm text-slate-600">Total paid: {formatPeso(booking.total_amount)}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <button type="button" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition-colors duration-150 hover:bg-blue-700">
          <Download className="h-3.5 w-3.5" />
          Download E-Ticket
        </button>
        <Link href="/passenger/bookings" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-50">
          <Ticket className="h-3.5 w-3.5" />
          View Booking
        </Link>
      </div>
    </div>
  );
}
