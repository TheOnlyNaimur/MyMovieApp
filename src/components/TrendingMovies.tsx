import React from "react";
import {
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { image500 } from "../../api/tmdb";
import { styles } from "../../styles/index_style";
import { useRouter } from 'expo-router'; // Add this

const { width } = Dimensions.get("window");

interface Movie {
  id: number;
  poster_path: string;
}

export default function TrendingMovies({ data }: { data: Movie[] }) {
  const router = useRouter();
  return (
    <View style={styles.carouselContainer}>
      <Carousel
        loop
        width={width * 0.8}
        height={310}
        autoPlay={true}
        autoPlayInterval={3000}
        data={data}
        scrollAnimationDuration={1000}
        mode="parallax" // The "Industrial" look
        renderItem={({ item }: { item: Movie }) => (
          <TouchableWithoutFeedback
            onPress={() => router.push(`/movie/${item.id}`)}
          >
            <View
              style={[styles.movieCard, { width: width * 0.7, height: 310 }]}
            >
              <Image
                source={{
                  uri:
                    image500(item.poster_path) ||
                    "https://via.placeholder.com/500",
                }}
                style={styles.posterImage}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </View>
  );
}
