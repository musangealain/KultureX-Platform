import { ReactNode } from "react";
import { RefreshControl, type RefreshControlProps, ScrollView, StyleSheet, Text, View } from "react-native";

type ScreenContainerProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  refreshControl?: React.ReactElement<RefreshControlProps>;
};

export function ScreenContainer({ title, subtitle, children, refreshControl }: ScreenContainerProps) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} refreshControl={refreshControl}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.body}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f3ecd9"
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24
  },
  header: {
    marginBottom: 12
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#181d2a"
  },
  subtitle: {
    marginTop: 6,
    color: "#4d5668"
  },
  body: {
    gap: 10
  }
});
