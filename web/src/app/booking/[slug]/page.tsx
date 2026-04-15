import { notFound } from "next/navigation";

import { BookingForm } from "@/components/site/booking-form";
import { SiteHeader } from "@/components/site/header";
import { getVendorBySlug } from "@/lib/vendors";

export default async function BookingPage({
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
      <main className="mx-auto w-full max-w-[1240px] space-y-8 px-6 py-16 md:px-8">
        <div className="space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Pemesanan web</p>
          <h1 className="font-serif text-5xl tracking-tight text-[var(--primary)]" data-testid="booking-page-title">Atur langkah berikutnya untuk {vendor.name}.</h1>
        </div>

        <BookingForm vendor={vendor} />
      </main>
    </div>
  );
}