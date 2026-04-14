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
  useWindowDimensions,
  View,
} from "react-native";

import { getVendorBySlug } from "@/mock/vendors";
import { CalendarGrid } from "@/presentation/components/CalendarGrid";
import { FormField } from "@/presentation/components/FormField";
import { TopBar } from "@/presentation/components/TopBar";
import { useAppTheme } from "@/presentation/providers/ThemeProvider";
import { fetchAvailability } from "@/services/availability";
import { submitBooking } from "@/services/webhook";
import { formatPrettyDate } from "@/utils/calendar";

type BookingScreenProps = {
  slug: string;
};

export function BookingScreen({ slug }: BookingScreenProps) {
  const router = useRouter();
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const { width } = useWindowDimensions();
  const contentWidth = Math.min(width - 24, theme.layout.maxContentWidth);
  const vendor = useMemo(() => getVendorBySlug(slug), [slug]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(vendor?.packages[0]?.name ?? "");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [displayedMonth, setDisplayedMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [loadingAvailability, setLoadingAvailability] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [availabilityHint, setAvailabilityHint] = useState<string | null>(null);

  useEffect(() => {
    setSelectedPackage(vendor?.packages[0]?.name ?? "");
  }, [vendor]);

  const currentMonth = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }, []);

  const canGoPrevMonth =
    displayedMonth.getFullYear() > currentMonth.getFullYear() ||
    (displayedMonth.getFullYear() === currentMonth.getFullYear() &&
      displayedMonth.getMonth() > currentMonth.getMonth());

  const changeMonth = (offset: number) => {
    setDisplayedMonth((currentMonthDate) =>
      new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + offset, 1),
    );
  };

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
          <TopBar showBack title="Booking" />
          <Text style={styles.emptyTitle}>This booking option is unavailable.</Text>
          <Pressable onPress={() => router.replace("/")} style={styles.primaryButton} testID="booking-not-found-back-button">
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
          <View style={[styles.container, { width: contentWidth }]}> 
            <TopBar showBack subtitle="Refined booking" title="Secure your date" />

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
                <ActivityIndicator color={theme.colors.accent} />
                <Text style={styles.loadingText}>Checking this month’s dates...</Text>
              </View>
            ) : (
              <CalendarGrid
                bookedDates={bookedDates}
                canGoPrevMonth={canGoPrevMonth}
                monthDate={displayedMonth}
                onNextMonth={() => changeMonth(1)}
                onPreviousMonth={() => changeMonth(-1)}
                onSelectDate={setSelectedDate}
                selectedDate={selectedDate}
              />
            )}

            {availabilityHint ? (
              <View style={styles.noteCard}>
                <Feather color={theme.colors.accent} name="info" size={16} />
                <Text style={styles.noteText}>{availabilityHint}</Text>
              </View>
            ) : null}

            {selectedDate ? (
              <View style={styles.noteCard}>
                <Feather color={theme.colors.success} name="check-circle" size={18} />
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
                <ActivityIndicator color="#FFFFFF" />
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

const createStyles = (theme: ReturnType<typeof useAppTheme>["theme"]) =>
  StyleSheet.create({
    safeArea: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    flex: {
      flex: 1,
    },
    scrollContent: {
      alignItems: "center",
      paddingBottom: 44,
      paddingTop: 18,
    },
    container: {
      gap: 18,
    },
    summaryCard: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: theme.layout.cardRadius,
      borderWidth: 1,
      gap: 10,
      padding: 20,
    },
    label: {
      color: theme.colors.accent,
      fontSize: theme.typography.small,
      fontWeight: "800",
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    title: {
      color: theme.colors.textPrimary,
      fontFamily: "Georgia",
      fontSize: theme.typography.title,
      fontWeight: "700",
    },
    copy: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.body,
      lineHeight: 24,
    },
    formCard: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: theme.layout.cardRadius,
      borderWidth: 1,
      gap: 18,
      padding: 20,
    },
    fieldBlock: {
      gap: 12,
    },
    fieldLabel: {
      color: theme.colors.accent,
      fontSize: theme.typography.small,
      fontWeight: "800",
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    packageWrap: {
      gap: 10,
    },
    packageChip: {
      backgroundColor: theme.colors.surfaceMuted,
      borderColor: theme.colors.border,
      borderRadius: 24,
      borderWidth: 1,
      gap: 4,
      padding: 16,
    },
    packageChipActive: {
      backgroundColor: theme.colors.accent,
      borderColor: theme.colors.accent,
    },
    packageChipTitle: {
      color: theme.colors.textPrimary,
      fontSize: 15,
      fontWeight: "700",
    },
    packageChipTitleActive: {
      color: "#FFFFFF",
    },
    packageChipPrice: {
      color: theme.colors.textSecondary,
      fontSize: 14,
      fontWeight: "700",
    },
    legendRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    legendChip: {
      alignItems: "center",
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: theme.layout.buttonRadius,
      borderWidth: 1,
      flexDirection: "row",
      gap: 8,
      paddingHorizontal: 14,
      paddingVertical: 10,
    },
    availableDot: {
      backgroundColor: theme.colors.success,
      borderRadius: 999,
      height: 12,
      width: 12,
    },
    bookedDot: {
      backgroundColor: theme.colors.booked,
      borderRadius: 999,
      height: 12,
      width: 12,
    },
    legendText: {
      color: theme.colors.textPrimary,
      fontSize: 14,
      fontWeight: "700",
    },
    loadingCard: {
      alignItems: "center",
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: theme.layout.cardRadius,
      borderWidth: 1,
      gap: 12,
      padding: 26,
    },
    loadingText: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.body,
    },
    noteCard: {
      alignItems: "center",
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: 22,
      borderWidth: 1,
      flexDirection: "row",
      gap: 10,
      padding: 16,
    },
    noteText: {
      color: theme.colors.textSecondary,
      flex: 1,
      fontSize: 14,
      lineHeight: 22,
    },
    errorCard: {
      backgroundColor: theme.isDark ? "rgba(167, 90, 111, 0.18)" : "rgba(139, 74, 92, 0.12)",
      borderRadius: 22,
      padding: 16,
    },
    errorText: {
      color: theme.colors.booked,
      fontSize: 14,
      fontWeight: "800",
    },
    primaryButton: {
      alignItems: "center",
      backgroundColor: theme.colors.accent,
      borderRadius: theme.layout.buttonRadius,
      justifyContent: "center",
      minHeight: 56,
      paddingHorizontal: 20,
    },
    primaryButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "800",
    },
    disabledButton: {
      opacity: 0.45,
    },
    pressedButton: {
      opacity: 0.92,
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
      color: theme.colors.textPrimary,
      fontFamily: "Georgia",
      fontSize: theme.typography.title,
      fontWeight: "700",
      textAlign: "center",
    },
  });