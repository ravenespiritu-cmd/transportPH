"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import DataTable from "@/components/admin/DataTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PageHeader from "@/components/shared/PageHeader";
import { formatDate, formatTime24 } from "@/lib/format";
import { toast } from "sonner";

export default function MaintenancePage() {
  const [items, setItems] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({
    vehicle_id: "",
    description: "",
    performed_by: "",
    scheduled_at: "",
    status: "scheduled",
  });

  const load = async () => {
    const [m, v] = await Promise.all([api.get("/maintenance"), api.get("/vehicles")]);
    setItems(m.data.data || []);
    setVehicles(v.data.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const addLog = async () => {
    await api.post("/maintenance", { ...form, vehicle_id: Number(form.vehicle_id) });
    toast.success("Maintenance log added.");
    await load();
  };

  const markComplete = async (row) => {
    await api.put(`/maintenance/${row.log_id}`, { status: "completed", completed_at: new Date() });
    toast.success("Marked as complete.");
    await load();
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Maintenance Logs"
        subtitle="Monitor maintenance schedules and completion."
        action={(
          <Dialog>
            <DialogTrigger asChild>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-700">Add Log</button>
            </DialogTrigger>
            <DialogContent className="max-w-lg rounded-2xl p-6 shadow-modal">
            <DialogHeader><DialogTitle>Add Maintenance Log</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <select className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" value={form.vehicle_id} onChange={(e) => setForm({ ...form, vehicle_id: e.target.value })}>
                <option value="">Vehicle</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.vehicle_id} value={vehicle.vehicle_id}>{vehicle.model}</option>
                ))}
              </select>
              <input className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <input className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" placeholder="Performed by" value={form.performed_by} onChange={(e) => setForm({ ...form, performed_by: e.target.value })} />
              <input className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" type="datetime-local" value={form.scheduled_at} onChange={(e) => setForm({ ...form, scheduled_at: e.target.value })} />
              <button className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-700" onClick={addLog}>Save</button>
            </div>
            </DialogContent>
          </Dialog>
        )}
      />
      <DataTable
        columns={[
          { key: "vehicle", label: "Vehicle", render: (row) => row?.Vehicle?.model || "-" },
          { key: "description", label: "Description" },
          { key: "performed_by", label: "Performed By" },
          { key: "scheduled_at", label: "Scheduled At", render: (row) => `${formatDate(row.scheduled_at)} • ${formatTime24(row.scheduled_at)}` },
          { key: "status", label: "Status" },
          {
            key: "mark",
            label: "Complete",
            render: (row) =>
              row.status !== "completed" ? (
                <button className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors duration-150 hover:bg-blue-700" onClick={() => markComplete(row)}>
                  Mark as Complete
                </button>
              ) : (
                "Done"
              ),
          },
        ]}
        data={items}
      />
    </div>
  );
}
