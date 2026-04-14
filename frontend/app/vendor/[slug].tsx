import { useLocalSearchParams } from "expo-router";

import { VendorDetailScreen } from "@/presentation/screens/VendorDetailScreen";

export default function VendorDetailRoute() {
  const params = useLocalSearchParams<{ slug?: string | string[] }>();
  const slug = typeof params.slug === "string" ? params.slug : "";

  return <VendorDetailScreen slug={slug} />;
}