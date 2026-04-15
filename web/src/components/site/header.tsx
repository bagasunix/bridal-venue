import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)]/70 bg-[color:color-mix(in_oklab,var(--background)_82%,white_18%)]/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-6 py-4 md:px-8">
        <Link className="font-serif text-2xl tracking-tight text-[var(--primary)]" data-testid="web-logo" href="/">
          Atelier Hari Bahagia
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-[var(--muted-foreground)] md:flex">
          <a data-testid="nav-manifesto" href="#manifesto">Studio</a>
          <a data-testid="nav-vendor" href="#vendor-section">Vendor</a>
          <a data-testid="nav-compare" href="#compare-section">Bandingkan</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            className="hidden border border-[var(--primary)] px-4 py-2 text-sm text-[var(--primary)] transition hover:bg-[var(--muted)] md:inline-flex"
            data-testid="header-lihat-vendor"
            href="/vendors"
          >
            Lihat Vendor
          </Link>
          <Link
            className="inline-flex bg-[var(--primary)] px-4 py-2 text-sm text-[var(--primary-foreground)] transition hover:opacity-90"
            data-testid="header-konsultasi"
            href="/booking/rosewood-manor"
          >
            Konsultasi
          </Link>
        </div>
      </div>
    </header>
  );
}