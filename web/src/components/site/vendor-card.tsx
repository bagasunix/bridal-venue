import Link from "next/link";

import type { Vendor } from "@/lib/types";

type VendorCardProps = {
  priority?: boolean;
  vendor: Vendor;
};

export function VendorCard({ priority = false, vendor }: VendorCardProps) {
  return (
    <article className="group overflow-hidden border border-[var(--border)] bg-white" data-testid={`vendor-card-${vendor.slug}`}>
      <div className="overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={vendor.name}
          className="h-[320px] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          data-testid={`vendor-card-image-${vendor.slug}`}
          loading={priority ? "eager" : "lazy"}
          src={vendor.image}
        />
      </div>

      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]" data-testid={`vendor-card-category-${vendor.slug}`}>
            {vendor.category}
          </p>
          <h3 className="font-serif text-3xl tracking-tight text-[var(--primary)]">{vendor.name}</h3>
          <p className="text-sm leading-6 text-[var(--muted-foreground)]">{vendor.description}</p>
        </div>

        <div className="grid gap-3 border-t border-[var(--border)] pt-4 text-sm text-[var(--secondary-foreground)] sm:grid-cols-2">
          <div data-testid={`vendor-card-location-${vendor.slug}`}>
            <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Lokasi</span>
            <span>{vendor.location}</span>
          </div>
          <div data-testid={`vendor-card-price-${vendor.slug}`}>
            <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Harga awal</span>
            <span>Mulai {vendor.startingPrice}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {vendor.highlights.slice(0, 2).map((item) => (
            <span className="bg-[var(--muted)] px-3 py-1 text-xs font-semibold text-[var(--secondary-foreground)]" key={item}>
              {item}
            </span>
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          <Link
            className="inline-flex bg-[var(--primary)] px-5 py-3 text-sm text-[var(--primary-foreground)] transition hover:opacity-90"
            data-testid={`vendor-open-${vendor.slug}`}
            href={`/vendors/${vendor.slug}`}
          >
            Lihat detail
          </Link>
          <Link
            className="inline-flex border border-[var(--primary)] px-5 py-3 text-sm text-[var(--primary)] transition hover:bg-[var(--muted)]"
            data-testid={`vendor-book-${vendor.slug}`}
            href={`/booking/${vendor.slug}`}
          >
            Konsultasi
          </Link>
        </div>
      </div>
    </article>
  );
}