import { useEffect, useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";

import { useAuth } from "../../auth/useAuth";
import { ProductCard } from "../../components/shop/ProductCard";
import { ShopScreen } from "../../components/shop/ShopScreen";
import { demoProducts, mapBackendProductsToShopProducts, messageSamples, reviewSamples, uiKitFlow, type ShopProduct } from "../../data/shop";
import {
  addCartItem,
  createPayment,
  ensureActiveCart,
  fetchCartById,
  fetchOrders,
  fetchProducts,
  updatePaymentStatus,
  type Cart,
  type Order,
  type Payment
} from "../../features/store/api";
import { colors, radii } from "../../theme/tokens";

const STACK_ROUTES = new Set<string>([
  "Categorie03",
  "Mine02",
  "Mine03",
  "Mine04",
  "ProductCategory01",
  "ProductCategory02",
  "ProductCategory03",
  "ProductCategory04",
  "ProductDetails01",
  "ProductDetails02",
  "ProductDetails03",
  "ProductDetails04",
  "MyCart02",
  "MyCart03",
  "MyCart04",
  "Filters",
  "FiltersSuccess",
  "Screener",
  "ClientReviews",
  "OrderDetails",
  "OrderTracking",
  "TrackingAddress",
  "FindingCollectionPoint",
  "RoadMap",
  "DiscountsOffer",
  "Notification",
  "Profile",
  "Settings",
  "Ongoing",
  "Complated",
  "CountryOrRegion",
  "Language",
  "PaymentMathod",
  "PaymentConfirm",
  "ContinueShopping",
  "MessagesList",
  "Message",
  "AudioCall",
  "VideoCall"
]);

const TAB_ROUTES = new Set<string>(["Categorie01", "Categorie02", "MyCart01", "Wishlist", "Mine01"]);

const VARIANT_BY_ROUTE: Record<string, string> = {
  Categorie03: "product_grid",
  ProductCategory01: "product_grid",
  ProductCategory02: "product_list",
  ProductCategory03: "product_editorial",
  ProductCategory04: "product_compact",
  ProductDetails01: "detail_main",
  ProductDetails02: "detail_gallery",
  ProductDetails03: "detail_reviews",
  ProductDetails04: "detail_min",
  MyCart02: "cart_swipe",
  MyCart03: "cart_summary",
  MyCart04: "cart_compact",
  Filters: "filters",
  FiltersSuccess: "filters_success",
  Screener: "screener",
  ClientReviews: "reviews",
  OrderDetails: "order_details",
  OrderTracking: "tracking",
  TrackingAddress: "address",
  FindingCollectionPoint: "collection",
  RoadMap: "roadmap",
  DiscountsOffer: "discounts",
  Notification: "notifications",
  Profile: "profile",
  Settings: "settings",
  Mine02: "mine_orders",
  Mine03: "mine_address",
  Mine04: "settings",
  Ongoing: "ongoing",
  Complated: "completed",
  CountryOrRegion: "country",
  Language: "language",
  PaymentMathod: "payment",
  PaymentConfirm: "payment_confirm",
  ContinueShopping: "continue",
  MessagesList: "messages",
  Message: "message",
  AudioCall: "audio_call",
  VideoCall: "video_call"
};

function isStackRoute(value: string): boolean {
  return STACK_ROUTES.has(value);
}

function currency(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function FlowTemplateScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { accessToken, isGuest } = useAuth();
  const routeName = route.name as string;
  const params = (route.params || {}) as { product?: ShopProduct; order?: Order; payment?: Payment };
  const screenMeta = useMemo(() => uiKitFlow.find((item) => item.id === routeName), [routeName]);
  const variant = VARIANT_BY_ROUTE[routeName] || "generic";

  const [products, setProducts] = useState<ShopProduct[]>(demoProducts);
  const [productsLoading, setProductsLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [cart, setCart] = useState<Cart | null>(null);
  const [payment, setPayment] = useState<Payment | null>(params.payment || null);
  const [provider, setProvider] = useState<"stripe" | "mobile_money">("stripe");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!["product_grid", "product_list", "product_editorial", "product_compact", "detail_main", "detail_gallery", "detail_reviews", "detail_min", "screener", "continue"].includes(variant)) {
      return;
    }
    let mounted = true;
    setProductsLoading(true);
    fetchProducts()
      .then((rows) => {
        if (mounted && rows.length) {
          setProducts(mapBackendProductsToShopProducts(rows));
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (mounted) {
          setProductsLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, [variant]);

  useEffect(() => {
    if (!accessToken || !["order_details", "ongoing", "completed", "payment", "payment_confirm", "tracking"].includes(variant)) {
      return;
    }
    let mounted = true;
    setOrdersLoading(true);
    fetchOrders(accessToken)
      .then((rows) => {
        if (mounted) {
          setOrders(rows);
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (mounted) {
          setOrdersLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, [accessToken, variant]);

  useEffect(() => {
    if (!accessToken || !["cart_swipe", "cart_summary", "cart_compact"].includes(variant)) {
      return;
    }
    ensureActiveCart(accessToken)
      .then((active) => fetchCartById(accessToken, active.id))
      .then(setCart)
      .catch(() => undefined);
  }, [accessToken, variant]);

  const activeOrder = useMemo(() => {
    if (params.order) {
      return params.order;
    }
    return orders.find((item) => item.status === "pending") || orders[0] || null;
  }, [orders, params.order]);

  const currentProduct = params.product || products[0] || demoProducts[0];

  const cartItems = useMemo(() => {
    if (cart?.items?.length) {
      return cart.items.map((item) => ({
        id: item.id.toString(),
        name: item.product_name,
        quantity: item.quantity,
        total: Number(item.line_total),
        image: demoProducts[Number(item.product) % demoProducts.length].image
      }));
    }
    return demoProducts.slice(0, 3).map((item) => ({
      id: item.id,
      name: item.name,
      quantity: 1,
      total: item.price,
      image: item.image
    }));
  }, [cart]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  const addCurrentProductToCart = async () => {
    if (!accessToken || !currentProduct.backendId) {
      navigation.navigate("Tabs", { screen: "MyCart01" });
      return;
    }
    setBusy(true);
    try {
      await ensureActiveCart(accessToken);
      await addCartItem(accessToken, currentProduct.backendId, 1);
      navigation.navigate("Tabs", { screen: "MyCart01" });
    } finally {
      setBusy(false);
    }
  };

  const createPaymentForOrder = async () => {
    if (!accessToken || !activeOrder) {
      return;
    }
    setBusy(true);
    try {
      const created = await createPayment(accessToken, {
        order: activeOrder.id,
        provider,
        provider_reference: `KX-${Date.now()}`
      });
      setPayment(created);
      navigation.navigate("PaymentConfirm", { payment: created, order: activeOrder });
    } finally {
      setBusy(false);
    }
  };

  const confirmPayment = async () => {
    if (!accessToken || !payment) {
      return;
    }
    setBusy(true);
    try {
      const updated = await updatePaymentStatus(accessToken, payment.id, "succeeded");
      setPayment(updated);
    } finally {
      setBusy(false);
    }
  };

  const renderProductSet = (mode: string) => {
    if (productsLoading) {
      return (
        <View style={styles.loadingRow}>
          <ActivityIndicator color={colors.accent} />
          <Text style={styles.hint}>Loading catalog...</Text>
        </View>
      );
    }
    if (mode === "product_list") {
      return (
        <View style={styles.card}>
          {products.map((item) => (
            <View key={item.id} style={styles.simpleRow}>
              <Text style={styles.rowTitle}>{item.name}</Text>
              <Text style={styles.rowPrice}>{currency(item.price)}</Text>
            </View>
          ))}
        </View>
      );
    }
    if (mode === "product_compact") {
      return (
        <View style={styles.card}>
          {products.map((item) => (
            <Pressable key={item.id} style={styles.simpleRow} onPress={() => navigation.navigate("ProductDetails04", { product: item })}>
              <Text style={styles.rowTitle}>{item.name}</Text>
              <Text style={styles.rowPrice}>{currency(item.price)}</Text>
            </Pressable>
          ))}
        </View>
      );
    }
    return (
      <View style={styles.grid}>
        {products.map((item) => (
          <View key={item.id} style={styles.gridItem}>
            <ProductCard product={item} onPress={() => navigation.navigate("ProductDetails01", { product: item })} />
          </View>
        ))}
      </View>
    );
  };

  const renderBody = () => {
    if (variant.startsWith("product_")) {
      if (variant === "product_editorial") {
        return (
          <View style={styles.card}>
            <Image source={{ uri: currentProduct.image }} style={styles.heroImage} />
            <Text style={styles.cardTitle}>Editorial Category Layout</Text>
            <Text style={styles.hint}>Hero image + product grid style.</Text>
            {renderProductSet("product_grid")}
          </View>
        );
      }
      return renderProductSet(variant);
    }

    if (variant.startsWith("detail_")) {
      return (
        <View style={styles.card}>
          <Image source={{ uri: currentProduct.image }} style={styles.heroImage} />
          <Text style={styles.cardTitle}>{currentProduct.name}</Text>
          <Text style={styles.rowPrice}>{currency(currentProduct.price)}</Text>
          <Text style={styles.hint}>{currentProduct.description}</Text>
          {variant === "detail_reviews" ? (
            <Pressable style={styles.secondaryBtn} onPress={() => navigation.navigate("ClientReviews")}>
              <Text style={styles.secondaryText}>Open Reviews</Text>
            </Pressable>
          ) : null}
          <Pressable style={styles.primaryBtn} onPress={addCurrentProductToCart} disabled={busy}>
            <Text style={styles.primaryText}>{busy ? "Adding..." : "Add to cart"}</Text>
          </Pressable>
        </View>
      );
    }

    if (variant.startsWith("cart_")) {
      return (
        <View style={styles.card}>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.cartRow}>
              <Image source={{ uri: item.image }} style={styles.cartImage} />
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{item.name}</Text>
                <Text style={styles.hint}>Qty {item.quantity}</Text>
              </View>
              <Text style={styles.rowPrice}>{currency(item.total)}</Text>
            </View>
          ))}
          {variant !== "cart_compact" ? (
            <View style={styles.simpleRow}>
              <Text style={styles.rowTitle}>Total</Text>
              <Text style={styles.rowPrice}>{currency(subtotal + 17)}</Text>
            </View>
          ) : null}
          <Pressable style={styles.primaryBtn} onPress={() => navigation.navigate("PaymentMathod")}>
            <Text style={styles.primaryText}>Proceed to checkout</Text>
          </Pressable>
        </View>
      );
    }

    if (variant === "filters") {
      return (
        <View style={styles.card}>
          {["Price", "Category", "Brand", "Availability"].map((item) => (
            <View key={item} style={styles.simpleRow}>
              <Text style={styles.rowTitle}>{item}</Text>
              <Text style={styles.hint}>Any</Text>
            </View>
          ))}
          <Pressable style={styles.primaryBtn} onPress={() => navigation.navigate("FiltersSuccess")}>
            <Text style={styles.primaryText}>Apply filter</Text>
          </Pressable>
        </View>
      );
    }

    if (variant === "filters_success") {
      return <View style={styles.card}><Text style={styles.cardTitle}>Filters applied successfully</Text></View>;
    }

    if (variant === "screener") {
      return renderProductSet("product_grid");
    }

    if (variant === "reviews") {
      return (
        <View style={styles.card}>
          {reviewSamples.map((item) => (
            <View key={item.id} style={styles.simpleRow}>
              <Text style={styles.rowTitle}>{item.author}</Text>
              <Text style={styles.hint}>{item.rating}/5</Text>
            </View>
          ))}
        </View>
      );
    }

    if (variant === "order_details" || variant === "ongoing" || variant === "completed") {
      const rows = variant === "ongoing" ? orders.filter((x) => ["pending", "paid"].includes(x.status)) : variant === "completed" ? orders.filter((x) => ["fulfilled", "canceled"].includes(x.status)) : orders;
      return (
        <View style={styles.card}>
          {ordersLoading ? <ActivityIndicator color={colors.accent} /> : null}
          {(rows.length ? rows : [{ id: 1, status: "pending", total_amount: "483.00" } as Order]).map((item) => (
            <View key={item.id} style={styles.simpleRow}>
              <Text style={styles.rowTitle}>Order #{item.id}</Text>
              <Text style={styles.hint}>{item.status}</Text>
            </View>
          ))}
        </View>
      );
    }

    if (variant === "payment") {
      return (
        <View style={styles.card}>
          {["stripe", "mobile_money"].map((item) => (
            <Pressable key={item} style={styles.simpleRow} onPress={() => setProvider(item as "stripe" | "mobile_money")}>
              <Text style={styles.rowTitle}>{item}</Text>
              <Text style={styles.hint}>{provider === item ? "Selected" : "Select"}</Text>
            </Pressable>
          ))}
          <Text style={styles.hint}>{accessToken ? `Order #${activeOrder?.id || "N/A"}` : "Login required for real payment API."}</Text>
          <Pressable style={styles.primaryBtn} onPress={createPaymentForOrder} disabled={!accessToken || !activeOrder || busy}>
            <Text style={styles.primaryText}>{busy ? "Processing..." : "Create payment"}</Text>
          </Pressable>
        </View>
      );
    }

    if (variant === "payment_confirm") {
      return (
        <View style={styles.card}>
          <Text style={styles.rowTitle}>Payment status: {payment?.status || "not-created"}</Text>
          <Pressable style={styles.primaryBtn} onPress={confirmPayment} disabled={!payment || busy}>
            <Text style={styles.primaryText}>{busy ? "Updating..." : "Mark succeeded"}</Text>
          </Pressable>
        </View>
      );
    }

    if (variant === "continue") {
      return renderProductSet("product_grid");
    }

    if (["messages", "notifications"].includes(variant)) {
      return (
        <View style={styles.card}>
          {messageSamples.map((item) => (
            <View key={item.id} style={styles.simpleRow}>
              <Text style={styles.rowTitle}>{item.from}</Text>
              <Text style={styles.hint}>{item.time}</Text>
            </View>
          ))}
        </View>
      );
    }

    if (variant === "message") {
      return (
        <View style={styles.card}>
          <Text style={styles.hint}>Support: How can we help?</Text>
          <View style={styles.actionRow}>
            <Pressable style={styles.secondaryBtn} onPress={() => navigation.navigate("AudioCall")}><Text style={styles.secondaryText}>Audio</Text></Pressable>
            <Pressable style={styles.primaryBtn} onPress={() => navigation.navigate("VideoCall")}><Text style={styles.primaryText}>Video</Text></Pressable>
          </View>
        </View>
      );
    }

    if (["audio_call", "video_call", "tracking", "address", "collection", "roadmap", "discounts", "profile", "settings", "mine_orders", "mine_address", "country", "language"].includes(variant)) {
      return (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{screenMeta?.label || routeName}</Text>
          <Text style={styles.hint}>{screenMeta?.subtitle || "Screen refined for this route variant."}</Text>
          {variant === "roadmap" ? uiKitFlow.slice(0, 8).map((item) => <Text key={item.id} style={styles.hint}>{item.label}</Text>) : null}
        </View>
      );
    }

    return (
      <View style={styles.card}>
        <Image source={{ uri: screenMeta?.image || demoProducts[0].image }} style={styles.heroImage} />
        <Text style={styles.cardTitle}>{screenMeta?.label || routeName}</Text>
        <Text style={styles.hint}>{screenMeta?.subtitle || "Generic variant"}</Text>
      </View>
    );
  };

  const nextTarget = useMemo(() => {
    const index = uiKitFlow.findIndex((item) => item.id === routeName);
    if (index < 0) {
      return null;
    }
    return uiKitFlow[index + 1] || null;
  }, [routeName]);

  return (
    <ShopScreen title={screenMeta?.label || routeName} subtitle={screenMeta?.subtitle || "E-commerce flow screen"}>
      {renderBody()}
      {nextTarget && isStackRoute(nextTarget.id) ? (
        <Pressable style={styles.secondaryBtn} onPress={() => navigation.navigate(nextTarget.id)}>
          <Text style={styles.secondaryText}>Open {nextTarget.label}</Text>
        </Pressable>
      ) : null}
      {nextTarget && TAB_ROUTES.has(nextTarget.id) ? (
        <Pressable style={styles.secondaryBtn} onPress={() => navigation.navigate("Tabs", { screen: nextTarget.id })}>
          <Text style={styles.secondaryText}>Open {nextTarget.label}</Text>
        </Pressable>
      ) : null}
      {isGuest ? <Text style={styles.hint}>Guest mode: checkout/payment requires login.</Text> : null}
    </ShopScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    padding: 12,
    gap: 10
  },
  heroImage: {
    width: "100%",
    height: 220,
    borderRadius: radii.sm
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textPrimary
  },
  hint: {
    color: colors.textMuted
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  gridItem: {
    width: "48%"
  },
  simpleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceBorder,
    paddingVertical: 8
  },
  rowTitle: {
    color: colors.textPrimary,
    fontWeight: "700"
  },
  rowPrice: {
    color: colors.textPrimary,
    fontWeight: "800"
  },
  primaryBtn: {
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingVertical: 12,
    alignItems: "center",
    flex: 1
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700"
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    borderRadius: radii.pill,
    paddingVertical: 12,
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.surface
  },
  secondaryText: {
    color: colors.textPrimary,
    fontWeight: "700"
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16
  },
  actionRow: {
    flexDirection: "row",
    gap: 8
  },
  cartRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  cartImage: {
    width: 48,
    height: 48,
    borderRadius: radii.sm
  }
});
