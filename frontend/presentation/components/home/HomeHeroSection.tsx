import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Animated, StyleSheet, Text, View, type ViewStyle } from "react-native";

import { useAppTheme } from "@/presentation/providers/ThemeProvider";
import type { Vendor } from "@/types";

type HomeHeroSectionProps = {
  animatedStyle: ViewStyle;
  heroVendor: Vendor;
  mode: "mobile" | "tablet" | "desktop";
};

export function HomeHeroSection({ animatedStyle, heroVendor, mode }: HomeHeroSectionProps) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme, mode);

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <View style={styles.copyWrap}>
        <View style={styles.accentBlob} />
        <View style={styles.labelRow}>
          <Text style={styles.label} testID="home-hero-label">
            Kurasi butik pernikahan
          </Text>
          <Feather color={theme.colors.accent} name="star" size={16} />
        </View>

        <Text style={styles.title} testID="home-hero-title">
          Merancang hari bahagia yang terasa anggun sejak pandangan pertama.
        </Text>
        <Text style={styles.copy} testID="home-hero-copy">
          Temukan lokasi, dekorasi, fotografi, dan jamuan yang dipilih dengan rasa—hangat, tenang, dan tetap berkelas untuk cerita yang sedang kalian siapkan.
        </Text>

        <View style={styles.metricsRow}>
          <View style={styles.metricChip} testID="home-metric-curated">
            <Text style={styles.metricValue}>4</Text>
            <Text style={styles.metricLabel}>Partner terkurasi</Text>
          </View>
          <View style={styles.metricChip} testID="home-metric-booking">
            <Text style={styles.metricValue}>Mudah</Text>
            <Text style={styles.metricLabel}>Alur booking ringkas</Text>
          </View>
          <View style={styles.metricChip} testID="home-metric-theme">
            <Text style={styles.metricValue}>Fleksibel</Text>
            <Text style={styles.metricLabel}>Terang dan gelap</Text>
          </View>
        </View>
      </View>

      <View style={styles.visualWrap}>
        <Image contentFit="cover" source={{ uri: heroVendor.image }} style={styles.image} testID="home-hero-image" />
        <View style={styles.imageOverlay} />
        <View style={styles.captionCard}>
          <Text style={styles.captionEyebrow}>Pilihan utama minggu ini</Text>
          <Text style={styles.captionTitle}>{heroVendor.name}</Text>
          <Text style={styles.captionCopy}>
            Tempat yang cocok untuk akad hangat, jamuan intim, dan foto senja yang terasa mahal tanpa berlebihan.
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}

const createStyles = (
  theme: ReturnType<typeof useAppTheme>["theme"],
  mode: "mobile" | "tablet" | "desktop",
) => {
  const isDesktop = mode === "desktop";
  const isTablet = mode === "tablet";

  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: theme.layout.cardRadius,
      borderWidth: 1,
      flexDirection: isDesktop ? "row" : "column",
      gap: 18,
      overflow: "hidden",
      padding: isDesktop ? 18 : 16,
    },
    copyWrap: {
      flex: isDesktop ? 1 : undefined,
      gap: 16,
      minWidth: 0,
      overflow: "hidden",
      padding: isDesktop ? 16 : 10,
      position: "relative",
    },
    accentBlob: {
      backgroundColor: theme.isDark ? "rgba(192,122,58,0.16)" : theme.colors.accentSoft,
      borderRadius: 999,
      height: 160,
      position: "absolute",
      right: -32,
      top: -32,
      width: 160,
    },
    labelRow: {
      alignItems: "center",
      flexDirection: "row",
      gap: 8,
    },
    label: {
      color: theme.colors.accent,
      fontSize: theme.typography.small,
      fontWeight: "800",
      letterSpacing: 1.1,
      textTransform: "uppercase",
    },
    title: {
      color: theme.colors.textPrimary,
      fontFamily: "Georgia",
      fontSize: isDesktop ? 34 : isTablet ? 30 : 28,
      fontWeight: "700",
      lineHeight: isDesktop ? 42 : isTablet ? 38 : 36,
      maxWidth: 460,
    },
    copy: {
      color: theme.colors.textSecondary,
      fontSize: 15,
      lineHeight: isDesktop ? 24 : 25,
      maxWidth: 430,
    },
    metricsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      marginTop: 4,
    },
    metricChip: {
      backgroundColor: theme.colors.surfaceMuted,
      borderColor: theme.colors.border,
      borderRadius: 22,
      borderWidth: 1,
      gap: 4,
      minWidth: isDesktop ? 118 : 112,
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    metricValue: {
      color: theme.colors.textPrimary,
      fontSize: 16,
      fontWeight: "800",
    },
    metricLabel: {
      color: theme.colors.textSecondary,
      fontSize: 13,
      fontWeight: "600",
    },
    visualWrap: {
      borderRadius: 28,
      flex: isDesktop ? 1 : undefined,
      height: isDesktop ? 390 : isTablet ? 340 : 300,
      minWidth: 0,
      overflow: "hidden",
      position: "relative",
    },
    image: {
      height: "100%",
      width: "100%",
    },
    imageOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.overlay,
    },
    captionCard: {
      backgroundColor: "rgba(255, 253, 249, 0.92)",
      borderRadius: 26,
      bottom: 18,
      gap: 8,
      left: 18,
      padding: 18,
      position: "absolute",
      right: 18,
    },
    captionEyebrow: {
      color: theme.colors.accent,
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    captionTitle: {
      color: theme.colors.textPrimary,
      fontFamily: "Georgia",
      fontSize: 22,
      fontWeight: "700",
    },
    captionCopy: {
      color: theme.colors.textSecondary,
      fontSize: 14,
      lineHeight: 22,
    },
  });
};