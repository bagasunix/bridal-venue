import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { type Href, useRouter } from "expo-router";
import { type LayoutChangeEvent, Pressable, StyleSheet, Text, View } from "react-native";

import { VendorCard } from "@/presentation/components/VendorCard";
import { HomeCompareSection } from "@/presentation/components/home/HomeCompareSection";
import { useAppTheme } from "@/presentation/providers/ThemeProvider";
import type { Vendor } from "@/types";

type HomeVendorSectionProps = {
  compareMode: boolean;
  compareVendors: Vendor[];
  featuredVendor: Vendor;
  isGrid: boolean;
  mode: "mobile" | "tablet" | "desktop";
  onLayout?: (event: LayoutChangeEvent) => void;
  onCloseCompare: () => void;
  supportingVendors: Vendor[];
  vendors: Vendor[];
  viewMode: "grid" | "list";
  onViewModeChange: (value: "grid" | "list") => void;
};

export function HomeVendorSection({
  compareMode,
  compareVendors,
  featuredVendor,
  isGrid,
  mode,
  onCloseCompare,
  onLayout,
  supportingVendors,
  vendors,
  viewMode,
  onViewModeChange,
}: HomeVendorSectionProps) {
  const router = useRouter();
  const { theme } = useAppTheme();
  const styles = createStyles(theme, mode);
  const editorialMode = mode !== "mobile";

  return (
    <View onLayout={onLayout} style={styles.wrapper}>
      <View style={styles.headerRow}>
        <View style={styles.headerTextWrap}>
          <Text style={styles.sectionTitle}>Pilihan untuk hari yang ingin dikenang</Text>
          <Text style={styles.sectionCopy}>
            Jelajahi partner yang siap membantu suasana pernikahan Anda terasa utuh, cantik, dan tetap nyaman dinikmati.
          </Text>
        </View>

        <View style={styles.viewToggle} testID="vendor-view-toggle">
          <Pressable
            onPress={() => onViewModeChange("grid")}
            style={({ pressed }) => [styles.viewButton, viewMode === "grid" && styles.viewButtonActive, pressed && styles.viewButtonPressed]}
            testID="vendor-view-grid-button"
          >
            <Feather color={viewMode === "grid" ? "#FFFFFF" : theme.colors.textPrimary} name="grid" size={14} />
            <Text style={[styles.viewButtonLabel, viewMode === "grid" && styles.viewButtonLabelActive]}>Ringkas</Text>
          </Pressable>

          <Pressable
            onPress={() => onViewModeChange("list")}
            style={({ pressed }) => [styles.viewButton, viewMode === "list" && styles.viewButtonActive, pressed && styles.viewButtonPressed]}
            testID="vendor-view-list-button"
          >
            <Feather color={viewMode === "list" ? "#FFFFFF" : theme.colors.textPrimary} name="list" size={14} />
            <Text style={[styles.viewButtonLabel, viewMode === "list" && styles.viewButtonLabelActive]}>Detail</Text>
          </Pressable>
        </View>
      </View>

      {compareMode ? <HomeCompareSection mode={mode} onClose={onCloseCompare} vendors={compareVendors} /> : null}

      {editorialMode ? (
        <View style={styles.editorialWrap} testID="desktop-vendor-collection">
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push(`/vendor/${featuredVendor.slug}` as Href)}
            style={({ pressed }) => [styles.featuredCard, pressed && styles.featuredCardPressed]}
            testID={`featured-vendor-card-${featuredVendor.slug}`}
          >
            <View style={styles.featuredCopy}>
              <Text style={styles.featuredEyebrow}>Pilihan editor</Text>
              <Text style={styles.featuredTitle}>{featuredVendor.name}</Text>
              <Text style={styles.featuredDescription}>{featuredVendor.description}</Text>

              <View style={styles.featuredMetaRow}>
                <View style={styles.metaChip}>
                  <Feather color={theme.colors.accent} name="map-pin" size={14} />
                  <Text style={styles.metaText}>{featuredVendor.location}</Text>
                </View>
                <View style={styles.metaChip}>
                  <Feather color={theme.colors.accent} name="heart" size={14} />
                  <Text style={styles.metaText}>Mulai {featuredVendor.startingPrice}</Text>
                </View>
              </View>

              <View style={styles.highlightRow}>
                {featuredVendor.highlights.map((item) => (
                  <View key={item} style={styles.highlightChip}>
                    <Text style={styles.highlightText}>{item}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.actionRow}>
                <Text style={styles.actionText}>Lihat detail vendor</Text>
                <Feather color="#FFFFFF" name="arrow-right" size={16} />
              </View>
            </View>

            <View style={styles.featuredImageWrap}>
              <Image contentFit="cover" source={{ uri: featuredVendor.image }} style={styles.featuredImage} testID="featured-vendor-image" />
            </View>
          </Pressable>

          <View style={styles.gridWrap}>
            {supportingVendors.map((vendor, index) => (
              <View
                key={vendor.slug}
                style={[
                  styles.gridItem,
                  supportingVendors.length % 2 === 1 && index === supportingVendors.length - 1 && styles.gridItemWide,
                ]}
              >
                <VendorCard
                  compact={isGrid}
                  index={index}
                  onPress={() => router.push(`/vendor/${vendor.slug}` as Href)}
                  vendor={vendor}
                />
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.mobileList}>
          {vendors.map((vendor, index) => (
            <VendorCard
              compact={isGrid}
              index={index}
              key={vendor.slug}
              onPress={() => router.push(`/vendor/${vendor.slug}` as Href)}
              vendor={vendor}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const createStyles = (
  theme: ReturnType<typeof useAppTheme>["theme"],
  mode: "mobile" | "tablet" | "desktop",
) => {
  const isDesktop = mode === "desktop";

  return StyleSheet.create({
    wrapper: {
      gap: mode === "tablet" ? 16 : 18,
    },
    headerRow: {
      alignItems: mode === "mobile" ? "flex-start" : "flex-end",
      flexDirection: mode === "mobile" ? "column" : "row",
      gap: mode === "tablet" ? 12 : 14,
      justifyContent: "space-between",
    },
    headerTextWrap: {
      flex: 1,
      gap: 6,
    },
    sectionTitle: {
      color: theme.colors.textPrimary,
      fontFamily: "Georgia",
      fontSize: 24,
      fontWeight: "700",
    },
    sectionCopy: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.body,
      lineHeight: 24,
      maxWidth: 620,
    },
    viewToggle: {
      alignSelf: "stretch",
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: theme.layout.buttonRadius,
      borderWidth: 1,
      flexDirection: "row",
      gap: 8,
      padding: 6,
    },
    viewButton: {
      alignItems: "center",
      borderRadius: theme.layout.buttonRadius,
      flex: 1,
      flexDirection: "row",
      gap: 8,
      justifyContent: "center",
      minHeight: 44,
    },
    viewButtonActive: {
      backgroundColor: theme.colors.accent,
    },
    viewButtonLabel: {
      color: theme.colors.textPrimary,
      fontSize: 13,
      fontWeight: "800",
    },
    viewButtonLabelActive: {
      color: "#FFFFFF",
    },
    viewButtonPressed: {
      opacity: 0.9,
    },
    editorialWrap: {
      gap: 18,
    },
    featuredCard: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: 30,
      borderWidth: 1,
      flexDirection: isDesktop ? "row" : "column",
      overflow: "hidden",
    },
    featuredCardPressed: {
      opacity: 0.94,
    },
    featuredCopy: {
      flex: isDesktop ? 1 : undefined,
      gap: 14,
      justifyContent: "center",
      padding: 22,
    },
    featuredEyebrow: {
      color: theme.colors.accent,
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    featuredTitle: {
      color: theme.colors.textPrimary,
      fontFamily: "Georgia",
      fontSize: isDesktop ? 30 : 26,
      fontWeight: "700",
      lineHeight: isDesktop ? 38 : 34,
    },
    featuredDescription: {
      color: theme.colors.textSecondary,
      fontSize: 14,
      lineHeight: 23,
      maxWidth: 400,
    },
    featuredMetaRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    metaChip: {
      alignItems: "center",
      backgroundColor: theme.colors.surfaceMuted,
      borderRadius: 999,
      flexDirection: "row",
      gap: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    metaText: {
      color: theme.colors.textPrimary,
      fontSize: 13,
      fontWeight: "700",
    },
    highlightRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    highlightChip: {
      backgroundColor: theme.colors.accentSoft,
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    highlightText: {
      color: theme.colors.textPrimary,
      fontSize: 12,
      fontWeight: "700",
    },
    actionRow: {
      alignItems: "center",
      alignSelf: "flex-start",
      backgroundColor: theme.colors.accent,
      borderRadius: 999,
      flexDirection: "row",
      gap: 8,
      marginTop: 6,
      paddingHorizontal: 18,
      paddingVertical: 12,
    },
    actionText: {
      color: "#FFFFFF",
      fontSize: 13,
      fontWeight: "800",
    },
    featuredImageWrap: {
      minHeight: isDesktop ? 320 : 280,
      width: isDesktop ? 380 : "100%",
    },
    featuredImage: {
      height: "100%",
      width: "100%",
    },
    gridWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: mode === "tablet" ? 14 : 16,
      justifyContent: "space-between",
    },
    gridItem: {
      width: isDesktop ? "48.9%" : "48.5%",
    },
    gridItemWide: {
      width: "100%",
    },
    mobileList: {
      gap: 16,
    },
  });
};