import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color:var(--surface-strong)]/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
        <Link className="flex items-center gap-3" href="/">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--brand-soft)] text-sm font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">
            AR
          </div>
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[var(--brand)]">
              Atelier Resepsi
            </p>
            <p className="text-sm text-[var(--muted)]">Kurasi vendor untuk presentasi client</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-[var(--muted)] md:flex">
          {links.map((link) => (
            <Link className="transition-colors duration-200 hover:text-[var(--text)]" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            className="hidden rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--text)] transition-colors duration-200 hover:border-[var(--brand)] hover:text-[var(--brand)] sm:inline-flex"
            href="/katalog"
          >
            Lihat katalog
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
