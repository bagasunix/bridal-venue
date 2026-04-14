import { Feather } from "@expo/vector-icons";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getVendorBySlug } from "@/mock/vendors";
import { colors, layout, typography } from "@/presentation/theme";
import { fetchAvailability } from "@/services/availability";

type VendorDetailScreenProps = {
  slug: string;
};

export function VendorDetailScreen({ slug }: VendorDetailScreenProps) {
  const router = useRouter();
  const vendor = getVendorBySlug(slug);
  const [loading, setLoading] = useState(false);
  const [availabilitySummary, setAvailabilitySummary] = useState<string[]>([]);
  const [helperText, setHelperText] = useState("Tap below to sync this month’s booked dates.");

  if (!vendor) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Vendor not found</Text>
          <Pressable onPress={() => router.replace("/")} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Back home</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const checkAvailability = async () => {
    setLoading(true);
    const response = await fetchAvailability(vendor.slug);
    setAvailabilitySummary(response.booked_dates);
    setHelperText(
      response.error_message ??
        `${response.booked_dates.length} unavailable date${response.booked_dates.length === 1 ? "" : "s"} found for ${vendor.name}.`,
    );
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} testID="vendor-detail-screen">
        <View style={styles.container}>
          <Image source={{ uri: vendor.image }} style={styles.heroImage} />

          <View style={styles.headerBlock}>
            <View style={styles.categoryChip}>
              <Text style={styles.categoryText}>{vendor.category}</Text>
            </View>
            <Text style={styles.title}>{vendor.name}</Text>
            <Text style={styles.description}>{vendor.description}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoChip}>
              <Feather color={colors.gold} name="map-pin" size={16} />
              <Text style={styles.infoText}>{vendor.location}</Text>
            </View>
            <View style={styles.infoChip}>
              <Feather color={colors.gold} name="heart" size={16} />
              <Text style={styles.infoText}>From {vendor.startingPrice}</Text>
            </View>
          </View>

          <View style={styles.packageCard}>
            <Text style={styles.cardTitle}>Packages</Text>
            {vendor.packages.map((item) => (
              <View key={item.name} style={styles.packageRow}>
                <View style={styles.packageTextWrap}>
                  <Text style={styles.packageTitle}>{item.label}</Text>
                  <Text style={styles.packageDescription}>{item.description}</Text>
                </View>
                <Text style={styles.packagePrice}>{item.price}</Text>
              </View>
            ))}
          </View>

          <View style={styles.packageCard}>
            <Text style={styles.cardTitle}>Availability sync</Text>
            <Text style={styles.helperText}>{helperText}</Text>
            {availabilitySummary.length > 0 ? (
              <View style={styles.dateWrap}>
                {availabilitySummary.map((date) => (
                  <View key={date} style={styles.dateChip}>
                    <Text style={styles.dateText}>{date}</Text>
                  </View>
                ))}
              </View>
            ) : null}

            <Pressable
              onPress={checkAvailability}
              style={({ pressed }) => [styles.primaryButton, pressed && styles.pressedButton]}
              testID="check-availability-button"
            >
              {loading ? (
                <ActivityIndicator color={colors.textPrimary} />
              ) : (
                <Text style={styles.primaryButtonText}>Check availability</Text>
              )}
            </Pressable>
          </View>

          <Pressable
            onPress={() => router.push(`/booking?slug=${vendor.slug}` as Href)}
            style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressedButton]}
            testID="start-booking-button"
          >
            <Text style={styles.secondaryButtonText}>Continue to booking</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 36,
    paddingTop: 20,
  },
  container: {
    gap: 20,
    paddingHorizontal: layout.screenPadding,
  },
  heroImage: {
    borderRadius: layout.imageRadius,
    height: 280,
    width: "100%",
  },
  headerBlock: {
    gap: 12,
  },
  categoryChip: {
    alignSelf: "flex-start",
    backgroundColor: colors.roseTint,
    borderRadius: layout.buttonRadius,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  categoryText: {
    color: colors.gold,
    fontSize: typography.small,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  title: {
    color: colors.textPrimary,
    fontFamily: "Georgia",
    fontSize: typography.hero,
    fontWeight: "700",
  },
  description: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 25,
  },
  infoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  infoChip: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: layout.buttonRadius,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  infoText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
  },
  packageCard: {
    backgroundColor: colors.card,
    borderRadius: layout.cardRadius,
    gap: 16,
    padding: 20,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontFamily: "Georgia",
    fontSize: typography.section,
    fontWeight: "700",
  },
  packageRow: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    paddingTop: 16,
  },
  packageTextWrap: {
    flex: 1,
    gap: 6,
  },
  packageTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  packageDescription: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  packagePrice: {
    color: colors.gold,
    fontSize: 16,
    fontWeight: "700",
  },
  helperText: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 24,
  },
  dateWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  dateChip: {
    backgroundColor: colors.roseTint,
    borderRadius: layout.buttonRadius,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dateText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "600",
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: colors.blush,
    borderRadius: layout.buttonRadius,
    minHeight: 54,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  primaryButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    alignItems: "center",
    borderColor: colors.gold,
    borderRadius: layout.buttonRadius,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 54,
    paddingHorizontal: 20,
  },
  secondaryButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  pressedButton: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
  emptyState: {
    alignItems: "center",
    flex: 1,
    gap: 18,
    justifyContent: "center",
    padding: 24,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontFamily: "Georgia",
    fontSize: typography.title,
    fontWeight: "700",
  },
});