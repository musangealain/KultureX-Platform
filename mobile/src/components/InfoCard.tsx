import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

type InfoCardProps = {
  title: string;
  detail?: string;
  badge?: string;
  footer?: string;
  children?: ReactNode;
};

export function InfoCard({ title, detail, badge, footer, children }: InfoCardProps) {
  return (
    <View style={styles.card}>
      {badge ? <Text style={styles.badge}>{badge}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {detail ? <Text style={styles.detail}>{detail}</Text> : null}
      {children}
      {footer ? <Text style={styles.footer}>{footer}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#d7cab0",
    borderRadius: 14,
    backgroundColor: "#fff8eb",
    padding: 12,
    gap: 6
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#d35420",
    color: "#fff",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    overflow: "hidden",
    fontSize: 11
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#171a28"
  },
  detail: {
    color: "#4b5567"
  },
  footer: {
    marginTop: 2,
    color: "#6f7684",
    fontSize: 12
  }
});
