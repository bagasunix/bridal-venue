import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
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
  const [isDesktop, setIsDesktop] = useState(false);
  const browserWidth = Platform.OS === "web" && typeof window !== "undefined" ? window.innerWidth : width;
  const contentWidth = isDesktop
    ? Math.min(browserWidth - 72, theme.layout.webLandingWidth)
    : Math.min(width - 24, theme.layout.maxContentWidth);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const introOpacity = useRef(new Animated.Value(0)).current;
  const introTranslate = useRef(new Animated.Value(14)).current;
  const useNativeDriver = Platform.OS !== "web";
  const isGrid = viewMode === "grid";
  const heroVendor = vendors[0];

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

  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") {
      return;
    }

    const updateDesktopState = () => {
      setIsDesktop(window.innerWidth >= 980);
    };

    updateDesktopState();
    window.addEventListener("resize", updateDesktopState);

    return () => {
      window.removeEventListener("resize", updateDesktopState);
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} testID="home-screen">
        <View style={[styles.container, { width: contentWidth }]}>
          <TopBar subtitle="Kurasi butik" title="Atelier Hari Bahagia" />

          <Animated.View
            style={[
              styles.heroCard,
              isDesktop && styles.heroCardDesktop,
              { opacity: introOpacity, transform: [{ translateY: introTranslate }] },
            ]}
          >
            <View style={[styles.heroCopyWrap, isDesktop && styles.heroCopyWrapDesktop]}>
              <View style={styles.heroAccent} />
              <View style={styles.labelRow}>
                <Text style={styles.label} testID="home-hero-label">Kurasi butik pernikahan</Text>
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

            <View style={[styles.heroVisualWrap, isDesktop && styles.heroVisualWrapDesktop]}>
              <Image
                contentFit="cover"
                source={{ uri: heroVendor.image }}
                style={styles.heroImage}
                testID="home-hero-image"
              />
              <View style={styles.heroImageOverlay} />
              <View style={styles.heroCaptionCard}>
                <Text style={styles.heroCaptionEyebrow}>Pilihan utama minggu ini</Text>
                <Text style={styles.heroCaptionTitle}>{heroVendor.name}</Text>
                <Text style={styles.heroCaptionCopy}>
                  Tempat yang cocok untuk akad hangat, jamuan intim, dan foto senja yang terasa mahal tanpa berlebihan.
                </Text>
              </View>
            </View>
          </Animated.View>

          <View style={[styles.trustSection, isDesktop && styles.trustSectionDesktop]}>
            {[
              { icon: "feather", title: "Kurasi rapi", copy: "Setiap partner dipilih supaya tampilannya serasi dan prosesnya terasa ringan." },
              { icon: "shield", title: "Proses jelas", copy: "Tanggal yang sudah terisi terlihat cepat, jadi Anda tidak membuang waktu." },
              { icon: "heart", title: "Rasa yang hangat", copy: "Bahasa, warna, dan detailnya dibuat agar terasa dekat, bukan seperti template." },
            ].map((item) => (
              <View key={item.title} style={styles.trustCard} testID={`trust-card-${item.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <View style={styles.trustIconWrap}>
                  <Feather color={theme.colors.accent} name={item.icon as never} size={18} />
                </View>
                <Text style={styles.trustTitle}>{item.title}</Text>
                <Text style={styles.trustCopy}>{item.copy}</Text>
              </View>
            ))}
          </View>

          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Pilihan untuk hari yang ingin dikenang</Text>
              <Text style={styles.sectionCopy}>
                Jelajahi partner yang siap membantu suasana pernikahan Anda terasa utuh, cantik, dan tetap nyaman dinikmati.
              </Text>
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
                <Text style={[styles.viewButtonLabel, isGrid && styles.viewButtonLabelActive]}>Ringkas</Text>
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
                <Text style={[styles.viewButtonLabel, !isGrid && styles.viewButtonLabelActive]}>Detail</Text>
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
      gap: 28,
    },
    heroCard: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: theme.layout.cardRadius,
      borderWidth: 1,
      gap: 18,
      overflow: "hidden",
      padding: 20,
    },
    heroCardDesktop: {
      alignItems: "stretch",
      flexDirection: "row",
      gap: 22,
      justifyContent: "space-between",
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
    heroCopyWrap: {
      gap: 16,
      overflow: "hidden",
      padding: 10,
      position: "relative",
    },
    heroCopyWrapDesktop: {
      flexBasis: 0,
      flexGrow: 1,
      justifyContent: "center",
      minWidth: 0,
      paddingHorizontal: 20,
      paddingVertical: 28,
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
      fontSize: 40,
      fontWeight: "700",
      lineHeight: 50,
      maxWidth: 520,
    },
    copy: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.body,
      lineHeight: 28,
      maxWidth: 470,
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
    heroVisualWrap: {
      borderRadius: 28,
      height: 320,
      overflow: "hidden",
      position: "relative",
    },
    heroVisualWrapDesktop: {
      flexBasis: 0,
      flexGrow: 1,
      height: 460,
      minWidth: 0,
    },
    heroImage: {
      height: "100%",
      width: "100%",
    },
    heroImageOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.overlay,
    },
    heroCaptionCard: {
      backgroundColor: "rgba(255, 253, 249, 0.92)",
      borderRadius: 26,
      bottom: 18,
      gap: 8,
      left: 18,
      padding: 18,
      position: "absolute",
      right: 18,
    },
    heroCaptionEyebrow: {
      color: theme.colors.accent,
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    heroCaptionTitle: {
      color: theme.colors.textPrimary,
      fontFamily: "Georgia",
      fontSize: 24,
      fontWeight: "700",
    },
    heroCaptionCopy: {
      color: theme.colors.textSecondary,
      fontSize: 14,
      lineHeight: 22,
    },
    trustSection: {
      gap: 14,
    },
    trustSectionDesktop: {
      flexDirection: "row",
    },
    trustCard: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: 26,
      borderWidth: 1,
      gap: 10,
      padding: 18,
    },
    trustIconWrap: {
      alignItems: "center",
      backgroundColor: theme.colors.surfaceMuted,
      borderRadius: 999,
      height: 38,
      justifyContent: "center",
      width: 38,
    },
    trustTitle: {
      color: theme.colors.textPrimary,
      fontSize: 17,
      fontWeight: "700",
    },
    trustCopy: {
      color: theme.colors.textSecondary,
      fontSize: 14,
      lineHeight: 22,
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
      fontSize: 28,
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