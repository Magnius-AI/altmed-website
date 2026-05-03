"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

type Props = {
  message?: string | null;
  durationMs?: number;
  variant?: "success" | "error" | "info";
};

const variants = {
  success: {
    icon: CheckCircle2,
    className: "border-emerald-200 bg-emerald-50/95 text-emerald-700"
  },
  error: {
    icon: AlertCircle,
    className: "border-red-200 bg-red-50/95 text-red-700"
  },
  info: {
    icon: Info,
    className: "border-blue-200 bg-blue-50/95 text-blue-700"
  }
};

export function AdminToast({ message, durationMs = 4500, variant = "success" }: Props) {
  const [visible, setVisible] = useState(Boolean(message));
  const tone = variants[variant];
  const Icon = tone.icon;

  useEffect(() => {
    setVisible(Boolean(message));

    if (!message || durationMs <= 0) {
      return;
    }

    const timeout = window.setTimeout(() => setVisible(false), durationMs);
    return () => window.clearTimeout(timeout);
  }, [durationMs, message]);

  if (!message || !visible) {
    return null;
  }

  return (
    <div role={variant === "error" ? "alert" : "status"} className={`fixed right-4 top-4 z-50 w-[min(calc(100vw-2rem),24rem)] rounded-lg border p-4 shadow-[var(--admin-shadow)] backdrop-blur ${tone.className}`}>
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-5 w-5 flex-none" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-neutral-900">{message}</div>
        </div>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="focus-ring rounded-md p-1 text-neutral-500 hover:bg-slate-100 hover:text-neutral-900"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
