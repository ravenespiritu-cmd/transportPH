const map = {
  confirmed: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  pending: "bg-amber-50 text-amber-600 border border-amber-200",
  cancelled: "bg-red-50 text-red-500 border border-red-200",
  completed: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  upcoming: "bg-blue-50 text-blue-600 border border-blue-200",
};

export default function StatusBadge({ status }) {
  const key = String(status || "").toLowerCase();
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${map[key] || "bg-gray-100 text-gray-600 border border-gray-200"}`}>
      {key}
    </span>
  );
}
