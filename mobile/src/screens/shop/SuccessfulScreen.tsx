import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAuth } from "../../auth/useAuth";
import type { AuthStackParamList } from "../../navigation/types";
import { colors, radii } from "../../theme/tokens";

type Props = NativeStackScreenProps<AuthStackParamList, "Successful">;

export function SuccessfulScreen({ navigation }: Props) {
  const { continueAsGuest } = useAuth();

  const onContinue = async () => {
    await continueAsGuest();
  };

  return (
    <View style={styles.root}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>✓</Text>
      </View>
      <Text style={styles.title}>Successful</Text>
      <Text style={styles.subtitle}>Your account setup is complete. Start shopping now.</Text>

      <Pressable style={styles.primaryBtn} onPress={onContinue}>
        <Text style={styles.primaryText}>Continue Shopping</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Go to Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.screenBg,
    padding: 24
  },
  badge: {
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    alignItems: "center",
    justifyContent: "center"
  },
  badgeText: {
    fontSize: 40,
    fontWeight: "800",
    color: colors.success
  },
  title: {
    marginTop: 18,
    fontSize: 34,
    fontWeight: "900",
    color: colors.textPrimary
  },
  subtitle: {
    marginTop: 8,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 20
  },
  primaryBtn: {
    marginTop: 22,
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    alignItems: "center",
    paddingVertical: 13,
    width: "100%"
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700"
  },
  link: {
    marginTop: 12,
    color: colors.textMuted,
    fontWeight: "600"
  }
});
