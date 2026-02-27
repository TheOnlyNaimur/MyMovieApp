import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { image500 } from "../../api/tmdb";
import { styles } from "../../styles/index_style";
import { useRouter } from "expo-router";

interface Movie {
  id: number;
  poster_path: string;
}

interface MovieRowProps {
  title: string;
  data: Movie[];
}

export default function MovieRow({ title, data }: MovieRowProps) {
  const router = useRouter(); // Initialize the router
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false} // Hidden for a "cleaner" look
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/movie/${item.id}`)}>
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
