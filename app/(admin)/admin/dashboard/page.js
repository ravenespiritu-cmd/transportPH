"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/lib/axios";
import StatsCard from "@/components/admin/StatsCard";
import PageHeader from "@/components/shared/PageHeader";
import { Activity, BusFront, CalendarDays, Wallet } from "lucide-react";
import { formatDate, formatPeso } from "@/lib/format";

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const load = async () => {
      const [b, s, v] = await Promise.all([api.get("/bookings"), api.get("/schedules"), api.get("/vehicles")]);
      setBookings(b.data.data || []);
      setSchedules(s.data.data || []);
      setVehicles(v.data.data || []);
    };
    load();
  }, []);

  const revenueToday = useMemo(() => {
    const today = new Date().toDateString();
    return bookings
      .filter((b) => b.status === "confirmed" && new Date(b.created_at).toDateString() === today)
      .reduce((sum, b) => sum + Number(b.total_amount || 0), 0);
  }, [bookings]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Dashboard"
        subtitle="Overview of bookings, operations, and service health."
        action={<button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-700">Export report</button>}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Total Bookings Today" value={bookings.length} icon={CalendarDays} color="blue" />
        <StatsCard title="Revenue Today" value={formatPeso(revenueToday)} icon={Wallet} color="emerald" />
        <StatsCard title="Active Schedules" value={schedules.filter((s) => s.status !== "cancelled").length} icon={Activity} color="indigo" />
        <StatsCard title="Vehicles in Service" value={vehicles.filter((v) => v.status === "in_service").length} icon={BusFront} color="amber" />
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-card">
        <h2 className="border-b border-slate-200 px-5 py-4 text-lg font-semibold text-slate-900">Recent Bookings</h2>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr className="text-left">
              <th className="px-5 py-3">Ref</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.slice(0, 8).map((booking) => (
              <tr key={booking.booking_id} className="border-t border-slate-100 transition-colors hover:bg-slate-50">
                <td className="px-5 py-3 font-mono text-sm text-blue-600">{booking.booking_ref}</td>
                <td className="px-5 py-3 capitalize text-slate-600">{booking.status.replaceAll("_", " ")}</td>
                <td className="px-5 py-3 font-semibold text-slate-900">{formatPeso(booking.total_amount)}</td>
                <td className="px-5 py-3 text-slate-500">{formatDate(booking.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
