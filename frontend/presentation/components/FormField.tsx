import {
  StyleSheet,
  Text,
  TextInput,
  type KeyboardTypeOptions,
  type TextInputProps,
  View,
} from "react-native";

import { useAppTheme } from "@/presentation/providers/ThemeProvider";

type FormFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
  testID: string;
} & Pick<TextInputProps, "autoCapitalize">;

export function FormField({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  autoCapitalize = "sentences",
  testID,
}: FormFieldProps) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        style={styles.input}
        testID={testID}
        value={value}
      />
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useAppTheme>["theme"]) =>
  StyleSheet.create({
    wrapper: {
      gap: 10,
    },
    label: {
      color: theme.colors.accent,
      fontSize: theme.typography.small,
      fontWeight: "700",
      letterSpacing: 0.9,
      textTransform: "uppercase",
    },
    input: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: 22,
      borderWidth: 1,
      color: theme.colors.textPrimary,
      fontSize: theme.typography.body,
      minHeight: 56,
      paddingHorizontal: 18,
    },
  });