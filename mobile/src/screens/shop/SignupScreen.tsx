import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import type { AuthStackParamList } from "../../navigation/types";
import { colors, radii } from "../../theme/tokens";

type Props = NativeStackScreenProps<AuthStackParamList, "Signup">;

export function SignupScreen({ navigation }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Create your KultureX shopping account.</Text>

        <TextInput
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
          placeholder="Full name"
          placeholderTextColor={colors.textMuted}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor={colors.textMuted}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry
          placeholderTextColor={colors.textMuted}
        />

        <Pressable style={styles.primaryBtn} onPress={() => navigation.navigate("Successful")}>
          <Text style={styles.primaryText}>Create Account</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Already have an account? Login</Text>
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
  link: {
    marginTop: 4,
    color: colors.textMuted,
    textAlign: "center",
    fontWeight: "600"
  }
});
