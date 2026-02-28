import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../../styles/index_style";
import {
  fetchMatureMovies,
  fetchEroticThrillers,

} from "../../api/adult";
import {fetchTpdbExoticMovies, fetchTpdbJAV} from "../../api/tpdb";
import AdultContentRow from "../../src/components/AdultContentRow";
import Navbar from "../../src/components/Navbar";
import Footer from "../../src/components/Footer";

export default function AdultScreen() {
  const [matureMovies, setMatureMovies] = useState<any[]>([]);
  const [eroticThrillers, setEroticThrillers] = useState<any[]>([]);
  const [tpdbExoticMovies, setTpdbExoticMovies] = useState<any[]>([]);
  const [tpdbJAV, setTpdbJAV] = useState<any[]>([]);

  
  


  useEffect(() => {
    const getAllData = async () => {
      try {
        const [matureMoviesData, eroticThrillersData, tpdbExoticMoviesData, tpdbJAVData] =
          await Promise.all([
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
  }, []);

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

        <AdultContentRow
          title="Erotic Thrillers"
          data={eroticThrillers}
        />

        <AdultContentRow title="Pornographic Movies" data={tpdbExoticMovies} />
        <AdultContentRow title="JAV" data={tpdbJAV} />
      




 

       

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}
