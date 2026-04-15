import { StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/presentation/providers/ThemeProvider";
import type { Vendor } from "@/types";

type HomePartnersSectionProps = {
  vendors: Vendor[];
};

export function HomePartnersSection({ vendors }: HomePartnersSectionProps) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.wrapper} testID="partner-logos-section">
      <Text style={styles.label}>Partner pilihan</Text>
      <View style={styles.logoWrap}>
        {vendors.map((vendor) => (
          <View key={vendor.slug} style={styles.logoChip}>
            <Text style={styles.logoText}>{vendor.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useAppTheme>["theme"]) =>
  StyleSheet.create({
    wrapper: {
      gap: 14,
    },
    label: {
      color: theme.colors.textSecondary,
      fontSize: 13,
      fontWeight: "700",
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    logoWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    logoChip: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: 999,
      borderWidth: 1,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    logoText: {
      color: theme.colors.textPrimary,
      fontFamily: "Georgia",
      fontSize: 16,
      fontWeight: "700",
    },
  });