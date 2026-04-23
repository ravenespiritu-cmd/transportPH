"use client";

import { CheckCircle, Clock3 } from "lucide-react";
import CarrierLogo from "@/components/shared/CarrierLogo";
import { formatPeso } from "@/lib/format";

export default function FlightCard({ schedule, onSelect }) {
  const isRail = (schedule.type || "").toLowerCase() === "railway";
  return (
    <article className="mb-3 rounded-xl border border-gray-100 bg-white p-5 transition hover:border-blue-200 hover:shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="w-full lg:w-[140px]">
          <div className="mb-2 flex items-center gap-2">
            <CarrierLogo carrierName={schedule.carrier} />
            <div>
              <p className="text-[13px] font-medium text-[#666666]">{schedule.carrier}</p>
              <span className={`rounded-full px-2 py-0.5 text-xs ${isRail ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"}`}>{isRail ? "Railway" : "Airline"}</span>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-3 items-start text-center">
            <p className="text-[22px] font-bold text-[#1A1A1A]">{schedule.departure}</p>
            <div className="pt-1 text-xs text-[#999999]">----- {schedule.duration} -----<div className="mt-1">{schedule.stops}</div></div>
            <p className="text-[22px] font-bold text-[#1A1A1A]">{schedule.arrival}</p>
          </div>
          <p className="mt-2 text-center text-xs text-[#666666]">{schedule.originCode} - {schedule.destinationCode}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-[#EBEEF5] pt-3">
            {["Free cancellation", "E-ticket", "Instant confirm"].map((tag) => (
              <span key={tag} className="flex items-center gap-1 text-xs text-[#666666]"><CheckCircle className="h-3 w-3 text-emerald-500" />{tag}</span>
            ))}
          </div>
        </div>
        <div className="w-full text-right lg:w-[160px]">
          {schedule.seatsLeft < 10 ? <p className="mb-1 text-xs text-amber-500">Only {schedule.seatsLeft} seats left!</p> : null}
          <p className="text-[22px] font-bold text-[#006CE4]">{formatPeso(schedule.price)}</p>
          <p className="text-[11px] text-[#999999]">per person</p>
          <p className="mb-2 text-xs text-[#666666] capitalize">{schedule.className}</p>
          <button onClick={onSelect} className="w-full rounded-lg bg-[#006CE4] py-2 text-sm font-medium text-white hover:bg-[#0057B8]">Select</button>
        </div>
      </div>
    </article>
  );
}
