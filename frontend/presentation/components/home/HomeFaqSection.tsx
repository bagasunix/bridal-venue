import { StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/presentation/providers/ThemeProvider";

type HomeFaqSectionProps = {
  mode: "mobile" | "tablet" | "desktop";
};

const FAQ_ITEMS = [
  {
    question: "Apakah saya bisa melihat tanggal yang sudah terisi lebih dulu?",
    answer: "Bisa. Sebelum mengirim permintaan, Anda dapat melihat tanggal yang sudah terisi agar pilihan terasa lebih cepat dan jelas.",
  },
  {
    question: "Apakah semua vendor di sini sudah dipilih secara khusus?",
    answer: "Ya. Koleksi ini disusun supaya tampilannya serasi, mudah dijelajahi, dan tetap terasa hangat saat pertama kali dibuka.",
  },
  {
    question: "Kalau saya masih ingin membandingkan beberapa vendor, bagaimana?",
    answer: "Anda bisa mulai dari koleksi vendor di bawah, lalu buka detail masing-masing sampai menemukan suasana yang paling cocok untuk hari Anda.",
  },
];

export function HomeFaqSection({ mode }: HomeFaqSectionProps) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme, mode);

  return (
    <View style={styles.wrapper} testID="faq-section">
      <View style={styles.headerWrap}>
        <Text style={styles.eyebrow}>FAQ singkat</Text>
        <Text style={styles.title}>Jawaban yang paling sering dicari, disampaikan dengan ringkas dan jelas.</Text>
      </View>

      <View style={styles.listWrap}>
        {FAQ_ITEMS.map((item) => (
          <View key={item.question} style={styles.itemCard}>
            <Text style={styles.question}>{item.question}</Text>
            <Text style={styles.answer}>{item.answer}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const createStyles = (
  theme: ReturnType<typeof useAppTheme>["theme"],
  mode: "mobile" | "tablet" | "desktop",
) =>
  StyleSheet.create({
    wrapper: {
      gap: 16,
    },
    headerWrap: {
      gap: 6,
    },
    eyebrow: {
      color: theme.colors.accent,
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    title: {
      color: theme.colors.textPrimary,
      fontFamily: "Georgia",
      fontSize: mode === "desktop" ? 26 : 24,
      fontWeight: "700",
      lineHeight: mode === "desktop" ? 34 : 32,
      maxWidth: 760,
    },
    listWrap: {
      flexDirection: mode === "desktop" ? "row" : "column",
      flexWrap: mode === "desktop" ? "wrap" : "nowrap",
      gap: 16,
    },
    itemCard: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: 26,
      borderWidth: 1,
      flex: mode === "desktop" ? 1 : undefined,
      gap: 10,
      minWidth: mode === "tablet" ? "48%" : undefined,
      padding: 20,
    },
    question: {
      color: theme.colors.textPrimary,
      fontSize: 17,
      fontWeight: "700",
      lineHeight: 24,
    },
    answer: {
      color: theme.colors.textSecondary,
      fontSize: 14,
      lineHeight: 23,
    },
  });