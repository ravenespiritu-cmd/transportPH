"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import DataTable from "@/components/admin/DataTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PageHeader from "@/components/shared/PageHeader";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";

export default function RoutesPage() {
  const { isAdmin } = useAuth();
  const [items, setItems] = useState([]);
  const [carriers, setCarriers] = useState([]);
  const [form, setForm] = useState({
    carrier_id: "",
    origin: "",
    destination: "",
    distance_km: "",
    estimated_duration_min: "",
  });

  const load = async () => {
    const [r, c] = await Promise.all([api.get("/routes"), api.get("/carriers")]);
    setItems(r.data.data || []);
    setCarriers(c.data.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const addRoute = async () => {
    await api.post("/routes", {
      ...form,
      carrier_id: Number(form.carrier_id),
      distance_km: Number(form.distance_km),
      estimated_duration_min: Number(form.estimated_duration_min),
    });
    toast.success("Route saved.");
    await load();
  };

  const deleteRoute = async (row) => {
    await api.delete(`/routes/${row.route_id}`);
    toast.success("Route deleted.");
    await load();
  };

  const editRoute = async (row) => {
    const duration = window.prompt("Estimated duration (minutes)", row.estimated_duration_min);
    if (!duration) return;
    await api.put(`/routes/${row.route_id}`, { estimated_duration_min: Number(duration) });
    toast.success("Route updated.");
    await load();
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Routes"
        subtitle="Define origins, destinations, and route durations."
        action={(
          <Dialog>
            <DialogTrigger asChild>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-700">Add Route</button>
            </DialogTrigger>
            <DialogContent className="max-w-lg rounded-2xl p-6 shadow-modal">
            <DialogHeader><DialogTitle>Add Route</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <select className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" value={form.carrier_id} onChange={(e) => setForm({ ...form, carrier_id: e.target.value })}>
                <option value="">Select Carrier</option>
                {carriers.map((carrier) => (
                  <option key={carrier.carrier_id} value={carrier.carrier_id}>{carrier.name}</option>
                ))}
              </select>
              <input className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" placeholder="Origin" value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })} />
              <input className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" placeholder="Destination" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} />
              <input className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" type="number" placeholder="Distance km" value={form.distance_km} onChange={(e) => setForm({ ...form, distance_km: e.target.value })} />
              <input className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" type="number" placeholder="Duration min" value={form.estimated_duration_min} onChange={(e) => setForm({ ...form, estimated_duration_min: e.target.value })} />
              <button className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-700" onClick={addRoute}>Save</button>
            </div>
            </DialogContent>
          </Dialog>
        )}
      />
      <DataTable
        columns={[
          { key: "origin", label: "Origin" },
          { key: "destination", label: "Destination" },
          { key: "distance_km", label: "Distance (km)" },
          { key: "estimated_duration_min", label: "Duration (min)" },
        ]}
        data={items}
        onEdit={editRoute}
        onDelete={isAdmin ? deleteRoute : undefined}
      />
    </div>
  );
}
