"use client";

import { useRouter } from "next/navigation";
import { CalendarDays, MapPin, Search, Train } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import PassengerDropdown from "@/components/search/PassengerDropdown";

export default function TrainSearchForm() {
  const router = useRouter();
  const { searchState, updateSearch } = useSearch();

  const runSearch = () => {
    const q = new URLSearchParams({
      origin: searchState.origin,
      destination: searchState.destination,
      date: searchState.departDate,
      type: "trains",
      class: searchState.seatClass,
    }).toString();
    router.push(`/search?${q}`);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#DCE3EF] bg-white shadow-[0_16px_36px_rgba(9,45,101,0.18)]">
      <div className="flex border-b border-[#EBEEF5]">
        <button onClick={() => updateSearch({ activeTab: "flights" })} className="m-1.5 flex items-center gap-2 rounded-lg bg-gray-50 px-5 py-2 text-sm text-gray-600 hover:bg-gray-100">Flights</button>
        <button className="m-1.5 flex items-center gap-2 rounded-lg bg-[#006CE4] px-5 py-2 text-sm font-medium text-white"><Train className="h-4 w-4" />Trains</button>
      </div>
      <div className="border-b border-[#EBEEF5] px-4 py-2 text-sm text-[#666666]">Train tickets are one-way</div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_170px_180px_160px]">
        <div className="p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#999999]">FROM</p>
          <div className="mt-1 flex items-center gap-2"><MapPin className="h-4 w-4 text-[#006CE4]" /><p className="text-base font-semibold text-[#1A1A1A]">Station or city</p></div>
        </div>
        <div className="p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#999999]">TO</p>
          <div className="mt-1 flex items-center gap-2"><MapPin className="h-4 w-4 text-[#006CE4]" /><p className="text-base font-semibold text-[#1A1A1A]">Station or city</p></div>
        </div>
        <div className="p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#999999]">DEPART</p>
          <div className="mt-1 flex items-center gap-2"><CalendarDays className="h-4 w-4 text-[#006CE4]" /><p className="text-base font-semibold text-[#1A1A1A]">Thu, Apr 23</p></div>
        </div>
        <div className="p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#999999]">PASSENGERS & CLASS</p>
          <div className="mt-1">
            <PassengerDropdown
              passengers={searchState.passengers}
              seatClass={searchState.seatClass}
              onChange={(passengers) => updateSearch({ passengers })}
              onClassChange={(seatClass) => updateSearch({ seatClass })}
            />
          </div>
        </div>
        <button onClick={runSearch} className="flex items-center justify-center gap-2 bg-[#006CE4] px-6 text-sm font-semibold text-white hover:bg-[#0057B8]">
          <Search className="h-4 w-4" />
          Search Trains
        </button>
      </div>
    </div>
  );
}
