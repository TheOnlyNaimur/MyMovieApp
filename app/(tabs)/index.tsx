import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { styles } from "../../styles/index_style";
// app/index.tsx
import {
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
  fetchPopularMovies,
  fetchTrendingPeople,
  fetchHindiMovies,
  fetchSouthMovies,
  fetchAsianMovies,
  fetchAnimatedMovies,
  fetchBanglaMovies,
} from "../../api/tmdb";
import TrendingCarousel from "../../src/components/TrendingCarousel";
import MovieRow from "../../src/components/MovieRow";
import ActorRow from "../../src/components/ActorRow";
import Navbar from "../../src/components/Navbar";
import Footer from "../../src/components/Footer";

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [actors, setActors] = useState([]);
  const [hindi, setHindi] = useState([]);
  const [south, setSouth] = useState([]);
  const [asian, setAsian] = useState([]);
  const [animated, setAnimated] = useState([]);
  const [bangla, setBangla] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      // Running these in parallel for faster loading
      const [
        trendData,
        upData,
        topData,
        popData,
        pplData,
        hindiData,
        southData,
        asianData,
        animatedData,
        banglaData,
      ] = await Promise.all([
        fetchTrendingMovies(),
        fetchUpcomingMovies(),
        fetchTopRatedMovies(),
        fetchPopularMovies(),
        fetchTrendingPeople(),
        fetchHindiMovies(),
        fetchSouthMovies(),
        fetchAsianMovies(),
        fetchAnimatedMovies(),
        fetchBanglaMovies(),
      ]);

      if (trendData.results) setTrending(trendData.results);
      if (upData.results) setUpcoming(upData.results);
      if (topData.results) setTopRated(topData.results);
      if (popData.results) setPopular(popData.results);
      if (pplData.results) setActors(pplData.results);
      if (hindiData.results) setHindi(hindiData.results);
      if (southData.results) setSouth(southData.results);
      if (asianData.results) setAsian(asianData.results);
      if (animatedData.results) setAnimated(animatedData.results);
      if (banglaData.results) setBangla(banglaData.results);
    };
    getAllData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Professional Header Branding */}
        <Navbar />

        {/* Trending Carousel Section */}
        <TrendingCarousel title="Trending Now" data={trending} />

        {/* 2. Upcoming Row */}
        <MovieRow title="Upcoming" data={upcoming} />

        {/* 3. Top Rated Row */}
        <MovieRow title="Top Rated" data={topRated} />

        {/* 2. Popular Movies */}
        <MovieRow title="Popular Hits" data={popular} />

        {/* Regional Content Sections */}
        <MovieRow title="Hindi Blockbusters" data={hindi} />
        <MovieRow title="South Indian Hits" data={south} />
        <MovieRow title="Asian Cinema" data={asian} />
        <MovieRow title="Bangla Movies" data={bangla} />
        <MovieRow title="Animated Movies" data={animated} />

        {/* 3. Top Actors Section */}
        <ActorRow title="Top Actors & Actresses" data={actors} />

        {/* 5. The Footer */}
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}
