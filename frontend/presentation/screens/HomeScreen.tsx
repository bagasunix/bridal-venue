import { Feather } from "@expo/vector-icons";
import { type Href, useRouter } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { vendors } from "@/mock/vendors";
import { VendorCard } from "@/presentation/components/VendorCard";
import { colors, layout, typography } from "@/presentation/theme";

export function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const contentWidth = Math.min(width - 32, layout.maxContentWidth);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} testID="home-screen">
        <View style={[styles.container, { width: contentWidth }]}> 
          <View style={styles.heroCard}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Wedding rental platform</Text>
              <Feather color={colors.gold} name="star" size={18} />
            </View>
            <Text style={styles.title}>Plan a beautifully booked wedding experience.</Text>
            <Text style={styles.copy}>
              Explore curated vendors, preview unavailable dates, and walk through a polished demo booking flow.
            </Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Curated vendors</Text>
            <Text style={styles.sectionCopy}>Choose a partner to check availability.</Text>
          </View>

          <View style={styles.cardList}>
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.slug}
                onPress={() =>
                  router.push(`/vendor/${vendor.slug}` as Href)
                }
                vendor={vendor}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 36,
    paddingTop: 20,
  },
  container: {
    gap: layout.sectionGap,
  },
  heroCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    gap: 14,
    padding: layout.screenPadding,
  },
  labelRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  label: {
    color: colors.gold,
    fontSize: typography.small,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  title: {
    color: colors.textPrimary,
    fontFamily: "Georgia",
    fontSize: typography.hero,
    fontWeight: "700",
    lineHeight: 40,
  },
  copy: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 26,
  },
  sectionHeader: {
    gap: 6,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontFamily: "Georgia",
    fontSize: typography.title,
    fontWeight: "700",
  },
  sectionCopy: {
    color: colors.textSecondary,
    fontSize: typography.body,
  },
  cardList: {
    gap: 18,
  },
});