import Link from "next/link";
import { Globe, MessageCircle, Plane } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-2 text-white">
            <Plane className="h-5 w-5 text-blue-400" />
            <span className="text-lg font-bold">TransportPH</span>
          </div>
          <p className="max-w-xs text-sm text-slate-400">Enterprise-grade flight and railway booking platform built for speed, reliability, and scale.</p>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-300">Company</p>
          <div className="space-y-2 text-sm">
            <Link href="#" className="block transition-colors duration-150 hover:text-white">About</Link>
            <Link href="#" className="block transition-colors duration-150 hover:text-white">Careers</Link>
            <Link href="#" className="block transition-colors duration-150 hover:text-white">Newsroom</Link>
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-300">Support</p>
          <div className="space-y-2 text-sm">
            <Link href="#" className="block transition-colors duration-150 hover:text-white">Help Center</Link>
            <Link href="#" className="block transition-colors duration-150 hover:text-white">Contact Us</Link>
            <Link href="#" className="block transition-colors duration-150 hover:text-white">System Status</Link>
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-300">Legal</p>
          <div className="space-y-2 text-sm">
            <Link href="#" className="block transition-colors duration-150 hover:text-white">Terms</Link>
            <Link href="#" className="block transition-colors duration-150 hover:text-white">Privacy</Link>
            <Link href="#" className="block transition-colors duration-150 hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-700/70">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-4 text-xs text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} TransportPH. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {[Globe, MessageCircle, Plane].map((Icon, index) => (
              <button
                key={index}
                type="button"
                className="rounded-md p-1.5 transition-colors duration-150 hover:bg-slate-800 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
