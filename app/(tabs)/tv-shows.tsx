import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { styles } from "../../styles/index_style";
import {
  fetchTrendingTVShows,
  fetchUpcomingTVShows,
  fetchTopRatedTVShows,
  fetchPopularTVShows,
  fetchIndianTVShows,
  fetchKDramas,
  fetchBengaliDramas,
} from "../../api/tmdb";
import TVShowRow from "../../src/components/TVShowRow";
import Navbar from "../../src/components/Navbar";
import Footer from "../../src/components/Footer";

export default function TVShowsScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [indian, setIndian] = useState([]);
  const [kdrama, setKdrama] = useState([]);
  const [bengali, setBengali] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      const [
        trendData,
        upData,
        topData,
        popData,
        indianData,
        kdramaData,
        bengaliData,
      ] = await Promise.all([
        fetchTrendingTVShows(),
        fetchUpcomingTVShows(),
        fetchTopRatedTVShows(),
        fetchPopularTVShows(),
        fetchIndianTVShows(),
        fetchKDramas(),
        fetchBengaliDramas(),
      ]);

      if (trendData.results) setTrending(trendData.results);
      if (upData.results) setUpcoming(upData.results);
      if (topData.results) setTopRated(topData.results);
      if (popData.results) setPopular(popData.results);
      if (indianData.results) setIndian(indianData.results);
      if (kdramaData.results) setKdrama(kdramaData.results);
      if (bengaliData.results) setBengali(bengaliData.results);
    };
    getAllData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Navbar />

        {/* Trending TV Shows */}
        <TVShowRow title="Trending TV Shows" data={trending} />

        {/* Airing Today (Upcoming) */}
        <TVShowRow title="Airing Today" data={upcoming} />

        {/* Top Rated */}
        <TVShowRow title="Top Rated TV Shows" data={topRated} />

        {/* Popular Hits */}
        <TVShowRow title="Popular Hits" data={popular} />

        {/* Regional Content */}
        <TVShowRow title="Indian TV Shows" data={indian} />
        <TVShowRow title="K-Drama" data={kdrama} />
        <TVShowRow title="Bengali Drama" data={bengali} />

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}
