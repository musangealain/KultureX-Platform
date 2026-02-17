import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";

import { ArticlesScreen } from "../screens/ArticlesScreen";
import { EventsScreen } from "../screens/EventsScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { StoreScreen } from "../screens/StoreScreen";
import type { AppTabParamList } from "./types";

const Tab = createBottomTabNavigator<AppTabParamList>();

const TAB_ICONS: Record<keyof AppTabParamList, string> = {
  Articles: "A",
  Store: "S",
  Events: "E",
  Profile: "P"
};

export function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: "#f7f0df"
        },
        headerTintColor: "#171a28",
        tabBarStyle: {
          backgroundColor: "#f7f0df",
          borderTopColor: "#d8ceb8"
        },
        tabBarActiveTintColor: "#d35420",
        tabBarInactiveTintColor: "#586070",
        tabBarLabelStyle: {
          fontWeight: "600"
        },
        tabBarIcon: ({ color }) => (
          <Text style={{ color, fontSize: 14, fontWeight: "700" }}>
            {TAB_ICONS[route.name as keyof AppTabParamList]}
          </Text>
        )
      })}
    >
      <Tab.Screen name="Articles" component={ArticlesScreen} />
      <Tab.Screen name="Store" component={StoreScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
