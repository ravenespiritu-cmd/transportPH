import { Check } from "lucide-react";

const steps = ["Select seats", "Passenger details", "Payment"];

export default function StepIndicator({ currentStep = 1 }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      {steps.map((s, idx) => {
        const stepNo = idx + 1;
        const done = stepNo < currentStep;
        const active = stepNo === currentStep;
        return (
          <div key={s} className="flex items-center gap-3">
            <div className={`flex items-center gap-2 ${active ? "text-[#006CE4]" : "text-[#999999]"}`}>
              <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ${done ? "bg-emerald-500 text-white" : active ? "bg-[#006CE4] text-white" : "bg-gray-200 text-gray-500"}`}>
                {done ? <Check className="h-3.5 w-3.5" /> : stepNo}
              </span>
              <span className="text-sm font-medium">{s}</span>
            </div>
            {idx < 2 ? <span className={`h-px w-10 ${done ? "bg-emerald-400" : "bg-gray-300"}`} /> : null}
          </div>
        );
      })}
    </div>
  );
}
