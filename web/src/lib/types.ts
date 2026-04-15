export type VendorPackage = {
  description: string;
  label: string;
  name: string;
  price: string;
};

export type Vendor = {
  category: string;
  description: string;
  highlights: string[];
  image: string;
  location: string;
  name: string;
  packages: VendorPackage[];
  slug: string;
  startingPrice: string;
};

export type AvailabilityResponse = {
  booked_dates: string[];
  live_configured: boolean;
  source: "mock" | "live" | "hybrid";
  vendor_slug: string;
};

export type BookingPayload = {
  date: string;
  name: string;
  package: string;
  phone: string;
  vendor: string;
};

export type BookingResponse = {
  booking_id: string;
  created_at: string;
  date: string;
  message: string;
  package: string;
  source: "mock" | "live" | "hybrid";
  submitted_to_n8n: boolean;
  vendor: string;
};