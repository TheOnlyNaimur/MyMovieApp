import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "../../styles/index_style";
import { fetchMatureMovies, fetchEroticThrillers } from "../../api/adult";
import { fetchTpdbExoticMovies, fetchTpdbJAV } from "../../api/tpdb";
import AdultContentRow from "../../src/components/AdultContentRow";
import Navbar from "../../src/components/Navbar";
import Footer from "../../src/components/Footer";
import { useAuth } from "../../context/AuthContext";

export default function AdultScreen() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [matureMovies, setMatureMovies] = useState<any[]>([]);
  const [eroticThrillers, setEroticThrillers] = useState<any[]>([]);
  const [tpdbExoticMovies, setTpdbExoticMovies] = useState<any[]>([]);
  const [tpdbJAV, setTpdbJAV] = useState<any[]>([]);

  useEffect(() => {
    const getAllData = async () => {
      // Only fetch data if authenticated
      if (!isAuthenticated) return;

      try {
        const [
          matureMoviesData,
          eroticThrillersData,
          tpdbExoticMoviesData,
          tpdbJAVData,
        ] = await Promise.all([
          fetchMatureMovies(),
          fetchEroticThrillers(),
          fetchTpdbExoticMovies(),
          fetchTpdbJAV(),
        ]);

        setMatureMovies(matureMoviesData || []);
        setEroticThrillers(eroticThrillersData || []);
        setTpdbExoticMovies(tpdbExoticMoviesData || []);
        setTpdbJAV(tpdbJAVData || []);
      } catch (error) {
        console.error("Error fetching adult content:", error);
      }
    };
    getAllData();
  }, [isAuthenticated]);

  // Show login prompt if not authenticated
  if (!authLoading && !isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <Navbar />
        <ScrollView>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 80,
              paddingHorizontal: 20,
            }}
          >
            <MaterialCommunityIcons name="lock" size={80} color="#ef4444" />
            <Text
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: "bold",
                marginTop: 24,
                textAlign: "center",
              }}
            >
              18+ Content
            </Text>
            <Text
              style={{
                color: "#9ca3af",
                fontSize: 16,
                marginTop: 12,
                textAlign: "center",
                lineHeight: 24,
              }}
            >
              You must be logged in to access adult content.{"\n"}
              Please sign in or create an account.
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 32,
                paddingVertical: 14,
                paddingHorizontal: 32,
                backgroundColor: "#ef4444",
                borderRadius: 12,
              }}
              onPress={() => router.push("../login")}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 16,
                paddingVertical: 14,
                paddingHorizontal: 32,
                backgroundColor: "#374151",
                borderRadius: 12,
              }}
              onPress={() => router.replace("../register") as any}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Footer />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Navbar />

        {/* Age Warning Section */}
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 20,
            marginBottom: 20,
            padding: 16,
            backgroundColor: "#7f1d1d",
            borderRadius: 12,
            borderWidth: 2,
            borderColor: "#ef4444",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <MaterialCommunityIcons
              name="alert-octagon"
              size={32}
              color="#ef4444"
            />
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 12,
              }}
            >
              18+ Content Warning
            </Text>
          </View>
          <Text style={{ color: "#fca5a5", fontSize: 14, lineHeight: 20 }}>
            This section contains adult content intended for viewers 18 years
            and older. All content requires age verification and compliance with
            local laws.
          </Text>
          <Text
            style={{
              color: "#4ade80",
              fontSize: 12,
              marginTop: 8,
              fontStyle: "italic",
            }}
          >
            ✓ TMDB mature discovery are now enabled.
          </Text>
        </View>

        <AdultContentRow title="Trending Mature Movies" data={matureMovies} />

        <AdultContentRow title="Erotic Thrillers" data={eroticThrillers} />

        <AdultContentRow title="Pornographic Movies" data={tpdbExoticMovies} />
        <AdultContentRow title="JAV" data={tpdbJAV} />

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}
