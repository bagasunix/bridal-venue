import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import {
  AppThemeProvider,
  useAppTheme,
} from "@/presentation/providers/ThemeProvider";

function RootNavigator() {
  const { theme } = useAppTheme();

  return (
    <>
      <StatusBar style={theme.statusBar} />
      <Stack
        screenOptions={{
          animation: "slide_from_right",
          contentStyle: { backgroundColor: theme.colors.background },
          headerShown: false,
        }}
      />
    </>
  );
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <RootNavigator />
    </AppThemeProvider>
  );
}