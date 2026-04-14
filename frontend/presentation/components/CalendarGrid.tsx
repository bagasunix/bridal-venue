import { Feather } from "@expo/vector-icons";
import { LayoutAnimation, Pressable, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/presentation/providers/ThemeProvider";
import {
  buildCurrentMonthGrid,
  formatMonthTitle,
  getWeekdayNames,
  toIsoDateLocal,
} from "@/utils/calendar";

type CalendarGridProps = {
  bookedDates: string[];
  canGoPrevMonth: boolean;
  monthDate: Date;
  onNextMonth: () => void;
  onPreviousMonth: () => void;
  selectedDate: string | null;
  onSelectDate: (value: string) => void;
};

export function CalendarGrid({
  bookedDates,
  canGoPrevMonth,
  monthDate,
  onNextMonth,
  onPreviousMonth,
  selectedDate,
  onSelectDate,
}: CalendarGridProps) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const today = toIsoDateLocal(new Date());
  const days = buildCurrentMonthGrid(monthDate);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Pressable
          accessibilityRole="button"
          disabled={!canGoPrevMonth}
          onPress={onPreviousMonth}
          style={({ pressed }) => [
            styles.monthButton,
            !canGoPrevMonth && styles.monthButtonDisabled,
            pressed && canGoPrevMonth && styles.monthButtonPressed,
          ]}
          testID="calendar-prev-month-button"
        >
          <Feather color={theme.colors.textPrimary} name="chevron-left" size={18} />
        </Pressable>

        <Text style={styles.heading}>{formatMonthTitle(monthDate)}</Text>

        <Pressable
          accessibilityRole="button"
          onPress={onNextMonth}
          style={({ pressed }) => [styles.monthButton, pressed && styles.monthButtonPressed]}
          testID="calendar-next-month-button"
        >
          <Feather color={theme.colors.textPrimary} name="chevron-right" size={18} />
        </Pressable>
      </View>

      <View style={styles.weekdayRow}>
        {getWeekdayNames().map((day) => (
          <Text key={day} style={styles.weekdayText}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {days.map((day) => {
          if (!day.isoDate) {
            return <View key={day.key} style={styles.emptyCell} />;
          }

          const isBooked = bookedDates.includes(day.isoDate);
          const isPast = day.isoDate < today;
          const isAvailable = !isBooked && !isPast;
          const isSelected = selectedDate === day.isoDate;
          const disabled = isBooked || isPast;

          return (
            <Pressable
              accessibilityRole="button"
              disabled={disabled}
              key={day.key}
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                onSelectDate(day.isoDate as string);
              }}
              style={({ pressed }) => [
                styles.dayCell,
                isAvailable && styles.availableCell,
                isPast && styles.pastCell,
                isBooked && styles.bookedCell,
                isSelected && styles.selectedCell,
                pressed && !disabled && styles.pressedCell,
              ]}
              testID={`date-cell-${day.isoDate}`}
            >
              <Text
                style={[
                  styles.dayLabel,
                  isAvailable && styles.availableLabel,
                  disabled && styles.bookedLabel,
                  isSelected && styles.selectedLabel,
                ]}
              >
                {day.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useAppTheme>["theme"]) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: theme.layout.cardRadius,
      borderWidth: 1,
      gap: 16,
      padding: 20,
    },
    heading: {
      color: theme.colors.textPrimary,
      fontFamily: "Georgia",
      fontSize: theme.typography.section,
      fontWeight: "700",
      textAlign: "center",
    },
    headerRow: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    monthButton: {
      alignItems: "center",
      backgroundColor: theme.colors.surfaceMuted,
      borderColor: theme.colors.border,
      borderRadius: 999,
      borderWidth: 1,
      height: 44,
      justifyContent: "center",
      width: 44,
    },
    monthButtonDisabled: {
      opacity: 0.4,
    },
    monthButtonPressed: {
      opacity: 0.9,
      transform: [{ scale: 0.96 }],
    },
    weekdayRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    weekdayText: {
      color: theme.colors.textSecondary,
      flex: 1,
      fontSize: 13,
      fontWeight: "700",
      textAlign: "center",
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    emptyCell: {
      width: "12.5%",
    },
    dayCell: {
      alignItems: "center",
      backgroundColor: theme.colors.surfaceMuted,
      borderColor: theme.colors.border,
      borderRadius: 18,
      borderWidth: 1,
      justifyContent: "center",
      minHeight: 48,
      width: "12.5%",
    },
    availableCell: {
      backgroundColor: theme.isDark ? "rgba(124, 176, 138, 0.13)" : "rgba(94, 137, 107, 0.10)",
      borderColor: theme.colors.success,
    },
    pastCell: {
      opacity: 0.45,
    },
    bookedCell: {
      backgroundColor: theme.colors.booked,
      borderColor: theme.colors.booked,
      opacity: 0.42,
    },
    selectedCell: {
      backgroundColor: theme.colors.accent,
      borderColor: theme.colors.accent,
      opacity: 1,
    },
    pressedCell: {
      opacity: 0.92,
      transform: [{ scale: 0.96 }],
    },
    dayLabel: {
      color: theme.colors.textPrimary,
      fontSize: 15,
      fontWeight: "700",
    },
    availableLabel: {
      color: theme.colors.success,
    },
    bookedLabel: {
      color: theme.isDark ? "rgba(255,255,255,0.75)" : theme.colors.textSecondary,
    },
    selectedLabel: {
      color: "#FFFFFF",
    },
  });