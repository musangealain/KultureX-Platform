import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { InfoCard } from "../components/InfoCard";
import { ScreenContainer } from "../components/ScreenContainer";
import { type Product, fetchProducts } from "../features/store/api";

export function StoreScreen() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(setItems)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="large" color="#d35420" />
      </View>
    );
  }

  return (
    <ScreenContainer title="Store" subtitle="Catalog preview connected to product APIs">
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {items.length ? (
        items.slice(0, 20).map((item) => (
          <InfoCard
            key={item.id}
            badge="Product"
            title={item.name}
            detail={`$${item.price}`}
            footer="Add cart flow in Sprint 2 UI"
          />
        ))
      ) : (
        <InfoCard title="No products found" detail="Create products from backend or admin to populate store." />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  loadingWrap: {
    flex: 1,
    backgroundColor: "#f3ecd9",
    alignItems: "center",
    justifyContent: "center"
  },
  error: {
    color: "#9b2c2c",
    marginBottom: 8
  }
});
