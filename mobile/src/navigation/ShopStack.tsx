import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { FlowTemplateScreen } from "../screens/shop/FlowTemplateScreen";
import { AppTabs } from "./AppTabs";
import type { ShopStackParamList } from "./types";

const Stack = createNativeStackNavigator<ShopStackParamList>();

const EXTRA_SCREENS: Array<keyof ShopStackParamList> = [
  "Categorie03",
  "Mine02",
  "Mine03",
  "Mine04",
  "ProductCategory01",
  "ProductCategory02",
  "ProductCategory03",
  "ProductCategory04",
  "ProductDetails01",
  "ProductDetails02",
  "ProductDetails03",
  "ProductDetails04",
  "MyCart02",
  "MyCart03",
  "MyCart04",
  "Filters",
  "FiltersSuccess",
  "Screener",
  "ClientReviews",
  "OrderDetails",
  "OrderTracking",
  "TrackingAddress",
  "FindingCollectionPoint",
  "RoadMap",
  "DiscountsOffer",
  "Notification",
  "Profile",
  "Settings",
  "Ongoing",
  "Complated",
  "CountryOrRegion",
  "Language",
  "PaymentMathod",
  "PaymentConfirm",
  "ContinueShopping",
  "MessagesList",
  "Message",
  "AudioCall",
  "VideoCall"
];

export function ShopStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right"
      }}
    >
      <Stack.Screen name="Tabs" component={AppTabs} />
      {EXTRA_SCREENS.map((screenName) => (
        <Stack.Screen key={screenName} name={screenName} component={FlowTemplateScreen} />
      ))}
    </Stack.Navigator>
  );
}
