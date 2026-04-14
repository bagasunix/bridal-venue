import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/presentation/providers/ThemeProvider";

const LABELS = {
  dark: "GELAP",
  light: "TERANG",
  system: "OTOMATIS",
} as const;

const ICONS = {
  dark: "moon",
  light: "sun",
  system: "smartphone",
} as const;

export function ThemeToggle() {
  const { cycleThemeMode, theme, themeMode } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={cycleThemeMode}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      testID="theme-toggle-button"
    >
      <View style={styles.iconWrap}>
        <Feather color={theme.colors.accent} name={ICONS[themeMode]} size={16} />
      </View>
      <Text style={styles.label} testID="theme-toggle-label">
        {LABELS[themeMode]}
      </Text>
    </Pressable>
  );
}

const createStyles = (theme: ReturnType<typeof useAppTheme>["theme"]) =>
  StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor: theme.isDark ? "rgba(30, 17, 37, 0.92)" : "rgba(255, 252, 254, 0.92)",
      borderColor: theme.colors.border,
      borderRadius: 999,
      borderWidth: 1,
      flexDirection: "row",
      gap: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    iconWrap: {
      alignItems: "center",
      backgroundColor: theme.isDark ? theme.colors.surfaceMuted : theme.colors.accentSoft,
      borderRadius: 999,
      height: 26,
      justifyContent: "center",
      width: 26,
    },
    label: {
      color: theme.colors.textPrimary,
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 1,
    },
    pressed: {
      opacity: 0.92,
      transform: [{ scale: 0.97 }],
    },
  });