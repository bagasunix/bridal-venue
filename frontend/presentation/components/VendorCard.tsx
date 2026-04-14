import { Feather } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors, layout, shadows, typography } from "@/presentation/theme";
import type { Vendor } from "@/types";

type VendorCardProps = {
  vendor: Vendor;
  onPress: () => void;
};

export function VendorCard({ vendor, onPress }: VendorCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      testID={`vendor-card-${vendor.slug}`}
    >
      <Image source={{ uri: vendor.image }} style={styles.image} />
      <View style={styles.body}>
        <View style={styles.headerRow}>
          <View style={styles.categoryPill}>
            <Text style={styles.categoryText}>{vendor.category}</Text>
          </View>
          <Feather color={colors.gold} name="arrow-up-right" size={20} />
        </View>

        <Text style={styles.name}>{vendor.name}</Text>
        <Text style={styles.description}>{vendor.description}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaChip}>
            <Feather color={colors.gold} name="map-pin" size={14} />
            <Text style={styles.metaText}>{vendor.location}</Text>
          </View>
          <View style={styles.metaChip}>
            <Feather color={colors.gold} name="heart" size={14} />
            <Text style={styles.metaText}>From {vendor.startingPrice}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: layout.cardRadius,
    overflow: "hidden",
    ...shadows.soft,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
  image: {
    width: "100%",
    height: 240,
  },
  body: {
    gap: 14,
    padding: 20,
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryPill: {
    backgroundColor: colors.roseTint,
    borderRadius: layout.buttonRadius,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  categoryText: {
    color: colors.gold,
    fontSize: typography.small,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  name: {
    color: colors.textPrimary,
    fontFamily: "Georgia",
    fontSize: typography.title,
    fontWeight: "700",
  },
  description: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 24,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  metaChip: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: layout.buttonRadius,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  metaText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
  },
});