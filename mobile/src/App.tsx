import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ArticlesScreen } from "./screens/ArticlesScreen";
import { CommunityScreen } from "./screens/CommunityScreen";
import { EventsScreen } from "./screens/EventsScreen";
import { SkateScreen } from "./screens/SkateScreen";
import { StoreScreen } from "./screens/StoreScreen";

type TabKey = "articles" | "skate" | "store" | "events" | "community";

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "articles", label: "Articles" },
  { key: "skate", label: "Skate" },
  { key: "store", label: "Store" },
  { key: "events", label: "Events" },
  { key: "community", label: "Community" }
];

export function KultureXMobileApp() {
  const [tab, setTab] = useState<TabKey>("articles");

  const screen = useMemo(() => {
    if (tab === "skate") return <SkateScreen />;
    if (tab === "store") return <StoreScreen />;
    if (tab === "events") return <EventsScreen />;
    if (tab === "community") return <CommunityScreen />;
    return <ArticlesScreen />;
  }, [tab]);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>KultureX</Text>
        <Text style={styles.subtitle}>Mobile foundation</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabRow}>
        {TABS.map((item) => (
          <Pressable
            key={item.key}
            onPress={() => setTab(item.key)}
            style={[styles.tabButton, tab === item.key && styles.tabButtonActive]}
          >
            <Text style={[styles.tabText, tab === item.key && styles.tabTextActive]}>{item.label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.content}>{screen}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f2efe5"
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#141620"
  },
  subtitle: {
    marginTop: 4,
    color: "#4e504f"
  },
  tabRow: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8
  },
  tabButton: {
    borderWidth: 1,
    borderColor: "#d2cab9",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#fefaf0"
  },
  tabButtonActive: {
    backgroundColor: "#e95a20",
    borderColor: "#e95a20"
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1d2030"
  },
  tabTextActive: {
    color: "#ffffff"
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16
  }
});
