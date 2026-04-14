import { Feather } from "@expo/vector-icons";
import { type Href, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getVendorBySlug } from "@/mock/vendors";
import { CalendarGrid } from "@/presentation/components/CalendarGrid";
import { FormField } from "@/presentation/components/FormField";
import { colors, layout, typography } from "@/presentation/theme";
import { fetchAvailability } from "@/services/availability";
import { submitBooking } from "@/services/webhook";
import { formatPrettyDate } from "@/utils/calendar";

type BookingScreenProps = {
  slug: string;
};

export function BookingScreen({ slug }: BookingScreenProps) {
  const router = useRouter();
  const vendor = useMemo(() => getVendorBySlug(slug), [slug]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(vendor?.packages[0]?.name ?? "");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [loadingAvailability, setLoadingAvailability] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [availabilityHint, setAvailabilityHint] = useState<string | null>(null);

  useEffect(() => {
    setSelectedPackage(vendor?.packages[0]?.name ?? "");
  }, [vendor]);

  useEffect(() => {
    if (!vendor) {
      return;
    }

    const loadAvailability = async () => {
      setLoadingAvailability(true);
      const response = await fetchAvailability(vendor.slug);
      setBookedDates(response.booked_dates);
      setAvailabilityHint(response.error_message ?? null);
      setLoadingAvailability(false);
    };

    void loadAvailability();
  }, [vendor]);

  if (!vendor) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centeredState}>
          <Text style={styles.emptyTitle}>This booking option is unavailable.</Text>
          <Pressable onPress={() => router.replace("/")} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Back home</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const isReady =
    name.trim().length >= 2 &&
    phone.trim().length >= 7 &&
    Boolean(selectedPackage) &&
    Boolean(selectedDate);

  const handleSubmit = async () => {
    if (!selectedDate || !isReady) {
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const packageLabel =
        vendor.packages.find((item) => item.name === selectedPackage)?.label ??
        selectedPackage;

      const result = await submitBooking({
        name: name.trim(),
        phone: phone.trim(),
        vendor: vendor.slug,
        date: selectedDate,
        package: selectedPackage,
      });

      router.replace(
        `/success?bookingId=${encodeURIComponent(result.booking_id)}&date=${encodeURIComponent(selectedDate)}&packageName=${encodeURIComponent(packageLabel)}&vendorName=${encodeURIComponent(vendor.name)}` as Href,
      );
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to submit booking.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} testID="booking-screen">
          <View style={styles.container}>
            <View style={styles.summaryCard}>
              <Text style={styles.label}>Booking form</Text>
              <Text style={styles.title}>{vendor.name}</Text>
              <Text style={styles.copy}>Choose your package, then pick a date that is still open.</Text>
            </View>

            <View style={styles.formCard}>
              <FormField
                label="Your name"
                onChangeText={setName}
                placeholder="Ava Thompson"
                testID="booking-name-input"
                value={name}
              />
              <FormField
                autoCapitalize="none"
                keyboardType="phone-pad"
                label="Phone"
                onChangeText={setPhone}
                placeholder="(555) 012-3456"
                testID="booking-phone-input"
                value={phone}
              />

              <View style={styles.fieldBlock}>
                <Text style={styles.fieldLabel}>Package</Text>
                <View style={styles.packageWrap}>
                  {vendor.packages.map((item) => {
                    const active = item.name === selectedPackage;
                    return (
                      <Pressable
                        key={item.name}
                        onPress={() => setSelectedPackage(item.name)}
                        style={({ pressed }) => [
                          styles.packageChip,
                          active && styles.packageChipActive,
                          pressed && styles.pressedButton,
                        ]}
                        testID={`package-chip-${item.name}`}
                      >
                        <Text style={[styles.packageChipTitle, active && styles.packageChipTitleActive]}>
                          {item.label}
                        </Text>
                        <Text style={[styles.packageChipPrice, active && styles.packageChipTitleActive]}>
                          {item.price}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            </View>

            <View style={styles.legendRow}>
              <View style={styles.legendChip}>
                <View style={styles.availableDot} />
                <Text style={styles.legendText}>Available</Text>
              </View>
              <View style={styles.legendChip}>
                <View style={styles.bookedDot} />
                <Text style={styles.legendText}>Booked</Text>
              </View>
            </View>

            {loadingAvailability ? (
              <View style={styles.loadingCard}>
                <ActivityIndicator color={colors.gold} />
                <Text style={styles.loadingText}>Checking this month’s dates...</Text>
              </View>
            ) : (
              <CalendarGrid
                bookedDates={bookedDates}
                onSelectDate={setSelectedDate}
                selectedDate={selectedDate}
              />
            )}

            {availabilityHint ? (
              <View style={styles.noteCard}>
                <Feather color={colors.gold} name="info" size={16} />
                <Text style={styles.noteText}>{availabilityHint}</Text>
              </View>
            ) : null}

            {selectedDate ? (
              <View style={styles.noteCard}>
                <Feather color={colors.success} name="check-circle" size={18} />
                <Text style={styles.noteText}>Selected date: {formatPrettyDate(selectedDate)}</Text>
              </View>
            ) : null}

            {errorMessage ? (
              <View style={styles.errorCard}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            <Pressable
              disabled={!isReady || submitting}
              onPress={handleSubmit}
              style={({ pressed }) => [
                styles.primaryButton,
                (!isReady || submitting) && styles.disabledButton,
                pressed && isReady && styles.pressedButton,
              ]}
              testID="submit-booking-button"
            >
              {submitting ? (
                <ActivityIndicator color={colors.textPrimary} />
              ) : (
                <Text style={styles.primaryButtonText}>Confirm booking</Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 36,
    paddingTop: 20,
  },
  container: {
    gap: 20,
    paddingHorizontal: layout.screenPadding,
  },
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: layout.cardRadius,
    gap: 10,
    padding: 20,
  },
  label: {
    color: colors.gold,
    fontSize: typography.small,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  title: {
    color: colors.textPrimary,
    fontFamily: "Georgia",
    fontSize: typography.title,
    fontWeight: "700",
  },
  copy: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 24,
  },
  formCard: {
    backgroundColor: colors.card,
    borderRadius: layout.cardRadius,
    gap: 18,
    padding: 20,
  },
  fieldBlock: {
    gap: 12,
  },
  fieldLabel: {
    color: colors.gold,
    fontSize: typography.small,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  packageWrap: {
    gap: 10,
  },
  packageChip: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 22,
    borderWidth: 1,
    gap: 4,
    padding: 16,
  },
  packageChipActive: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  packageChipTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
  },
  packageChipTitleActive: {
    color: colors.card,
  },
  packageChipPrice: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: "600",
  },
  legendRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  legendChip: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: layout.buttonRadius,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  availableDot: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    height: 12,
    width: 12,
  },
  bookedDot: {
    backgroundColor: colors.roseTint,
    borderRadius: 999,
    height: 12,
    width: 12,
  },
  legendText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
  },
  loadingCard: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: layout.cardRadius,
    gap: 12,
    padding: 26,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: typography.body,
  },
  noteCard: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 20,
    flexDirection: "row",
    gap: 10,
    padding: 16,
  },
  noteText: {
    color: colors.textSecondary,
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
  },
  errorCard: {
    backgroundColor: colors.roseTint,
    borderRadius: 20,
    padding: 16,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    fontWeight: "700",
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: colors.blush,
    borderRadius: layout.buttonRadius,
    justifyContent: "center",
    minHeight: 56,
    paddingHorizontal: 20,
  },
  primaryButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  disabledButton: {
    opacity: 0.5,
  },
  pressedButton: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
  centeredState: {
    alignItems: "center",
    flex: 1,
    gap: 18,
    justifyContent: "center",
    padding: 24,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontFamily: "Georgia",
    fontSize: typography.title,
    fontWeight: "700",
    textAlign: "center",
  },
});