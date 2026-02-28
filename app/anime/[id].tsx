import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styles } from "../../styles/index_style";
import {
  fetchAnimeDetails,
  fetchAnimeCredits,
  fetchSimilarAnime,
  fetchAnimeVideos,
  image500,
} from "../../api/tmdb";
import AnimeRow from "../../src/components/AnimeRow";
import Footer from "../../src/components/Footer";

export default function AnimeDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [anime, setAnime] = useState<any>(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const animeId = Array.isArray(id) ? id[0] : (id as string);
        const [details, credits, similarAnime, videos] = await Promise.all([
          fetchAnimeDetails(animeId),
          fetchAnimeCredits(animeId),
          fetchSimilarAnime(animeId),
          fetchAnimeVideos(animeId),
        ]);

        setAnime(details);
        setCast(credits.cast || []);
        setSimilar(similarAnime.results || []);

        // Find YouTube trailer
        const youtubeTrailer = videos.results?.find(
          (video: any) =>
            video.site === "YouTube" &&
            (video.type === "Trailer" || video.type === "Teaser"),
        );
        if (youtubeTrailer) {
          setTrailerUrl(
            `https://www.youtube.com/watch?v=${youtubeTrailer.key}`,
          );
        }
      } catch (error) {
        console.error("Error fetching anime details:", error);
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
        {/* Anime Poster Background */}
        {anime?.poster_path && (
          <View>
            <Image
              source={{ uri: image500(anime.poster_path) || "" }}
              style={{ width: "100%", height: 550 }}
            />
          </View>
        )}
        {!anime?.poster_path && (
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

        {/* Anime Info Section */}
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
            {anime?.name}
          </Text>

          {/* Status, First Air Date, Seasons */}
          <Text
            style={{
              color: "#A3A3A3",
              textAlign: "center",
              marginTop: 8,
              fontWeight: "600",
            }}
          >
            {anime?.status} • {anime?.first_air_date?.split("-")[0]} •{" "}
            {anime?.number_of_seasons}{" "}
            {anime?.number_of_seasons === 1 ? "Season" : "Seasons"}
          </Text>

          {/* Watch Trailer Button */}
          {trailerUrl && (
            <TouchableOpacity
              style={{
                marginTop: 16,
                paddingVertical: 12,
                paddingHorizontal: 24,
                backgroundColor: "#eab308",
                borderRadius: 12,
                alignSelf: "center",
              }}
              onPress={() => Linking.openURL(trailerUrl)}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                ▶ Watch Trailer
              </Text>
            </TouchableOpacity>
          )}

          {/* Description */}
          <Text style={{ color: "#D4D4D4", marginTop: 20, lineHeight: 24 }}>
            {anime?.overview}
          </Text>

          {/* Episode Runtime if available */}
          {anime?.episode_run_time && anime?.episode_run_time.length > 0 && (
            <Text
              style={{
                color: "#A3A3A3",
                marginTop: 12,
                fontSize: 14,
              }}
            >
              Episode Runtime: ~{anime.episode_run_time[0]} min
            </Text>
          )}
        </View>

        {/* Cast Section */}
        {cast.length > 0 && (
          <View style={styles.castContainer}>
            <Text style={styles.sectionTitle}>Voice Actors & Cast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {cast.slice(0, 15).map((person: any, index: number) => (
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
        )}

        {/* Similar Anime Section */}
        {similar.length > 0 && (
          <View style={{ paddingHorizontal: 16, paddingBottom: 40 }}>
            <AnimeRow title="Similar Anime" data={similar} />
          </View>
        )}

        {/* Footer */}
        <Footer />
      </ScrollView>
    </View>
  );
}
