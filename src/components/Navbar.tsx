import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { SearchIcon } from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../styles/index_style";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, userData } = useAuth();

  return (
    <View
      style={[
        styles.header,
        {
          justifyContent: "space-between",
          paddingRight: 16,
          paddingTop: 16,
          paddingBottom: 8,
        },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.logoFirstLetter}>M</Text>
        <Text style={styles.logoText}>ovies</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <TouchableOpacity onPress={() => router.push("/search")}>
          <SearchIcon size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push(isAuthenticated ? "/profile" : "/login")}
        >
          {isAuthenticated && userData?.photoURL ? (
            <Image
              source={{ uri: userData.photoURL }}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                borderWidth: 2,
                borderColor: "#ef4444",
              }}
            />
          ) : isAuthenticated ? (
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: "#374151",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 2,
                borderColor: "#ef4444",
              }}
            >
              <Ionicons name="person" size={20} color="white" />
            </View>
          ) : (
            <Ionicons name="person-circle-outline" size={36} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
