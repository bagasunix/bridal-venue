import Link from "next/link";

import { SiteHeader } from "@/components/site/header";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const bookingId = typeof params.bookingId === "string" ? params.bookingId : "-";
  const vendorName = typeof params.vendorName === "string" ? params.vendorName : "Vendor pilihan";
  const packageName = typeof params.packageName === "string" ? params.packageName : "Paket pilihan";
  const date = typeof params.date === "string" ? params.date : "-";

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-[920px] flex-col gap-8 px-6 py-20 md:px-8">
        <section className="border border-[var(--border)] bg-white p-8 text-center" data-testid="success-page">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Permintaan terkirim</p>
          <h1 className="mt-4 font-serif text-5xl tracking-tight text-[var(--primary)]">Pilihan Anda sudah kami terima.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[var(--muted-foreground)]">
            Anda sudah berada di langkah yang tepat. Detail awal sudah tercatat, dan percakapan dengan vendor bisa dilanjutkan dari titik ini.
          </p>
        </section>

        <section className="grid gap-5 border border-[var(--border)] bg-[var(--muted)] p-8 md:grid-cols-2">
          <div data-testid="success-vendor">
            <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Vendor</span>
            <p className="mt-2 text-lg font-semibold text-[var(--primary)]">{vendorName}</p>
          </div>
          <div data-testid="success-package">
            <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Paket</span>
            <p className="mt-2 text-lg font-semibold text-[var(--primary)]">{packageName}</p>
          </div>
          <div data-testid="success-date">
            <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Tanggal</span>
            <p className="mt-2 text-lg font-semibold text-[var(--primary)]">{date}</p>
          </div>
          <div data-testid="success-booking-id">
            <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Kode referensi</span>
            <p className="mt-2 text-lg font-semibold text-[var(--primary)]">{bookingId}</p>
          </div>
        </section>

        <div className="flex flex-wrap gap-4">
          <Link className="bg-[var(--primary)] px-6 py-4 text-sm text-[var(--primary-foreground)]" data-testid="success-back-home" href="/">
            Kembali ke landing page
          </Link>
          <Link className="border border-[var(--primary)] px-6 py-4 text-sm text-[var(--primary)]" data-testid="success-see-vendors" href="/vendors">
            Lihat vendor lain
          </Link>
        </div>
      </main>
    </div>
  );
}