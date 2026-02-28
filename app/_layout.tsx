import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "../context/AuthContext";

// Replace this with your actual Web Client ID from Firebase
const WEB_CLIENT_ID =
  "803323996354-ni60s8gkruunup885atbh3m4i5at2b5m.apps.googleusercontent.com";

// Initialize Google Sign-In (with fallback for Expo Go)
try {
  const { GoogleSignin } = require("@react-native-google-signin/google-signin");
  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
    offlineAccess: true,
  });
} catch (error) {
  // GoogleSignin not available in Expo Go - will work after building with EAS
  console.warn(
    "Google Sign-In not available in Expo Go. Build with expo run:android for full functionality.",
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
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

          {/* Auth screens */}
          <Stack.Screen
            name="login"
            options={{
              headerShown: false,
              presentation: "transparentModal",
            }}
          />
          <Stack.Screen
            name="register"
            options={{
              headerShown: false,
              presentation: "transparentModal",
            }}
          />
          <Stack.Screen name="profile" options={{ headerShown: false }} />

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
    </AuthProvider>
  );
}
