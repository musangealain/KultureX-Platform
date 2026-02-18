import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radii } from "../../theme/tokens";

type Props = {
  onGetStarted: () => void;
};

export function LandingScreen({ onGetStarted }: Props) {
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1544191696-15693adad636?auto=format&fit=crop&w=1400&q=80"
      }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.heroCopy}>
          <Text style={styles.logo}>KULTUREX</Text>
          <Text style={styles.title}>Ride and shop the culture.</Text>
          <Text style={styles.subtitle}>
            Bikes, scooters, skates, and street-ready gear in one premium shopping app.
          </Text>
        </View>

        <Pressable style={styles.getStartedButton} onPress={onGetStarted}>
          <Text style={styles.getStartedLabel}>Get Started</Text>
        </Pressable>
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
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingTop: 76,
    paddingBottom: 36,
    backgroundColor: "rgba(7, 8, 11, 0.48)"
  },
  heroCopy: {
    gap: 12
  },
  logo: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 2
  },
  title: {
    color: "#ffffff",
    fontSize: 38,
    lineHeight: 42,
    fontWeight: "900",
    maxWidth: 290
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.92)",
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 310
  },
  getStartedButton: {
    minHeight: 54,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center"
  },
  getStartedLabel: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8
  }
});
