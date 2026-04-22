"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import DataTable from "@/components/admin/DataTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PageHeader from "@/components/shared/PageHeader";
import { toast } from "sonner";

export default function VehiclesPage() {
  const [items, setItems] = useState([]);
  const [carriers, setCarriers] = useState([]);
  const [form, setForm] = useState({ carrier_id: "", model: "", type: "aircraft", total_seats: 100, status: "in_service" });

  const load = async () => {
    const [v, c] = await Promise.all([api.get("/vehicles"), api.get("/carriers")]);
    setItems(v.data.data || []);
    setCarriers(c.data.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const addVehicle = async () => {
    await api.post("/vehicles", { ...form, carrier_id: Number(form.carrier_id), total_seats: Number(form.total_seats) });
    toast.success("Vehicle saved.");
    await load();
  };

  const deleteVehicle = async (row) => {
    await api.delete(`/vehicles/${row.vehicle_id}`);
    toast.success("Vehicle deleted.");
    await load();
  };

  const editVehicle = async (row) => {
    const status = window.prompt("Vehicle status", row.status || "in_service");
    if (!status) return;
    await api.put(`/vehicles/${row.vehicle_id}`, { status });
    toast.success("Vehicle updated.");
    await load();
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Vehicles"
        subtitle="Manage active aircraft and train inventory."
        action={(
          <Dialog>
            <DialogTrigger asChild>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-700">Add Vehicle</button>
            </DialogTrigger>
            <DialogContent className="max-w-lg rounded-2xl p-6 shadow-modal">
            <DialogHeader><DialogTitle>Add Vehicle</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <select className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" value={form.carrier_id} onChange={(e) => setForm({ ...form, carrier_id: e.target.value })}>
                <option value="">Select Carrier</option>
                {carriers.map((carrier) => (
                  <option key={carrier.carrier_id} value={carrier.carrier_id}>{carrier.name}</option>
                ))}
              </select>
              <input className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" placeholder="Model" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
              <select className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="aircraft">Aircraft</option>
                <option value="train">Train</option>
              </select>
              <input className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" type="number" placeholder="Total Seats" value={form.total_seats} onChange={(e) => setForm({ ...form, total_seats: e.target.value })} />
              <input className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" placeholder="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} />
              <button className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-700" onClick={addVehicle}>Save</button>
            </div>
            </DialogContent>
          </Dialog>
        )}
      />
      <DataTable
        columns={[
          { key: "model", label: "Model" },
          { key: "type", label: "Type" },
          { key: "carrier", label: "Carrier", render: (row) => row?.Carrier?.name || "-" },
          { key: "status", label: "Status" },
        ]}
        data={items}
        onEdit={editVehicle}
        onDelete={deleteVehicle}
      />
    </div>
  );
}
