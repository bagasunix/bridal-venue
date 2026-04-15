import { type Href, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  type LayoutChangeEvent,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { vendors } from "@/mock/vendors";
import { HomeAssuranceSection } from "@/presentation/components/home/HomeAssuranceSection";
import { HomeCtaSection } from "@/presentation/components/home/HomeCtaSection";
import { HomeFaqSection } from "@/presentation/components/home/HomeFaqSection";
import { HomeGallerySection } from "@/presentation/components/home/HomeGallerySection";
import { HomeHeroSection } from "@/presentation/components/home/HomeHeroSection";
import { HomeManifestoSection } from "@/presentation/components/home/HomeManifestoSection";
import { HomePartnersSection } from "@/presentation/components/home/HomePartnersSection";
import { HomeStickyCta } from "@/presentation/components/home/HomeStickyCta";
import { HomeTrustSection } from "@/presentation/components/home/HomeTrustSection";
import { HomeVendorSection } from "@/presentation/components/home/HomeVendorSection";
import { TopBar } from "@/presentation/components/TopBar";
import { useAppTheme } from "@/presentation/providers/ThemeProvider";

type ScreenMode = "mobile" | "tablet" | "desktop";

export function HomeScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const [hasHydrated, setHasHydrated] = useState(Platform.OS !== "web");
  const [clientWidth, setClientWidth] = useState(() =>
    Platform.OS === "web" ? 390 : Dimensions.get("window").width,
  );
  const [compareMode, setCompareMode] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [vendorSectionY, setVendorSectionY] = useState(0);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const introOpacity = useRef(new Animated.Value(0)).current;
  const introTranslate = useRef(new Animated.Value(14)).current;
  const useNativeDriver = Platform.OS !== "web";
  const responsiveWidth = clientWidth;
  const heroVendor = vendors[0];
  const featuredVendor = vendors[1];
  const compareVendors = vendors.slice(0, 3);
  const supportingVendors = vendors.filter((vendor) => vendor.slug !== featuredVendor.slug);
  const animatedStyle = {
    opacity: introOpacity,
    transform: [{ translateY: introTranslate }],
  };

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
    if (Platform.OS === "web") {
      if (typeof window === "undefined") {
        return;
      }

      const syncHydratedLayout = () => {
        setHasHydrated(true);
        setClientWidth(window.innerWidth);
      };

      syncHydratedLayout();
      window.addEventListener("resize", syncHydratedLayout);

      return () => {
        window.removeEventListener("resize", syncHydratedLayout);
      };
    }

    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setClientWidth(window.width);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const mode: ScreenMode = responsiveWidth >= 1200 ? "desktop" : responsiveWidth >= 760 ? "tablet" : "mobile";
  const styles = createStyles(theme, mode);

  if (Platform.OS === "web" && !hasHydrated) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} testID="home-screen">
          <View style={[styles.container, { width: Math.min(390 - 24, theme.layout.maxContentWidth) }]} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  const contentWidth =
    mode === "desktop"
      ? Math.min(responsiveWidth - 96, 1240)
      : mode === "tablet"
        ? Math.min(responsiveWidth - 48, 920)
        : Math.min(responsiveWidth - 24, theme.layout.maxContentWidth);
  const handleVendorSectionLayout = (event: LayoutChangeEvent) => {
    setVendorSectionY(event.nativeEvent.layout.y);
  };

  const scrollToVendors = () => {
    scrollViewRef.current?.scrollTo({ animated: true, y: Math.max(vendorSectionY - 90, 0) });
  };

  const toggleCompareMode = () => {
    setCompareMode((current) => !current);
    setViewMode("grid");
    setTimeout(scrollToVendors, 60);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} ref={scrollViewRef} testID="home-screen">
        <View style={[styles.container, { width: contentWidth }]}> 
          <TopBar subtitle="Kurasi butik" title="Atelier Hari Bahagia" />

          <HomeHeroSection
            animatedStyle={animatedStyle}
            heroVendor={heroVendor}
            mode={mode}
            supportingVendors={vendors.slice(1, 4)}
          />
          <HomeTrustSection mode={mode} />
          {mode !== "mobile" ? <HomeManifestoSection mode={mode} vendors={vendors} /> : null}
          <HomeVendorSection
            compareMode={compareMode}
            compareVendors={compareVendors}
            featuredVendor={featuredVendor}
            isGrid={viewMode === "grid"}
            mode={mode}
            onCloseCompare={() => setCompareMode(false)}
            onOpenCompare={toggleCompareMode}
            onLayout={handleVendorSectionLayout}
            supportingVendors={supportingVendors}
            vendors={vendors}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
          <HomeAssuranceSection mode={mode} />
          <HomeGallerySection mode={mode} vendors={vendors} />
          <HomePartnersSection vendors={vendors} />
          <HomeFaqSection mode={mode} />
          <HomeCtaSection
            mode={mode}
            onConsultPress={() => router.push(`/booking?slug=${heroVendor.slug}` as Href)}
            onExplorePress={scrollToVendors}
            onPlanPress={() => router.push(`/vendor/${heroVendor.slug}` as Href)}
          />
        </View>
      </ScrollView>
      {mode !== "mobile" ? <HomeStickyCta active={compareMode} onPress={toggleCompareMode} /> : null}
    </SafeAreaView>
  );
}

const createStyles = (
  theme: ReturnType<typeof useAppTheme>["theme"],
  mode: ScreenMode,
) =>
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
      gap: mode === "tablet" ? 24 : 26,
    },
  });