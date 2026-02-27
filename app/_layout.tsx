import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* Set the status bar to light so it pops on dark backgrounds */}
      <StatusBar style="light" />

      {/* The Stack handles the professional "Slide" transition between screens */}
      <Stack
        screenOptions={{
          headerShown: false, // We hide the default header to build our own custom UI
          contentStyle: { backgroundColor: "#171717" }, // Global dark background (neutral-900)
        }}
      >
        {/* Our main entry point */}
        <Stack.Screen name="index" />
      </Stack>
    </SafeAreaProvider>
  );
}
