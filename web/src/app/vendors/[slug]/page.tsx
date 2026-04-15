import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/site/header";
import { getVendorBySlug } from "@/lib/vendors";

export default async function VendorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);

  if (!vendor) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1240px] space-y-12 px-6 py-16 md:px-8">
        <section className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
          <div className="overflow-hidden rounded-[36px]" data-testid="vendor-detail-image-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={vendor.name} className="h-[520px] w-full object-cover" data-testid="vendor-detail-image" src={vendor.image} />
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]" data-testid="vendor-detail-category">{vendor.category}</p>
              <h1 className="font-serif text-5xl tracking-tight text-[var(--primary)]" data-testid="vendor-detail-name">{vendor.name}</h1>
              <p className="text-base leading-8 text-[var(--muted-foreground)]" data-testid="vendor-detail-description">{vendor.description}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-[var(--border)] bg-white p-5" data-testid="vendor-detail-location">
                <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Lokasi</span>
                <span className="mt-2 block text-sm text-[var(--secondary-foreground)]">{vendor.location}</span>
              </div>
              <div className="border border-[var(--border)] bg-white p-5" data-testid="vendor-detail-price">
                <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Harga awal</span>
                <span className="mt-2 block text-sm text-[var(--secondary-foreground)]">Mulai {vendor.startingPrice}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2" data-testid="vendor-detail-highlights">
              {vendor.highlights.map((item) => (
                <span className="bg-[var(--muted)] px-3 py-2 text-xs font-semibold text-[var(--secondary-foreground)]" key={item}>{item}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link className="bg-[var(--primary)] px-6 py-4 text-sm text-[var(--primary-foreground)]" data-testid="vendor-detail-booking-button" href={`/booking/${vendor.slug}`}>
                Lanjut ke booking
              </Link>
              <Link className="border border-[var(--primary)] px-6 py-4 text-sm text-[var(--primary)]" data-testid="vendor-detail-back-button" href="/vendors">
                Kembali ke vendor
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {vendor.packages.map((item) => (
            <article className="border border-[var(--border)] bg-white p-6" data-testid={`package-card-${item.name}`} key={item.name}>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Paket</p>
              <h2 className="mt-3 font-serif text-3xl text-[var(--primary)]">{item.label}</h2>
              <p className="mt-2 text-sm font-semibold text-[var(--secondary-foreground)]">{item.price}</p>
              <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">{item.description}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}