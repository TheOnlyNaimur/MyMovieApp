import React from "react";
import { View, Text } from "react-native";

export default function Footer() {
  return (
    <View
      style={{
        marginTop: 20,
        marginBottom: 0,
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#262626",
        paddingTop: 20,
        paddingBottom: 12,
      }}
    >
      <Text style={{ color: "#eab308", fontWeight: "bold", fontSize: 16 }}>
        Movies App
      </Text>
      <Text style={{ color: "#737373", fontSize: 12, marginTop: 4 }}>
        Created by Naimur Islam • Andriod Developer
      </Text>
      <Text style={{ color: "#404040", fontSize: 10, marginTop: 10 }}>
        @copyright {new Date().getFullYear()}
      </Text>
    </View>
  );
}
