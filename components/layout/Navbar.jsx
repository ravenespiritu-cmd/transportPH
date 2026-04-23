"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { Plane } from "lucide-react";
import { cn } from "@/lib/utils";

const publicLinks = [
  { href: "/", label: "Flights" },
  { href: "/search", label: "Trains" },
];

export default function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const pathname = usePathname();
  const { role, logout, user } = useAuth();
  const initials = `${user?.first_name?.[0] || ""}${user?.last_name?.[0] || ""}`.toUpperCase() || "PM";

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
    <header className="sticky top-0 z-40 h-14 border-b border-[#E4E7ED] bg-white shadow-sm">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-base font-semibold text-gray-900">
            <Plane className="h-4.5 w-4.5 text-[#006CE4]" />
            <span>TransportPH</span>
          </Link>
          <nav className="hidden items-center gap-5 md:flex">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative text-sm transition-colors",
                  pathname === link.href ? "border-b-2 border-[#006CE4] pb-1 font-medium text-[#006CE4]" : "text-gray-600 hover:text-[#006CE4]",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/bookings" className="text-sm text-gray-600 hover:text-[#006CE4]">My Bookings</Link>
          <span className="h-5 w-px bg-[#EBEEF5]" />
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen((value) => !value)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#DCDFE6] text-xs font-semibold text-gray-700"
              >
                {initials}
              </button>
              {profileOpen ? (
                <div className="absolute right-0 top-10 z-50 w-48 rounded-lg border border-[#E4E7ED] bg-white p-1 shadow-lg">
                  <div className="space-y-1 px-2 py-2">
                    <p className="text-sm font-medium text-gray-900">{user?.first_name || "User"}</p>
                    <span className="inline-flex rounded-full bg-[#EBF3FF] px-2 py-0.5 text-[11px] text-[#006CE4]">
                      {role || "passenger"}
                    </span>
                  </div>
                  <div className="my-1 h-px bg-[#EBEEF5]" />
                  <button
                    type="button"
                    onClick={logout}
                    className="w-full rounded-md px-2 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <Link href="/login" className="rounded-full border border-[#006CE4] px-4 py-1.5 text-sm font-medium text-[#006CE4] hover:bg-blue-50">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
