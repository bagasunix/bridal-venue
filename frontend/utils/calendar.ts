export type CalendarDay = {
  key: string;
  label: string;
  isoDate: string | null;
};

const WEEKDAY_NAMES = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

const pad = (value: number) => String(value).padStart(2, "0");

export const toIsoDateLocal = (value: Date) =>
  `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`;

export const formatMonthTitle = (value: Date) =>
  value.toLocaleDateString("id-ID", { month: "long", year: "numeric" });

export const formatPrettyDate = (isoDate: string) => {
  const dateValue = new Date(`${isoDate}T12:00:00`);
  return dateValue.toLocaleDateString("id-ID", {
    weekday: "short",
    month: "long",
    day: "numeric",
  });
};

export const getWeekdayNames = () => WEEKDAY_NAMES;

export const buildCurrentMonthGrid = (monthDate = new Date()): CalendarDay[] => {
  const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const lastDay = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
  const leadingBlankDays = firstDay.getDay();
  const days: CalendarDay[] = [];

  for (let index = 0; index < leadingBlankDays; index += 1) {
    days.push({ key: `blank-${index}`, label: "", isoDate: null });
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    const currentDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
    days.push({
      key: `day-${day}`,
      label: String(day),
      isoDate: toIsoDateLocal(currentDate),
    });
  }

  return days;
};