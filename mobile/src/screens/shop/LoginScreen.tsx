import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { useAuth } from "../../auth/useAuth";
import type { AuthStackParamList } from "../../navigation/types";
import { colors, radii } from "../../theme/tokens";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export function ShopLoginScreen({ navigation }: Props) {
  const { loginWithCredentials, continueAsGuest } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Enter username and password.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await loginWithCredentials(username.trim(), password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const onGuest = async () => {
    await continueAsGuest();
  };

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Sign in to sync cart, orders, and profile across devices.</Text>

        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholder="Username"
          autoCapitalize="none"
          editable={!loading}
          placeholderTextColor={colors.textMuted}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry
          editable={!loading}
          placeholderTextColor={colors.textMuted}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable style={styles.primaryBtn} onPress={onLogin} disabled={loading}>
          <Text style={styles.primaryText}>{loading ? "Signing in..." : "Login"}</Text>
        </Pressable>

        <Pressable style={styles.secondaryBtn} onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.secondaryText}>Create Account</Text>
        </Pressable>

        <Pressable onPress={onGuest}>
          <Text style={styles.guestLink}>Continue as guest</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    padding: 18,
    backgroundColor: colors.screenBg
  },
  card: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surface,
    padding: 18,
    gap: 10
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.textPrimary
  },
  subtitle: {
    color: colors.textSecondary,
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: 12,
    paddingVertical: 11,
    color: colors.textPrimary
  },
  error: {
    color: colors.danger
  },
  primaryBtn: {
    marginTop: 6,
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    alignItems: "center",
    paddingVertical: 12
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700"
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    borderRadius: radii.pill,
    alignItems: "center",
    paddingVertical: 12
  },
  secondaryText: {
    color: colors.textPrimary,
    fontWeight: "700"
  },
  guestLink: {
    marginTop: 4,
    color: colors.textMuted,
    textAlign: "center",
    fontWeight: "600"
  }
});
