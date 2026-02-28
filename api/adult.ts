const API_BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MGFlZjU0MTY0YmQwOTU0YzFjZTdlNDQ2OGI1ZmE2YiIsIm5iZiI6MTc3MjEzNTY2NC43ODksInN1YiI6IjY5YTBhNGYwMTQ3ZTVlNGI3MWZmNTJlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6ADGo53RTFB0QgfNq6pbnbtnwwAIY4Pg0pxV82miYHo";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const tmdbAdultCall = async (
  endpoint: string,
  params: Record<string, string> = {},
) => {
  const mergedParams = new URLSearchParams({
    include_adult: "true",
    include_video: "false",
    language: "en-US",
    page: "1",
    ...params,
  });

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}?${mergedParams}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    const data = await response.json();

    return (data.results || []).map((item: any) => ({
      ...item,
      title: item.title || item.name || "Untitled",
      poster_path: item.poster_path
        ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}`
        : "https://via.placeholder.com/150x225",
    }));
  } catch (error) {
    console.error("TMDB Adult Fetch Error:", error);
    return [];
  }
};

// --- TARGETED ROWS ---

// Row 1: Mature Thrillers (The "Gritty" look)
// export const fetchMatureThrillers = () =>
//   tmdbAdultCall("/discover/movie", {
//     sort_by: "popularity.desc",
//     with_genres: "53",
//     certification_country: "US",
//     "certification.gte": "R",
//   });

// Row 2: Extreme Horror (Mature rated)
// export const fetchMatureHorror = () =>
//   tmdbAdultCall("/discover/movie", {
//     sort_by: "revenue.desc",
//     with_genres: "27",
//     certification: "NC-17",
//   });

// Row 3: Global "Adult" Tagged (The "Include Adult" bypass)
// export const fetchExplicitTarget = () =>
//   tmdbAdultCall("/discover/movie", {
//     sort_by: "vote_count.desc",
//     certification_country: "US",
//     certification: "NR", 
//   });

// Updated TMDB Adult Integration

export const fetchMatureMovies = () =>
  tmdbAdultCall("/discover/movie", {
    sort_by: "popularity.desc",
    with_keywords: "155477", // The "Adult Content" keyword that worked in your test
    include_adult: "true",
  });

export const fetchEroticThrillers = () =>
  tmdbAdultCall("/discover/movie", {
    sort_by: "vote_count.desc",
    with_keywords: "190370", // Erotica keyword
    include_adult: "true",
  });



