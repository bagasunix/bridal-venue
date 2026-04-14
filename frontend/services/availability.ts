import { getMockBookedDates } from "@/mock/api";
import { requestJson } from "@/services/api";
import type { AvailabilityResponse } from "@/types";

export async function fetchAvailability(
  vendorSlug: string,
): Promise<AvailabilityResponse> {
  try {
    return await requestJson<AvailabilityResponse>(`/availability/${vendorSlug}`);
  } catch (error) {
    return {
      vendor_slug: vendorSlug,
      booked_dates: getMockBookedDates(vendorSlug),
      source: "mock",
      live_configured: false,
      error_message:
        error instanceof Error
          ? `${error.message}. Showing local demo dates instead.`
          : "Showing local demo dates instead.",
    };
  }
}