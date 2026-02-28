// src/api/tmdb.ts

const API_BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MGFlZjU0MTY0YmQwOTU0YzFjZTdlNDQ2OGI1ZmE2YiIsIm5iZiI6MTc3MjEzNTY2NC43ODksInN1YiI6IjY5YTBhNGYwMTQ3ZTVlNGI3MWZmNTJlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6ADGo53RTFB0QgfNq6pbnbtnwwAIY4Pg0pxV82miYHo";

const apiCall = async (endpoint: string, params?: Record<string, string>) => {
  // Convert params object to a query string (e.g., ?page=1)
  const queryString = params ? new URLSearchParams(params).toString() : "";
  const url = `${API_BASE_URL}${endpoint}${queryString ? "?" + queryString : ""}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`, // Industry standard Bearer token
      },
    });

    if (!response.ok) {
      console.error(`API Error: ${response.status}`);
      return { results: [] };
    }

    return await response.json();
  } catch (error) {
    console.error("Network Error:", error);
    return { results: [] }; // Prevents app crash
  }
};

// Endpoints for our industrial Home Screen
export const fetchTrendingMovies = () => apiCall("/trending/movie/day");
export const fetchUpcomingMovies = () => apiCall("/movie/upcoming");
export const fetchTopRatedMovies = () => apiCall("/movie/top_rated");

// src/api/tmdb.ts

// Fetch basic details (synopsis, runtime, genres)
export const fetchMovieDetails = (id: string) => apiCall(`/movie/${id}`);

// Fetch the cast and crew
export const fetchMovieCredits = (id: string) =>
  apiCall(`/movie/${id}/credits`);

// Fetch recommendations based on this movie
export const fetchSimilarMovies = (id: string) =>
  apiCall(`/movie/${id}/similar`);

// Fetch movie videos/trailers
export const fetchMovieVideos = (id: string) => apiCall(`/movie/${id}/videos`);

// Add these to src/api/tmdb.ts

export const fetchPopularMovies = () => apiCall("/movie/popular");

// Fetch trending actors/actresses
export const fetchTrendingPeople = () => apiCall("/trending/person/day");

// Add these to src/api/tmdb.ts

// Fetch person details (bio, birthday, place of birth)
export const fetchPersonDetails = (id: string) => apiCall(`/person/${id}`);

// Fetch movies where this person was a cast member
export const fetchPersonMovies = (id: string) =>
  apiCall(`/person/${id}/movie_credits`);

// Helper for images (converts partial path to full URL)
export const image500 = (path: string | null) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;

// Add this to your src/api/tmdb.ts

// query: the text the user types
export const searchMovies = (query: string) =>
  apiCall("/search/movie", {
    query,
    include_adult: "false",
    language: "en-US",
    page: "1",
  });
// Regional Content Filters

// 1. Hindi Films (Bollywood)
export const fetchHindiMovies = () =>
  apiCall("/discover/movie", {
    sort_by: "release_date.desc",
    with_original_language: "hi",
    "vote_average.gte": "6",
  });

// 2. South Indian Hits (Telugu, Tamil, Kannada, Malayalam)
export const fetchSouthMovies = () =>
  apiCall("/discover/movie", {
    sort_by: "release_date.desc",
    with_original_language: "te|ta|kn|ml",
    "vote_average.gte": "6",
  });

// 3. Asian Cinema (Korea, Japan, China)
export const fetchAsianMovies = () =>
  apiCall("/discover/movie", {
    sort_by: "release_date.desc",
    with_original_language: "ko|ja|zh",
    "vote_average.gte": "6",
  });

// 4. Animated Movies (All Languages)
export const fetchAnimatedMovies = () =>
  apiCall("/discover/movie", {
    sort_by: "release_date.desc",
    with_genres: "16", // Animation genre
    "vote_average.gte": "6",
  });

// 5. Bangla Movies (Indian Bengali & Bangladeshi Bengali)
export const fetchBanglaMovies = () =>
  apiCall("/discover/movie", {
    sort_by: "release_date.desc",
    with_original_language: "bn", // Bengali language
    "vote_average.gte": "6",
  });

// ============================================
// TV SHOWS API ENDPOINTS
// ============================================

// Trending TV Shows
export const fetchTrendingTVShows = () => apiCall("/trending/tv/day");

// Upcoming TV Shows (Airing Today)
export const fetchUpcomingTVShows = () => apiCall("/tv/airing_today");

// Top Rated TV Shows
export const fetchTopRatedTVShows = () => apiCall("/tv/top_rated");

