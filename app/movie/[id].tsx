import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styles } from "../../styles/index_style";
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchSimilarMovies,
  image500,
} from "../../api/tmdb";
import MovieRow from "../../src/components/MovieRow";
import Footer from "../../src/components/Footer";

export default function MovieDetails() {
  const { id } = useLocalSearchParams(); // Captures the ID from the URL
  const router = useRouter();
  const [movie, setMovie] = useState<any>(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const movieId = Array.isArray(id) ? id[0] : (id as string);
        const [details, credits, similarMovies] = await Promise.all([
          fetchMovieDetails(movieId),
          fetchMovieCredits(movieId),
          fetchSimilarMovies(movieId),
        ]);

        setMovie(details);
        setCast(credits.cast || []);
        setSimilar(similarMovies.results || []);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id]);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Movie Poster Background */}
        {movie?.poster_path && (
          <View>
            <Image
              source={{ uri: image500(movie.poster_path) || "" }}
              style={{ width: "100%", height: 550 }}
            />
          </View>
        )}
        {!movie?.poster_path && (
          <View
            style={{
              width: "100%",
              height: 550,
              backgroundColor: "#262626",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#737373", fontSize: 16 }}>
              No poster available
            </Text>
          </View>
        )}

        {/* Movie Info Section */}
        <View
          style={{
            padding: 20,
            marginTop: -40,
            backgroundColor: "#171717",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 28,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {movie?.title}
          </Text>

          {/* Status, Release, Runtime */}
          <Text
            style={{
              color: "#A3A3A3",
              textAlign: "center",
              marginTop: 8,
              fontWeight: "600",
            }}
          >
            {movie?.status} • {movie?.release_date?.split("-")[0]} •{" "}
            {movie?.runtime} min
          </Text>

          {/* Description */}
          <Text style={{ color: "#D4D4D4", marginTop: 20, lineHeight: 24 }}>
            {movie?.overview}
          </Text>
        </View>

        {/* Cast Section */}
        <View style={styles.castContainer}>
          <Text style={styles.sectionTitle}>Top Cast</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {cast.map((person: any, index: number) => (
              <TouchableOpacity
                key={index}
                style={styles.castMember}
                onPress={() => router.push(`/person/${person.id}`)}
              >
                <Image
                  source={{
                    uri:
                      image500(person.profile_path) ||
                      "https://via.placeholder.com/100",
                  }}
                  style={styles.castImage}
                />
                <Text style={styles.castName} numberOfLines={1}>
                  {person.name}
                </Text>
                <Text style={styles.characterName} numberOfLines={1}>
                  {person.character}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Similar Movies Section */}
        {similar.length > 0 && (
          <View style={{ paddingHorizontal: 16, paddingBottom: 40 }}>
            <MovieRow title="Similar Movies" data={similar} />
          </View>
        )}

        {/* Footer */}
        <Footer />
      </ScrollView>
    </View>
  );
}
