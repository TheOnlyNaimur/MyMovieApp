import { Tabs } from "expo-router";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#171717", // neutral-900
          borderTopColor: "#404040", // neutral-700
          borderTopWidth: 1,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#ef4444", // red-500
        tabBarInactiveTintColor: "#a3a3a3", // neutral-400
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Movies",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="movie-open"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tv-shows"
        options={{
          title: "TV Shows",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="tv" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="anime"
        options={{
          title: "Anime",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="star-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="adult"
        options={{
          title: "18+",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="alert-octagon"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
