"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import FlightCard from "@/components/results/FlightCard";
import FilterPanel from "@/components/results/FilterPanel";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useSearch } from "@/context/SearchContext";

export default function SearchPage() {
  const router = useRouter();
  const { searchState } = useSearch();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("Earliest");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams(window.location.search);
        const query = {
          origin: params.get("origin") || searchState.origin,
          destination: params.get("destination") || searchState.destination,
          date: params.get("date") || searchState.departDate,
          type: params.get("type") || searchState.activeTab,
          class: params.get("class") || searchState.seatClass,
        };
        const { data } = await api.get("/api/schedules/search", { params: query });
        const mapped = (data?.data || []).map((s, idx) => ({
          schedule_id: s.schedule_id || idx + 1,
          carrier: s?.Route?.Carrier?.name || "Cebu Pacific",
          type: s?.Route?.Carrier?.type || (query.type === "trains" ? "railway" : "airline"),
          departure: new Date(s.departure_at || "2026-04-23T08:00:00").toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }),
          arrival: new Date(s.arrival_at || "2026-04-23T10:30:00").toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }),
          duration: "2h 30m",
          stops: "Non-stop",
          originCode: `${query.origin} (MNL)`,
          destinationCode: `${query.destination} (CEB)`,
          seatsLeft: 6 + idx,
          price: Number(s?.Vehicle?.SeatClasses?.[0]?.price || 2500),
          className: query.class || "Economy",
        }));
        setSchedules(mapped);
      } catch (err) {
        void err;
        setSchedules([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [searchState]);

  const filtered = useMemo(() => schedules, [schedules]);

  return (
    <div className="min-h-screen bg-[#F5F7FA] px-4 pb-8 pt-5">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 rounded-xl border border-[#E4E7ED] bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#666666]">{searchState.origin} -&gt; {searchState.destination} · Thu Apr 23 · 1 Adult · Economy</p>
            <button className="text-sm text-[#006CE4]">Modify</button>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <FilterPanel filters={filters} setFilters={setFilters} isFlight />
          <section>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-[#666666]">{filtered.length} results found</p>
              <div className="flex gap-2">
                {["Earliest", "Cheapest", "Fastest"].map((s) => (
                  <button key={s} className={`rounded-lg px-3 py-1.5 text-sm ${sort === s ? "bg-[#006CE4] text-white" : "bg-white text-[#666666]"}`} onClick={() => setSort(s)}>{s}</button>
                ))}
              </div>
            </div>
            {loading ? <LoadingSpinner table /> : filtered.map((schedule) => (
              <FlightCard key={schedule.schedule_id} schedule={schedule} onSelect={() => router.push(`/book/${schedule.schedule_id}`)} />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
