import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { KultureXMobileApp } from "./src/App";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KultureXMobileApp />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f2efe5"
  }
});
