import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

import { useAppTheme } from "@/presentation/providers/ThemeProvider";

type HomeStickyCtaProps = {
  active: boolean;
  onPress: () => void;
};

export function HomeStickyCta({ active, onPress }: HomeStickyCtaProps) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      testID="home-sticky-cta-button"
    >
      <Feather color="#FFFFFF" name="columns" size={14} />
      <Text style={styles.label}>{active ? "Tutup perbandingan" : "Bandingkan vendor"}</Text>
    </Pressable>
  );
}

const createStyles = (theme: ReturnType<typeof useAppTheme>["theme"]) =>
  StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor: theme.colors.accent,
      borderRadius: 999,
      bottom: 22,
      flexDirection: "row",
      gap: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      position: "absolute",
      right: 22,
      zIndex: 20,
    },
    label: {
      color: "#FFFFFF",
      fontSize: 13,
      fontWeight: "800",
    },
    pressed: {
      opacity: 0.92,
      transform: [{ scale: 0.98 }],
    },
  });