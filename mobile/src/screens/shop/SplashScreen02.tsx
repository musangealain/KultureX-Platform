import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

import { promoSlides } from "../../data/shop";
import type { AuthStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Splash02">;

export function SplashScreen02({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace("Onboarding01"), 1600);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground source={{ uri: promoSlides[1].image }} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Rika-Style Minimal Shop</Text>
        <Text style={styles.subtitle}>Inspired by your UI kit reference and adapted for KultureX commerce.</Text>
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
    justifyContent: "flex-end",
    padding: 26,
    backgroundColor: "rgba(0,0,0,0.35)"
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 34
  },
  subtitle: {
    marginTop: 10,
    color: "#f0f0f0",
    fontSize: 14,
    lineHeight: 20
  }
});
