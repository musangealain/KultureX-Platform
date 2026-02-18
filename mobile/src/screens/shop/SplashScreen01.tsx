import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

import { promoSlides } from "../../data/shop";
import type { AuthStackParamList } from "../../navigation/types";
import { colors } from "../../theme/tokens";

type Props = NativeStackScreenProps<AuthStackParamList, "Splash01">;

export function SplashScreen01({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace("Splash02"), 1800);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground source={{ uri: promoSlides[0].image }} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.logo}>KULTUREX</Text>
        <Text style={styles.tagline}>SHOP THE CULTURE</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 15, 20, 0.45)",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    color: "#ffffff",
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: 3
  },
  tagline: {
    marginTop: 10,
    color: colors.surface,
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 2
  }
});
