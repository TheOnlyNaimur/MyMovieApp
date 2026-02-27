import React from "react";
import { View, Text } from "react-native";
import TrendingMovies from "./TrendingMovies";
import { styles } from "../../styles/index_style";

interface Movie {
  id: number;
  poster_path: string;
}

interface TrendingCarouselProps {
  title: string;
  data: Movie[];
}

export default function TrendingCarousel({
  title,
  data,
}: TrendingCarouselProps) {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {data.length > 0 ? (
        <TrendingMovies data={data} />
      ) : (
        <View style={styles.heroPlaceholder}>
          <Text style={styles.placeholderText}>Loading Trends...</Text>
        </View>
      )}
    </View>
  );
}
