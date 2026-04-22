"use client";

import { AlertTriangle } from "lucide-react";
import {
  DialogClose,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ConfirmDialog({
  trigger,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  onConfirm,
  loading = false,
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md rounded-2xl border-none p-0 shadow-modal">
        <div className="p-6">
          <DialogHeader>
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <DialogTitle className="text-xl text-slate-900">{title}</DialogTitle>
            <DialogDescription className="text-sm text-slate-500">{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="h-9 border-slate-200 px-4 text-sm hover:bg-slate-50">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="h-9 bg-red-500 px-4 text-sm text-white hover:bg-red-600"
            >
              {loading ? "Please wait..." : "Confirm"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
