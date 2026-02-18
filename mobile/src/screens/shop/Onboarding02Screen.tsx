import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { demoProducts } from "../../data/shop";
import type { AuthStackParamList } from "../../navigation/types";
import { colors, radii } from "../../theme/tokens";

type Props = NativeStackScreenProps<AuthStackParamList, "Onboarding02">;

export function Onboarding02Screen({ navigation }: Props) {
  return (
    <View style={styles.root}>
      <Image source={{ uri: demoProducts[1].image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>Live order tracking and smooth checkout flow</Text>
        <Text style={styles.subtitle}>
          From cart to payment confirmation to route tracking, every step is optimized for speed.
        </Text>
        <Pressable style={styles.primaryBtn} onPress={() => navigation.navigate("Onboarding03")}>
          <Text style={styles.primaryText}>Next</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Skip onboarding</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.screenBg
  },
  image: {
    width: "100%",
    height: "58%"
  },
  content: {
    flex: 1,
    padding: 22
  },
  title: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "800",
    color: colors.textPrimary
  },
  subtitle: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary
  },
  primaryBtn: {
    marginTop: 22,
    backgroundColor: colors.accent,
    paddingVertical: 13,
    borderRadius: radii.pill,
    alignItems: "center"
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700"
  },
  link: {
    marginTop: 14,
    color: colors.textMuted,
    textAlign: "center",
    fontWeight: "600"
  }
});
