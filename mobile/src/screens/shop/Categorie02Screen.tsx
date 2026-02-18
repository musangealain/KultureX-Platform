import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

import { ProductCard } from "../../components/shop/ProductCard";
import { ShopScreen } from "../../components/shop/ShopScreen";
import { demoCategories, demoProducts, mapBackendProductsToShopProducts, type ShopProduct } from "../../data/shop";
import { fetchProducts } from "../../features/store/api";
import { colors, radii } from "../../theme/tokens";

export function Categorie02Screen() {
  const navigation = useNavigation<any>();
  const [products, setProducts] = useState<ShopProduct[]>(demoProducts);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchProducts()
      .then((items) => {
        if (!mounted || !items.length) {
          return;
        }
        setProducts(mapBackendProductsToShopProducts(items));
      })
      .catch(() => undefined)
      .finally(() => {
        if (mounted) {
          setLoadingProducts(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <ShopScreen title="Categories" subtitle="Search category and browse products">
      <View style={styles.searchRow}>
        <View style={styles.searchInput}>
          <Text style={styles.searchText}>Search categories...</Text>
        </View>
        <Pressable style={styles.filterBtn} onPress={() => navigation.navigate("Filters")}>
          <Text style={styles.filterText}>F</Text>
        </Pressable>
      </View>

      <View style={styles.chipsWrap}>
        {demoCategories.map((category) => (
          <Pressable key={category.id} style={styles.chip} onPress={() => navigation.navigate("ProductCategory02")}>
            <Text style={styles.chipTitle}>{category.name}</Text>
            <Text style={styles.chipMeta}>{category.itemCount} products</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.listWrap}>
        {loadingProducts ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator color={colors.accent} />
            <Text style={styles.loadingText}>Loading products...</Text>
          </View>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} onPress={() => navigation.navigate("ProductDetails02", { product })} />
          ))
        )}
      </View>
    </ShopScreen>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: "row",
    gap: 8,
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
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: radii.pill,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center"
  },
  filterText: {
    color: "#fff",
    fontWeight: "700"
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  chip: {
    width: "48%",
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    borderRadius: radii.md,
    padding: 10,
    backgroundColor: colors.surface
  },
  chipTitle: {
    color: colors.textPrimary,
    fontWeight: "700"
  },
  chipMeta: {
    marginTop: 2,
    color: colors.textMuted,
    fontSize: 12
  },
  listWrap: {
    gap: 10
  },
  loadingRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14
  },
  loadingText: {
    color: colors.textMuted
  }
});
