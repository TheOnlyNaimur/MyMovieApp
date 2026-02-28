const TPDB_TOKEN = "dpAEsiy8gTnDvwgbJSZnM4wczpRCU4ZbAsnM7c772905337e";
const TPDB_ENDPOINT = "https://theporndb.net/graphql";

const tpdbQuery = async (query: string) => {
  try {
    const response = await fetch(TPDB_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TPDB_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error(
        "GraphQL Error:",
        result.errors?.message || JSON.stringify(result.errors),
      );
      return [];
    }

    const items = result.data?.searchScene || [];

    if (!Array.isArray(items) || items.length === 0) {
      return [];
    }

    // Normalized to match the JSON structure we verified
    return items.map((item: any) => ({
      id: item.id,
      title: item.title || "Untitled",
      description: item.details || "",
      // Grabbing the first URL from the images array found in the body
      poster_path:
        item.images?.[0]?.url || "https://via.placeholder.com/150x225",
      date: item.date,
      studio: item.studio?.name || "Unknown Studio",
      genres: item.tags?.map((t: any) => t.name) || [],
    }));
  } catch (error) {
    console.error("TPDB Network Error:", error);
    return [];
  }
};

// ROW 2: Global Movies
export const fetchTpdbExoticMovies = () => {
  const query = `query { 
    searchScene(term: "movie", limit: 20) { 
      id 
      title 
      details
      date
      images { url }
      studio { name }
      tags { name }
    } 
  }`;
  return tpdbQuery(query);
};

// ROW 3: JAV
export const fetchTpdbJAV = () => {
  const query = `query { 
    searchScene(term: "JAV movie", limit: 20) { 
      id 
      title 
      details
      date
      images { url }
      studio { name }
      tags { name }
    } 
  }`;
  return tpdbQuery(query);
};

// ROW 4: Hentai