// Popular TV Shows
export const fetchPopularTVShows = () => apiCall("/tv/popular");

// TV Show Details
export const fetchTVShowDetails = (id: string) => apiCall(`/tv/${id}`);

// TV Show Credits (Cast & Crew)
export const fetchTVShowCredits = (id: string) => apiCall(`/tv/${id}/credits`);

// Similar TV Shows
export const fetchSimilarTVShows = (id: string) => apiCall(`/tv/${id}/similar`);

// Fetch TV show videos/trailers
export const fetchTVShowVideos = (id: string) => apiCall(`/tv/${id}/videos`);

// Regional TV Shows

// Indian TV Shows (Hindi)
export const fetchIndianTVShows = () =>
  apiCall("/discover/tv", {
    sort_by: "popularity.desc",
    with_original_language: "hi",
    "vote_average.gte": "6",
  });

// Korean Dramas (K-Drama)
export const fetchKDramas = () =>
  apiCall("/discover/tv", {
    sort_by: "popularity.desc",
    with_original_language: "ko",
    "vote_average.gte": "7",
  });

// Bengali Dramas
export const fetchBengaliDramas = () =>
  apiCall("/discover/tv", {
    sort_by: "popularity.desc",
    with_original_language: "bn",
    "vote_average.gte": "6",
  });

// Fetch TV Drama Actors/Actresses
// This aggregates cast from popular TV shows to show actors known for TV/Drama
export const fetchTVActors = async () => {
  try {
    // Fetch popular TV shows
    const popularShows = await apiCall("/tv/popular", { page: "1" });

    if (!popularShows.results || popularShows.results.length === 0) {
      return { results: [] };
    }

    // Get cast from the first 5 popular shows
    const castPromises = popularShows.results
      .slice(0, 5)
      .map((show: any) => apiCall(`/tv/${show.id}/credits`));

    const castsData = await Promise.all(castPromises);

    // Aggregate all actors and remove duplicates
    const actorsMap = new Map();

    castsData.forEach((credits: any) => {
      if (credits.cast) {
        credits.cast.slice(0, 10).forEach((actor: any) => {
          // Use actor ID to prevent duplicates
          if (!actorsMap.has(actor.id) && actor.profile_path) {
            actorsMap.set(actor.id, {
              id: actor.id,
              name: actor.name,
              profile_path: actor.profile_path,
              character: actor.character,
              known_for_department: "Acting",
            });
          }
        });
      }
    });

    // Convert map to array and limit to 20 actors
    const uniqueActors = Array.from(actorsMap.values()).slice(0, 20);

    return { results: uniqueActors };
  } catch (error) {
    console.error("Error fetching TV actors:", error);
    return { results: [] };
  }
};

// ============================================
// ANIME API ENDPOINTS
// ============================================

// Trending Anime (Japanese animation content)
export const fetchTrendingAnime = () =>
  apiCall("/discover/tv", {
    sort_by: "popularity.desc",
    with_genres: "16", // Animation genre
    with_original_language: "ja", // Japanese
    "vote_count.gte": "100",
  });

// Top Rated Anime (Highest rated first)
export const fetchTopRatedAnime = () =>
  apiCall("/discover/tv", {
    sort_by: "vote_average.desc",
    with_genres: "16",
    with_original_language: "ja",
    "vote_count.gte": "200",
    "vote_average.gte": "7",
  });

// This Season Anime (Currently airing/new releases)
export const fetchThisSeasonAnime = () => {
  const currentYear = new Date().getFullYear();
  return apiCall("/discover/tv", {
    sort_by: "first_air_date.desc",
    with_genres: "16",
    with_original_language: "ja",
    "first_air_date.gte": `${currentYear}-01-01`,
    "vote_count.gte": "10",
  });
};

// All Time Favourite Anime (Most popular of all time)
export const fetchAllTimeFavouriteAnime = () =>
  apiCall("/discover/tv", {
    sort_by: "popularity.desc",
    with_genres: "16",
    with_original_language: "ja",
    "vote_count.gte": "500",
    "vote_average.gte": "7.5",
  });

// Anime Details (using TV show endpoint since anime are categorized as TV)
export const fetchAnimeDetails = (id: string) => apiCall(`/tv/${id}`);

// Anime Credits (Cast & Crew)
export const fetchAnimeCredits = (id: string) => apiCall(`/tv/${id}/credits`);

// Similar Anime
export const fetchSimilarAnime = (id: string) => apiCall(`/tv/${id}/similar`);

// Fetch anime videos/trailers
export const fetchAnimeVideos = (id: string) => apiCall(`/tv/${id}/videos`);
