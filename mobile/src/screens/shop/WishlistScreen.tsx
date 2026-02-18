import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

import { ProductCard } from "../../components/shop/ProductCard";
import { ShopScreen } from "../../components/shop/ShopScreen";
import { demoProducts } from "../../data/shop";
import { colors } from "../../theme/tokens";

export function WishlistScreen() {
  const navigation = useNavigation<any>();
  const items = demoProducts.slice(1, 6);

  return (
    <ShopScreen title="Wishlist" subtitle="Saved products for later">
      <View style={styles.grid}>
        {items.map((item) => (
          <View key={item.id} style={styles.gridItem}>
            <ProductCard product={item} onPress={() => navigation.navigate("ProductDetails03")} />
          </View>
        ))}
      </View>
      <Text style={styles.helper}>Tap any item to open details and add it to your cart.</Text>
    </ShopScreen>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  gridItem: {
    width: "48%"
  },
  helper: {
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 8
  }
});
