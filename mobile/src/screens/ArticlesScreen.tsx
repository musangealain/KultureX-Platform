import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, StyleSheet, Text, View } from "react-native";

import { InfoCard } from "../components/InfoCard";
import { ScreenContainer } from "../components/ScreenContainer";
import { type Article, fetchArticles } from "../features/articles/api";

export function ArticlesScreen() {
  const [items, setItems] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchArticles();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load articles");
    }
  }, []);

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, [load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  if (loading) {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="large" color="#d35420" />
      </View>
    );
  }

  return (
    <ScreenContainer
      title="Articles"
      subtitle="Editorial stories from creators with role-based moderation pipeline"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#d35420" />}
    >
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {items.length ? (
        items.slice(0, 20).map((item) => (
          <InfoCard
            key={item.id}
            badge="Article"
            title={item.title}
            detail={item.summary || "No summary provided yet."}
            footer={`Status: ${item.status}`}
          />
        ))
      ) : (
        <InfoCard title="No articles found" detail="Create and publish content to populate this feed." />
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
