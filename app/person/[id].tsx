import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  fetchPersonDetails,
  fetchPersonMovies,
  image500,
} from "../../api/tmdb";
import MovieRow from "../../src/components/MovieRow";
import Navbar from "../../src/components/Navbar";
import Footer from "../../src/components/Footer";
import { styles } from "../../styles/index_style";

const { width } = Dimensions.get("window");

export default function PersonDetails() {
  const { id } = useLocalSearchParams();
  const [person, setPerson] = useState<any>(null);
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const [details, movies] = await Promise.all([
        fetchPersonDetails(id as string),
        fetchPersonMovies(id as string),
      ]);
      if (details) setPerson(details);
      if (movies) setPersonMovies(movies.cast);
      setLoading(false);
    };
    getData();
  }, [id]);

  if (loading)
    return (
      <View style={styles.container}>
        <Text style={{ color: "white", textAlign: "center", marginTop: 50 }}>
          Loading...
        </Text>
      </View>
    );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <SafeAreaView style={{ paddingHorizontal: 16, marginBottom: 20 }}>
        {/* Navbar */}
        <Navbar />
      </SafeAreaView>

      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: width * 0.7,
            height: width * 0.7,
            borderRadius: width * 0.35,
            overflow: "hidden",
            borderWidth: 2,
            borderColor: "#404040",
          }}
        >
          {person?.profile_path ? (
            <Image
              source={{ uri: image500(person.profile_path) || "" }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <View
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#262626",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#737373", fontSize: 14 }}>No photo</Text>
            </View>
          )}
        </View>
        <Text
          style={{
            color: "white",
            fontSize: 32,
            fontWeight: "bold",
            marginTop: 15,
          }}
        >
          {person?.name}
        </Text>
        <Text style={{ color: "#A3A3A3", fontSize: 16 }}>
          {person?.place_of_birth}
        </Text>
      </View>

      <View style={{ padding: 16, marginTop: 20 }}>
        <Text style={styles.sectionTitle}>Biography</Text>
        {person?.biography ? (
          <>
            <Text style={{ color: "#D4D4D4", lineHeight: 22 }}>
              {isExpanded
                ? person.biography
                : person.biography.length > 300
                  ? `${person.biography.substring(0, 300)}...`
                  : person.biography}
            </Text>
            {person.biography.length > 300 && (
              <TouchableOpacity
                onPress={() => setIsExpanded(!isExpanded)}
                style={{ marginTop: 8 }}
              >
                <Text style={{ color: "#eab308", fontWeight: "600" }}>
                  {isExpanded ? "Show less" : "Read more"}
                </Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <Text style={{ color: "#D4D4D4", lineHeight: 22 }}>
            No biography available.
          </Text>
        )}
      </View>

      {/* Reusing MovieRow for the actor's films! */}
      <MovieRow title="Known For" data={personMovies} />

      {/* Footer */}
      <Footer />
    </ScrollView>
  );
}
