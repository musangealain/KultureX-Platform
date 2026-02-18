import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { ProductCard } from "../../components/shop/ProductCard";
import { ShopScreen } from "../../components/shop/ShopScreen";
import { demoCategories, demoProducts, promoSlides } from "../../data/shop";
import { colors, radii, spacing } from "../../theme/tokens";

export function Categorie01Screen() {
  const navigation = useNavigation<any>();

  return (
    <ShopScreen title="Welcome" subtitle="Our KultureX shopping app">
      <View style={styles.searchRow}>
        <View style={styles.searchInput}>
          <Text style={styles.searchText}>Search...</Text>
        </View>
        <Pressable style={styles.iconBtn} onPress={() => navigation.navigate("Filters")}>
          <Text style={styles.iconBtnText}>⎚</Text>
        </Pressable>
      </View>

      <View style={styles.bannerCard}>
        <Image source={{ uri: promoSlides[0].image }} style={styles.bannerImage} />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>20% Discount New Arrival Product</Text>
          <Text style={styles.bannerSubtitle}>Publish your style to make yourself more beautiful.</Text>
          <Pressable style={styles.bannerBtn} onPress={() => navigation.navigate("ProductDetails01")}>
            <Text style={styles.bannerBtnText}>→</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.chipsRow}>
        {demoCategories.slice(0, 4).map((category) => (
          <Pressable key={category.id} style={styles.chip} onPress={() => navigation.navigate("ProductCategory01")}>
            <Text style={styles.chipText}>{category.name}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Top Products</Text>
        <Pressable onPress={() => navigation.navigate("Categorie02")}>
          <Text style={styles.sectionLink}>View All</Text>
        </Pressable>
      </View>

      <View style={styles.grid}>
        {demoProducts.slice(0, 4).map((product) => (
          <View key={product.id} style={styles.gridItem}>
            <ProductCard product={product} onPress={() => navigation.navigate("ProductDetails01")} />
          </View>
        ))}
      </View>
    </ShopScreen>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: "row",
    gap: spacing.sm,
    alignItems: "center"
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  searchText: {
    color: colors.textMuted,
    fontSize: 13
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent
  },
  iconBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700"
  },
  bannerCard: {
    borderRadius: radii.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.surfaceBorder
  },
  bannerImage: {
    width: "100%",
    height: 230
  },
  bannerOverlay: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 14,
    backgroundColor: "rgba(255,255,255,0.82)",
    borderRadius: radii.md,
    padding: spacing.sm
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.textPrimary,
    lineHeight: 28
  },
  bannerSubtitle: {
    marginTop: 6,
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 17
  },
  bannerBtn: {
    position: "absolute",
    right: 12,
    bottom: 12,
    width: 34,
    height: 34,
    borderRadius: 34,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center"
  },
  bannerBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800"
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  chipText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "600"
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "800"
  },
  sectionLink: {
    color: colors.textMuted,
    fontWeight: "600"
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  gridItem: {
    width: "48%"
  }
});
