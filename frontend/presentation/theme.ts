export type ThemeMode = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

const lightColors = {
  background: "#F7F1E9",
  surface: "#FFFDF9",
  surfaceMuted: "#EFE3D5",
  primary: "#6E5444",
  accent: "#A88262",
  accentSoft: "#E8D6C2",
  textPrimary: "#2E2621",
  textSecondary: "#786A5F",
  border: "#E6D9CA",
  success: "#6D7C67",
  booked: "#A16D6A",
  overlay: "rgba(55, 39, 28, 0.28)",
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
  webLandingWidth: 1180,
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