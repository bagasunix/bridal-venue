import Link from "next/link";

import type { Vendor } from "@/lib/types";

type CompareSectionProps = {
  vendors: Vendor[];
};

export function CompareSection({ vendors }: CompareSectionProps) {
  const rows = [
    {
      label: "Lokasi",
      values: vendors.map((vendor) => vendor.location),
    },
    {
      label: "Harga awal",
      values: vendors.map((vendor) => `Mulai ${vendor.startingPrice}`),
    },
    {
      label: "Paket utama",
      values: vendors.map((vendor) => vendor.packages[0]?.label ?? "Pilihan utama"),
    },
    {
      label: "Harga paket utama",
      values: vendors.map((vendor) => vendor.packages[0]?.price ?? vendor.startingPrice),
    },
    {
      label: "Highlight",
      values: vendors.map((vendor) => vendor.highlights.slice(0, 2).join(" • ")),
    },
  ];

  return (
    <section className="space-y-8" data-testid="compare-section" id="compare-section">
      <div className="space-y-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Bandingkan vendor</p>
        <h2 className="max-w-3xl font-serif text-4xl tracking-tight text-[var(--primary)] md:text-5xl">
          Semua detail penting dalam satu bidang pandang yang terasa rapi.
        </h2>
        <p className="max-w-2xl text-base leading-7 text-[var(--muted-foreground)]">
          Format ini dibuat untuk membantu Anda melihat perbedaan paket, lokasi, harga awal, dan highlight layanan tanpa perlu bolak-balik membuka banyak halaman.
        </p>
      </div>

      <div className="overflow-hidden border border-[var(--border)] bg-white" data-testid="compare-table-wrap">
        <div className="grid grid-cols-[170px_repeat(3,minmax(0,1fr))] bg-[var(--muted)] text-left max-[1023px]:hidden">
          <div className="px-5 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Aspek</div>
          {vendors.map((vendor) => (
            <div className="space-y-1 border-l border-[var(--border)] px-5 py-4" key={vendor.slug}>
              <p className="font-serif text-2xl text-[var(--primary)]">{vendor.name}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">{vendor.category}</p>
            </div>
          ))}
        </div>

        {rows.map((row) => (
          <div className="grid border-t border-[var(--border)] max-[1023px]:hidden md:grid-cols-[170px_repeat(3,minmax(0,1fr))]" key={row.label}>
            <div className="px-5 py-4 text-sm font-bold text-[var(--primary)]">{row.label}</div>
            {row.values.map((value, index) => (
              <div className="border-l border-[var(--border)] px-5 py-4 text-sm leading-6 text-[var(--muted-foreground)]" key={`${row.label}-${index}`}>
                {value}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:hidden">
        {vendors.map((vendor) => (
          <article className="border border-[var(--border)] bg-white p-5" data-testid={`compare-mobile-${vendor.slug}`} key={vendor.slug}>
            <div className="space-y-2 border-b border-[var(--border)] pb-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">{vendor.category}</p>
              <h3 className="font-serif text-3xl text-[var(--primary)]">{vendor.name}</h3>
            </div>

            <div className="mt-4 space-y-3 text-sm text-[var(--muted-foreground)]">
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Lokasi</span>
                <span>{vendor.location}</span>
              </div>
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Harga awal</span>
                <span>Mulai {vendor.startingPrice}</span>
              </div>
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Paket utama</span>
                <span>{vendor.packages[0]?.label ?? "Pilihan utama"}</span>
              </div>
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Harga paket utama</span>
                <span>{vendor.packages[0]?.price ?? vendor.startingPrice}</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {vendor.highlights.map((item) => (
                <span className="bg-[var(--muted)] px-3 py-1 text-xs font-semibold text-[var(--secondary-foreground)]" key={item}>
                  {item}
                </span>
              ))}
            </div>

            <Link className="mt-5 inline-flex bg-[var(--primary)] px-4 py-3 text-sm text-[var(--primary-foreground)]" data-testid={`compare-link-${vendor.slug}`} href={`/vendors/${vendor.slug}`}>
              Lihat detail
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}