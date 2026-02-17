import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { type EventItem, fetchEvents } from "../features/events/api";

export function EventsScreen() {
  const [items, setItems] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator color="#e95a20" />;
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>Events</Text>
      {items.length ? (
        items.slice(0, 3).map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.copy}>
              {item.city} · {new Date(item.start_at).toLocaleDateString()}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.empty}>No events available.</Text>
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
