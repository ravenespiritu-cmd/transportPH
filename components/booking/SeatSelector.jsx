"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Lock, Minus, Plus } from "lucide-react";
import api from "@/lib/axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import BookingConfirmation from "./BookingConfirmation";
import { formatPeso } from "@/lib/format";
import { toast } from "sonner";

const steps = ["Select Seats", "Review", "Payment"];

export default function SeatSelector({ schedule, seatClasses = [] }) {
  const [open, setOpen] = useState(false);
  const [seatClassId, setSeatClassId] = useState(seatClasses[0]?.seat_class_id || "");
  const [seats, setSeats] = useState(1);
  const [step, setStep] = useState(1);
  const [passengerNames, setPassengerNames] = useState([""]);
  const [paymentMethod, setPaymentMethod] = useState("gcash");
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const selectedClass = seatClasses.find((item) => Number(item.seat_class_id) === Number(seatClassId));
  const subtotal = Number(selectedClass?.price || 0) * seats;
  const taxes = subtotal * 0.1;
  const total = subtotal + taxes;

  const onConfirm = async () => {
    setLoading(true);
    const payload = {
      schedule_id: schedule.schedule_id,
      seat_class_id: Number(seatClassId),
      seats: Number(seats),
    };
    try {
      const { data } = await api.post("/bookings", payload);
      setConfirmation(data.data);
      toast.success("Booking completed successfully.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-700">
          Book Now
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border-none p-0 shadow-modal md:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="border-b border-slate-200 p-6 text-xl text-slate-900">Booking Flow</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 p-6">
          <div className="grid gap-3 md:grid-cols-3">
            {steps.map((title, index) => {
              const currentStep = index + 1;
              const isComplete = step > currentStep;
              const isActive = step === currentStep;
              return (
                <div key={title} className="flex items-center gap-2">
                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${isComplete ? "bg-emerald-500 text-white" : isActive ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"}`}>
                    {isComplete ? <CheckCircle2 className="h-4 w-4" /> : currentStep}
                  </span>
                  <span className={`text-sm ${isActive ? "font-medium text-blue-600" : "text-slate-500"}`}>{title}</span>
                </div>
              );
            })}
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div className="grid gap-3 md:grid-cols-3">
                {seatClasses.map((item) => (
                  <button
                    key={item.seat_class_id}
                    type="button"
                    onClick={() => setSeatClassId(item.seat_class_id)}
                    className={`rounded-xl border p-4 text-left transition-colors duration-150 ${Number(seatClassId) === Number(item.seat_class_id) ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}
                  >
                    <p className="font-semibold capitalize text-slate-900">{item.class_name}</p>
                    <p className="text-sm text-slate-500">{formatPeso(item.price)} per seat</p>
                    <p className="text-xs text-amber-600">{item.available_seats} seats available</p>
                    <p className="mt-2 text-xs text-slate-500">WiFi • Baggage • Snacks</p>
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                <p className="text-sm font-medium text-slate-700">Passengers</p>
                <div className="flex items-center gap-2">
                  <button type="button" className="rounded-md border border-slate-200 p-2 hover:bg-slate-100" onClick={() => setSeats((value) => Math.max(1, value - 1))}>
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-semibold text-slate-900">{seats}</span>
                  <button
                    type="button"
                    className="rounded-md border border-slate-200 p-2 hover:bg-slate-100"
                    onClick={() => {
                      setSeats((value) => value + 1);
                      setPassengerNames((prev) => [...prev, ""]);
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Trip Summary</p>
                <p className="text-sm text-slate-500">{schedule?.Route?.origin} → {schedule?.Route?.destination}</p>
                <p className="text-sm text-slate-500">Class: {selectedClass?.class_name}</p>
              </div>
              <div className="space-y-2">
                {[...Array(seats)].map((_, index) => (
                  <input
                    key={index}
                    value={passengerNames[index] || ""}
                    onChange={(e) => {
                      const next = [...passengerNames];
                      next[index] = e.target.value;
                      setPassengerNames(next);
                    }}
                    placeholder={`Passenger ${index + 1} name`}
                    className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm text-slate-700 transition-all duration-150 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>
              <div className="rounded-xl border border-slate-200 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Seat x {seats}</span>
                  <span className="text-slate-900">{formatPeso(subtotal)}</span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-slate-500">Taxes</span>
                  <span className="text-slate-900">{formatPeso(taxes)}</span>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-slate-200 pt-2 font-semibold text-slate-900">
                  <span>Total</span>
                  <span>{formatPeso(total)}</span>
                </div>
              </div>
            </div>
          )}

          {step === 3 && !confirmation && (
            <div className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  { id: "gcash", label: "GCash" },
                  { id: "credit_card", label: "Credit Card" },
                  { id: "cash", label: "Cash" },
                  { id: "bank_transfer", label: "Bank Transfer" },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`rounded-xl border p-4 text-left text-sm font-medium transition-colors duration-150 ${paymentMethod === method.id ? "border-blue-500 bg-blue-50 text-blue-600" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-700 disabled:opacity-70"
              >
                {loading ? "Processing payment..." : `Pay ${formatPeso(total)}`}
              </button>
              <p className="flex items-center justify-center gap-1 text-xs text-slate-500">
                <Lock className="h-3.5 w-3.5" />
                Secured payment
              </p>
            </div>
          )}

          <AnimatePresence>{confirmation ? <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><BookingConfirmation booking={confirmation} /></motion.div> : null}</AnimatePresence>

          {!confirmation && (
            <div className="flex justify-between gap-2">
              <button
                type="button"
                disabled={step === 1}
                onClick={() => setStep((current) => Math.max(1, current - 1))}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 transition-colors duration-150 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="button"
                disabled={step === 3}
                onClick={() => setStep((current) => Math.min(3, current + 1))}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition-colors duration-150 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
