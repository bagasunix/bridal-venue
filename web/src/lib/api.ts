import type {
  AvailabilityResponse,
  BookingPayload,
  BookingResponse,
} from "@/lib/types";

const backendRoot =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.EXPO_PUBLIC_BACKEND_URL ||
  "";

export const apiRoot = backendRoot
  ? `${backendRoot.replace(/\/+$/, "")}/api`
  : "/api";

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiRoot}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const detail =
      typeof errorBody?.detail === "string"
        ? errorBody.detail
        : "Permintaan belum berhasil diproses.";
    throw new Error(detail);
  }

  return (await response.json()) as T;
}

export function fetchAvailability(vendorSlug: string) {
  return requestJson<AvailabilityResponse>(`/availability/${vendorSlug}`);
}

export function createBooking(payload: BookingPayload) {
  return requestJson<BookingResponse>("/bookings", {
    body: JSON.stringify(payload),
    method: "POST",
  });
}