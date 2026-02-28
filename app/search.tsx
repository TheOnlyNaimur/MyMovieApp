import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XIcon } from "lucide-react-native";
import { useRouter } from "expo-router";
import { searchMovies, image500 } from "../api/tmdb";
import { styles } from "../styles/index_style";
import { useAuth } from "../context/AuthContext";

const { width } = Dimensions.get("window");

export default function SearchScreen() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, authLoading]);

  const handleSearch = async (value: string) => {
    if (value && value.length > 2) {
      setLoading(true);
      const data = await searchMovies(value);
      if (data && data.results) setResults(data.results);
      setLoading(false);
    } else {
      setResults([]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Input Area */}
      <View
        style={{
          marginHorizontal: 16,
          marginBottom: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#404040",
          borderRadius: 50,
          paddingHorizontal: 16,
        }}
      >
        <TextInput
          onChangeText={handleSearch}
          placeholder="Search Movies..."
          placeholderTextColor={"lightgray"}
          style={{ flex: 1, color: "white", height: 50, fontSize: 16 }}
        />
        <TouchableOpacity onPress={() => router.back()}>
          <XIcon size={25} color="white" />
        </TouchableOpacity>
      </View>

      {/* Results Grid */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        <Text style={{ color: "white", fontWeight: "bold", marginBottom: 15 }}>
          Results ({results.length})
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {results.map((item: any, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(`/movie/${item.id}`)}
            >
              <View style={{ marginBottom: 16 }}>
                <Image
                  source={{
                    uri:
                      image500(item.poster_path) ||
                      "https://via.placeholder.com/185",
                  }}
                  style={{ width: width * 0.44, height: 250, borderRadius: 20 }}
                />
                <Text
                  style={{
                    color: "#A3A3A3",
                    width: width * 0.44,
                    marginTop: 4,
                  }}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
