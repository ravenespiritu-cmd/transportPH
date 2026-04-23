"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";

const pageMotion = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
  transition: { duration: 0.24, ease: "easeOut" },
};

export default function AppShell({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isAdminPage = pathname.startsWith("/admin");
  const isStandaloneDarkPage = ["/dashboard", "/staff-role", "/passenger-role"].includes(pathname);
  const showFooter = pathname === "/";
  const isHome = pathname === "/";

  if (isAuthPage) {
    return (
      <AnimatePresence mode="wait">
        <motion.main key={pathname} {...pageMotion} className="min-h-screen bg-slate-50">
          {children}
        </motion.main>
      </AnimatePresence>
    );
  }

  if (isAdminPage) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Sidebar />
        <AnimatePresence mode="wait">
          <motion.main key={pathname} {...pageMotion} className="ml-0 h-screen overflow-y-auto p-4 md:ml-60 md:p-8">
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    );
  }

  if (isStandaloneDarkPage) {
    return (
      <AnimatePresence mode="wait">
        <motion.main key={pathname} {...pageMotion} className="min-h-screen bg-slate-900">
          {children}
        </motion.main>
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main key={pathname} {...pageMotion} className={`px-4 pb-10 md:px-6 ${isHome ? "pt-0" : "pt-5"}`}>
          {children}
        </motion.main>
      </AnimatePresence>
      {showFooter && <Footer />}
    </div>
  );
}
