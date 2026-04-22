"use client";

import PageHeader from "@/components/shared/PageHeader";
import EmptyState from "@/components/shared/EmptyState";
import { XCircle } from "lucide-react";

export default function CancellationsPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Cancellations" subtitle="Review cancellation requests and processing history." />
      <EmptyState
        icon={XCircle}
        title="No cancellation records"
        description="Cancellation entries will appear here once requests are submitted."
      />
    </div>
  );
}
