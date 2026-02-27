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
