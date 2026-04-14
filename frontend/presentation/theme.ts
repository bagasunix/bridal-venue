export type ThemeMode = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

const lightColors = {
  background: "#F6F0F6",
  surface: "#FFFCFE",
  surfaceMuted: "#F1E6F0",
  primary: "#5E2A63",
  accent: "#C07A3A",
  accentSoft: "#EAD6C5",
  textPrimary: "#1F1524",
  textSecondary: "#6B5B73",
  border: "#DACADD",
  success: "#5E896B",
  booked: "#8B4A5C",
  overlay: "rgba(20, 10, 26, 0.36)",
} as const;

const darkColors = {
  background: "#120916",
  surface: "#1E1125",
  surfaceMuted: "#291733",
  primary: "#E4BF92",
  accent: "#C07A3A",
  accentSoft: "#4C2D1A",
  textPrimary: "#FBF4F9",
  textSecondary: "#B8A8BF",
  border: "#44324D",
  success: "#7CB08A",
  booked: "#A75A6F",
  overlay: "rgba(6, 3, 10, 0.55)",
} as const;

export type AppColors = {
  accent: string;
  accentSoft: string;
  background: string;
  booked: string;
  border: string;
  overlay: string;
  primary: string;
  success: string;
  surface: string;
  surfaceMuted: string;
  textPrimary: string;
  textSecondary: string;
};

export const layout = {
  screenPadding: 20,
  sectionGap: 24,
  cardRadius: 30,
  imageRadius: 30,
  buttonRadius: 999,
  maxContentWidth: 520,
} as const;

export const typography = {
  hero: 34,
  title: 26,
  section: 21,
  body: 16,
  small: 12,
} as const;

export type AppTheme = {
  colors: AppColors;
  isDark: boolean;
  layout: typeof layout;
  typography: typeof typography;
  statusBar: "light" | "dark";
};

export function buildTheme(mode: ResolvedTheme): AppTheme {
  const isDark = mode === "dark";
  return {
    colors: isDark ? darkColors : lightColors,
    isDark,
    layout,
    typography,
    statusBar: isDark ? "light" : "dark",
  };
}