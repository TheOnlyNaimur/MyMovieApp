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
  fetchMovieDetails,
  fetchMovieCredits,
  fetchSimilarMovies,
  fetchMovieVideos,
  image500,
} from "../../api/tmdb";
import MovieRow from "../../src/components/MovieRow";
import Footer from "../../src/components/Footer";

export default function AdultMovieDetails() {
  const { id, movieData } = useLocalSearchParams();
  const router = useRouter();
  const [movie, setMovie] = useState<any>(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [isTpdbContent, setIsTpdbContent] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetailsData = async () => {
      try {
        let movieId: string | null = null;
        let isFromTMDB = false;
        let initialMovie: any = null;

        // If movieData is passed via params (from AdultContentRow click), use it directly
        if (movieData && typeof movieData === "string") {
          try {
            const parsedMovie = JSON.parse(movieData);
            initialMovie = parsedMovie;
            setMovie(parsedMovie);
            setIsTpdbContent(true); // Mark as TPDB content
            // Extract ID for fetching cast/similar ONLY if it looks like a TMDB numeric ID
            const potentialId = parsedMovie.id?.toString();
            // Check if it's a numeric TMDB ID (not a TPDB UUID or other format)
            if (potentialId && /^\d+$/.test(potentialId)) {
              movieId = potentialId;
              isFromTMDB = true;
              setIsTpdbContent(false); // Not TPDB if numeric ID
            }
          } catch (parseError) {
            console.warn("Could not parse movieData:", parseError);
          }
        }

        // If no movieData, try to get ID from route params (direct TMDB access)
        if (!movieId && id) {
          movieId = Array.isArray(id) ? id[0] : (id as string);
          if (movieId && /^\d+$/.test(movieId)) {
            isFromTMDB = true;
          } else {
            setIsTpdbContent(true); // Non-numeric ID = TPDB
          }
        }

        // Fetch cast/similar if we have a valid TMDB numeric ID
        if (movieId && isFromTMDB && /^\d+$/.test(movieId)) {
          try {
            const [credits, similarMovies, videos] = await Promise.all([
              fetchMovieCredits(movieId),
              fetchSimilarMovies(movieId),
              fetchMovieVideos(movieId),
            ]);
            setCast(credits.cast || []);
            setSimilar(similarMovies.results || []);

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
            console.warn(
              "Could not fetch cast/similar/videos for TMDB movie ID:",
              movieId,
              error,
            );
          }
        }

        // Fetch full movie details from TMDB if we don't have it from params
        if (!initialMovie && id && isFromTMDB) {
          try {
            const movieIdToFetch = Array.isArray(id) ? id[0] : (id as string);
            const details = await fetchMovieDetails(movieIdToFetch);
            setMovie(details);
          } catch (error) {
            console.error("Error fetching TMDB movie details:", error);
            // Fallback to default
            if (!initialMovie) {
              setMovie({
                id: id,
                title: "Adult Content",
                poster_path: null,
                overview: "Movie details not available.",
              });
            }
          }
        }
      } catch (error) {
        console.error("Error in adult movie detail fetch:", error);
        // Set fallback movie data if fetch fails
        setMovie({
          id: id,
          title: "Adult Content",
          poster_path: null,
          overview: "Movie details not available.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetailsData();
  }, [id, movieData]);

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
              source={{ uri: movie.poster_path }}
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
          {/* 18+ Warning Badge */}
          <View
            style={{
              backgroundColor: "#ef4444",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 8,
              alignSelf: "center",
              marginBottom: 12,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>
              🔞 18+ CONTENT
            </Text>
          </View>

          <Text
            style={{
              color: "white",
              fontSize: 28,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {movie?.title || movie?.name}
          </Text>

          {/* Meta Info - Status, Date, Runtime */}
          <Text
            style={{
              color: "#A3A3A3",
              textAlign: "center",
              marginTop: 8,
              fontWeight: "600",
            }}
          >
            {movie?.status && `${movie.status} • `}
            {movie?.release_date && movie.release_date.split("-")[0]}
            {movie?.date && !movie?.release_date && movie.date.split("-")[0]}
            {(movie?.runtime || movie?.result?.length) &&
              ` • ${movie.runtime || "–"} min`}
          </Text>

          {/* Watch Trailer Button */}
          {trailerUrl && (
            <TouchableOpacity
              style={{
                marginTop: 16,
                paddingVertical: 12,
                paddingHorizontal: 24,
                backgroundColor: "#ef4444",
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

          {/* Visit Site Button for TPDB Content */}
          {isTpdbContent && movie?.id && (
            <View style={{ alignItems: "center", marginTop: 16 }}>
              <TouchableOpacity
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  backgroundColor: "#ef4444",
                  borderRadius: 12,
                }}
                onPress={() =>
                  Linking.openURL(`https://theporndb.net/scenes/${movie.id}`)
                }
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  Visit Site
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: "#cc3535",
                  fontSize: 12,
                  marginTop: 8,
                  fontStyle: "italic",
                }}
              >
                visit, search enjoy!
              </Text>
            </View>
          )}

          {/* Description */}
          <Text style={{ color: "#D4D4D4", marginTop: 20, lineHeight: 24 }}>
            {movie?.overview ||
              movie?.description ||
              "No description available."}
          </Text>

          {/* Additional Info */}
          {movie?.studio && (
            <Text
              style={{
                color: "#A3A3A3",
                marginTop: 12,
                fontSize: 14,
              }}
            >
              Studio: {movie.studio}
            </Text>
          )}

          {movie?.rating && (
            <Text
              style={{
                color: "#A3A3A3",
                marginTop: 8,
                fontSize: 14,
              }}
            >
              Rating: {movie.rating}/10
            </Text>
          )}

          {/* Genres/Tags */}
          {movie?.genres &&
            Array.isArray(movie.genres) &&
            movie.genres.length > 0 && (
              <View style={{ marginTop: 16 }}>
                <Text
                  style={{ color: "#A3A3A3", fontSize: 12, marginBottom: 8 }}
                >
                  Tags: {movie.genres.join(", ")}
                </Text>
              </View>
            )}
        </View>

        {/* Cast Section */}
        {cast.length > 0 && (
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
        )}

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
