import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { image500 } from "../../api/tmdb";
import { styles } from "../../styles/index_style";
import { useRouter } from "expo-router";

export default function ActorRow({
  title,
  data,
}: {
  title: string;
  data: any[];
}) {
  // Split by gender (2 = Male, 1 = Female)
  const actors = data.filter((person) => person.gender === 2).slice(0, 2);
  const actresses = data.filter((person) => person.gender === 1).slice(0, 2);
  const router = useRouter();

  // Pair them up for side-by-side display
  const maxLength = Math.max(actors.length, actresses.length);
  const pairs = Array.from({ length: maxLength }, (_, i) => ({
    actor: actors[i],
    actress: actresses[i],
  }));

  return (
    <View style={{ marginBottom: 30 }}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {/* Grid of pairs */}
      {pairs.map((pair, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          {/* Left: Actor */}
          {pair.actor && (
            <TouchableOpacity
              style={{ alignItems: "center", flex: 1 }}
              onPress={() => router.push(`/person/${pair.actor.id}`)}
            >
              <View
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  overflow: "hidden",
                  borderWidth: 1,
                  borderColor: "#404040",
                }}
              >
                <Image
                  source={{
                    uri:
                      image500(pair.actor.profile_path) ||
                      "https://via.placeholder.com/100",
                  }}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
              <Text
                style={{
                  color: "white",
                  fontSize: 11,
                  marginTop: 8,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  width: "100%",
                  textAlign: "center",
                }}
                numberOfLines={1}
              >
                {pair.actor.name}
              </Text>
            </TouchableOpacity>
          )}

          {/* Right: Actress */}
          {pair.actress && (
            <TouchableOpacity
              style={{ alignItems: "center", flex: 1 }}
              onPress={() => router.push(`/person/${pair.actress.id}`)}
            >
              <View
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  overflow: "hidden",
                  borderWidth: 1,
                  borderColor: "#404040",
                }}
              >
                <Image
                  source={{
                    uri:
                      image500(pair.actress.profile_path) ||
                      "https://via.placeholder.com/100",
                  }}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
              <Text
                style={{
                  color: "white",
                  fontSize: 11,
                  marginTop: 8,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  width: "100%",
                  textAlign: "center",
                }}
                numberOfLines={1}
              >
                {pair.actress.name}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
}
