import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-4", align === "center" ? "items-center text-center" : "items-start") }>
      <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--brand)]">{eyebrow}</p>
      <div className="max-w-3xl space-y-3">
        <h2 className="font-serif text-3xl leading-tight font-semibold text-[var(--text)] sm:text-4xl">
          {title}
        </h2>
        <p className="text-base leading-7 text-[var(--muted)] sm:text-lg">{description}</p>
      </div>
      {action}
    </div>
  );
}
