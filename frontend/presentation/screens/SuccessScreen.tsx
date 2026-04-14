import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { TopBar } from "@/presentation/components/TopBar";
import { useAppTheme } from "@/presentation/providers/ThemeProvider";
import { formatPrettyDate } from "@/utils/calendar";

type SuccessScreenProps = {
  bookingId: string;
  date: string;
  packageName: string;
  vendorName: string;
};

export function SuccessScreen({
  bookingId,
  date,
  packageName,
  vendorName,
}: SuccessScreenProps) {
  const router = useRouter();
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const { width } = useWindowDimensions();
  const contentWidth = Math.min(width - 24, theme.layout.maxContentWidth);
  const pulse = useRef(new Animated.Value(0.94)).current;
  const useNativeDriver = Platform.OS !== "web";

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          duration: 1100,
          toValue: 1,
          useNativeDriver,
        }),
        Animated.timing(pulse, {
          duration: 1100,
          toValue: 0.94,
          useNativeDriver,
        }),
      ]),
    ).start();
  }, [pulse, useNativeDriver]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { width: contentWidth }]} testID="success-screen">
        <TopBar subtitle="Booking complete" title="Confirmation" />

        <Animated.View style={[styles.iconWrap, { transform: [{ scale: pulse }] }]}>
          <Feather color="#FFFFFF" name="check" size={30} />
        </Animated.View>

        <Text style={styles.title}>Booking request sent</Text>
        <Text style={styles.copy}>
          Your wedding inquiry is ready, and the selected date has been reserved for this demo flow.
        </Text>

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Vendor</Text>
            <Text style={styles.summaryValue}>{vendorName}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Date</Text>
            <Text style={styles.summaryValue}>{formatPrettyDate(date)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Package</Text>
            <Text style={styles.summaryValue}>{packageName}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Reference</Text>
            <Text style={styles.summaryValue}>{bookingId}</Text>
          </View>
        </View>

        <Pressable onPress={() => router.replace("/")} style={styles.primaryButton} testID="back-home-button">
          <Text style={styles.primaryButtonText}>Back to vendors</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: ReturnType<typeof useAppTheme>["theme"]) =>
  StyleSheet.create({
    safeArea: {
      alignItems: "center",
      backgroundColor: theme.colors.background,
      flex: 1,
      paddingTop: 18,
    },
    container: {
      alignItems: "center",
      flex: 1,
      gap: 22,
      justifyContent: "center",
    },
    iconWrap: {
      alignItems: "center",
      backgroundColor: theme.colors.accent,
      borderRadius: 999,
      height: 88,
      justifyContent: "center",
      width: 88,
    },
    title: {
      color: theme.colors.textPrimary,
      fontFamily: "Georgia",
      fontSize: theme.typography.hero,
      fontWeight: "700",
      textAlign: "center",
    },
    copy: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.body,
      lineHeight: 25,
      maxWidth: 360,
      textAlign: "center",
    },
    summaryCard: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: theme.layout.cardRadius,
      borderWidth: 1,
      gap: 14,
      padding: 20,
      width: "100%",
    },
    summaryRow: {
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
      gap: 4,
      paddingBottom: 12,
    },
    summaryLabel: {
      color: theme.colors.accent,
      fontSize: theme.typography.small,
      fontWeight: "800",
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    summaryValue: {
      color: theme.colors.textPrimary,
      fontSize: 16,
      fontWeight: "700",
    },
    primaryButton: {
      alignItems: "center",
      backgroundColor: theme.colors.accent,
      borderRadius: theme.layout.buttonRadius,
      justifyContent: "center",
      minHeight: 56,
      paddingHorizontal: 24,
      width: "100%",
    },
    primaryButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "800",
    },
  });