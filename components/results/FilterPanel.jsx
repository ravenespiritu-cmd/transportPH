"use client";

export default function FilterPanel({ filters, setFilters, isFlight }) {
  return (
    <aside className="sticky top-20 rounded-xl border border-[#E4E7ED] bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-[#1A1A1A]">Filters</h3>
        <button className="text-sm text-[#006CE4]" onClick={() => setFilters({})}>Reset all</button>
      </div>
      {isFlight && (
        <div className="mb-4 border-b border-[#EBEEF5] pb-4">
          <p className="mb-2 text-sm font-medium text-[#1A1A1A]">Stops</p>
          {["Any", "Non-stop only", "1 stop"].map((v) => <label key={v} className="mb-1 block text-sm text-[#666666]"><input type="checkbox" className="mr-2" />{v}</label>)}
        </div>
      )}
      <div className="mb-4 border-b border-[#EBEEF5] pb-4">
        <p className="mb-2 text-sm font-medium text-[#1A1A1A]">Departure time</p>
        <div className="grid grid-cols-2 gap-2">
          {["00:00-06:00", "06:00-12:00", "12:00-18:00", "18:00-24:00"].map((slot) => (
            <button key={slot} className="rounded-lg border border-[#DCDFE6] px-2 py-1.5 text-xs text-[#666666] hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600">{slot}</button>
          ))}
        </div>
      </div>
      <div className="mb-4 border-b border-[#EBEEF5] pb-4">
        <p className="mb-2 text-sm font-medium text-[#1A1A1A]">Price range</p>
        <input type="range" className="w-full" />
        <p className="mt-1 text-xs text-[#666666]">P500 - P5,000</p>
      </div>
      <div className="mb-4 border-b border-[#EBEEF5] pb-4">
        <p className="mb-2 text-sm font-medium text-[#1A1A1A]">Airline/Railway</p>
        {["Cebu Pacific", "Philippine Airlines", "PNR (Philippine National Railways)"].map((v) => <label key={v} className="mb-1 block text-sm text-[#666666]"><input type="checkbox" className="mr-2" />{v}</label>)}
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-[#1A1A1A]">Class</p>
        {["All", "Economy", "Business", "First"].map((v) => <label key={v} className="mb-1 block text-sm text-[#666666]"><input type="radio" name="classFilter" className="mr-2" />{v}</label>)}
      </div>
    </aside>
  );
}
