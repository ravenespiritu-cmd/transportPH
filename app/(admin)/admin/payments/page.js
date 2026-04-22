"use client";

import PageHeader from "@/components/shared/PageHeader";
import EmptyState from "@/components/shared/EmptyState";
import { CreditCard } from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Payments" subtitle="Track payment transactions and settlement status." />
      <EmptyState
        icon={CreditCard}
        title="Payments module ready"
        description="Connect payment transaction data here to monitor settlement and reconciliation."
      />
    </div>
  );
}
