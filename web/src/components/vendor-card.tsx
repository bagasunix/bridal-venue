import Link from "next/link";
import { ArrowUpRight, Check, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Vendor } from "@/lib/vendors";

export function VendorCard({
  bookingFirst = false,
  featured = false,
  vendor,
}: {
  bookingFirst?: boolean;
  featured?: boolean;
  vendor: Vendor;
}) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)] backdrop-blur",
        featured ? "lg:grid lg:grid-cols-[1.1fr_0.9fr]" : "h-full",
      )}
    >
      <Link className={cn("relative overflow-hidden block", featured ? "min-h-[360px]" : "min-h-[280px]")} href={bookingFirst ? `/booking/${vendor.slug}` : `/vendor/${vendor.slug}`}>
        <div className={cn("absolute inset-0", vendor.coverClass)} />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${vendor.imageSrc})` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/65 via-slate-950/28 to-transparent" />
        <div className="relative flex h-full min-h-[inherit] flex-col justify-between p-7 text-white">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full border border-white/20 bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-white/90">
              {vendor.category}
            </span>
            <span className="rounded-full bg-white/92 p-2 text-slate-900 shadow-sm">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>

          <div className="space-y-3">
            <h3 className="max-w-xl font-serif text-3xl leading-tight font-semibold">{vendor.name}</h3>
            <p className="max-w-xl text-sm leading-6 text-white/78">{vendor.summary}</p>
            <div className="flex flex-wrap gap-2 text-xs text-white/80">
              {vendor.highlights.slice(0, featured ? 3 : 2).map((item) => (
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>

      <div className="flex h-full flex-col justify-between gap-6 p-7">
        <div className="space-y-5">
          <div className="flex flex-wrap gap-3 text-sm text-[var(--muted)]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-2">
              <MapPin className="h-4 w-4 text-[var(--brand)]" />
              {vendor.location}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-2">
              <Check className="h-4 w-4 text-[var(--brand)]" />
              Mulai {vendor.startingPrice}
            </span>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--brand)]">Kenapa dipilih</p>
            <p className="text-base leading-7 text-[var(--muted)]">{vendor.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {bookingFirst ? (
            <>
              <Link
                className="inline-flex rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5"
                href={`/booking/${vendor.slug}`}
              >
                Pilih vendor ini
              </Link>
              <Link
                className="inline-flex rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold text-[var(--text)] transition-colors duration-200 hover:border-[var(--brand)] hover:text-[var(--brand)]"
                href={`/vendor/${vendor.slug}`}
              >
                Lihat ringkasannya
              </Link>
            </>
          ) : (
            <>
              <Link
                className="inline-flex rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5"
                href={`/vendor/${vendor.slug}`}
              >
                Lihat detail vendor
              </Link>
              <Link
                className="inline-flex rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold text-[var(--text)] transition-colors duration-200 hover:border-[var(--brand)] hover:text-[var(--brand)]"
                href={`/booking/${vendor.slug}`}
              >
                Pilih tanggal & isi form
              </Link>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
