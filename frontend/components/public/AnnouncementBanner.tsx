"use client";

import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Props = {
  announcement: null | {
    title?: string;
    body?: string;
    priority?: string;
  };
};

export function AnnouncementBanner({ announcement }: Props) {
  const storageKey = useMemo(() => {
    const seed = `${announcement?.title ?? ""}-${announcement?.body ?? ""}`;
    return `altmed-announcement-${seed}`;
  }, [announcement?.body, announcement?.title]);

  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (!announcement) {
      return;
    }

    setDismissed(window.localStorage.getItem(storageKey) === "hidden");
  }, [announcement, storageKey]);

  if (!announcement || dismissed) {
    return null;
  }

  return (
    <div className="border-b border-[rgba(18,52,77,0.08)] bg-[linear-gradient(180deg,#f4faf9_0%,#ebf6f4_100%)] text-[var(--color-text-dark)]">
      <div className="container-shell flex min-h-[46px] items-center justify-between gap-3 py-2 text-[13px] font-medium">
        <p className="pr-4 leading-6 text-[var(--color-text-dark)]">
          <span className="font-semibold text-[var(--color-text-dark)]">{announcement.title}</span>
          {announcement.body ? ` — ${announcement.body}` : ""}
        </p>
        <button
          type="button"
          className="focus-ring inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(18,52,77,0.12)] text-[var(--color-text-muted)] transition hover:bg-white hover:text-[var(--color-text-dark)]"
          aria-label="Dismiss announcement"
          onClick={() => {
            window.localStorage.setItem(storageKey, "hidden");
            setDismissed(true);
          }}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
