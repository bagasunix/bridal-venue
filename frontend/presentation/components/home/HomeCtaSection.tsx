import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/presentation/providers/ThemeProvider";

type HomeCtaSectionProps = {
  mode: "mobile" | "tablet" | "desktop";
  onConsultPress: () => void;
  onExplorePress: () => void;
  onPlanPress: () => void;
};

export function HomeCtaSection({ mode, onConsultPress, onExplorePress, onPlanPress }: HomeCtaSectionProps) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme, mode);

  return (
    <View style={styles.wrapper} testID="cta-section">
      <Text style={styles.eyebrow}>Langkah berikutnya</Text>
      <Text style={styles.title}>Mulai rencanakan hari Anda dengan pilihan vendor yang terasa paling pas.</Text>
      <Text style={styles.copy}>
        Jika Anda ingin mulai dari yang paling mudah, buka detail vendor favorit Anda lalu lihat tanggal yang masih tersedia. Dari sana, langkah berikutnya akan terasa jauh lebih ringan.
      </Text>

      <Pressable
        accessibilityRole="button"
        onPress={onPlanPress}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        testID="home-cta-button"
      >
        <Text style={styles.buttonText}>Mulai rencanakan hari Anda</Text>
      </Pressable>

      <View style={styles.secondaryRow}>
        <Pressable
          accessibilityRole="button"
          onPress={onExplorePress}
          style={({ pressed }) => [styles.secondaryButton, pressed && styles.secondaryButtonPressed]}
          testID="home-secondary-vendors-button"
        >
          <Text style={styles.secondaryButtonText}>Lihat semua vendor</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={onConsultPress}
          style={({ pressed }) => [styles.secondaryButton, pressed && styles.secondaryButtonPressed]}
          testID="home-secondary-consult-button"
        >
          <Text style={styles.secondaryButtonText}>Mulai konsultasi</Text>
        </Pressable>
      </View>
    </View>
  );
}

const createStyles = (
  theme: ReturnType<typeof useAppTheme>["theme"],
  mode: "mobile" | "tablet" | "desktop",
) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: 30,
      borderWidth: 1,
      gap: 12,
      padding: mode === "desktop" ? 28 : 22,
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
      fontSize: mode === "desktop" ? 30 : 26,
      fontWeight: "700",
      lineHeight: mode === "desktop" ? 38 : 34,
      maxWidth: 760,
    },
    copy: {
      color: theme.colors.textSecondary,
      fontSize: 15,
      lineHeight: 24,
      maxWidth: 720,
    },
    button: {
      alignItems: "center",
      alignSelf: "flex-start",
      backgroundColor: theme.colors.accent,
      borderRadius: 999,
      marginTop: 8,
      minHeight: 48,
      justifyContent: "center",
      paddingHorizontal: 22,
    },
    buttonPressed: {
      opacity: 0.92,
      transform: [{ scale: 0.98 }],
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 15,
      fontWeight: "800",
    },
    secondaryRow: {
      flexDirection: mode === "desktop" ? "row" : "column",
      gap: 12,
      marginTop: 2,
    },
    secondaryButton: {
      alignItems: "center",
      alignSelf: mode === "desktop" ? "flex-start" : "stretch",
      backgroundColor: theme.colors.surfaceMuted,
      borderColor: theme.colors.border,
      borderRadius: 999,
      borderWidth: 1,
      justifyContent: "center",
      minHeight: 44,
      paddingHorizontal: 18,
    },
    secondaryButtonPressed: {
      opacity: 0.9,
      transform: [{ scale: 0.98 }],
    },
    secondaryButtonText: {
      color: theme.colors.textPrimary,
      fontSize: 14,
      fontWeight: "700",
    },
  });