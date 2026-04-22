"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function useAuth() {
  const ctx = useContext(AuthContext);
  const role = ctx?.role || null;
  return {
    ...ctx,
    role,
    isAdmin: role === "admin",
    isStaff: role === "staff",
    isPassenger: role === "passenger",
  };
}
