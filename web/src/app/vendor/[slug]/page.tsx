import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, CalendarDays, MapPin } from "lucide-react";

import { SectionTitle } from "@/components/section-title";
import { fetchAvailability } from "@/lib/api";
import { formatPrettyDate } from "@/lib/date";
import { getVendorBySlug } from "@/lib/vendors";

export default async function VendorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);

  if (!vendor) {
    notFound();
  }

  const availability = await fetchAvailability(vendor.slug);

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10 lg:py-18">
      <section className="overflow-hidden rounded-[2.25rem] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)]">
        <div className="relative overflow-hidden px-8 py-10 text-white lg:px-10 lg:py-14">
          <div className={`absolute inset-0 ${vendor.coverClass}`} />
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${vendor.imageSrc})` }} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,32,0.18),rgba(7,17,32,0.78))]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/84">
                {vendor.category}
              </span>
              <div className="space-y-4">
                <h1 className="max-w-3xl font-serif text-5xl leading-tight font-semibold">{vendor.name}</h1>
                <p className="max-w-2xl text-lg leading-8 text-white/80">{vendor.summary}</p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-white/85">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2">
                  <MapPin className="h-4 w-4" />
                  {vendor.location}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2">
                  <BadgeCheck className="h-4 w-4" />
                  Mulai {vendor.startingPrice}
                </span>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/12 bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/72">Kuat untuk kebutuhan client yang ingin</p>
              <div className="mt-5 space-y-3 text-base leading-7 text-white/86">
                {vendor.highlights.map((item) => (
                  <div className="flex items-start gap-3" key={item}>
                    <span className="mt-1 rounded-full bg-white/18 p-1">
                      <BadgeCheck className="h-3.5 w-3.5" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link className="inline-flex w-full items-center justify-center rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-slate-950 sm:w-auto" href={`/booking/${vendor.slug}`}>
                  Buka form dan pilih tanggal
                </Link>
                <Link className="inline-flex w-full items-center justify-center rounded-full border border-white/16 px-5 py-3 text-sm font-semibold text-white sm:w-auto" href="/kontak">
                  Konsultasi dulu
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 px-8 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-12">
          <div className="space-y-8">
            <SectionTitle
              eyebrow="Gambaran vendor"
              title="Nuansanya sudah terasa sejak halaman pertama"
              description={vendor.description}
            />

            <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface-strong)] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--brand)]">Pilihan paket</p>
              <div className="mt-5 space-y-4">
                {vendor.packages.map((item) => (
                  <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-5" key={item.name}>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-[var(--text)]">{item.label}</h2>
                        <p className="mt-2 max-w-xl text-base leading-7 text-[var(--muted)]">{item.description}</p>
                      </div>
                      <p className="text-lg font-semibold text-[var(--brand)]">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[var(--brand-soft)] p-3 text-[var(--brand)]">
                  <CalendarDays className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--text)]">Tanggal yang sedang terisi</p>
                  <p className="text-sm text-[var(--muted)]">
                    {availability.error_message ?? "Tanggal yang sudah terisi akan muncul di bawah ini."}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {availability.booked_dates.map((item) => (
                  <span className="rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-2 text-sm text-[var(--muted)]" key={item}>
                    {formatPrettyDate(item)}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(200,157,86,0.16),transparent_72%)] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--brand)]">Next step</p>
              <h2 className="mt-3 text-2xl font-semibold text-[var(--text)]">Kalau client sudah suka, tinggal arahkan ke halaman booking.</h2>
              <p className="mt-3 text-base leading-7 text-[var(--muted)]">
                Alur berikutnya dibuat singkat supaya momentum diskusi tetap terjaga. Bisa langsung pilih paket, cek tanggal, dan kirim permintaan.
              </p>
              <Link className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-slate-950" href={`/booking/${vendor.slug}`}>
                Pilih tanggal sekarang
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
