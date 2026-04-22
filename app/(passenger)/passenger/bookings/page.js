"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { formatDate, formatPeso } from "@/lib/format";
import { toast } from "sonner";
import PageHeader from "@/components/shared/PageHeader";

export default function PassengerBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const load = async () => {
    const { data } = await api.get("/bookings");
    setBookings(data.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const cancelBooking = async (booking) => {
    setLoadingId(booking.booking_id);
    try {
      await api.post("/cancellations", { booking_id: booking.booking_id, reason: "User initiated" });
      toast.success("Booking cancellation submitted.");
      await load();
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <PageHeader title="My Bookings" subtitle="Track and manage your booking history." />
      <div className="overflow-x-auto rounded-xl bg-white shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr className="text-left">
              <th className="px-4 py-3">Ref</th>
              <th className="px-4 py-3">Route</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Seats</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.booking_id} className="border-t border-slate-100 transition-colors hover:bg-slate-50">
                <td className="px-4 py-3 font-mono text-blue-600">{booking.booking_ref}</td>
                <td className="px-4 py-3">{booking?.Schedule?.Route?.origin} → {booking?.Schedule?.Route?.destination}</td>
                <td className="px-4 py-3 text-slate-500">{formatDate(booking.created_at)}</td>
                <td className="px-4 py-3">{booking.BookingSeats?.length || 0}</td>
                <td className="px-4 py-3 font-semibold text-slate-900">{formatPeso(booking.total_amount)}</td>
                <td className="px-4 py-3"><StatusBadge status={booking.status} /></td>
                <td className="space-x-2 px-4 py-3">
                  <Link className="text-blue-600 transition-colors duration-150 hover:text-blue-700" href={`/passenger/bookings/${booking.booking_id}`}>View</Link>
                  {["pending", "confirmed"].includes(booking.status) && (
                    <ConfirmDialog
                      loading={loadingId === booking.booking_id}
                      onConfirm={() => cancelBooking(booking)}
                      trigger={
                        <button type="button" className="rounded-md border border-slate-200 px-2.5 py-1 text-xs text-slate-600 transition-colors duration-150 hover:bg-red-50 hover:text-red-600">
                          Cancel
                        </button>
                      }
                      description="This will cancel your reservation and may apply cancellation policies."
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
