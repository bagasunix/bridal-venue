export function formatPrettyDate(dateString: string) {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${dateString}T12:00:00`));
}

export function buildCalendarDays(monthDate: Date) {
  const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const lastDay = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
  const leading = firstDay.getDay();
  const days: Array<{ key: string; label: string; isoDate: string | null }> = [];

  for (let index = 0; index < leading; index += 1) {
    days.push({ key: `blank-${index}`, label: "", isoDate: null });
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    const current = new Date(monthDate.getFullYear(), monthDate.getMonth(), day, 12);
    days.push({
      key: current.toISOString(),
      label: String(day),
      isoDate: current.toISOString().slice(0, 10),
    });
  }

  return days;
}

export function monthTitle(monthDate: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(monthDate);
}

export const weekdayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
