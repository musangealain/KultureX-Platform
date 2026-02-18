import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useAuth } from "../auth/useAuth";
import { colors } from "../theme/tokens";
import { AuthStack } from "./AuthStack";
import { ShopStack } from "./ShopStack";

export function RootNavigator() {
  const { isInitializing, accessToken, isGuest } = useAuth();

  if (isInitializing) {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (!accessToken && !isGuest) {
    return <AuthStack />;
  }

  return <ShopStack />;
}

const styles = StyleSheet.create({
  loadingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.screenBg
  }
});
