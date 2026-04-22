import { cn } from "@/lib/utils";

export default function LoadingSpinner({ className, table = false }) {
  if (table) {
    return (
      <div className={cn("space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-card", className)}>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-10 animate-pulse rounded-md bg-slate-100" />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center py-8", className)}>
      <span className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
    </div>
  );
}
