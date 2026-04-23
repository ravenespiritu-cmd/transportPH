"use client";

import AuthProvider from "@/context/AuthContext";
import { SearchProvider } from "@/context/SearchContext";
import { BookingProvider } from "@/context/BookingContext";

export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      <SearchProvider>
        <BookingProvider>{children}</BookingProvider>
      </SearchProvider>
    </AuthProvider>
  );
}
