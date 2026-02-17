import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { useAuth } from "../auth/useAuth";
import type { AuthStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const { loginWithCredentials } = useAuth();
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
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.brand}>KultureX</Text>
        <Text style={styles.subtitle}>Sign in to access your creator and community dashboard.</Text>

        <TextInput
          autoCapitalize="none"
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          editable={!loading}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          editable={!loading}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable style={[styles.button, loading && styles.buttonDisabled]} onPress={onLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Signing in..." : "Sign in"}</Text>
        </Pressable>

        <Text style={styles.helper}>
          Use an existing backend user account. Register flow can be added in Sprint 2.
        </Text>

        <Pressable onPress={() => navigation.navigate("Landing")}>
          <Text style={styles.backLink}>Back to landing</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f3ecd9",
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  card: {
    width: "100%",
    maxWidth: 420,
    borderWidth: 1,
    borderColor: "#d7cab0",
    borderRadius: 18,
    backgroundColor: "#fff8eb",
    padding: 18,
    gap: 10
  },
  brand: {
    fontSize: 30,
    fontWeight: "800",
    color: "#171a28"
  },
  subtitle: {
    color: "#4c5566",
    marginBottom: 6
  },
  input: {
    borderWidth: 1,
    borderColor: "#d0c5ac",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff"
  },
  error: {
    color: "#9b2c2c"
  },
  button: {
    backgroundColor: "#d35420",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center"
  },
  buttonDisabled: {
    opacity: 0.7
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700"
  },
  helper: {
    color: "#6b7380",
    fontSize: 12
  },
  backLink: {
    marginTop: 2,
    color: "#2f4f74",
    textAlign: "center",
    fontWeight: "600"
  }
});
