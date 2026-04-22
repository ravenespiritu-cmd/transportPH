import SearchForm from "@/components/booking/SearchForm";
import { CheckCircle2, ChevronRight, CreditCard, RefreshCw, Zap } from "lucide-react";
import { formatPeso } from "@/lib/format";

const stats = [
  { value: "50+", label: "Routes" },
  { value: "200+", label: "Daily Trips" },
  { value: "10K+", label: "Passengers" },
  { value: "99.9%", label: "Uptime" },
];

const features = [
  { title: "Instant Booking", description: "Complete reservations in under a minute with a streamlined booking flow.", icon: Zap },
  { title: "Multiple Payment Options", description: "Pay via GCash, card, cash, or bank transfer with secured processing.", icon: CreditCard },
  { title: "Real-time Schedule Updates", description: "Live availability and departure updates so passengers stay informed.", icon: RefreshCw },
];

const popularRoutes = [
  { from: "Manila", to: "Cebu", type: "Airline", price: 2590, window: "08:00 - 18:30" },
  { from: "Manila", to: "Baguio", type: "Railway", price: 980, window: "06:30 - 20:00" },
  { from: "Cebu", to: "Davao", type: "Airline", price: 2290, window: "07:15 - 21:00" },
  { from: "Manila", to: "Legazpi", type: "Railway", price: 1190, window: "05:45 - 16:00" },
];

export default function Home() {
  return (
    <div>
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 px-6 pb-20 pt-28 text-center md:pt-24">
        <div className="absolute inset-0 bg-[length:40px_40px] bg-[linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.18)_1px,transparent_1px)] opacity-25" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            Trusted by 10,000+ passengers
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-blue-400">Enterprise Transport System</p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Book Flights & Trains Across the Philippines</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">Modern enterprise booking built for passengers and operations teams with reliable schedules, secure transactions, and live updates.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#search" className="rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-all duration-150 hover:bg-blue-600">
              Search Schedules
            </a>
          </div>
        </div>
      </section>

      <section id="search" className="relative z-10 mx-auto -mt-12 max-w-5xl px-4">
        <SearchForm />
      </section>

      <section className="border-y border-slate-100 bg-white py-10">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label}>
              <p className="text-3xl font-bold text-slate-900">{item.value}</p>
              <p className="mt-1 text-sm text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold text-slate-900">Built for Enterprise Operations</h2>
            <p className="mt-2 text-sm text-slate-500">Everything transport teams need to run dependable booking operations at scale.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="rounded-xl bg-white p-6 shadow-card transition-shadow duration-200 hover:shadow-hover">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-2xl font-semibold text-slate-900">Popular Routes</h2>
          <div className="grid gap-4 overflow-x-auto md:grid-cols-4">
            {popularRoutes.map((route) => (
              <article key={`${route.from}-${route.to}`} className="min-w-[250px] rounded-xl border border-slate-200 bg-white p-5 shadow-card">
                <p className="flex items-center gap-2 text-sm font-medium text-slate-900">
                  {route.from}
                  <ChevronRight className="h-4 w-4 text-blue-500" />
                  {route.to}
                </p>
                <span className={`mt-2 inline-flex rounded-full px-2 py-1 text-[11px] font-semibold ${route.type === "Railway" ? "bg-indigo-50 text-indigo-600" : "bg-blue-50 text-blue-600"}`}>
                  {route.type}
                </span>
                <p className="mt-4 text-xl font-bold text-blue-600">From {formatPeso(route.price)}</p>
                <p className="mt-1 text-xs text-slate-500">{route.window}</p>
                <a href="/search" className="mt-4 inline-block text-sm font-medium text-blue-600 transition-colors duration-150 hover:text-blue-700">
                  Book Now
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
