import { ShieldCheck } from "lucide-react";
import { formatDate, formatPeso } from "@/lib/format";

export default function TripSummaryCard({ schedule, selectedClass = "Economy", passengerCount = 1 }) {
  if (!schedule) return null;
  const taxes = 125;
  const fee = 50;
  const total = Number(schedule.price) + taxes + fee;

  return (
    <aside className="sticky top-20 rounded-xl border border-[#E4E7ED] bg-white p-4">
      <h3 className="mb-3 text-base font-semibold text-[#1A1A1A]">Trip Summary</h3>
      <div className="mb-3 rounded-lg bg-[#EBF3FF] p-3">
        <p className="text-sm font-semibold text-[#1A1A1A]">{schedule.carrier}</p>
        <p className="text-xs text-[#666666]">{schedule.originCode} -&gt; {schedule.destinationCode}</p>
      </div>
      <div className="space-y-1 text-sm text-[#666666]">
        <p className="flex justify-between"><span>Departure:</span><span>{schedule.departure} {formatDate("2026-04-23")}</span></p>
        <p className="flex justify-between"><span>Arrival:</span><span>{schedule.arrival} {formatDate("2026-04-23")}</span></p>
        <p className="flex justify-between"><span>Duration:</span><span>{schedule.duration}</span></p>
        <p className="flex justify-between"><span>Class:</span><span>{selectedClass}</span></p>
        <p className="flex justify-between"><span>Passengers:</span><span>{passengerCount} Adult</span></p>
      </div>
      <div className="my-3 border-t border-[#EBEEF5]" />
      <div className="space-y-1 text-sm text-[#666666]">
        <p className="flex justify-between"><span>Base fare:</span><span>{formatPeso(schedule.price)}</span></p>
        <p className="flex justify-between"><span>Taxes:</span><span>{formatPeso(taxes)}</span></p>
        <p className="flex justify-between"><span>Service fee:</span><span>{formatPeso(fee)}</span></p>
        <p className="mt-1 flex justify-between text-base font-bold text-[#006CE4]"><span>Total:</span><span>{formatPeso(total)}</span></p>
      </div>
      <p className="mt-3 flex items-center gap-1 text-xs text-[#666666]"><ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />Your booking is protected</p>
    </aside>
  );
}
