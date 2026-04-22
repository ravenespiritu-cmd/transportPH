"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import DataTable from "@/components/admin/DataTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PageHeader from "@/components/shared/PageHeader";
import { toast } from "sonner";

export default function CarriersPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", type: "airline", country: "", contact_email: "" });

  const load = async () => {
    const { data } = await api.get("/carriers");
    setItems(data.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const addCarrier = async () => {
    if (!form.name || !form.contact_email) {
      toast.error("Name and contact email are required.");
      return;
    }
    await api.post("/carriers", form);
    setForm({ name: "", type: "airline", country: "", contact_email: "" });
    toast.success("Carrier saved.");
    await load();
  };

  const deleteCarrier = async (row) => {
    await api.delete(`/carriers/${row.carrier_id}`);
    toast.success("Carrier deleted.");
    await load();
  };

  const editCarrier = async (row) => {
    const name = window.prompt("Carrier name", row.name);
    if (!name) return;
    await api.put(`/carriers/${row.carrier_id}`, { name });
    await load();
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Carriers"
        subtitle="Manage airline and railway carrier records."
        action={
          <Dialog>
            <DialogTrigger asChild>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-700">Add Carrier</button>
            </DialogTrigger>
            <DialogContent className="max-w-lg rounded-2xl p-6 shadow-modal">
              <DialogHeader><DialogTitle className="text-xl text-slate-900">Add Carrier</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <input className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <select className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="airline">Airline</option>
                <option value="railway">Railway</option>
              </select>
                <input className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" placeholder="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                <input className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500" placeholder="Contact Email" value={form.contact_email} onChange={(e) => setForm({ ...form, contact_email: e.target.value })} />
                <button className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-700" onClick={addCarrier}>Save</button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />
      <DataTable
        columns={[
          { key: "name", label: "Name" },
          { key: "type", label: "Type" },
          { key: "country", label: "Country" },
        ]}
        data={items}
        onEdit={editCarrier}
        onDelete={deleteCarrier}
      />
    </div>
  );
}
