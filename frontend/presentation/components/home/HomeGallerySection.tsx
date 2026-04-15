import { Image } from "expo-image";
import { type Href, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/presentation/providers/ThemeProvider";
import type { Vendor } from "@/types";

type HomeGallerySectionProps = {
  mode: "mobile" | "tablet" | "desktop";
  vendors: Vendor[];
};

export function HomeGallerySection({ mode, vendors }: HomeGallerySectionProps) {
  const router = useRouter();
  const { theme } = useAppTheme();
  const styles = createStyles(theme, mode);
  const galleryItems = vendors.filter((vendor) => vendor.slug !== "velvet-bloom").slice(0, 3);

  return (
    <View style={styles.wrapper} testID="moment-gallery-section">
      <View style={styles.headerWrap}>
        <Text style={styles.eyebrow}>Galeri suasana</Text>
        <Text style={styles.title}>Campuran momen yang elegan, lembut, dan tetap terasa dekat.</Text>
      </View>

      <View style={styles.grid}>
        {galleryItems.map((vendor, index) => (
          <Pressable
            key={vendor.slug}
            accessibilityRole="button"
            onPress={() => router.push(`/vendor/${vendor.slug}` as Href)}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            testID={`gallery-card-${vendor.slug}`}
          >
            <Image contentFit="cover" source={{ uri: vendor.image }} style={styles.image} />
            <View style={styles.overlay} />
            <View style={styles.captionWrap}>
              <Text style={styles.captionEyebrow}>{vendor.category}</Text>
              <Text style={styles.captionTitle}>{vendor.name}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const createStyles = (
  theme: ReturnType<typeof useAppTheme>["theme"],
  mode: "mobile" | "tablet" | "desktop",
) => {
  const multiColumn = mode !== "mobile";

  return StyleSheet.create({
    wrapper: {
      gap: 16,
    },
    headerWrap: {
      gap: 6,
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
      fontSize: 28,
      fontWeight: "700",
      lineHeight: 36,
      maxWidth: 700,
    },
    grid: {
      flexDirection: multiColumn ? "row" : "column",
      flexWrap: multiColumn ? "wrap" : "nowrap",
      gap: 16,
    },
    card: {
      borderRadius: 28,
      height: mode === "desktop" ? 280 : mode === "tablet" ? 240 : 220,
      overflow: "hidden",
      position: "relative",
      width: multiColumn ? (mode === "desktop" ? "32%" : "48.8%") : "100%",
    },
    cardPressed: {
      opacity: 0.94,
    },
    image: {
      height: "100%",
      width: "100%",
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.overlay,
    },
    captionWrap: {
      bottom: 18,
      gap: 6,
      left: 18,
      position: "absolute",
      right: 18,
    },
    captionEyebrow: {
      color: "#FFFFFF",
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    captionTitle: {
      color: "#FFFFFF",
      fontFamily: "Georgia",
      fontSize: 24,
      fontWeight: "700",
    },
  });
};