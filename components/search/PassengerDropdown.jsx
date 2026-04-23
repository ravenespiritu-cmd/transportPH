"use client";

import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Users } from "lucide-react";

export default function PassengerDropdown({ passengers, seatClass, onChange, onClassChange }) {
  const [open, setOpen] = useState(false);
  const total = passengers.adults + passengers.children + passengers.infants;

  const updateCount = (key, delta) => {
    const next = Math.max(0, passengers[key] + delta);
    if (key === "adults" && next < 1) return;
    onChange({ ...passengers, [key]: next });
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button type="button" className="flex w-full items-center gap-2 rounded-none bg-transparent text-left">
          <Users className="h-4 w-4 text-blue-600" />
          <div>
            <p className="text-base font-semibold text-[#1A1A1A]">{total} Adult{total > 1 ? "s" : ""}</p>
            <p className="text-xs text-[#666666] capitalize">{seatClass}</p>
          </div>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={8} align="start" className="z-50 w-72 rounded-xl border border-[#E4E7ED] bg-white p-4 shadow-lg">
          {[
            ["Adults (12+)", "adults"],
            ["Children (2-11)", "children"],
            ["Infants (0-2)", "infants"],
          ].map(([label, key]) => (
            <div key={key} className="mb-3 flex items-center justify-between text-sm">
              <span className="text-[#666666]">{label}</span>
              <div className="flex items-center gap-2">
                <button type="button" className="h-7 w-7 rounded border border-[#DCDFE6]" onClick={() => updateCount(key, -1)}>-</button>
                <span className="w-5 text-center">{passengers[key]}</span>
                <button type="button" className="h-7 w-7 rounded border border-[#DCDFE6]" onClick={() => updateCount(key, 1)}>+</button>
              </div>
            </div>
          ))}
          <div className="mb-3 flex gap-2">
            {["economy", "business", "first"].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => onClassChange(c)}
                className={`rounded-full px-3 py-1 text-xs capitalize ${seatClass === c ? "bg-[#006CE4] text-white" : "bg-[#EBF3FF] text-[#006CE4]"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <button type="button" className="w-full rounded-lg bg-[#006CE4] py-2 text-sm font-medium text-white" onClick={() => setOpen(false)}>
            Done
          </button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
