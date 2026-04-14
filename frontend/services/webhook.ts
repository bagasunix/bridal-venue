import { submitMockBooking } from "@/mock/api";
import { requestJson } from "@/services/api";
import type { BookingPayload, BookingResponse } from "@/types";

export async function submitBooking(
  payload: BookingPayload,
): Promise<BookingResponse> {
  try {
    return await requestJson<BookingResponse>("/bookings", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Date not available") {
      throw error;
    }
    return submitMockBooking(payload);
  }
}