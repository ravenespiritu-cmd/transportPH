"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sections = [
  {
    label: "OVERVIEW",
    items: [{ href: "/dashboard", label: "Dashboard" }],
  },
  {
    label: "OPERATIONS",
    items: [
      { href: "/admin/carriers", label: "Carriers" },
      { href: "/admin/vehicles", label: "Vehicles" },
      { href: "/admin/routes", label: "Routes" },
      { href: "/admin/schedules", label: "Schedules" },
    ],
  },
  {
    label: "TRANSACTIONS",
    items: [
      { href: "/admin/bookings", label: "Bookings" },
      { href: "/admin/payments", label: "Payments" },
      { href: "/admin/cancellations", label: "Cancellations" },
    ],
  },
  {
    label: "MAINTENANCE",
    items: [{ href: "/admin/maintenance", label: "Maint. logs" }],
  },
];

function AdminRoleSidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[72px] flex-col border-r border-slate-700 bg-slate-800 md:w-[200px]">
      <div className="border-b border-slate-700 px-3 py-4 md:px-4">
        <p className="text-center text-[15px] font-bold text-slate-100 md:text-left">TransportPH</p>
        <p className="mt-0.5 hidden text-[11px] text-slate-400 md:block">Admin panel</p>
      </div>
      <div className="overflow-y-auto px-2 py-3 md:px-3">
        {sections.map((section) => (
          <div key={section.label} className="mb-4">
            <p className="mb-1 hidden px-2 text-[10px] tracking-widest text-slate-500 md:block">{section.label}</p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={item.label}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-md px-2 py-2 text-xs text-slate-400 transition-colors hover:bg-slate-900 hover:text-slate-100 md:justify-start md:text-[12px]",
                      isActive && "rounded-none border-l-2 border-l-blue-500 bg-blue-700 text-white",
                    )}
                  >
                    <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-current" />
                    <span className="hidden md:block">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default function AdminGroupLayout({ children }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin/")) {
    return children;
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <AdminRoleSidebar />
      <main className="ml-[72px] p-4 md:ml-[200px] md:p-6">{children}</main>
    </div>
  );
}
