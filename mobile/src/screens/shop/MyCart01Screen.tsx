import { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { ShopScreen } from "../../components/shop/ShopScreen";
import { demoProducts } from "../../data/shop";
import { colors, radii } from "../../theme/tokens";

export function MyCart01Screen() {
  const navigation = useNavigation<any>();
  const cartItems = demoProducts.slice(0, 3);
  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price, 0), [cartItems]);
  const shipping = 17;
  const bagTotal = subtotal + shipping;

  return (
    <ShopScreen title="My Cart" subtitle="Review items before checkout">
      <View style={styles.list}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.thumb} />
            <View style={styles.itemBody}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemBrand}>{item.brand}</Text>
            </View>
            <View style={styles.priceWrap}>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              <View style={styles.qtyBox}>
                <Text style={styles.qtyText}>- 1 +</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Bag total</Text>
          <Text style={styles.totalValue}>${bagTotal.toFixed(2)}</Text>
        </View>
      </View>

      <Pressable style={styles.checkoutBtn} onPress={() => navigation.navigate("PaymentMathod")}>
        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
      </Pressable>
    </ShopScreen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 10
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surface,
    padding: 10
  },
  thumb: {
    width: 74,
    height: 74,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceMuted
  },
  itemBody: {
    flex: 1,
    marginHorizontal: 10
  },
  itemName: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "700"
  },
  itemBrand: {
    marginTop: 4,
    color: colors.textMuted,
    fontSize: 12
  },
  priceWrap: {
    alignItems: "flex-end",
    gap: 8
  },
  itemPrice: {
    color: colors.textPrimary,
    fontWeight: "800"
  },
  qtyBox: {
    borderRadius: radii.pill,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surfaceMuted
  },
  qtyText: {
    color: colors.textSecondary,
    fontWeight: "600",
    fontSize: 11
  },
  summary: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surface,
    padding: 12,
    gap: 8
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  summaryLabel: {
    color: colors.textSecondary
  },
  summaryValue: {
    color: colors.textPrimary,
    fontWeight: "700"
  },
  totalLabel: {
    color: colors.textPrimary,
    fontWeight: "800"
  },
  totalValue: {
    color: colors.textPrimary,
    fontWeight: "900",
    fontSize: 18
  },
  checkoutBtn: {
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingVertical: 13,
    alignItems: "center"
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "800"
  }
});
