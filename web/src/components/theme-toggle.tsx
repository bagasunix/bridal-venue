"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)]" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label="Ubah tema"
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] shadow-[var(--shadow)] backdrop-blur transition-colors duration-200 hover:border-[var(--brand)] hover:text-[var(--brand)]"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      type="button"
    >
      {isDark ? <SunMedium className="h-4.5 w-4.5" /> : <MoonStar className="h-4.5 w-4.5" />}
    </button>
  );
}
