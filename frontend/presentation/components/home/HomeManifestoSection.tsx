import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/presentation/providers/ThemeProvider";
import type { Vendor } from "@/types";

type HomeManifestoSectionProps = {
  mode: "mobile" | "tablet" | "desktop";
  vendors: Vendor[];
};

export function HomeManifestoSection({ mode, vendors }: HomeManifestoSectionProps) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme, mode);
  const visuals = vendors.slice(0, 2);

  return (
    <View style={styles.wrapper} testID="manifesto-section">
      <View style={styles.visualColumn}>
        {visuals.map((vendor, index) => (
          <View key={vendor.slug} style={[styles.visualCard, index === 1 && styles.visualCardOffset]}>
            <Image contentFit="cover" source={{ uri: vendor.image }} style={styles.visualImage} />
          </View>
        ))}
      </View>

      <View style={styles.copyColumn}>
        <Text style={styles.eyebrow}>Studio wedding premium</Text>
        <Text style={styles.title}>Bukan sekadar indah dilihat, tapi juga terasa tenang saat dipilih.</Text>
        <Text style={styles.copy}>
          Kami merancang landing page ini seperti studio wedding modern: bersih, lembut, editorial, namun tetap mudah dipahami saat Anda sedang membandingkan vendor, paket, dan suasana yang paling pas.
        </Text>

        <View style={styles.pointsWrap}>
          {[
            "Kurasi vendor dengan rasa visual yang konsisten",
            "Struktur yang membantu pengunjung cepat merasa yakin",
            "Detail penting ditampilkan tanpa membuat halaman terasa berat",
          ].map((item) => (
            <View key={item} style={styles.pointRow}>
              <View style={styles.bullet} />
              <Text style={styles.pointText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const createStyles = (
  theme: ReturnType<typeof useAppTheme>["theme"],
  mode: "mobile" | "tablet" | "desktop",
) => {
  const isDesktop = mode === "desktop";

  return StyleSheet.create({
    wrapper: {
      alignItems: "center",
      flexDirection: isDesktop ? "row" : "column",
      gap: isDesktop ? 26 : 18,
    },
    visualColumn: {
      alignItems: isDesktop ? "flex-start" : "center",
      flexDirection: isDesktop ? "row" : "row",
      gap: 14,
    },
    visualCard: {
      borderRadius: 999,
      height: isDesktop ? 340 : 240,
      overflow: "hidden",
      width: isDesktop ? 220 : 150,
    },
    visualCardOffset: {
      marginTop: isDesktop ? 90 : 30,
    },
    visualImage: {
      height: "100%",
      width: "100%",
    },
    copyColumn: {
      flex: isDesktop ? 1 : undefined,
      gap: 12,
      maxWidth: 540,
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
      fontSize: isDesktop ? 30 : 24,
      fontWeight: "700",
      lineHeight: isDesktop ? 38 : 32,
    },
    copy: {
      color: theme.colors.textSecondary,
      fontSize: 15,
      lineHeight: 24,
    },
    pointsWrap: {
      gap: 10,
      marginTop: 4,
    },
    pointRow: {
      flexDirection: "row",
      gap: 10,
    },
    bullet: {
      backgroundColor: theme.colors.accent,
      borderRadius: 999,
      height: 8,
      marginTop: 7,
      width: 8,
    },
    pointText: {
      color: theme.colors.textSecondary,
      flex: 1,
      fontSize: 14,
      lineHeight: 22,
    },
  });
};