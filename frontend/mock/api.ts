import type { BookingPayload, BookingResponse } from "@/types";

const wait = (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const buildRelativeDate = (offset: number) => {
  const today = new Date();
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const day = Math.min(Math.max(today.getDate() + offset, 2), lastDay);
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

const mockDateMap: Record<string, string[]> = {
  "rosewood-manor": [buildRelativeDate(2), buildRelativeDate(6), buildRelativeDate(10)],
  "velvet-bloom": [buildRelativeDate(4), buildRelativeDate(7), buildRelativeDate(11)],
  "golden-frame-studio": [buildRelativeDate(3), buildRelativeDate(8), buildRelativeDate(13)],
  "ivory-feast-catering": [buildRelativeDate(5), buildRelativeDate(9), buildRelativeDate(12)],
};

export function getMockBookedDates(vendorSlug: string): string[] {
  return mockDateMap[vendorSlug] ?? [];
}

export async function submitMockBooking(
  payload: BookingPayload,
): Promise<BookingResponse> {
  await wait(900);
  return {
    booking_id: `demo-${Date.now()}`,
    vendor: payload.vendor,
    date: payload.date,
    package: payload.package,
    source: "mock",
    submitted_to_n8n: false,
    message: "Booking confirmed in demo mode.",
    created_at: new Date().toISOString(),
  };
}