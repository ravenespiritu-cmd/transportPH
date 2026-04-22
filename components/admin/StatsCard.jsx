import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const colorMap = {
  blue: "bg-blue-50 text-blue-600",
  emerald: "bg-emerald-50 text-emerald-600",
  indigo: "bg-indigo-50 text-indigo-600",
  amber: "bg-amber-50 text-amber-600",
  slate: "bg-slate-100 text-slate-600",
};

export default function StatsCard({ title, value, icon: Icon, color = "blue", trend = "+12%" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-hover"
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">{title}</p>
        <span className={cn("inline-flex h-10 w-10 items-center justify-center rounded-lg", colorMap[color] || colorMap.slate)}>
          {Icon ? <Icon className="h-5 w-5" /> : null}
        </span>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-[28px] font-bold tracking-tight text-slate-900">{value}</p>
        <p className="flex items-center gap-1 text-xs font-medium text-emerald-600">
          {trend}
          <TrendingUp className="h-3.5 w-3.5" />
        </p>
      </div>
    </motion.div>
  );
}
