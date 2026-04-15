import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/presentation/providers/ThemeProvider";

type HomeTrustSectionProps = {
  mode: "mobile" | "tablet" | "desktop";
};

const ITEMS = [
  { id: "curation", icon: "feather", title: "Kurasi rapi", copy: "Setiap partner dipilih supaya tampilannya serasi dan prosesnya terasa ringan." },
  { id: "clarity", icon: "shield", title: "Proses jelas", copy: "Tanggal yang sudah terisi terlihat cepat, jadi Anda tidak membuang waktu." },
  { id: "warmth", icon: "heart", title: "Rasa yang hangat", copy: "Bahasa, warna, dan detailnya dibuat agar terasa dekat, bukan seperti template." },
] as const;

export function HomeTrustSection({ mode }: HomeTrustSectionProps) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme, mode);

  return (
    <View style={styles.section}>
      {ITEMS.map((item) => (
        <View key={item.id} style={styles.card} testID={`trust-card-${item.id}`}>
          <View style={styles.iconWrap}>
            <Feather color={theme.colors.accent} name={item.icon} size={18} />
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.copy}>{item.copy}</Text>
        </View>
      ))}
    </View>
  );
}

const createStyles = (
  theme: ReturnType<typeof useAppTheme>["theme"],
  mode: "mobile" | "tablet" | "desktop",
) =>
  StyleSheet.create({
    section: {
      flexDirection: mode === "mobile" ? "column" : "row",
      flexWrap: mode === "mobile" ? "nowrap" : "wrap",
      gap: 14,
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: 26,
      borderWidth: 1,
      flex: mode === "desktop" ? 1 : undefined,
      gap: 10,
      minWidth: mode === "tablet" ? "48%" : undefined,
      padding: 16,
    },
    iconWrap: {
      alignItems: "center",
      backgroundColor: theme.colors.surfaceMuted,
      borderRadius: 999,
      height: 38,
      justifyContent: "center",
      width: 38,
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: 16,
      fontWeight: "700",
    },
    copy: {
      color: theme.colors.textSecondary,
      fontSize: 13,
      lineHeight: 21,
    },
  });