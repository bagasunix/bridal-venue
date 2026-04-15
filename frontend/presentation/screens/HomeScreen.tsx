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
import { HomeGallerySection } from "@/presentation/components/home/HomeGallerySection";
import { HomeHeroSection } from "@/presentation/components/home/HomeHeroSection";
import { HomePartnersSection } from "@/presentation/components/home/HomePartnersSection";
import { HomeTrustSection } from "@/presentation/components/home/HomeTrustSection";
import { HomeVendorSection } from "@/presentation/components/home/HomeVendorSection";
import { TopBar } from "@/presentation/components/TopBar";
import { useAppTheme } from "@/presentation/providers/ThemeProvider";

type ScreenMode = "mobile" | "tablet" | "desktop";

export function HomeScreen() {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const { width } = useWindowDimensions();
  const [isDesktop, setIsDesktop] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const introOpacity = useRef(new Animated.Value(0)).current;
  const introTranslate = useRef(new Animated.Value(14)).current;
  const useNativeDriver = Platform.OS !== "web";
  const browserWidth = Platform.OS === "web" && typeof window !== "undefined" ? window.innerWidth : width;

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

  const mode: ScreenMode = isDesktop ? "desktop" : width >= 720 ? "tablet" : "mobile";
  const contentWidth =
    mode === "desktop"
      ? Math.min(browserWidth - 72, theme.layout.webLandingWidth)
      : mode === "tablet"
        ? Math.min(width - 40, 900)
        : Math.min(width - 24, theme.layout.maxContentWidth);

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