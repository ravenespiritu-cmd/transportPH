"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Filter } from "lucide-react";
import api from "@/lib/axios";
import ScheduleCard from "@/components/booking/ScheduleCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorMessage from "@/components/shared/ErrorMessage";

export default function SearchPage() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [openSections, setOpenSections] = useState({
    price: true,
    carrier: true,
    class: true,
    departure: true,
  });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams(window.location.search);
        const nextType = query.get("type") || "";
        const params = {
          origin: query.get("origin") || "",
          destination: query.get("destination") || "",
          date: query.get("date") || "",
        };
        setTypeFilter(nextType);
        const { data } = await api.get("/schedules/search", { params });
        setSchedules(data.data || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to search schedules");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => schedules.filter((row) => {
    const seatClasses = row?.Vehicle?.SeatClasses || [];
    const matchClass = classFilter ? seatClasses.some((sc) => sc.class_name === classFilter) : true;
    const minPrice = seatClasses.length ? Math.min(...seatClasses.map((sc) => Number(sc.price))) : 0;
    const matchPrice = maxPrice ? minPrice <= Number(maxPrice) : true;
    const matchType = typeFilter ? row?.Route?.Carrier?.type === typeFilter : true;
    const hour = new Date(row.departure_at).getHours();
    const matchTime = !timeFilter
      || (timeFilter === "morning" && hour < 12)
      || (timeFilter === "afternoon" && hour >= 12 && hour < 18)
      || (timeFilter === "evening" && hour >= 18);
    return matchClass && matchPrice && matchType && matchTime;
  }), [schedules, maxPrice, classFilter, typeFilter, timeFilter]);

  const toggleSection = (name) => setOpenSections((prev) => ({ ...prev, [name]: !prev[name] }));

  return (
    <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit rounded-xl border border-slate-200 bg-white p-4 shadow-card">
        <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900">
          <Filter className="h-4 w-4 text-slate-500" />
          Filters
        </h2>
        <div className="space-y-3 text-sm">
          <section className="border-b border-slate-100 pb-3">
            <button type="button" className="flex w-full items-center justify-between font-medium text-slate-700" onClick={() => toggleSection("price")}>
              Price range
              <ChevronDown className={`h-4 w-4 transition-transform ${openSections.price ? "rotate-180" : ""}`} />
            </button>
            {openSections.price ? <input className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" type="number" placeholder="Max price (₱)" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} /> : null}
          </section>
          <section className="border-b border-slate-100 pb-3">
            <button type="button" className="flex w-full items-center justify-between font-medium text-slate-700" onClick={() => toggleSection("carrier")}>
              Carrier type
              <ChevronDown className={`h-4 w-4 transition-transform ${openSections.carrier ? "rotate-180" : ""}`} />
            </button>
            {openSections.carrier ? (
              <div className="mt-2 space-y-2">
                {["airline", "railway"].map((type) => (
                  <label key={type} className="flex items-center gap-2 text-slate-600">
                    <input type="checkbox" checked={typeFilter === type} onChange={() => setTypeFilter(typeFilter === type ? "" : type)} />
                    {type[0].toUpperCase() + type.slice(1)}
                  </label>
                ))}
              </div>
            ) : null}
          </section>
          <section className="border-b border-slate-100 pb-3">
            <button type="button" className="flex w-full items-center justify-between font-medium text-slate-700" onClick={() => toggleSection("class")}>
              Seat class
              <ChevronDown className={`h-4 w-4 transition-transform ${openSections.class ? "rotate-180" : ""}`} />
            </button>
            {openSections.class ? (
              <div className="mt-2 space-y-2">
                {["economy", "business", "first"].map((option) => (
                  <label key={option} className="flex items-center gap-2 text-slate-600">
                    <input type="radio" name="class" checked={classFilter === option} onChange={() => setClassFilter(option)} />
                    {option[0].toUpperCase() + option.slice(1)}
                  </label>
                ))}
              </div>
            ) : null}
          </section>
          <section>
            <button type="button" className="flex w-full items-center justify-between font-medium text-slate-700" onClick={() => toggleSection("departure")}>
              Departure time
              <ChevronDown className={`h-4 w-4 transition-transform ${openSections.departure ? "rotate-180" : ""}`} />
            </button>
            {openSections.departure ? (
              <div className="mt-2 space-y-2">
                {["morning", "afternoon", "evening"].map((slot) => (
                  <label key={slot} className="flex items-center gap-2 text-slate-600">
                    <input type="radio" name="time" checked={timeFilter === slot} onChange={() => setTimeFilter(slot)} />
                    {slot[0].toUpperCase() + slot.slice(1)}
                  </label>
                ))}
              </div>
            ) : null}
          </section>
        </div>
      </aside>
      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-slate-500"><span className="font-semibold text-slate-900">{filtered.length}</span> schedules found</p>
          <select className="h-10 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 transition-all duration-150 focus:border-transparent focus:ring-2 focus:ring-blue-500">
            <option>Earliest</option>
            <option>Cheapest</option>
            <option>Fastest</option>
          </select>
        </div>
        {loading && <LoadingSpinner table />}
        <ErrorMessage message={error} />
        {filtered.map((schedule) => (
          <ScheduleCard key={schedule.schedule_id} schedule={schedule} />
        ))}
      </section>
    </div>
  );
}
