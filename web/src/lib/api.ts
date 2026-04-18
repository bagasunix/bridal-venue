import type { VendorPackage } from "@/lib/vendors";

export type AvailabilityResponse = {
  vendor_slug: string;
  booked_dates: string[];
  source: string;
  live_configured: boolean;
  error_message?: string;
};

export type BookingPayload = {
  name: string;
  phone: string;
  vendor: string;
  date: string;
  package: string;
};

export type BookingResponse = {
  booking_id: string;
  vendor: string;
  date: string;
  package: string;
  source: string;
  submitted_to_n8n: boolean;
  message: string;
  created_at: string;
};

const absoluteApiBase =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:3000"
    : "";

const apiUrl = (path: string) => `${absoluteApiBase}/api${path}`;

const wait = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));

export async function fetchAvailability(vendorSlug: string): Promise<AvailabilityResponse> {
  try {
    const response = await fetch(apiUrl(`/availability/${vendorSlug}`), { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Gagal mengambil jadwal");
    }
    return (await response.json()) as AvailabilityResponse;
  } catch {
    const today = new Date();
    const buildDate = (offset: number) => {
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
      return date.toISOString().slice(0, 10);
    };
    const fallbackMap: Record<string, string[]> = {
      "rosewood-manor": [buildDate(3), buildDate(8), buildDate(12)],
      "velvet-bloom": [buildDate(5), buildDate(10), buildDate(15)],
      "golden-frame-studio": [buildDate(4), buildDate(7), buildDate(14)],
      "ivory-feast-catering": [buildDate(6), buildDate(11), buildDate(16)],
    };

    return {
      vendor_slug: vendorSlug,
      booked_dates: fallbackMap[vendorSlug] ?? [],
      source: "mock",
      live_configured: false,
      error_message: "Jadwal live belum aktif, jadi tampilan ini memakai tanggal demo.",
    };
  }
}

export async function submitBooking(payload: BookingPayload): Promise<BookingResponse> {
  try {
    const response = await fetch(apiUrl("/bookings"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      throw new Error(errorBody?.detail || "Permintaan belum berhasil dikirim");
    }

    return (await response.json()) as BookingResponse;
  } catch (error) {
    if (error instanceof Error && error.message === "Date not available") {
      throw new Error("Tanggal itu baru saja terisi. Silakan pilih tanggal lain.");
    }

    await wait(900);
    return {
      booking_id: `demo-${Date.now()}`,
      vendor: payload.vendor,
      date: payload.date,
      package: payload.package,
      source: "mock",
      submitted_to_n8n: false,
      message: "Permintaan masuk dalam mode demo.",
      created_at: new Date().toISOString(),
    };
  }
}

export function getPackageLabel(packages: VendorPackage[], selectedPackage: string) {
  return packages.find((item) => item.name === selectedPackage)?.label ?? selectedPackage;
}
