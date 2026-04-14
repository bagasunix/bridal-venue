import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";

import {
  buildTheme,
  type AppTheme,
  type ResolvedTheme,
  type ThemeMode,
} from "@/presentation/theme";

const STORAGE_KEY = "wedding-theme-mode";

type ThemeContextValue = {
  cycleThemeMode: () => void;
  resolvedTheme: ResolvedTheme;
  setThemeMode: (mode: ThemeMode) => void;
  theme: AppTheme;
  themeMode: ThemeMode;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveTheme(
  themeMode: ThemeMode,
  systemTheme: string | null | undefined,
): ResolvedTheme {
  if (themeMode === "system") {
    return systemTheme === "dark" ? "dark" : "light";
  }
  return themeMode;
}

export function AppThemeProvider({ children }: PropsWithChildren) {
  const systemTheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((storedMode) => {
        if (storedMode === "light" || storedMode === "dark" || storedMode === "system") {
          setThemeModeState(storedMode);
        }
      })
      .catch(() => undefined);
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    AsyncStorage.setItem(STORAGE_KEY, mode).catch(() => undefined);
  }, []);

  const cycleThemeMode = useCallback(() => {
    setThemeModeState((currentMode) => {
      const nextMode =
        currentMode === "system"
          ? "dark"
          : currentMode === "dark"
            ? "light"
            : "system";
      AsyncStorage.setItem(STORAGE_KEY, nextMode).catch(() => undefined);
      return nextMode;
    });
  }, []);

  const resolvedTheme = useMemo(
    () => resolveTheme(themeMode, systemTheme),
    [systemTheme, themeMode],
  );
  const theme = useMemo(() => buildTheme(resolvedTheme), [resolvedTheme]);

  const value = useMemo(
    () => ({
      cycleThemeMode,
      resolvedTheme,
      setThemeMode,
      theme,
      themeMode,
    }),
    [cycleThemeMode, resolvedTheme, setThemeMode, theme, themeMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used inside AppThemeProvider");
  }
  return context;
}