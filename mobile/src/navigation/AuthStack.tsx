import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ShopLoginScreen } from "../screens/shop/LoginScreen";
import { Onboarding01Screen } from "../screens/shop/Onboarding01Screen";
import { Onboarding02Screen } from "../screens/shop/Onboarding02Screen";
import { Onboarding03Screen } from "../screens/shop/Onboarding03Screen";
import { SignupScreen } from "../screens/shop/SignupScreen";
import { SplashScreen01 } from "../screens/shop/SplashScreen01";
import { SplashScreen02 } from "../screens/shop/SplashScreen02";
import { SuccessfulScreen } from "../screens/shop/SuccessfulScreen";
import type { AuthStackParamList } from "./types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: "fade_from_bottom"
      }}
    >
      <Stack.Screen name="Splash01" component={SplashScreen01} />
      <Stack.Screen name="Splash02" component={SplashScreen02} />
      <Stack.Screen name="Onboarding01" component={Onboarding01Screen} />
      <Stack.Screen name="Onboarding02" component={Onboarding02Screen} />
      <Stack.Screen name="Onboarding03" component={Onboarding03Screen} />
      <Stack.Screen name="Login" component={ShopLoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Successful" component={SuccessfulScreen} />
    </Stack.Navigator>
  );
}
