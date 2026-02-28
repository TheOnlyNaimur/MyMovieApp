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
        {/* Tab navigation group */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Detail pages that open on top of tabs */}
        <Stack.Screen name="search" options={{ headerShown: false }} />
        <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="tv/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="anime/[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="adult-movie/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="person/[id]" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
