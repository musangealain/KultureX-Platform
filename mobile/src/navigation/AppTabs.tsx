import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";

import { Categorie01Screen } from "../screens/shop/Categorie01Screen";
import { Categorie02Screen } from "../screens/shop/Categorie02Screen";
import { Mine01Screen } from "../screens/shop/Mine01Screen";
import { MyCart01Screen } from "../screens/shop/MyCart01Screen";
import { WishlistScreen } from "../screens/shop/WishlistScreen";
import { colors, radii } from "../theme/tokens";
import type { MainTabParamList } from "./types";

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_LABEL: Record<keyof MainTabParamList, string> = {
  Categorie01: "Home",
  Categorie02: "Category",
  MyCart01: "Cart",
  Wishlist: "Wishlist",
  Mine01: "Mine"
};

const TAB_GLYPH: Record<keyof MainTabParamList, string> = {
  Categorie01: "◉",
  Categorie02: "◌",
  MyCart01: "◍",
  Wishlist: "♡",
  Mine01: "◉"
};

export function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ color }) => (
          <View style={styles.iconWrap}>
            <Text style={[styles.iconGlyph, { color }]}>{TAB_GLYPH[route.name as keyof MainTabParamList]}</Text>
          </View>
        ),
        tabBarLabel: TAB_LABEL[route.name as keyof MainTabParamList]
      })}
    >
      <Tab.Screen name="Categorie01" component={Categorie01Screen} />
      <Tab.Screen name="Categorie02" component={Categorie02Screen} />
      <Tab.Screen name="MyCart01" component={MyCart01Screen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Mine01" component={Mine01Screen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 74,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceBorder
  },
  tabLabel: {
    fontWeight: "700",
    fontSize: 11
  },
  iconWrap: {
    minWidth: 26,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.pill
  },
  iconGlyph: {
    fontSize: 14,
    fontWeight: "800"
  }
});
