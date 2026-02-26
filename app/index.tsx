import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import "../global.css";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Movie App</Text>
        <Text style={styles.subtitle}>Welcome back, Naimur!</Text>

        <View style={styles.card}>
          <Text style={styles.cardText}>
            Your environment is healthy. Tomorrow, we will add the Industry
            layers one by one.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717", // Neutral-900 (Dark theme)
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#eab308", // Gold brand color
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#A3A3A3",
    marginBottom: 32,
  },
  card: {
    backgroundColor: "#262626",
    padding: 20,
    borderRadius: 16,
    width: "100%",
    borderWidth: 1,
    borderColor: "#404040",
  },
  cardText: {
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 24,
  },
});
