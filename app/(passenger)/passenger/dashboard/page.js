"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/lib/axios";
import useAuth from "@/hooks/useAuth";
import StatsCard from "@/components/admin/StatsCard";
import SearchForm from "@/components/booking/SearchForm";
import StatusBadge from "@/components/admin/StatusBadge";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { CheckCircle2, Clock3, Star, Ticket, XCircle } from "lucide-react";
import { formatDate } from "@/lib/format";

export default function PassengerDashboardPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/bookings");
        setBookings(data.data || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const stats = useMemo(() => {
    const confirmed = bookings.filter((b) => b.status === "confirmed").length;
    const pending = bookings.filter((b) => b.status === "pending").length;
    const cancelled = bookings.filter((b) => b.status === "cancelled").length;
    return { total: bookings.length, confirmed, pending, cancelled };
  }, [bookings]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Good morning, {user?.first_name || "Juan"}!</h1>
          <p className="mt-1 text-sm text-blue-100">Manage trips, track bookings, and discover routes.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
          <Star className="h-4 w-4 text-amber-300" />
          {user?.loyalty_points || 1240} pts
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard title="Total Bookings" value={stats.total} icon={Ticket} color="blue" />
        <StatsCard title="Confirmed" value={stats.confirmed} icon={CheckCircle2} color="emerald" />
        <StatsCard title="Pending" value={stats.pending} icon={Clock3} color="amber" />
        <StatsCard title="Cancelled" value={stats.cancelled} icon={XCircle} color="slate" />
      </div>

      <div>
        <SearchForm compact />
      </div>

      <section className="overflow-hidden rounded-xl bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Recent Bookings</h2>
          <a href="/passenger/bookings" className="text-sm font-medium text-blue-600 transition-colors duration-150 hover:text-blue-700">
            View all →
          </a>
        </div>
        {loading ? (
          <LoadingSpinner table />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3 text-left">Reference</th>
                  <th className="px-5 py-3 text-left">Route</th>
                  <th className="px-5 py-3 text-left">Date</th>
                  <th className="px-5 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map((booking) => (
                  <tr key={booking.booking_id} className="border-t border-slate-100 transition-colors hover:bg-slate-50/50">
                    <td className="px-5 py-3 font-mono text-sm text-blue-600">{booking.booking_ref}</td>
                    <td className="px-5 py-3 text-slate-700">{booking?.Schedule?.Route?.origin} → {booking?.Schedule?.Route?.destination}</td>
                    <td className="px-5 py-3 text-slate-500">{formatDate(booking.created_at)}</td>
                    <td className="px-5 py-3"><StatusBadge status={booking.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
