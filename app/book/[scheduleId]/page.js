"use client";

import { useMemo, useState } from "react";
import { Lock, Star, Users } from "lucide-react";
import StepIndicator from "@/components/booking/StepIndicator";
import TripSummaryCard from "@/components/booking/TripSummaryCard";
import PaymentMethodCard from "@/components/booking/PaymentMethodCard";
import { formatPeso } from "@/lib/format";
import { useBooking } from "@/context/BookingContext";
import { useRouter } from "next/navigation";

const schedule = {
  schedule_id: 1,
  carrier: "Cebu Pacific",
  originCode: "MNL",
  destinationCode: "CEB",
  departure: "08:00",
  arrival: "10:30",
  duration: "2h 30m",
  number: "5J-452",
  price: 2500,
};

const classes = [
  { key: "economy", name: "Economy", icon: Users, seats: 142, price: 2500, amenities: ["Standard seat", "1x carry-on bag"] },
  { key: "business", name: "Business", icon: Users, seats: 28, price: 4200, amenities: ["Priority boarding", "In-flight meal"] },
  { key: "first", name: "First Class", icon: Star, seats: 8, price: 6800, amenities: ["Lounge access", "Premium meal"] },
];

export default function BookSchedulePage() {
  const router = useRouter();
  const { bookingState, updateBooking } = useBooking();
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(1);
  const [terms, setTerms] = useState(false);
  const [selectedClass, setSelectedClass] = useState(bookingState.selectedClass || "economy");
  const selectedPrice = classes.find((c) => c.key === selectedClass)?.price || 2500;
  const total = selectedPrice * count + 175;

  const next = () => setStep((s) => Math.min(3, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const passengers = useMemo(() => Array.from({ length: count }, (_, i) => i + 1), [count]);

  return (
    <div className="min-h-screen bg-[#F5F7FA] px-4 py-6">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_320px]">
        <div>
          <StepIndicator currentStep={step} />

          {step === 1 && (
            <div className="space-y-4">
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-xl font-semibold text-[#1A1A1A]">Manila -&gt; Cebu</p>
                <p className="text-sm text-[#666666]">{schedule.carrier} · Thu, Apr 23, 2026 · 08:00 · {schedule.duration}</p>
                <p className="font-mono text-xs text-[#666666]">{schedule.number}</p>
              </div>
              {classes.map((item) => {
                const Icon = item.icon;
                const active = selectedClass === item.key;
                return (
                  <button key={item.key} onClick={() => setSelectedClass(item.key)} className={`grid w-full grid-cols-[1fr_auto] rounded-xl border p-5 text-left ${active ? "border-2 border-[#006CE4] bg-[#EBF3FF]" : "border-[#E4E7ED] bg-white hover:border-blue-300"}`}>
                    <div>
                      <p className="mb-1 flex items-center gap-2 text-base font-semibold text-[#1A1A1A]"><Icon className="h-4 w-4 text-[#006CE4]" />{item.name}</p>
                      <p className="text-xs text-[#666666]">{item.amenities.join(" • ")}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-emerald-600">{item.seats} seats left</p>
                      <p className="text-xl font-bold text-[#006CE4]">{formatPeso(item.price)}</p>
                    </div>
                  </button>
                );
              })}
              <div className="rounded-xl border border-[#E4E7ED] bg-white p-4">
                <p className="mb-2 text-sm font-medium text-[#1A1A1A]">Number of passengers</p>
                <div className="flex items-center gap-3">
                  <button className="h-8 w-8 rounded border border-[#DCDFE6]" onClick={() => setCount((c) => Math.max(1, c - 1))}>-</button>
                  <span className="w-5 text-center">{count}</span>
                  <button className="h-8 w-8 rounded border border-[#DCDFE6]" onClick={() => setCount((c) => Math.min(9, c + 1))}>+</button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {passengers.map((n) => (
                <div key={n} className="rounded-xl border border-[#E4E7ED] bg-white p-4">
                  <p className="mb-3 text-sm font-semibold text-[#1A1A1A]">Passenger {n}</p>
                  <div className="grid gap-3 md:grid-cols-2">
                    <input placeholder="First name" className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#006CE4]" />
                    <input placeholder="Last name" className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#006CE4]" />
                    <input placeholder="Date of birth" className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#006CE4]" />
                    <input placeholder="Nationality" className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#006CE4]" />
                    <input placeholder="Passport/ID (optional)" className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#006CE4] md:col-span-2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-xl border border-[#E4E7ED] bg-white p-4">
                <p className="mb-2 text-base font-semibold text-[#1A1A1A]">Order Summary</p>
                <div className="text-sm text-[#666666]">
                  <p className="flex justify-between"><span>Subtotal</span><span>{formatPeso(selectedPrice * count)}</span></p>
                  <p className="flex justify-between"><span>Taxes & fees</span><span>{formatPeso(175)}</span></p>
                  <p className="mt-2 flex justify-between text-lg font-bold text-[#006CE4]"><span>Total</span><span>{formatPeso(total)}</span></p>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {["gcash", "card", "bank", "cash"].map((method) => (
                  <PaymentMethodCard
                    key={method}
                    method={method}
                    selected={bookingState.paymentMethod === method}
                    onSelect={(paymentMethod) => updateBooking({ paymentMethod })}
                  />
                ))}
              </div>
              {bookingState.paymentMethod === "card" && (
                <div className="grid gap-3 rounded-xl border border-[#E4E7ED] bg-white p-4 md:grid-cols-2">
                  <input placeholder="Card number" className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm md:col-span-2" />
                  <input placeholder="Name on card" className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm" />
                  <div className="grid grid-cols-2 gap-2">
                    <input placeholder="MM/YY" className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm" />
                    <input placeholder="CVV" className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm" />
                  </div>
                </div>
              )}
              <label className="flex items-start gap-2 text-sm text-[#666666]">
                <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="mt-1" />
                I agree to the Terms & Conditions and Cancellation Policy
              </label>
              <button
                disabled={!terms}
                onClick={() => router.push("/booking/success")}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#006CE4] py-4 text-base font-bold text-white hover:bg-[#0057B8] disabled:opacity-50"
              >
                <Lock className="h-4 w-4" />
                Pay {formatPeso(total)}
              </button>
            </div>
          )}

          <div className="mt-4 flex justify-between">
            <button onClick={prev} disabled={step === 1} className="rounded-lg border border-[#E4E7ED] px-4 py-2 text-sm text-[#666666]">Back</button>
            <button onClick={next} disabled={step === 3} className="rounded-lg bg-[#006CE4] px-4 py-2 text-sm text-white">Next</button>
          </div>
        </div>
        <TripSummaryCard schedule={schedule} selectedClass={selectedClass} passengerCount={count} />
      </div>
    </div>
  );
}
