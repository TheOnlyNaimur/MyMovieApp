import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { styles } from "../../styles/index_style";
import {
  fetchTrendingAnime,
  fetchTopRatedAnime,
  fetchThisSeasonAnime,
  fetchAllTimeFavouriteAnime,
} from "../../api/tmdb";
import AnimeRow from "../../src/components/AnimeRow";
import Navbar from "../../src/components/Navbar";
import Footer from "../../src/components/Footer";

export default function AnimeScreen() {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [thisSeason, setThisSeason] = useState([]);
  const [allTimeFav, setAllTimeFav] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      const [trendData, topData, seasonData, favData] = await Promise.all([
        fetchTrendingAnime(),
        fetchTopRatedAnime(),
        fetchThisSeasonAnime(),
        fetchAllTimeFavouriteAnime(),
      ]);

      if (trendData.results) setTrending(trendData.results);
      if (topData.results) setTopRated(topData.results);
      if (seasonData.results) setThisSeason(seasonData.results);
      if (favData.results) setAllTimeFav(favData.results);
    };
    getAllData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Navbar />

        {/* Trending Anime */}
        <AnimeRow title="Trending Anime" data={trending} />

        {/* Top Rated Anime */}
        <AnimeRow title="Top Rated" data={topRated} />

        {/* This Season */}
        <AnimeRow title="This Season" data={thisSeason} />

        {/* All Time Favourite */}
        <AnimeRow title="All Time Favourite" data={allTimeFav} />

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}
