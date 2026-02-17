import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAuth } from "../auth/useAuth";
import { InfoCard } from "../components/InfoCard";
import { ScreenContainer } from "../components/ScreenContainer";

export function ProfileScreen() {
  const { user, logout, refreshProfile } = useAuth();

  return (
    <ScreenContainer title="Profile" subtitle="Account details and quick session controls">
      {user ? (
        <>
          <InfoCard title={user.username} detail={user.email || "No email"} badge={user.role} />
          <InfoCard title="Identity" detail={`${user.first_name || "-"} ${user.last_name || "-"}`} />
          <InfoCard title="Bio" detail={user.bio || "No bio yet."} />
          <View style={styles.row}>
            <Pressable style={[styles.button, styles.secondary]} onPress={() => void refreshProfile()}>
              <Text style={styles.secondaryText}>Refresh</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => void logout()}>
              <Text style={styles.primaryText}>Logout</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <InfoCard title="No profile loaded" detail="Try refresh or sign in again." />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8
  },
  button: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#d35420"
  },
  secondary: {
    backgroundColor: "#eadfc7"
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700"
  },
  secondaryText: {
    color: "#263042",
    fontWeight: "700"
  }
});
