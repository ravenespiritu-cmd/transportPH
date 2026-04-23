"use client";

import { useParams } from "next/navigation";

export default function BookingDetailPage() {
  const { id } = useParams();
  return (
    <div className="min-h-screen bg-[#F5F7FA] px-4 py-8">
      <div className="mx-auto max-w-4xl rounded-xl border border-[#E4E7ED] bg-white p-6">
        <h1 className="text-2xl font-semibold text-[#1A1A1A]">Booking Detail</h1>
        <p className="mt-1 text-sm text-[#666666]">Reference ID: {id}</p>
      </div>
    </div>
  );
}
