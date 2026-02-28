import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { image500 } from "../../api/tmdb";
import { styles } from "../../styles/index_style";
import { useRouter } from "expo-router";

interface TVShow {
  id: number;
  poster_path: string;
}

interface TVShowRowProps {
  title: string;
  data: TVShow[];
}

export default function TVShowRow({ title, data }: TVShowRowProps) {
  const router = useRouter();
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/tv/${item.id}`)}>
            <View style={styles.movieRowCard}>
              <Image
                source={{ uri: image500(item.poster_path) }}
                style={styles.rowPoster}
              />
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      />
    </View>
  );
}
