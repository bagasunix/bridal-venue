import { Feather } from "@expo/vector-icons";
import { type Href, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { vendors } from "@/mock/vendors";
import { TopBar } from "@/presentation/components/TopBar";
import { VendorCard } from "@/presentation/components/VendorCard";
import { useAppTheme } from "@/presentation/providers/ThemeProvider";

export function HomeScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const { width } = useWindowDimensions();
  const contentWidth = Math.min(width - 24, theme.layout.maxContentWidth);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const introOpacity = useRef(new Animated.Value(0)).current;
  const introTranslate = useRef(new Animated.Value(14)).current;
  const useNativeDriver = Platform.OS !== "web";
  const isGrid = viewMode === "grid";

  useEffect(() => {
    Animated.parallel([
      Animated.timing(introOpacity, {
        duration: 360,
        toValue: 1,
        useNativeDriver,
      }),
      Animated.timing(introTranslate, {
        duration: 360,
        toValue: 0,
        useNativeDriver,
      }),
    ]).start();
  }, [introOpacity, introTranslate, useNativeDriver]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} testID="home-screen">
        <View style={[styles.container, { width: contentWidth }]}>
          <TopBar subtitle="Curated rentals" title="Wedding Atelier" />

          <Animated.View
            style={[
              styles.heroCard,
              { opacity: introOpacity, transform: [{ translateY: introTranslate }] },
            ]}
          >
            <View style={styles.heroAccent} />
            <View style={styles.labelRow}>
              <Text style={styles.label}>Midnight plum collection</Text>
              <Feather color={theme.colors.accent} name="star" size={16} />
            </View>
            <Text style={styles.title}>Elegant rentals with a richer, darker wedding mood.</Text>
            <Text style={styles.copy}>
              Jelajahi vendor pilihan, cek tanggal unavailable secara instan, dan booking dalam alur yang terasa premium di mobile maupun web preview.
            </Text>
            <View style={styles.metricsRow}>
              <View style={styles.metricChip}>
                <Text style={styles.metricValue}>4</Text>
                <Text style={styles.metricLabel}>Premium vendors</Text>
              </View>
              <View style={styles.metricChip}>
                <Text style={styles.metricValue}>Auto</Text>
                <Text style={styles.metricLabel}>Dark mode ready</Text>
              </View>
            </View>
          </Animated.View>

          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Curated vendors</Text>
              <Text style={styles.sectionCopy}>Choose a wedding partner and continue to a richer booking flow.</Text>
            </View>

            <View style={styles.viewToggle} testID="vendor-view-toggle">
              <Pressable
                onPress={() => setViewMode("grid")}
                style={({ pressed }) => [
                  styles.viewButton,
                  isGrid && styles.viewButtonActive,
                  pressed && styles.viewButtonPressed,
                ]}
                testID="vendor-view-grid-button"
              >
                <Feather color={isGrid ? "#FFFFFF" : theme.colors.textPrimary} name="grid" size={14} />
                <Text style={[styles.viewButtonLabel, isGrid && styles.viewButtonLabelActive]}>Grid</Text>
              </Pressable>

              <Pressable
                onPress={() => setViewMode("list")}
                style={({ pressed }) => [
                  styles.viewButton,
                  !isGrid && styles.viewButtonActive,
                  pressed && styles.viewButtonPressed,
                ]}
                testID="vendor-view-list-button"
              >
                <Feather color={!isGrid ? "#FFFFFF" : theme.colors.textPrimary} name="list" size={14} />
                <Text style={[styles.viewButtonLabel, !isGrid && styles.viewButtonLabelActive]}>List</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.cardList}>
            {vendors.map((vendor, index) => (
              <VendorCard
                compact={isGrid}
                index={index}
                key={vendor.slug}
                onPress={() =>
                  router.push(`/vendor/${vendor.slug}` as Href)
                }
                vendor={vendor}
              />
            ))}
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
      gap: theme.layout.sectionGap,
    },
    heroCard: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: theme.layout.cardRadius,
      borderWidth: 1,
      gap: 16,
      overflow: "hidden",
      padding: 22,
    },
    heroAccent: {
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
      fontSize: theme.typography.hero,
      fontWeight: "700",
      lineHeight: 42,
      maxWidth: 340,
    },
    copy: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.body,
      lineHeight: 25,
      maxWidth: 390,
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
      minWidth: 132,
      paddingHorizontal: 14,
      paddingVertical: 12,
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
    sectionHeader: {
      gap: 6,
    },
    sectionHeaderRow: {
      alignItems: "flex-start",
      gap: 14,
    },
    sectionTitle: {
      color: theme.colors.textPrimary,
      fontFamily: "Georgia",
      fontSize: theme.typography.title,
      fontWeight: "700",
    },
    sectionCopy: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.body,
      lineHeight: 24,
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
    cardList: {
      gap: 18,
    },
  });