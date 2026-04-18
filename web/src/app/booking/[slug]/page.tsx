import { notFound } from "next/navigation";

import { BookingClientPage } from "@/components/booking-client-page";
import { fetchAvailability } from "@/lib/api";
import { getVendorBySlug } from "@/lib/vendors";

export default async function BookingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);

  if (!vendor) {
    notFound();
  }

  const availability = await fetchAvailability(vendor.slug);

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10 lg:py-18">
      <BookingClientPage bookedDates={availability.booked_dates} vendor={vendor} />
    </main>
  );
}
