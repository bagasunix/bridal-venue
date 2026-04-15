import { Feather } from "@expo/vector-icons";
import { type Href, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/presentation/providers/ThemeProvider";
import type { Vendor } from "@/types";

type HomeCompareSectionProps = {
  mode: "mobile" | "tablet" | "desktop";
  onClose: () => void;
  vendors: Vendor[];
};

export function HomeCompareSection({ mode, onClose, vendors }: HomeCompareSectionProps) {
  const router = useRouter();
  const { theme } = useAppTheme();
  const styles = createStyles(theme, mode);

  return (
    <View style={styles.wrapper} testID="compare-vendors-section">
      <View style={styles.headerRow}>
        <View style={styles.headerCopy}>
          <Text style={styles.eyebrow}>Bandingkan vendor</Text>
          <Text style={styles.title}>Lihat perbedaan utamanya dalam satu pandangan yang rapi.</Text>
        </View>

        <Pressable onPress={onClose} style={({ pressed }) => [styles.closeButton, pressed && styles.closePressed]} testID="compare-vendors-close-button">
          <Text style={styles.closeText}>Tutup</Text>
        </Pressable>
      </View>

      <View style={styles.grid}>
        {vendors.map((vendor) => (
          <View key={vendor.slug} style={styles.card} testID={`compare-card-${vendor.slug}`}>
            <Text style={styles.cardCategory}>{vendor.category}</Text>
            <Text style={styles.cardTitle}>{vendor.name}</Text>

            <View style={styles.metaWrap}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Lokasi</Text>
                <Text style={styles.detailValue}>{vendor.location}</Text>
              </View>
              <View style={[styles.detailRow, styles.detailRowAccent]}>
                <Text style={styles.detailLabel}>Harga awal</Text>
                <Text style={styles.detailValue}>Mulai {vendor.startingPrice}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Paket unggulan</Text>
                <Text style={styles.detailValue}>{vendor.packages[0]?.label ?? "Pilihan utama"}</Text>
              </View>
            </View>

            <View style={styles.highlightWrap}>
              {vendor.highlights.slice(0, 2).map((item) => (
                <View key={item} style={styles.highlightChip}>
                  <Text style={styles.highlightText}>{item}</Text>
                </View>
              ))}
            </View>

            <Pressable
              onPress={() => router.push(`/vendor/${vendor.slug}` as Href)}
              style={({ pressed }) => [styles.actionButton, pressed && styles.actionPressed]}
              testID={`compare-open-${vendor.slug}`}
            >
              <Text style={styles.actionText}>Lihat detail</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

const createStyles = (
  theme: ReturnType<typeof useAppTheme>["theme"],
  mode: "mobile" | "tablet" | "desktop",
) => {
  const isDesktop = mode === "desktop";
  const isTablet = mode === "tablet";
  const cardWidth = isDesktop ? "31.8%" : isTablet ? "48.6%" : "100%";

  return StyleSheet.create({
    wrapper: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: 30,
      borderWidth: 1,
      gap: 18,
      padding: 20,
    },
    headerRow: {
      alignItems: isDesktop ? "flex-end" : "flex-start",
      flexDirection: isDesktop ? "row" : "column",
      gap: 12,
      justifyContent: "space-between",
    },
    headerCopy: {
      gap: 6,
      maxWidth: 700,
    },
    eyebrow: {
      color: theme.colors.accent,
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    title: {
      color: theme.colors.textPrimary,
      fontFamily: "Georgia",
      fontSize: isDesktop ? 24 : 22,
      fontWeight: "700",
      lineHeight: isDesktop ? 32 : 30,
    },
    closeButton: {
      alignItems: "center",
      backgroundColor: theme.colors.surfaceMuted,
      borderRadius: 999,
      height: 44,
      justifyContent: "center",
      paddingHorizontal: 16,
    },
    closePressed: {
      opacity: 0.9,
    },
    closeText: {
      color: theme.colors.textPrimary,
      fontSize: 13,
      fontWeight: "700",
    },
    grid: {
      flexDirection: isDesktop || isTablet ? "row" : "column",
      flexWrap: isDesktop || isTablet ? "wrap" : "nowrap",
      gap: 14,
      justifyContent: "space-between",
    },
    card: {
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
      borderRadius: 24,
      borderWidth: 1,
      gap: 12,
      padding: 18,
      width: cardWidth,
    },
    cardCategory: {
      color: theme.colors.accent,
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    cardTitle: {
      color: theme.colors.textPrimary,
      fontFamily: "Georgia",
      fontSize: 22,
      fontWeight: "700",
      lineHeight: 30,
    },
    metaWrap: {
      gap: 8,
    },
    detailRow: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: 16,
      borderWidth: 1,
      gap: 4,
      padding: 12,
    },
    detailRowAccent: {
      backgroundColor: theme.colors.accentSoft,
    },
    detailLabel: {
      color: theme.colors.accent,
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 0.8,
      textTransform: "uppercase",
    },
    detailValue: {
      color: theme.colors.textSecondary,
      fontSize: 14,
      fontWeight: "700",
    },
    highlightWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    highlightChip: {
      backgroundColor: theme.colors.accentSoft,
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 7,
    },
    highlightText: {
      color: theme.colors.textPrimary,
      fontSize: 12,
      fontWeight: "700",
    },
    actionButton: {
      alignItems: "center",
      alignSelf: "flex-start",
      backgroundColor: theme.colors.accent,
      borderRadius: 999,
      marginTop: 4,
      minHeight: 44,
      justifyContent: "center",
      paddingHorizontal: 16,
    },
    actionPressed: {
      opacity: 0.92,
    },
    actionText: {
      color: "#FFFFFF",
      fontSize: 13,
      fontWeight: "800",
    },
  });
};