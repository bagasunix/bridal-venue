import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ThemeToggle } from "@/presentation/components/ThemeToggle";
import { useAppTheme } from "@/presentation/providers/ThemeProvider";

type TopBarProps = {
  overlay?: boolean;
  showBack?: boolean;
  subtitle?: string;
  title: string;
};

export function TopBar({ overlay = false, showBack = false, subtitle, title }: TopBarProps) {
  const router = useRouter();
  const { theme } = useAppTheme();
  const styles = createStyles(theme, overlay);

  return (
    <View style={styles.row} testID="screen-top-bar">
      <View style={styles.leading}>
        {showBack ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => router.back()}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
            testID="screen-back-button"
          >
            <Feather color={theme.colors.textPrimary} name="arrow-left" size={18} />
          </Pressable>
        ) : null}

        <View style={styles.titleWrap}>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        </View>
      </View>

      <ThemeToggle />
    </View>
  );
}

const createStyles = (
  theme: ReturnType<typeof useAppTheme>["theme"],
  overlay: boolean,
) =>
  StyleSheet.create({
    row: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    leading: {
      alignItems: "center",
      flex: 1,
      flexDirection: "row",
      gap: 12,
      marginRight: 12,
    },
    backButton: {
      alignItems: "center",
      backgroundColor: overlay ? "rgba(16, 8, 20, 0.35)" : theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: 999,
      borderWidth: 1,
      height: 42,
      justifyContent: "center",
      width: 42,
    },
    titleWrap: {
      flex: 1,
      gap: 2,
    },
    subtitle: {
      color: theme.colors.accent,
      fontSize: 11,
      fontWeight: "700",
      letterSpacing: 1.2,
      textTransform: "uppercase",
    },
    title: {
      color: theme.colors.textPrimary,
      fontFamily: "Georgia",
      fontSize: 18,
      fontWeight: "700",
    },
    pressed: {
      opacity: 0.88,
      transform: [{ scale: 0.97 }],
    },
  });