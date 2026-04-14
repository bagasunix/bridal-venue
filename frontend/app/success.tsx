import { useLocalSearchParams } from "expo-router";

import { SuccessScreen } from "@/presentation/screens/SuccessScreen";

export default function SuccessRoute() {
  const params = useLocalSearchParams<{
    bookingId?: string | string[];
    date?: string | string[];
    packageName?: string | string[];
    vendorName?: string | string[];
  }>();

  return (
    <SuccessScreen
      bookingId={typeof params.bookingId === "string" ? params.bookingId : ""}
      date={typeof params.date === "string" ? params.date : new Date().toISOString().slice(0, 10)}
      packageName={typeof params.packageName === "string" ? params.packageName : "Signature Day"}
      vendorName={typeof params.vendorName === "string" ? params.vendorName : "Wedding Vendor"}
    />
  );
}