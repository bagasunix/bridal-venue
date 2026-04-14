export type VendorPackage = {
  name: string;
  label: string;
  price: string;
  description: string;
};

export type Vendor = {
  slug: string;
  name: string;
  category: string;
  location: string;
  startingPrice: string;
  image: string;
  description: string;
  highlights: string[];
  packages: VendorPackage[];
};

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