import { LayoutAnimation, Pressable, StyleSheet, Text, View } from "react-native";

import { colors, layout, typography } from "@/presentation/theme";
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
                isBooked && styles.bookedCell,
                isSelected && styles.selectedCell,
                pressed && !disabled && styles.pressedCell,
              ]}
              testID={`date-cell-${day.isoDate}`}
            >
              <Text
                style={[
                  styles.dayLabel,
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: layout.cardRadius,
    gap: 16,
    padding: 20,
  },
  heading: {
    color: colors.textPrimary,
    fontFamily: "Georgia",
    fontSize: typography.section,
    fontWeight: "700",
  },
  weekdayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weekdayText: {
    color: colors.textSecondary,
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
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 48,
    width: "12.5%",
  },
  bookedCell: {
    backgroundColor: colors.roseTint,
    borderColor: colors.roseTint,
  },
  selectedCell: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  pressedCell: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  dayLabel: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
  },
  bookedLabel: {
    color: colors.textSecondary,
  },
  selectedLabel: {
    color: colors.card,
  },
});