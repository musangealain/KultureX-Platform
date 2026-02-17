import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { InfoCard } from "../components/InfoCard";
import { ScreenContainer } from "../components/ScreenContainer";
import { type EventItem, fetchEvents } from "../features/events/api";

export function EventsScreen() {
  const [items, setItems] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents()
      .then(setItems)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load events"))
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
    <ScreenContainer title="Events" subtitle="Browse live sessions and booking-ready listings">
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {items.length ? (
        items.slice(0, 20).map((item) => (
          <InfoCard
            key={item.id}
            badge="Event"
            title={item.title}
            detail={`${item.city} • ${new Date(item.start_at).toLocaleDateString()}`}
            footer="Ticket booking API is available"
          />
        ))
      ) : (
        <InfoCard title="No events found" detail="Publish events in backend to populate this schedule." />
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
