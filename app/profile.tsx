import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";

export default function ProfileScreen() {
  const { user, userData, logout, isAdmin } = useAuth();
  const router = useRouter();
  const [loadTimeout, setLoadTimeout] = useState(false);

  useEffect(() => {
    if (!user) {
      router.replace("login" as any);
    }
  }, [user, router]);

  // Add timeout to prevent infinite loading
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!userData) {
        setLoadTimeout(true);
      }
    }, 8000);

    return () => clearTimeout(timeoutId);
  }, [userData]);

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/(tabs)");
        },
      },
    ]);
  };

  // Show loading while user data is being fetched
  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Navbar />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              minHeight: 400,
          
            }}
          >
            <ActivityIndicator size="large" color="#ef4444" />
          </View>
          <Footer />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Show loading if userData is still being fetched
  if (!userData) {
    if (loadTimeout) {
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Navbar />
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 20,
                minHeight: 400,
              }}
            >
              <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
              <Text
                style={{
                  color: "white",
                  marginTop: 10,
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Unable to load profile
              </Text>
              <Text
                style={{ color: "#9ca3af", marginTop: 8, textAlign: "center" }}
              >
                Please logout and try logging in again
              </Text>
              <TouchableOpacity
                onPress={() => {
                  logout();
                  router.replace("/(tabs)");
                }}
                style={{
                  marginTop: 24,
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  backgroundColor: "#ef4444",
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
            <Footer />
          </ScrollView>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Navbar />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              minHeight: 400,
            }}
          >
            <ActivityIndicator size="large" color="#ef4444" />
            <Text style={{ color: "white", marginTop: 16 }}>
              Loading profile...
            </Text>
          </View>
          <Footer />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={{ marginBottom: -30 }}>
          <Navbar />
        </View>
        {/* Profile Header */}
        <View style={styles.header}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            {userData.photoURL ? (
              <Image
                source={{ uri: userData.photoURL }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={60} color="#9ca3af" />
              </View>
            )}
          </View>

          {/* User Info */}
          <Text style={styles.displayName}>{userData.displayName}</Text>
          <Text style={styles.email}>{userData.email}</Text>

          {/* Admin Badge */}
          {isAdmin && (
            <View style={styles.adminBadge}>
              <Ionicons name="shield-checkmark" size={16} color="#fbbf24" />
              <Text style={styles.adminText}>Admin</Text>
            </View>
          )}

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {userData.watchlist?.length || 0}
              </Text>
              <Text style={styles.statLabel}>Watchlist</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {userData.favorites?.length || 0}
              </Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Watchlist Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="bookmark-outline" size={24} color="#ef4444" />
            <Text style={styles.sectionTitle}>My Watchlist</Text>
          </View>
          {userData.watchlist && userData.watchlist.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* TODO: Fetch and display actual movie data */}
              <Text style={styles.placeholderText}>
                Watchlist items will appear here
              </Text>
            </ScrollView>
          ) : (
            <Text style={styles.emptyText}>No items in your watchlist yet</Text>
          )}
        </View>

        {/* Favorites Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="heart-outline" size={24} color="#ef4444" />
            <Text style={styles.sectionTitle}>My Favorites</Text>
          </View>
          {userData.favorites && userData.favorites.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* TODO: Fetch and display actual movie data */}
              <Text style={styles.placeholderText}>
                Favorite items will appear here
              </Text>
            </ScrollView>
          ) : (
            <Text style={styles.emptyText}>No favorite items yet</Text>
          )}
        </View>

        {/* Account Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Member Since</Text>
              <Text style={styles.infoValue}>
                {new Date(userData.createdAt).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email Verified</Text>
              <View style={styles.verifiedBadge}>
                <Ionicons
                  name={
                    user.emailVerified ? "checkmark-circle" : "alert-circle"
                  }
                  size={16}
                  color={user.emailVerified ? "#10b981" : "#f59e0b"}
                />
                <Text
                  style={[
                    styles.verifiedText,
                    { color: user.emailVerified ? "#10b981" : "#f59e0b" },
                  ]}
                >
                  {user.emailVerified ? "Verified" : "Not Verified"}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
  scrollViewContent: {
    paddingHorizontal: 0,
    paddingTop: 35,
    paddingBottom: 50,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "#1f1f1f",
    marginTop: 0,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#ef4444",
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#374151",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ef4444",
  },
  displayName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 12,
  },
  adminBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(251, 191, 36, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    marginBottom: 16,
  },
  adminText: {
    color: "#fbbf24",
    fontSize: 12,
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  statItem: {
    alignItems: "center",
    paddingHorizontal: 30,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ef4444",
  },
  statLabel: {
    fontSize: 14,
    color: "#9ca3af",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#374151",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#374151",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    padding: 20,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  emptyText: {
    color: "#9ca3af",
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 20,
  },
  placeholderText: {
    color: "#6b7280",
    fontSize: 14,
    fontStyle: "italic",
  },
  infoCard: {
    backgroundColor: "#1f1f1f",
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: "#9ca3af",
  },
  infoValue: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
  },
  infoDivider: {
    height: 1,
    backgroundColor: "#374151",
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  verifiedText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
