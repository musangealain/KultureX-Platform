import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import type { ShopProduct } from "../../data/shop";
import { colors, radii, shadows, spacing } from "../../theme/tokens";

type ProductCardProps = {
  product: ShopProduct;
  onPress?: () => void;
};

export function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name} numberOfLines={1}>
        {product.name}
      </Text>
      <Text style={styles.brand} numberOfLines={1}>
        {product.brand}
      </Text>
      <View style={styles.bottomRow}>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.rating}>★ {product.rating.toFixed(1)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    padding: spacing.sm,
    ...shadows.card
  },
  image: {
    width: "100%",
    height: 142,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceMuted
  },
  name: {
    marginTop: spacing.sm,
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary
  },
  brand: {
    marginTop: 2,
    fontSize: 12,
    color: colors.textMuted
  },
  bottomRow: {
    marginTop: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  price: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.textPrimary
  },
  rating: {
    fontSize: 12,
    color: colors.textSecondary
  }
});
