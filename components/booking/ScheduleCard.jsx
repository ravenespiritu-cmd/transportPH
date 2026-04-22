import { ArrowRight, Clock3 } from "lucide-react";
import SeatSelector from "./SeatSelector";
import { formatPeso, formatTime24 } from "@/lib/format";

export default function ScheduleCard({ schedule }) {
  const seatClasses = schedule?.Vehicle?.SeatClasses || [];
  const route = schedule?.Route;
  const carrier = route?.Carrier || schedule?.Vehicle?.Carrier;
  const bestPrice = seatClasses.length ? Math.min(...seatClasses.map((s) => Number(s.price))) : 0;
  const availableSeats = seatClasses.reduce((total, row) => total + Number(row.available_seats || 0), 0);
  const hours = Math.max(1, Math.floor((new Date(schedule.arrival_at) - new Date(schedule.departure_at)) / (1000 * 60 * 60)));
  const minutes = Math.floor((new Date(schedule.arrival_at) - new Date(schedule.departure_at)) / (1000 * 60)) % 60;

  return (
    <article className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-hover md:p-5">
      <div className="grid gap-5 lg:grid-cols-[1.2fr_1.6fr_1fr] lg:items-center">
        <div>
          <p className="text-base font-semibold text-slate-900">{carrier?.name || "Carrier"}</p>
          <span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${carrier?.type === "railway" ? "border border-indigo-200 bg-indigo-50 text-indigo-600" : "border border-blue-200 bg-blue-50 text-blue-600"}`}>
            {carrier?.type === "railway" ? "Railway" : "Airline"}
          </span>
        </div>
        <div>
          <p className="mb-1 flex items-center gap-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            {formatTime24(schedule.departure_at)}
            <ArrowRight className="h-4 w-4 text-blue-500" />
            {formatTime24(schedule.arrival_at)}
          </p>
          <p className="flex items-center gap-1 text-sm text-slate-500">
            <Clock3 className="h-4 w-4" />
            {hours}h {minutes}m
          </p>
          <p className="mt-1 text-sm text-slate-500">{route?.origin} (MNL) → {route?.destination} (CEB)</p>
        </div>
        <div className="text-left lg:text-right">
          <p className="text-[22px] font-bold text-blue-600">{formatPeso(bestPrice)}</p>
          <p className="text-xs text-slate-500">Economy</p>
          <p className="my-2 text-xs font-medium text-amber-600">{availableSeats} seats left</p>
          <SeatSelector schedule={schedule} seatClasses={seatClasses} />
        </div>
      </div>
    </article>
  );
}
