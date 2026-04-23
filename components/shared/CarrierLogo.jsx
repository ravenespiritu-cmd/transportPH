export default function CarrierLogo({ carrierName = "" }) {
  const upper = carrierName.toUpperCase();
  const isPNR = upper.includes("PNR");
  const isPAL = upper.includes("PHILIPPINE");
  const initials = isPNR ? "PNR" : isPAL ? "PA" : "CP";
  const bg = isPNR ? "bg-purple-100 text-purple-700" : isPAL ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700";

  return <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold ${bg}`}>{initials}</span>;
}
