import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useAuth } from "../auth/useAuth";
import { AppTabs } from "./AppTabs";
import { AuthStack } from "./AuthStack";

export function RootNavigator() {
  const { isInitializing, accessToken } = useAuth();

  if (isInitializing) {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="large" color="#d35420" />
      </View>
    );
  }

  if (!accessToken) {
    return <AuthStack />;
  }

  return <AppTabs />;
}

const styles = StyleSheet.create({
  loadingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3ecd9"
  }
});
