import { Feather } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useAppTheme } from "@/presentation/providers/ThemeProvider";
import type { Vendor } from "@/types";

type VendorCardProps = {
  index?: number;
  vendor: Vendor;
  onPress: () => void;
};

export function VendorCard({ index = 0, vendor, onPress }: VendorCardProps) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        duration: 380,
        delay: 70 * index,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        duration: 380,
        delay: 70 * index,
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, opacity, translateY]);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        testID={`vendor-card-${vendor.slug}`}
      >
        <Image
          source={{ uri: vendor.image }}
          style={styles.image}
          testID={`vendor-card-image-${vendor.slug}`}
        />
        <View style={styles.overlay} />
        <View style={styles.body}>
          <View style={styles.headerRow}>
            <View style={styles.categoryPill}>
              <Text style={styles.categoryText}>{vendor.category}</Text>
            </View>
            <View style={styles.arrowBubble}>
              <Feather color={theme.colors.accent} name="arrow-up-right" size={18} />
            </View>
          </View>

          <Text style={styles.name}>{vendor.name}</Text>
          <Text numberOfLines={2} style={styles.description}>
            {vendor.description}
          </Text>

          <View style={styles.metaRow}>
            <View style={styles.metaChip}>
              <Feather color={theme.colors.accent} name="map-pin" size={13} />
              <Text numberOfLines={1} style={styles.metaText}>
                {vendor.location}
              </Text>
            </View>
            <View style={styles.metaChip}>
              <Feather color={theme.colors.accent} name="heart" size={13} />
              <Text style={styles.metaText}>From {vendor.startingPrice}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const createStyles = (theme: ReturnType<typeof useAppTheme>["theme"]) =>
  StyleSheet.create({
    card: {
      borderRadius: theme.layout.cardRadius,
      minHeight: 360,
      overflow: "hidden",
      position: "relative",
    },
    cardPressed: {
      opacity: 0.94,
      transform: [{ scale: 0.985 }],
    },
    image: {
      height: 360,
      width: "100%",
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.overlay,
    },
    body: {
      bottom: 0,
      gap: 12,
      left: 0,
      padding: 22,
      position: "absolute",
      right: 0,
    },
    headerRow: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    categoryPill: {
      backgroundColor: "rgba(255, 255, 255, 0.14)",
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
    arrowBubble: {
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.92)",
      borderRadius: 999,
      height: 34,
      justifyContent: "center",
      width: 34,
    },
    name: {
      color: "#FFFFFF",
      fontFamily: "Georgia",
      fontSize: theme.typography.title,
      fontWeight: "700",
    },
    description: {
      color: "rgba(255,255,255,0.82)",
      fontSize: theme.typography.body,
      lineHeight: 24,
    },
    metaRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    metaChip: {
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.12)",
      borderRadius: theme.layout.buttonRadius,
      flexDirection: "row",
      gap: 7,
      paddingHorizontal: 12,
      paddingVertical: 9,
    },
    metaText: {
      color: "#FFFFFF",
      fontSize: 13,
      fontWeight: "700",
    },
  });