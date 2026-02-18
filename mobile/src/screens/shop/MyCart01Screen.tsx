import { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

import { useAuth } from "../../auth/useAuth";
import { ShopScreen } from "../../components/shop/ShopScreen";
import { demoProducts } from "../../data/shop";
import { checkoutCart, ensureActiveCart, fetchCartById, removeCartItem, updateCartItem, type Cart } from "../../features/store/api";
import { colors, radii } from "../../theme/tokens";

export function MyCart01Screen() {
  const navigation = useNavigation<any>();
  const { accessToken, isGuest, logout } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartId, setCartId] = useState<number | null>(null);

  const loadCart = async () => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const active = await ensureActiveCart(accessToken);
    setCartId(active.id);
    const latest = await fetchCartById(accessToken, active.id);
    setCart(latest);
    setLoading(false);
  };

  useEffect(() => {
    loadCart().catch(() => {
      setLoading(false);
    });
  }, [accessToken]);

  const guestSubtotal = useMemo(() => demoProducts.slice(0, 3).reduce((sum, item) => sum + item.price, 0), []);
  const subtotal = cart ? Number(cart.total_amount) : guestSubtotal;
  const shipping = 17;
  const bagTotal = subtotal + shipping;

  const onAdjust = async (itemId: number, quantity: number) => {
    if (!accessToken || !cartId) {
      return;
    }
    if (quantity <= 0) {
      await removeCartItem(accessToken, itemId);
    } else {
      await updateCartItem(accessToken, itemId, quantity);
    }
    await loadCart();
  };

  const onCheckout = async () => {
    if (!accessToken || !cartId) {
      Alert.alert("Login required", "Please sign in to create a real order and payment.", [
        {
          text: "Go to Login",
          onPress: async () => {
            await logout();
          }
        },
        { text: "Cancel", style: "cancel" }
      ]);
      return;
    }

    try {
      const order = await checkoutCart(accessToken, cartId);
      navigation.navigate("PaymentMathod", { order });
    } catch (error) {
      Alert.alert("Checkout failed", error instanceof Error ? error.message : "Unable to checkout.");
    }
  };

  const cartItems = cart?.items ?? [];

  return (
    <ShopScreen title="My Cart" subtitle={isGuest ? "Guest preview cart" : "Synced with backend cart API"}>
      {loading ? (
        <View style={styles.loadingState}>
          <ActivityIndicator color={colors.accent} />
          <Text style={styles.loadingText}>Loading your cart...</Text>
        </View>
      ) : null}

      {!loading ? (
        <View style={styles.list}>
          {cartItems.length
            ? cartItems.map((item) => (
                <View key={item.id} style={styles.itemCard}>
                  <Image source={{ uri: demoProducts[item.product % demoProducts.length].image }} style={styles.thumb} />
                  <View style={styles.itemBody}>
                    <Text style={styles.itemName}>{item.product_name}</Text>
                    <Text style={styles.itemBrand}>${Number(item.product_price).toFixed(2)}</Text>
                  </View>
                  <View style={styles.priceWrap}>
                    <Text style={styles.itemPrice}>${Number(item.line_total).toFixed(2)}</Text>
                    <View style={styles.qtyRow}>
                      <Pressable style={styles.qtyBtn} onPress={() => onAdjust(item.id, item.quantity - 1)}>
                        <Text style={styles.qtyBtnText}>-</Text>
                      </Pressable>
                      <Text style={styles.qtyValue}>{item.quantity}</Text>
                      <Pressable style={styles.qtyBtn} onPress={() => onAdjust(item.id, item.quantity + 1)}>
                        <Text style={styles.qtyBtnText}>+</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              ))
            : demoProducts.slice(0, 3).map((item) => (
                <View key={item.id} style={styles.itemCard}>
                  <Image source={{ uri: item.image }} style={styles.thumb} />
                  <View style={styles.itemBody}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemBrand}>{item.brand}</Text>
                  </View>
                  <View style={styles.priceWrap}>
                    <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                    <View style={styles.qtyBox}>
                      <Text style={styles.qtyText}>Preview</Text>
                    </View>
                  </View>
                </View>
              ))}
        </View>
      ) : null}

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

      <Pressable style={styles.checkoutBtn} onPress={onCheckout}>
        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
      </Pressable>
    </ShopScreen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 10
  },
  loadingState: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12
  },
  loadingText: {
    color: colors.textMuted
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
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  qtyBtn: {
    width: 22,
    height: 22,
    borderRadius: 22,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    alignItems: "center",
    justifyContent: "center"
  },
  qtyBtnText: {
    color: colors.textPrimary,
    fontWeight: "700"
  },
  qtyValue: {
    color: colors.textPrimary,
    fontWeight: "700"
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
