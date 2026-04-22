"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, LogOut, Menu, Plane, X } from "lucide-react";
import { cn } from "@/lib/utils";

const roleStyles = {
  admin: "bg-blue-50 text-blue-600",
  staff: "bg-indigo-50 text-indigo-600",
  passenger: "bg-slate-100 text-slate-600",
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const pathname = usePathname();
  const { role, logout, user } = useAuth();

  const links =
    role === "admin"
      ? [
          { href: "/admin/dashboard", label: "Dashboard" },
          { href: "/admin/carriers", label: "Carriers" },
          { href: "/admin/vehicles", label: "Vehicles" },
        ]
      : [
          { href: "/", label: "Home" },
          { href: "/search", label: "Search" },
          { href: "/passenger/bookings", label: "My Bookings" },
        ];

  const initials = `${user?.first_name?.[0] || ""}${user?.last_name?.[0] || ""}`.toUpperCase() || "TP";

  useEffect(() => {
    const onOutsideClick = (event) => {
      if (!profileRef.current?.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <Plane className="h-5 w-5 text-blue-600" />
            <span>TransportPH</span>
          </Link>
          <nav className="hidden items-center gap-5 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative text-sm transition-colors duration-150",
                  pathname === link.href ? "font-medium text-blue-600" : "text-slate-500 hover:text-slate-900",
                )}
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 h-0.5 w-full origin-left scale-x-0 bg-blue-500 transition-transform duration-150 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            className="rounded-md p-2 text-slate-500 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-900"
          >
            <Bell className="h-5 w-5" />
          </button>
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen((value) => !value)}
                className="rounded-full ring-offset-2 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <Avatar className="h-9 w-9 border border-slate-200">
                  <AvatarFallback className="bg-slate-100 text-xs font-semibold text-slate-700">{initials}</AvatarFallback>
                </Avatar>
              </button>
              {profileOpen ? (
                <div className="absolute right-0 top-11 z-50 w-56 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
                  <div className="space-y-1 px-2 py-2">
                    <p className="text-sm font-medium text-slate-900">{user?.first_name || "User"}</p>
                    <span className={cn("inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide", roleStyles[role] || roleStyles.passenger)}>
                      {role || "passenger"}
                    </span>
                  </div>
                  <div className="my-1 h-px bg-slate-200" />
                  <button
                    type="button"
                    onClick={logout}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-red-600 transition-colors duration-150 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <Link href="/login" className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-100">
              Login
            </Link>
          )}
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-slate-600 transition-colors duration-150 hover:bg-slate-100 md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-30 bg-slate-900/20"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed left-0 top-0 z-40 h-screen w-72 border-r border-slate-200 bg-white p-5"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div className="mb-6 flex items-center gap-2 text-base font-bold text-slate-900">
                <Plane className="h-5 w-5 text-blue-600" />
                TransportPH
              </div>
              <nav className="space-y-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm transition-colors duration-150",
                      pathname === link.href ? "bg-blue-50 font-medium text-blue-600" : "text-slate-600 hover:bg-slate-100",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                {role ? (
                  <button
                    type="button"
                    onClick={logout}
                    className="mt-3 w-full rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors duration-150 hover:bg-red-50"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="mt-3 block rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-100"
                  >
                    Login
                  </Link>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
