import { useLocalSearchParams } from "expo-router";

import { BookingScreen } from "@/presentation/screens/BookingScreen";

export default function BookingRoute() {
  const params = useLocalSearchParams<{ slug?: string | string[] }>();
  const slug = typeof params.slug === "string" ? params.slug : "";

  return <BookingScreen slug={slug} />;
}