import { StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/presentation/providers/ThemeProvider";

type HomeAssuranceSectionProps = {
  mode: "mobile" | "tablet" | "desktop";
};

const REASONS = [
  "Tampilan dibuat jelas supaya Anda cepat merasa yakin sejak halaman pertama.",
  "Pilihan vendor ditata dengan rasa, jadi tidak terasa seperti katalog yang dingin.",
  "Alur cek tanggal sampai kirim permintaan dibuat singkat agar keputusan terasa mudah.",
];

export function HomeAssuranceSection({ mode }: HomeAssuranceSectionProps) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme, mode);

  return (
    <View style={styles.wrapper}>
      <View style={styles.assurancePanel} testID="why-choose-us-section">
        <Text style={styles.eyebrow}>Mengapa pasangan menyukai alur ini</Text>
        <Text style={styles.title}>Rapi dilihat, ringan dijalani, dan tetap terasa personal.</Text>

        <View style={styles.listWrap}>
          {REASONS.map((item) => (
            <View key={item} style={styles.reasonRow}>
              <View style={styles.bullet} />
              <Text style={styles.reasonText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.testimonialPanel} testID="testimonial-section">
        <Text style={styles.eyebrow}>Kesan pertama yang ingin ditinggalkan</Text>
        <Text style={styles.quote}>
          “Saat dibuka di browser, tampilannya harus langsung memberi rasa tenang—seolah kami sedang melihat brand wedding yang memang tahu cara menyambut calon pengantin.”
        </Text>
        <Text style={styles.meta}>— Gambaran pengalaman yang ingin dibangun untuk pengunjung pertama</Text>
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
      flexDirection: mode === "desktop" ? "row" : "column",
      gap: 16,
    },
    assurancePanel: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: 30,
      borderWidth: 1,
      flex: mode === "desktop" ? 1 : undefined,
      gap: 14,
      padding: 24,
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
      fontSize: 24,
      fontWeight: "700",
      lineHeight: 32,
    },
    listWrap: {
      gap: 12,
    },
    reasonRow: {
      flexDirection: "row",
      gap: 10,
    },
    bullet: {
      backgroundColor: theme.colors.accent,
      borderRadius: 999,
      height: 8,
      marginTop: 8,
      width: 8,
    },
    reasonText: {
      color: theme.colors.textSecondary,
      flex: 1,
      fontSize: 15,
      lineHeight: 24,
    },
    testimonialPanel: {
      backgroundColor: theme.colors.surfaceMuted,
      borderRadius: 30,
      flex: mode === "desktop" ? 1 : undefined,
      gap: 14,
      justifyContent: "center",
      minHeight: 260,
      padding: 24,
    },
    quote: {
      color: theme.colors.textPrimary,
      fontFamily: "Georgia",
      fontSize: 22,
      fontWeight: "700",
      lineHeight: 34,
    },
    meta: {
      color: theme.colors.textSecondary,
      fontSize: 14,
      lineHeight: 22,
      maxWidth: 460,
    },
  });