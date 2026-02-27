import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SearchIcon } from "lucide-react-native";
import { styles } from "../../styles/index_style";

export default function Navbar() {
  const router = useRouter();

  return (
    <View
      style={[
        styles.header,
        { justifyContent: "space-between", paddingRight: 16 },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.logoFirstLetter}>M</Text>
        <Text style={styles.logoText}>ovies</Text>
      </View>
      <TouchableOpacity onPress={() => router.push("/search")}>
        <SearchIcon size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}
