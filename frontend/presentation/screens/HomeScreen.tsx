import { type Href, useRouter } from "expo-router";
import { useMemo } from "react";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

import { vendors } from "@/mock/vendors";
import { HomeAssuranceSection } from "@/presentation/components/home/HomeAssuranceSection";
import { HomeCtaSection } from "@/presentation/components/home/HomeCtaSection";
import { HomeFaqSection } from "@/presentation/components/home/HomeFaqSection";
import { HomeGallerySection } from "@/presentation/components/home/HomeGallerySection";
import { HomeHeroSection } from "@/presentation/components/home/HomeHeroSection";
import { HomePartnersSection } from "@/presentation/components/home/HomePartnersSection";
import { HomeTrustSection } from "@/presentation/components/home/HomeTrustSection";
import { HomeVendorSection } from "@/presentation/components/home/HomeVendorSection";
import { TopBar } from "@/presentation/components/TopBar";
import { useAppTheme } from "@/presentation/providers/ThemeProvider";

type ScreenMode = "mobile" | "tablet" | "desktop";

export function HomeScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const { width } = useWindowDimensions();
  const [hasHydrated, setHasHydrated] = useState(Platform.OS !== "web");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const introOpacity = useRef(new Animated.Value(0)).current;
  const introTranslate = useRef(new Animated.Value(14)).current;
  const useNativeDriver = Platform.OS !== "web";
  const responsiveWidth =
    Platform.OS === "web"
      ? hasHydrated && typeof window !== "undefined"
        ? window.innerWidth
        : 390
      : width;

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

    const syncHydratedLayout = () => {
      setHasHydrated(true);
    };

    syncHydratedLayout();
    window.addEventListener("resize", syncHydratedLayout);

    return () => {
      window.removeEventListener("resize", syncHydratedLayout);
    };
  }, []);

  const mode: ScreenMode = responsiveWidth >= 1200 ? "desktop" : responsiveWidth >= 760 ? "tablet" : "mobile";
  const contentWidth =
    mode === "desktop"
      ? Math.min(responsiveWidth - 96, 1240)
      : mode === "tablet"
        ? Math.min(responsiveWidth - 48, 920)
        : Math.min(responsiveWidth - 24, theme.layout.maxContentWidth);

  const heroVendor = vendors[0];
  const featuredVendor = vendors[1];
  const supportingVendors = useMemo(
    () => vendors.filter((vendor) => vendor.slug !== featuredVendor.slug),
    [featuredVendor.slug],
  );
  const animatedStyle = {
    opacity: introOpacity,
    transform: [{ translateY: introTranslate }],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} testID="home-screen">
        <View style={[styles.container, { width: contentWidth }]}> 
          <TopBar subtitle="Kurasi butik" title="Atelier Hari Bahagia" />

          <HomeHeroSection animatedStyle={animatedStyle} heroVendor={heroVendor} mode={mode} />
          <HomeTrustSection mode={mode} />
          <HomeVendorSection
            featuredVendor={featuredVendor}
            isGrid={viewMode === "grid"}
            mode={mode}
            supportingVendors={supportingVendors}
            vendors={vendors}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
          <HomeAssuranceSection mode={mode} />
          <HomeGallerySection mode={mode} vendors={vendors} />
          <HomePartnersSection vendors={vendors} />
          <HomeFaqSection mode={mode} />
          <HomeCtaSection mode={mode} onPress={() => router.push(`/vendor/${heroVendor.slug}` as Href)} />
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
  });