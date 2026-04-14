import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useEffect, useRef } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useAppTheme } from "@/presentation/providers/ThemeProvider";
import type { Vendor } from "@/types";

type VendorCardProps = {
  compact?: boolean;
  index?: number;
  vendor: Vendor;
  onPress: () => void;
};

export function VendorCard({ compact = false, index = 0, vendor, onPress }: VendorCardProps) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme, compact);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  const useNativeDriver = Platform.OS !== "web";

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        duration: 380,
        delay: 70 * index,
        toValue: 1,
        useNativeDriver,
      }),
      Animated.timing(translateY, {
        duration: 380,
        delay: 70 * index,
        toValue: 0,
        useNativeDriver,
      }),
    ]).start();
  }, [index, opacity, translateY, useNativeDriver]);

  return (
    <Animated.View style={[styles.wrapper, { opacity, transform: [{ translateY }] }] }>
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        testID={`vendor-card-${vendor.slug}`}
      >
        <Image
          contentFit="cover"
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
          <Text numberOfLines={compact ? 1 : 2} style={styles.description}>
            {vendor.description}
          </Text>

          {!compact ? (
            <View style={styles.highlightRow}>
              {vendor.highlights.slice(0, 2).map((item) => (
                <View key={item} style={styles.highlightChip}>
                  <Text numberOfLines={1} style={styles.highlightText}>
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}

          <View style={styles.metaRow}>
            <View style={styles.metaChip}>
              <Feather color={theme.colors.accent} name="map-pin" size={13} />
              <Text numberOfLines={1} style={styles.metaText}>
                {vendor.location}
              </Text>
            </View>
            <View style={styles.metaChip}>
              <Feather color={theme.colors.accent} name="heart" size={13} />
              <Text style={styles.metaText}>Mulai {vendor.startingPrice}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const createStyles = (
  theme: ReturnType<typeof useAppTheme>["theme"],
  compact: boolean,
) =>
  StyleSheet.create({
    card: {
      borderRadius: theme.layout.cardRadius,
      minHeight: compact ? 250 : 360,
      overflow: "hidden",
      position: "relative",
      width: "100%",
    },
    wrapper: {
      width: "100%",
    },
    cardPressed: {
      opacity: 0.94,
      transform: [{ scale: 0.985 }],
    },
    image: {
      height: compact ? 250 : 360,
      width: "100%",
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.overlay,
    },
    body: {
      bottom: 0,
      gap: compact ? 10 : 12,
      left: 0,
      padding: compact ? 16 : 22,
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
      fontSize: compact ? 11 : theme.typography.small,
      fontWeight: "800",
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    arrowBubble: {
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.92)",
      borderRadius: 999,
      height: compact ? 30 : 34,
      justifyContent: "center",
      width: compact ? 30 : 34,
    },
    name: {
      color: "#FFFFFF",
      fontFamily: "Georgia",
      fontSize: compact ? 20 : theme.typography.title,
      fontWeight: "700",
    },
    description: {
      color: "rgba(255,255,255,0.82)",
      fontSize: compact ? 13 : theme.typography.body,
      lineHeight: compact ? 18 : 24,
    },
    highlightRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    highlightChip: {
      backgroundColor: "rgba(255, 255, 255, 0.12)",
      borderRadius: theme.layout.buttonRadius,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    highlightText: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "700",
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
      paddingHorizontal: compact ? 10 : 12,
      paddingVertical: compact ? 8 : 9,
    },
    metaText: {
      color: "#FFFFFF",
      fontSize: compact ? 12 : 13,
      fontWeight: "700",
    },
  });