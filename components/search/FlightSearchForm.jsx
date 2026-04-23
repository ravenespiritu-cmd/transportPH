"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftRight, CalendarDays, MapPin, Plane, Search, Train, Users } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import PassengerDropdown from "@/components/search/PassengerDropdown";

export default function FlightSearchForm() {
  const router = useRouter();
  const { searchState, updateSearch } = useSearch();

  const runSearch = () => {
    const q = new URLSearchParams({
      origin: searchState.origin,
      destination: searchState.destination,
      date: searchState.departDate,
      type: "flights",
      class: searchState.seatClass,
    }).toString();
    router.push(`/search?${q}`);
  };

  const swapLocations = () =>
    updateSearch({
      origin: searchState.destination,
      destination: searchState.origin,
    });

  return (
    <div className="overflow-hidden rounded-2xl border border-[#DCE3EF] bg-white shadow-[0_16px_36px_rgba(9,45,101,0.18)]">
      <div className="flex border-b border-[#EBEEF5]">
        <button className="m-1.5 flex items-center gap-2 rounded-lg bg-[#006CE4] px-5 py-2 text-sm font-medium text-white"><Plane className="h-4 w-4" />Flights</button>
        <button onClick={() => updateSearch({ activeTab: "trains" })} className="m-1.5 flex items-center gap-2 rounded-lg bg-gray-50 px-5 py-2 text-sm text-gray-600 hover:bg-gray-100"><Train className="h-4 w-4" />Trains</button>
      </div>

      <div className="border-b border-[#EBEEF5] px-4 py-2 text-sm">
        {["oneway", "roundtrip", "multicity"].map((t) => (
          <button key={t} onClick={() => updateSearch({ tripType: t })} className={`mr-4 capitalize ${searchState.tripType === t ? "font-medium text-[#006CE4]" : "text-[#666666]"}`}>
            {t === "oneway" ? "One way" : t === "roundtrip" ? "Round trip" : "Multi-city"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_160px_160px_170px_170px]">
        <div className="relative p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#999999]">FROM</p>
          <div className="mt-1 flex items-start gap-2">
            <MapPin className="mt-1 h-4 w-4 text-[#006CE4]" />
            <div>
              <p className="text-lg font-semibold text-[#1A1A1A]">{searchState.origin}</p>
              <p className="text-xs text-[#666666]">Ninoy Aquino Intl (MNL)</p>
            </div>
          </div>
          <div className="absolute right-0 top-4 hidden h-10 w-px bg-[#EBEEF5] md:block" />
        </div>
        <div className="relative p-4">
          <button onClick={swapLocations} className="absolute -left-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-[#006CE4] hover:bg-blue-50 md:flex">
            <ArrowLeftRight className="h-3.5 w-3.5" />
          </button>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#999999]">TO</p>
          <div className="mt-1 flex items-start gap-2">
            <MapPin className="mt-1 h-4 w-4 text-[#006CE4]" />
            <div>
              <p className="text-lg font-semibold text-[#1A1A1A]">{searchState.destination || "Select destination"}</p>
              <p className="text-xs text-[#666666]">City or airport</p>
            </div>
          </div>
          <div className="absolute right-0 top-4 hidden h-10 w-px bg-[#EBEEF5] md:block" />
        </div>
        <div className="relative p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#999999]">DEPART</p>
          <div className="mt-1 flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-[#006CE4]" />
            <div>
              <p className="text-base font-semibold text-[#1A1A1A]">Thu, Apr 23</p>
              <p className="text-xs text-[#666666]">2026</p>
            </div>
          </div>
          <div className="absolute right-0 top-4 hidden h-10 w-px bg-[#EBEEF5] md:block" />
        </div>
        <div className="relative p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#999999]">RETURN</p>
          <div className="mt-1 flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-gray-400" />
            <p className="text-base font-semibold text-gray-400">{searchState.returnDate ? "Thu, Apr 25" : "Select date"}</p>
          </div>
          <div className="absolute right-0 top-4 hidden h-10 w-px bg-[#EBEEF5] md:block" />
        </div>
        <div className="relative p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#999999]">PASSENGERS</p>
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
          Search Flights
        </button>
      </div>
    </div>
  );
}
