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
  selectedDate: string | null;
  onSelectDate: (value: string) => void;
};

export function CalendarGrid({
  bookedDates,
  selectedDate,
  onSelectDate,
}: CalendarGridProps) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  const monthDate = new Date();
  const today = toIsoDateLocal(new Date());
  const days = buildCurrentMonthGrid(monthDate);

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>{formatMonthTitle(monthDate)}</Text>

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