import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog" },
  { href: "/booking/rosewood-manor", label: "Pilih Tanggal" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color:var(--surface-strong)]/90 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-7xl px-5 py-4 lg:px-10">
        <div className="flex items-center justify-between gap-4">
          <Link className="flex min-w-0 items-center gap-3" href="/">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--brand-soft)] text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">
              AR
            </div>
            <div className="min-w-0">
              <p className="truncate text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[var(--brand)]">
                Atelier Resepsi
              </p>
              <p className="truncate text-sm text-[var(--muted)]">Pilihan vendor yang tertata hangat dan rapi</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-[var(--muted)] md:flex">
            {links.map((link) => (
              <Link className="transition-colors duration-200 hover:text-[var(--text)]" href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <Link
              className="hidden rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--text)] transition-colors duration-200 hover:border-[var(--brand)] hover:text-[var(--brand)] sm:inline-flex"
              href="/booking/rosewood-manor"
            >
              Pilih tanggal
            </Link>
            <ThemeToggle />
          </div>
        </div>

        <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 text-sm font-medium text-[var(--muted)] md:hidden">
          {links.map((link) => (
            <Link
              className="shrink-0 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 transition-colors duration-200 hover:border-[var(--brand)] hover:text-[var(--brand)]"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
