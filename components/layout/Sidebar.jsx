"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import {
  Building2,
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Map,
  Plane,
  Ticket,
  Train,
  Wrench,
  XCircle,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const sections = [
  {
    label: "Overview",
    items: [{ href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Operations",
    items: [
      { href: "/admin/carriers", label: "Carriers", icon: Building2 },
      { href: "/admin/vehicles", label: "Vehicles", icon: Plane },
      { href: "/admin/routes", label: "Routes", icon: Map },
      { href: "/admin/schedules", label: "Schedules", icon: CalendarDays },
    ],
  },
  {
    label: "Transactions",
    items: [
      { href: "/passenger/bookings", label: "Bookings", icon: Ticket },
      { href: "/admin/payments", label: "Payments", icon: CreditCard },
      { href: "/admin/cancellations", label: "Cancellations", icon: XCircle },
    ],
  },
  {
    label: "Maintenance",
    items: [{ href: "/admin/maintenance", label: "Maintenance Logs", icon: Wrench }],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, role, logout } = useAuth();
  if (!pathname.startsWith("/admin")) return null;
  const initials = `${user?.first_name?.[0] || ""}${user?.last_name?.[0] || ""}`.toUpperCase() || "AD";

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-60 flex-col border-r border-slate-200 bg-white md:flex">
      <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-5 text-lg font-bold text-slate-900">
        <Train className="h-5 w-5 text-blue-600" />
        TransportPH
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-5">
        {sections.map((section) => (
          <div key={section.label}>
            <p className="mb-1 mt-6 px-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">{section.label}</p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors duration-150",
                      active
                        ? "border-l-2 border-blue-600 bg-blue-50 font-medium text-blue-600"
                        : "text-slate-600 hover:bg-slate-100",
                    )}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="m-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <div className="mb-3 flex items-center gap-2">
          <Avatar className="h-9 w-9 border border-slate-200">
            <AvatarFallback className="bg-white text-xs font-semibold text-slate-700">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-slate-900">{user?.first_name || "Admin User"}</p>
            <p className="text-xs text-slate-500">{role || "admin"}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition-colors duration-150 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-3.5 w-3.5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
