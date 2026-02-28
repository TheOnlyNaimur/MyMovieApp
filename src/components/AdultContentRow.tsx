import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { styles } from "../../styles/index_style";
import { useRouter } from "expo-router";

interface AdultContent {
  id: number | string;
  poster_path: string;
  title?: string;
  name?: string;
}

interface AdultContentRowProps {
  title: string;
  data: AdultContent[];
}

export default function AdultContentRow({ title, data }: AdultContentRowProps) {
  const router = useRouter();

  const handleNavigate = (item: AdultContent) => {
    // For TPDB data, we pass the full movie object as params
    router.push({
      pathname: `/adult-movie/${item.id}`,
      params: {
        movieData: JSON.stringify(item),
      },
    });
  };

  return (
    <View style={styles.rowContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNavigate(item)}>
            <View style={styles.movieRowCard}>
              <Image
                source={{
                  uri:
                    item.poster_path && typeof item.poster_path === "string"
                      ? item.poster_path
                      : "https://via.placeholder.com/150x225",
                }}
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
