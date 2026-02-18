import { useMemo } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { ProductCard } from "../../components/shop/ProductCard";
import { ShopScreen } from "../../components/shop/ShopScreen";
import { demoProducts, messageSamples, reviewSamples, uiKitFlow } from "../../data/shop";
import { colors, radii } from "../../theme/tokens";

const ROUTE_KEYS = new Set<string>([
  "Tabs",
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

const TAB_KEYS = new Set<string>(["Categorie01", "Categorie02", "MyCart01", "Wishlist", "Mine01"]);

function isRoute(value: string): boolean {
  return ROUTE_KEYS.has(value);
}

export function FlowTemplateScreen() {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const routeName = route.name as string;
  const screenMeta = useMemo(() => uiKitFlow.find((item) => item.id === routeName), [routeName]);

  const renderBody = () => {
    if (routeName.startsWith("ProductCategory")) {
      return (
        <View style={styles.grid}>
          {demoProducts.map((product) => (
            <View key={product.id} style={styles.gridItem}>
              <ProductCard product={product} onPress={() => navigation.navigate("ProductDetails01")} />
            </View>
          ))}
        </View>
      );
    }

    if (routeName.startsWith("ProductDetails")) {
      const product = demoProducts[0];
      return (
        <View style={styles.card}>
          <Image source={{ uri: product.image }} style={styles.heroImage} />
          <Text style={styles.cardTitle}>{product.name}</Text>
          <Text style={styles.cardSub}>{product.brand}</Text>
          <Text style={styles.paragraph}>{product.description}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Pressable style={styles.primaryBtn} onPress={() => navigation.navigate("Tabs", { screen: "MyCart01" })}>
            <Text style={styles.primaryBtnText}>Add to Cart</Text>
          </Pressable>
        </View>
      );
    }

    if (routeName.startsWith("MyCart")) {
      return (
        <View style={styles.card}>
          {demoProducts.slice(0, 3).map((item) => (
            <View key={item.id} style={styles.row}>
              <Text style={styles.rowTitle}>{item.name}</Text>
              <Text style={styles.rowPrice}>${item.price.toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.rowTitle}>Total</Text>
            <Text style={styles.rowPrice}>$483.00</Text>
          </View>
          <Pressable style={styles.primaryBtn} onPress={() => navigation.navigate("PaymentMathod")}>
            <Text style={styles.primaryBtnText}>Proceed to Checkout</Text>
          </Pressable>
        </View>
      );
    }

    if (routeName === "ClientReviews") {
      return (
        <View style={styles.card}>
          {reviewSamples.map((review) => (
            <View key={review.id} style={styles.reviewItem}>
              <Text style={styles.rowTitle}>
                {review.author} - {"★".repeat(review.rating)}
              </Text>
              <Text style={styles.paragraph}>{review.text}</Text>
            </View>
          ))}
        </View>
      );
    }

    if (routeName === "MessagesList") {
      return (
        <View style={styles.card}>
          {messageSamples.map((msg) => (
            <Pressable key={msg.id} style={styles.reviewItem} onPress={() => navigation.navigate("Message")}>
              <Text style={styles.rowTitle}>{msg.from}</Text>
              <Text style={styles.paragraph}>{msg.message}</Text>
              <Text style={styles.hint}>{msg.time}</Text>
            </Pressable>
          ))}
        </View>
      );
    }

    if (routeName === "Message") {
      return (
        <View style={styles.card}>
          <Text style={styles.paragraph}>Support: Hello, how can we help with your order today?</Text>
          <Text style={styles.paragraph}>You: I need to update my delivery address.</Text>
          <View style={styles.actionRow}>
            <Pressable style={styles.secondaryBtn} onPress={() => navigation.navigate("AudioCall")}>
              <Text style={styles.secondaryText}>Audio Call</Text>
            </Pressable>
            <Pressable style={styles.primaryBtnSmall} onPress={() => navigation.navigate("VideoCall")}>
              <Text style={styles.primaryBtnText}>Video Call</Text>
            </Pressable>
          </View>
        </View>
      );
    }

    if (routeName === "OrderTracking") {
      return (
        <View style={styles.card}>
          <View style={styles.timelineItem}>
            <Text style={styles.rowTitle}>Package Received</Text>
            <Text style={styles.hint}>25 June, 2026 - Sacramento</Text>
          </View>
          <View style={styles.timelineItem}>
            <Text style={styles.rowTitle}>In Transit</Text>
            <Text style={styles.hint}>30 June, 2026 - New York</Text>
          </View>
          <View style={styles.timelineItem}>
            <Text style={styles.rowTitle}>Out For Delivery</Text>
            <Text style={styles.hint}>Expected tomorrow</Text>
          </View>
          <Pressable style={styles.secondaryBtn} onPress={() => navigation.navigate("TrackingAddress")}>
            <Text style={styles.secondaryText}>Tracking Address</Text>
          </Pressable>
        </View>
      );
    }

    if (routeName === "PaymentMathod") {
      return (
        <View style={styles.card}>
          {["Credit Card", "Paypal", "Visa", "Google Pay"].map((item) => (
            <View key={item} style={styles.paymentRow}>
              <Text style={styles.rowTitle}>{item}</Text>
              <View style={styles.radio} />
            </View>
          ))}
          <Pressable style={styles.primaryBtn} onPress={() => navigation.navigate("PaymentConfirm")}>
            <Text style={styles.primaryBtnText}>Confirm</Text>
          </Pressable>
        </View>
      );
    }

    if (routeName === "PaymentConfirm") {
      return (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Confirmed</Text>
          <Text style={styles.paragraph}>Your payment was completed successfully and the order has been placed.</Text>
          <Pressable style={styles.primaryBtn} onPress={() => navigation.navigate("ContinueShopping")}>
            <Text style={styles.primaryBtnText}>Continue Shopping</Text>
          </Pressable>
        </View>
      );
    }

    if (routeName === "Filters") {
      return (
        <View style={styles.card}>
          {["Price range", "Category", "Brand", "Availability"].map((item) => (
            <View key={item} style={styles.paymentRow}>
              <Text style={styles.rowTitle}>{item}</Text>
              <Text style={styles.hint}>Any</Text>
            </View>
          ))}
          <Pressable style={styles.primaryBtn} onPress={() => navigation.navigate("FiltersSuccess")}>
            <Text style={styles.primaryBtnText}>Apply Filter</Text>
          </Pressable>
        </View>
      );
    }

    if (routeName === "RoadMap") {
      return (
        <View style={styles.card}>
          {uiKitFlow.map((item) => (
            <View key={item.id} style={styles.roadmapRow}>
              <Text style={styles.roadmapLabel}>{item.label}</Text>
              <Text style={styles.hint}>{item.subtitle}</Text>
            </View>
          ))}
        </View>
      );
    }

    return (
      <View style={styles.card}>
        <Image source={{ uri: screenMeta?.image || demoProducts[0].image }} style={styles.heroImage} />
        <Text style={styles.cardTitle}>{screenMeta?.label || routeName}</Text>
        <Text style={styles.paragraph}>{screenMeta?.subtitle || "Shopping-first screen ready for further interaction."}</Text>
      </View>
    );
  };

  const nextTarget = useMemo(() => {
    const currentIndex = uiKitFlow.findIndex((item) => item.id === routeName);
    if (currentIndex === -1) {
      return null;
    }
    return uiKitFlow[currentIndex + 1] || null;
  }, [routeName]);

  return (
    <ShopScreen title={screenMeta?.label || routeName} subtitle={screenMeta?.subtitle || "E-commerce flow screen"}>
      {renderBody()}
      {nextTarget && isRoute(nextTarget.id) ? (
        <Pressable style={styles.secondaryBtn} onPress={() => navigation.navigate(nextTarget.id)}>
          <Text style={styles.secondaryText}>Open {nextTarget.label}</Text>
        </Pressable>
      ) : null}
      {nextTarget && TAB_KEYS.has(nextTarget.id) ? (
        <Pressable style={styles.secondaryBtn} onPress={() => navigation.navigate("Tabs", { screen: nextTarget.id })}>
          <Text style={styles.secondaryText}>Open {nextTarget.label}</Text>
        </Pressable>
      ) : null}
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
    color: colors.textPrimary,
    fontWeight: "800",
    fontSize: 18
  },
  cardSub: {
    color: colors.textMuted
  },
  paragraph: {
    color: colors.textSecondary,
    lineHeight: 19
  },
  price: {
    color: colors.textPrimary,
    fontWeight: "900",
    fontSize: 24
  },
  primaryBtn: {
    marginTop: 8,
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    alignItems: "center",
    paddingVertical: 12
  },
  primaryBtnSmall: {
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "700"
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    alignItems: "center",
    paddingVertical: 12
  },
  secondaryText: {
    color: colors.textPrimary,
    fontWeight: "700"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  rowTitle: {
    color: colors.textPrimary,
    fontWeight: "700"
  },
  rowPrice: {
    color: colors.textPrimary,
    fontWeight: "800"
  },
  separator: {
    height: 1,
    backgroundColor: colors.surfaceBorder
  },
  reviewItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceBorder,
    gap: 4
  },
  hint: {
    color: colors.textMuted,
    fontSize: 12
  },
  actionRow: {
    flexDirection: "row",
    gap: 8
  },
  timelineItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceBorder
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    borderRadius: radii.sm,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.textMuted
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  gridItem: {
    width: "48%"
  },
  roadmapRow: {
    paddingBottom: 8,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceBorder
  },
  roadmapLabel: {
    color: colors.textPrimary,
    fontWeight: "700"
  }
});
