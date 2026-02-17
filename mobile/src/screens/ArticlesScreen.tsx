import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { type Article, fetchArticles } from "../features/articles/api";

export function ArticlesScreen() {
  const [items, setItems] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator color="#e95a20" />;
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>Articles</Text>
      {items.length ? (
        items.slice(0, 3).map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.copy}>{item.summary || "No summary"}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.empty}>No articles available.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 10
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#171a28"
  },
  card: {
    borderWidth: 1,
    borderColor: "#d2cab9",
    borderRadius: 14,
    backgroundColor: "#fffaf1",
    padding: 12
  },
  title: {
    fontWeight: "700",
    color: "#171a28"
  },
  copy: {
    marginTop: 4,
    color: "#4d504f"
  },
  empty: {
    color: "#4d504f"
  }
});
