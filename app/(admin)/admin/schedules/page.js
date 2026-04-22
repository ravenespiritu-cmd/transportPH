"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PageHeader from "@/components/shared/PageHeader";
import { formatDate, formatTime24 } from "@/lib/format";
import { toast } from "sonner";

export default function SchedulesPage() {
  const [items, setItems] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({
    route_id: "",
    vehicle_id: "",
    departure_at: "",
    arrival_at: "",
    status: "on_time",
  });

  const load = async () => {
    const [s, r, v] = await Promise.all([api.get("/schedules"), api.get("/routes"), api.get("/vehicles")]);
    setItems(s.data.data || []);
    setRoutes(r.data.data || []);
    setVehicles(v.data.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const addSchedule = async () => {
    await api.post("/schedules", { ...form, route_id: Number(form.route_id), vehicle_id: Number(form.vehicle_id) });
    toast.success("Schedule added.");
    await load();
  };

  const updateStatus = async (row, status) => {
    await api.put(`/schedules/${row.schedule_id}`, { status });
    toast.success("Status updated.");
    await load();
  };

  const deleteSchedule = async (row) => {
    await api.delete(`/schedules/${row.schedule_id}`);
    toast.success("Schedule deleted.");
    await load();
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Schedules"
        subtitle="Track departure windows and operational statuses."
        action={(
          <Dialog>
            <DialogTrigger asChild>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-700">Add Schedule</button>
            </DialogTrigger>
            <DialogContent className="max-w-lg rounded-2xl p-6 shadow-modal">
            <DialogHeader><DialogTitle>Add Schedule</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <select className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" value={form.route_id} onChange={(e) => setForm({ ...form, route_id: e.target.value })}>
                <option value="">Route</option>
                {routes.map((route) => (
                  <option key={route.route_id} value={route.route_id}>{route.origin} → {route.destination}</option>
                ))}
              </select>
              <select className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" value={form.vehicle_id} onChange={(e) => setForm({ ...form, vehicle_id: e.target.value })}>
                <option value="">Vehicle</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.vehicle_id} value={vehicle.vehicle_id}>{vehicle.model}</option>
                ))}
              </select>
              <input className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" type="datetime-local" value={form.departure_at} onChange={(e) => setForm({ ...form, departure_at: e.target.value })} />
              <input className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" type="datetime-local" value={form.arrival_at} onChange={(e) => setForm({ ...form, arrival_at: e.target.value })} />
              <button className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-700" onClick={addSchedule}>Save</button>
            </div>
            </DialogContent>
          </Dialog>
        )}
      />
      <DataTable
        columns={[
          { key: "route", label: "Route", render: (row) => `${row?.Route?.origin || "-"} → ${row?.Route?.destination || "-"}` },
          { key: "vehicle", label: "Vehicle", render: (row) => row?.Vehicle?.model || "-" },
          { key: "departure_at", label: "Departure", render: (row) => `${formatDate(row.departure_at)} • ${formatTime24(row.departure_at)}` },
          { key: "arrival_at", label: "Arrival", render: (row) => `${formatDate(row.arrival_at)} • ${formatTime24(row.arrival_at)}` },
          {
            key: "status",
            label: "Status",
            render: (row) => (
              <div className="flex items-center gap-2">
                <StatusBadge status={row.status} />
                <select
                  className="h-8 rounded-md border border-slate-200 px-2 text-xs text-slate-600"
                  value={row.status}
                  onChange={(e) => updateStatus(row, e.target.value)}
                >
                  <option value="on_time">on_time</option>
                  <option value="delayed">delayed</option>
                  <option value="cancelled">cancelled</option>
                </select>
              </div>
            ),
          },
        ]}
        data={items}
        onDelete={deleteSchedule}
      />
    </div>
  );
}
