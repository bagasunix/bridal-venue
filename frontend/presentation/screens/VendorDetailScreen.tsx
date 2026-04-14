import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { getVendorBySlug } from "@/mock/vendors";
import { TopBar } from "@/presentation/components/TopBar";
import { useResolvedImageSource } from "@/presentation/hooks/useResolvedImageSource";
import { useAppTheme } from "@/presentation/providers/ThemeProvider";
import { fetchAvailability } from "@/services/availability";

type VendorDetailScreenProps = {
  slug: string;
};

export function VendorDetailScreen({ slug }: VendorDetailScreenProps) {
  const router = useRouter();
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const { width } = useWindowDimensions();
  const contentWidth = Math.min(width - 24, theme.layout.maxContentWidth);
  const vendor = getVendorBySlug(slug);
  const imageSource = useResolvedImageSource(vendor?.image ?? "");
  const [loading, setLoading] = useState(false);
  const [availabilitySummary, setAvailabilitySummary] = useState<string[]>([]);
  const [helperText, setHelperText] = useState("Tap below to sync this month’s booked dates.");

  if (!vendor) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyState}>
          <TopBar showBack title="Vendor detail" />
          <Text style={styles.emptyTitle}>Vendor not found</Text>
          <Pressable onPress={() => router.replace("/")} style={styles.primaryButton} testID="vendor-not-found-back-button">
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
        <View style={[styles.container, { width: contentWidth }]}> 
          <View style={styles.heroShell}>
            {imageSource ? (
              <Image contentFit="cover" source={imageSource} style={styles.heroImage} testID="vendor-detail-hero-image" />
            ) : (
              <View style={styles.heroImagePlaceholder} testID="vendor-detail-hero-image" />
            )}
            <View style={styles.heroOverlay} />
            <View style={styles.heroTopBar}>
              <TopBar overlay showBack subtitle="Vendor detail" title={vendor.name} />
            </View>
            <View style={styles.heroContent}>
              <View style={styles.categoryChip}>
                <Text style={styles.categoryText}>{vendor.category}</Text>
              </View>
              <Text style={styles.heroTitle}>{vendor.name}</Text>
              <Text style={styles.heroDescription}>{vendor.description}</Text>
            </View>
          </View>

          <View style={styles.surfaceCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoChip}>
                <Feather color={theme.colors.accent} name="map-pin" size={16} />
                <Text style={styles.infoText}>{vendor.location}</Text>
              </View>
              <View style={styles.infoChip}>
                <Feather color={theme.colors.accent} name="heart" size={16} />
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
                  <ActivityIndicator color="#FFFFFF" />
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme: ReturnType<typeof useAppTheme>["theme"]) =>
  StyleSheet.create({
    safeArea: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    scrollContent: {
      alignItems: "center",
      paddingBottom: 44,
      paddingTop: 18,
    },
    container: {
      gap: 0,
    },
    heroShell: {
      borderRadius: theme.layout.imageRadius,
      height: 420,
      overflow: "hidden",
      position: "relative",
    },
    heroImage: {
      height: 420,
      width: "100%",
    },
    heroImagePlaceholder: {
      backgroundColor: theme.colors.surfaceMuted,
      height: 420,
      width: "100%",
    },
    heroOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.overlay,
    },
    heroTopBar: {
      left: 18,
      position: "absolute",
      right: 18,
      top: 18,
    },
    heroContent: {
      bottom: 22,
      gap: 12,
      left: 22,
      position: "absolute",
      right: 22,
    },
    categoryChip: {
      alignSelf: "flex-start",
      backgroundColor: "rgba(255,255,255,0.14)",
      borderRadius: theme.layout.buttonRadius,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    categoryText: {
      color: "#FFFFFF",
      fontSize: theme.typography.small,
      fontWeight: "800",
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    heroTitle: {
      color: "#FFFFFF",
      fontFamily: "Georgia",
      fontSize: theme.typography.hero,
      fontWeight: "700",
      lineHeight: 42,
    },
    heroDescription: {
      color: "rgba(255,255,255,0.82)",
      fontSize: theme.typography.body,
      lineHeight: 25,
      maxWidth: 360,
    },
    surfaceCard: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      gap: 18,
      marginTop: -34,
      paddingTop: 22,
    },
    infoRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      paddingHorizontal: theme.layout.screenPadding,
    },
    infoChip: {
      alignItems: "center",
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: theme.layout.buttonRadius,
      borderWidth: 1,
      flexDirection: "row",
      gap: 8,
      paddingHorizontal: 14,
      paddingVertical: 10,
    },
    infoText: {
      color: theme.colors.textPrimary,
      fontSize: 14,
      fontWeight: "700",
    },
    packageCard: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: theme.layout.cardRadius,
      borderWidth: 1,
      gap: 16,
      marginHorizontal: theme.layout.screenPadding,
      padding: 20,
    },
    cardTitle: {
      color: theme.colors.textPrimary,
      fontFamily: "Georgia",
      fontSize: theme.typography.section,
      fontWeight: "700",
    },
    packageRow: {
      borderTopColor: theme.colors.border,
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
      color: theme.colors.textPrimary,
      fontSize: 16,
      fontWeight: "700",
    },
    packageDescription: {
      color: theme.colors.textSecondary,
      fontSize: 14,
      lineHeight: 22,
    },
    packagePrice: {
      color: theme.colors.accent,
      fontSize: 16,
      fontWeight: "800",
    },
    helperText: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.body,
      lineHeight: 24,
    },
    dateWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    dateChip: {
      backgroundColor: theme.colors.surfaceMuted,
      borderRadius: theme.layout.buttonRadius,
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    dateText: {
      color: theme.colors.textPrimary,
      fontSize: 13,
      fontWeight: "700",
    },
    primaryButton: {
      alignItems: "center",
      backgroundColor: theme.colors.accent,
      borderRadius: theme.layout.buttonRadius,
      justifyContent: "center",
      minHeight: 56,
      paddingHorizontal: 20,
    },
    primaryButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "800",
    },
    secondaryButton: {
      alignItems: "center",
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.accent,
      borderRadius: theme.layout.buttonRadius,
      borderWidth: 1,
      justifyContent: "center",
      marginHorizontal: theme.layout.screenPadding,
      minHeight: 56,
      paddingHorizontal: 20,
    },
    secondaryButtonText: {
      color: theme.colors.textPrimary,
      fontSize: 16,
      fontWeight: "700",
    },
    pressedButton: {
      opacity: 0.92,
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
      color: theme.colors.textPrimary,
      fontFamily: "Georgia",
      fontSize: theme.typography.title,
      fontWeight: "700",
    },
  });