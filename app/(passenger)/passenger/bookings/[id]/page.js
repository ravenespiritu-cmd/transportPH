"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { formatPeso } from "@/lib/format";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState(null);
  const [method, setMethod] = useState("credit_card");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get(`/bookings/${params.id}`);
      setBooking(data.data);
    };
    load();
  }, [params.id]);

  const payNow = async () => {
    setLoading(true);
    await api.post("/payments", {
      booking_id: booking.booking_id,
      amount: booking.total_amount,
      method,
      status: "paid",
      transaction_ref: `PAY-${Date.now()}`,
    });
    const { data } = await api.get(`/bookings/${params.id}`);
    setBooking(data.data);
    setLoading(false);
    toast.success("Payment completed.");
  };

  const cancelBooking = async () => {
    setLoading(true);
    await api.post("/cancellations", { booking_id: booking.booking_id, reason: "Passenger request" });
    router.push("/passenger/bookings");
  };

  if (!booking) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-3xl space-y-5 rounded-2xl bg-white p-6 shadow-card">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Booking {booking.booking_ref}</h1>
        <p className="mt-1 text-sm text-slate-500">Review details and complete payment securely.</p>
      </div>
      <div className="grid gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        <p>Passenger: {booking?.Passenger?.first_name} {booking?.Passenger?.last_name}</p>
        <p>Status: <span className="font-medium capitalize">{booking.status}</span></p>
        <p>Payment: <span className="font-medium capitalize">{booking?.Payment?.status || "pending"}</span></p>
      </div>
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">Seat Details</h2>
        <ul className="list-disc pl-5 text-sm text-slate-600">
          {(booking.BookingSeats || []).map((seat) => (
            <li key={seat.booking_seat_id}>
              {seat.passenger_name} - {seat.seat_number} ({seat?.SeatClass?.class_name})
            </li>
          ))}
        </ul>
      </div>
      {booking.status === "pending" && (
        <div className="space-y-3 rounded-xl border border-slate-200 p-4">
          <p className="text-sm font-semibold text-slate-900">Payment</p>
          <select className="h-11 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:border-transparent focus:ring-2 focus:ring-blue-500" value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="credit_card">Credit Card</option>
            <option value="gcash">GCash</option>
            <option value="cash">Cash</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
          <button disabled={loading} onClick={payNow} className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-700 disabled:opacity-70">
            {loading ? "Processing..." : `Pay ${formatPeso(booking.total_amount)}`}
          </button>
          <p className="flex items-center justify-center gap-1 text-xs text-slate-500">
            <Lock className="h-3.5 w-3.5" />
            Secured payment
          </p>
        </div>
      )}
      {["pending", "confirmed"].includes(booking.status) && (
        <ConfirmDialog
          loading={loading}
          onConfirm={cancelBooking}
          trigger={<button type="button" className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors duration-150 hover:bg-red-100">Cancel Booking</button>}
        />
      )}
    </div>
  );
}
