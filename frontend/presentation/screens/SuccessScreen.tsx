import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { colors, layout, typography } from "@/presentation/theme";
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container} testID="success-screen">
        <View style={styles.iconWrap}>
          <Feather color={colors.card} name="check" size={30} />
        </View>

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

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    alignItems: "center",
    flex: 1,
    gap: 22,
    justifyContent: "center",
    paddingHorizontal: layout.screenPadding,
  },
  iconWrap: {
    alignItems: "center",
    backgroundColor: colors.success,
    borderRadius: 999,
    height: 84,
    justifyContent: "center",
    width: 84,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: "Georgia",
    fontSize: typography.hero,
    fontWeight: "700",
    textAlign: "center",
  },
  copy: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 25,
    maxWidth: 360,
    textAlign: "center",
  },
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: layout.cardRadius,
    gap: 14,
    padding: 20,
    width: "100%",
  },
  summaryRow: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    gap: 4,
    paddingBottom: 12,
  },
  summaryLabel: {
    color: colors.gold,
    fontSize: typography.small,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  summaryValue: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: colors.blush,
    borderRadius: layout.buttonRadius,
    justifyContent: "center",
    minHeight: 56,
    paddingHorizontal: 24,
    width: "100%",
  },
  primaryButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
});