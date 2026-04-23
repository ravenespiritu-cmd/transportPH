"use client";

import { Headset, Plane, ShieldCheck, Train, Zap } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import FlightSearchForm from "@/components/search/FlightSearchForm";
import TrainSearchForm from "@/components/search/TrainSearchForm";
import { formatPeso } from "@/lib/format";

const routes = [
  { code: "MNL -> CEB", carrier: "Cebu Pacific", type: "Airline", price: 2500, duration: "2h 30m" },
  { code: "MNL -> DVO", carrier: "Philippine Airlines", type: "Airline", price: 3800, duration: "1h 55m" },
  { code: "MNL -> BIC", carrier: "PNR", type: "Railway", price: 680, duration: "5h 00m" },
  { code: "MNL -> BTG", carrier: "PNR", type: "Railway", price: 420, duration: "2h 30m" },
];

export default function Home() {
  const { searchState, updateSearch } = useSearch();

  return (
    <div className="bg-[#F5F7FA]">
      <section className="relative h-[500px] overflow-visible bg-[linear-gradient(125deg,#0B3A8D_0%,#006CE4_40%,#2A8CFF_100%)]">
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-blue-200">TransportPH Smart Booking</p>
          <h1 className="text-4xl font-bold text-white drop-shadow-sm md:text-5xl">Book Flights & Trains Across the Philippines</h1>
          <p className="mt-3 max-w-2xl text-base text-blue-100">Built for Filipino travelers who need fast booking, transparent fares, and instant ticket confirmation.</p>
          <div className="absolute -bottom-12 w-[90%] max-w-5xl">
            {searchState.activeTab === "flights" ? <FlightSearchForm /> : <TrainSearchForm />}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 pt-32">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[22px] font-semibold text-[#1A1A1A]">Popular Routes</h2>
          <a href="#" className="text-sm text-[#006CE4]">View all routes -&gt;</a>
        </div>
        <div className="mb-5 flex gap-2">
          <button onClick={() => updateSearch({ activeTab: "flights" })} className={`rounded-lg px-4 py-1.5 text-sm ${searchState.activeTab === "flights" ? "bg-[#006CE4] text-white" : "bg-white text-[#666666]"}`}>Flights</button>
          <button onClick={() => updateSearch({ activeTab: "trains" })} className={`rounded-lg px-4 py-1.5 text-sm ${searchState.activeTab === "trains" ? "bg-[#006CE4] text-white" : "bg-white text-[#666666]"}`}>Trains</button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {routes.map((route) => (
            <article key={route.code} className="cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white transition hover:shadow-md">
              <div className={`flex h-20 items-center justify-center bg-gradient-to-r ${route.type === "Airline" ? "from-blue-600 to-sky-500" : "from-indigo-600 to-purple-500"} text-sm font-bold text-white`}>{route.code}</div>
              <div className="p-3.5">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-[#666666]">{route.carrier}</p>
                  <span className={`rounded-full px-2 py-0.5 text-xs ${route.type === "Airline" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"}`}>{route.type}</span>
                </div>
                <p className="text-[11px] text-[#999999]">From</p>
                <p className="text-lg font-bold text-[#006CE4]">{formatPeso(route.price)}</p>
                <div className="mt-1 flex items-center justify-between text-xs text-[#666666]">
                  <span>{route.duration}</span>
                  <a href="/search" className="font-medium text-[#006CE4]">Book now -&gt;</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-2xl font-semibold text-[#1A1A1A]">Why book with TransportPH?</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: "Secure Booking", text: "Your payments are protected with industry-standard encryption", icon: ShieldCheck },
              { title: "Instant Confirmation", text: "Get your e-ticket in seconds after payment", icon: Zap },
              { title: "24/7 Support", text: "Our team is always here to help you", icon: Headset },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-xl border border-gray-100 p-8 text-center transition hover:shadow-md">
                  <span className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#EBF3FF]"><Icon className="h-5 w-5 text-[#006CE4]" /></span>
                  <h3 className="text-lg font-semibold text-[#1A1A1A]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#666666]">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-14">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-[#006CE4] px-8 py-10 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-wider text-blue-200">New member exclusive</p>
            <p className="text-3xl font-bold text-white">Get P200 off your first booking</p>
            <p className="mt-1 text-blue-200">Use code: WELCOME200</p>
          </div>
          <button className="rounded-lg bg-white px-6 py-3 font-semibold text-[#006CE4] hover:bg-blue-50">Sign Up Now -&gt;</button>
        </div>
      </section>
    </div>
  );
}
