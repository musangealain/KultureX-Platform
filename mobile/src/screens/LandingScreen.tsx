import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { AuthStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Landing">;

const highlights = [
  "Culture-first story publishing",
  "Streetwear store and checkout",
  "Event discovery and booking",
  "Creator profile network"
];

export function LandingScreen({ navigation }: Props) {
  return (
    <LinearGradient
      colors={["#f8e9cf", "#f3f0e5", "#dfe6ee"]}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 0.9, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.glowA} />
        <View style={styles.glowB} />

        <View style={styles.brandRow}>
          <Text style={styles.brandBadge}>KX</Text>
          <Text style={styles.brandName}>KultureX Mobile</Text>
        </View>

        <BlurView intensity={42} tint="light" style={styles.heroGlass}>
          <Text style={styles.kicker}>Youth Culture Platform</Text>
          <Text style={styles.title}>A liquid interface for stories, sessions, drops, and community.</Text>
          <Text style={styles.subtitle}>
            Built for skaters, creators, and culture builders to publish, shop, discover events, and connect.
          </Text>

          <View style={styles.chipsWrap}>
            {highlights.map((item) => (
              <View key={item} style={styles.chip}>
                <Text style={styles.chipText}>{item}</Text>
              </View>
            ))}
          </View>

          <Pressable style={styles.primaryButton} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </Pressable>
        </BlurView>

        <Text style={styles.footer}>Sign in to sync your profile and unlock creator workflows.</Text>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  safe: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 20
  },
  glowA: {
    position: "absolute",
    top: 56,
    right: -70,
    width: 230,
    height: 230,
    borderRadius: 999,
    backgroundColor: "rgba(220, 138, 70, 0.24)"
  },
  glowB: {
    position: "absolute",
    bottom: 110,
    left: -90,
    width: 270,
    height: 270,
    borderRadius: 999,
    backgroundColor: "rgba(84, 138, 167, 0.2)"
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 22
  },
  brandBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    overflow: "hidden",
    textAlign: "center",
    textAlignVertical: "center",
    color: "#fff",
    backgroundColor: "#d15b26",
    fontWeight: "800"
  },
  brandName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1c2232"
  },
  heroGlass: {
    marginTop: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.58)",
    paddingHorizontal: 18,
    paddingVertical: 22,
    backgroundColor: "rgba(255, 255, 255, 0.2)"
  },
  kicker: {
    color: "#516177",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontSize: 12,
    marginBottom: 10
  },
  title: {
    color: "#182033",
    fontSize: 32,
    lineHeight: 35,
    fontWeight: "800"
  },
  subtitle: {
    marginTop: 12,
    color: "#3f4a61",
    lineHeight: 21
  },
  chipsWrap: {
    marginTop: 18,
    gap: 8
  },
  chip: {
    alignSelf: "flex-start",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(90, 102, 126, 0.3)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "rgba(255,255,255,0.42)"
  },
  chipText: {
    color: "#2c3447",
    fontSize: 12
  },
  primaryButton: {
    marginTop: 22,
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: "center",
    backgroundColor: "#d35420"
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16
  },
  footer: {
    marginTop: "auto",
    textAlign: "center",
    color: "#4f5b74",
    fontSize: 12
  }
});
