import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const colorMap = {
  confirmed: "border border-emerald-200 bg-emerald-50 text-emerald-700",
  pending: "border border-amber-200 bg-amber-50 text-amber-700",
  cancelled: "border border-red-200 bg-red-50 text-red-700",
  on_time: "border border-emerald-200 bg-emerald-50 text-emerald-700",
  delayed: "border border-amber-200 bg-amber-50 text-amber-700",
};

export default function StatusBadge({ status }) {
  return (
    <Badge
      className={cn(
        "rounded-md px-2 py-0.5 text-[11px] font-semibold capitalize leading-4 tracking-wide",
        colorMap[status] || "border border-slate-200 bg-slate-100 text-slate-600",
      )}
    >
      {String(status || "-").replaceAll("_", " ")}
    </Badge>
  );
}
