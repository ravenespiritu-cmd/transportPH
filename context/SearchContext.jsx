"use client";

import { createContext, useContext, useMemo, useState } from "react";

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  const [state, setState] = useState({
    activeTab: "flights",
    tripType: "roundtrip",
    origin: "Manila",
    destination: "Cebu",
    departDate: "2026-04-23",
    returnDate: "",
    passengers: { adults: 1, children: 0, infants: 0 },
    seatClass: "economy",
  });

  const updateSearch = (updates) => setState((prev) => ({ ...prev, ...updates }));

  const value = useMemo(() => ({ searchState: state, updateSearch }), [state]);
  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within SearchProvider");
  return ctx;
}
