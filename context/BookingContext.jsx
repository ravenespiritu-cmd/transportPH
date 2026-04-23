"use client";

import { createContext, useContext, useMemo, useState } from "react";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [bookingState, setBookingState] = useState({
    selectedSchedule: null,
    selectedClass: "economy",
    passengerDetails: [],
    paymentMethod: "gcash",
    bookingRef: "",
  });

  const updateBooking = (updates) =>
    setBookingState((prev) => ({
      ...prev,
      ...updates,
    }));

  const value = useMemo(() => ({ bookingState, updateBooking }), [bookingState]);
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
