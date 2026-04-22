"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { ChevronLeft, ChevronRight, Pencil, Search, Trash2 } from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";
import { cn } from "@/lib/utils";

export default function DataTable({
  columns,
  data,
  onEdit,
  onDelete,
  searchable = true,
  pagination = true,
  rowKey = "id",
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter((row) => JSON.stringify(row).toLowerCase().includes(q));
  }, [data, search]);

  const rows = pagination ? filtered.slice((page - 1) * pageSize, page * pageSize) : filtered;
  const pageCount = pagination ? Math.max(1, Math.ceil(filtered.length / pageSize)) : 1;
  const showActions = Boolean(onEdit || onDelete);

  if (!data?.length) return <EmptyState title="No records found" description="Records will appear here once available." />;

  return (
    <div className="space-y-3">
      {searchable && (
        <div className="relative ml-auto w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm text-slate-700 transition-all duration-150 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="Search records..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      )}
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-card">
        <table className="hidden min-w-full text-sm md:table">
          <thead className="sticky top-0 border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-widest text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 text-left font-semibold">
                  {column.label}
                </th>
              ))}
              {showActions && <th className="px-4 py-3 text-left">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row[rowKey] || row.booking_id || row.carrier_id || row.vehicle_id || row.route_id || row.schedule_id || row.log_id}
                className="h-[50px] border-t border-slate-100 text-slate-700 transition-colors duration-150 hover:bg-slate-50"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-2.5 align-middle">
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
                {showActions && (
                  <td className="px-4 py-2.5">
                    <div className="flex gap-1">
                      {onEdit && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              onClick={() => onEdit(row)}
                              className="rounded-md p-1.5 text-slate-400 transition-colors duration-150 hover:bg-slate-100 hover:text-blue-500"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Edit</TooltipContent>
                        </Tooltip>
                      )}
                      {onDelete && (
                        <ConfirmDialog
                          onConfirm={() => onDelete(row)}
                          description="This action is permanent and cannot be undone."
                          trigger={
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  type="button"
                                  className="rounded-md p-1.5 text-slate-400 transition-colors duration-150 hover:bg-slate-100 hover:text-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>Delete</TooltipContent>
                            </Tooltip>
                          }
                        />
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="space-y-3 p-4 md:hidden">
          {rows.map((row, index) => (
            <div key={index} className="rounded-lg border border-slate-200 p-4">
              {columns.map((column) => (
                <div key={column.key} className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-xs uppercase tracking-wider text-slate-400">{column.label}</span>
                  <span className={cn("text-sm text-slate-700", column.mobileClass)}>{column.render ? column.render(row) : row[column.key]}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {pagination && (
        <div className="flex items-center justify-between rounded-lg border border-slate-200/80 bg-white px-3 py-2 text-xs text-slate-500">
          <span>
            Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8 border-slate-200" onClick={() => setPage((p) => Math.max(1, p - 1))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 border-slate-200" onClick={() => setPage((p) => Math.min(pageCount, p + 1))}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
