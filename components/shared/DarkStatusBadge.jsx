"use client";

import { cn } from "@/lib/utils";

const badgeStyles = {
  confirmed: "bg-green-950 text-green-400 border border-green-800",
  pending: "bg-amber-950 text-amber-300 border border-amber-800",
  cancelled: "bg-red-950 text-red-400 border border-red-800",
  scheduled: "bg-amber-950 text-amber-300 border border-amber-800",
  overdue: "bg-red-950 text-red-400 border border-red-800",
  done: "bg-green-950 text-green-400 border border-green-800",
  in_progress: "bg-blue-950 text-blue-300 border border-blue-800",
  on_time: "bg-green-950 text-green-400 border border-green-800",
  delayed: "bg-amber-950 text-amber-300 border border-amber-800",
};

export default function DarkStatusBadge({ status, children }) {
  const normalized = String(status || "").toLowerCase();
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
        badgeStyles[normalized] || "bg-slate-800 text-slate-300 border border-slate-700",
      )}
    >
      {children || normalized.replaceAll("_", " ")}
    </span>
  );
}
