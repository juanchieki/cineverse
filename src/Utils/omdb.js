// src/services/omdb.js

const API_KEY = "5b6961f"; // Temporarily hardcoding the API key for testing
console.log("Loaded API Key:", API_KEY);
console.log("Environment API Key:", import.meta.env.VITE_OMDB_API_KEY);
console.log("Environment Variables:", import.meta.env);

export const fetchMovies = async (query, type = "movie") => {
  console.log(`Fetching movies with query: ${query}, type: ${type}`);
  if (!API_KEY) {
    console.error("OMDb API key is missing!");
    return [];
  }

  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&type=${type}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("API response:", data);
    if (data.Response === "True") {
      return data.Search;
    } else {
      console.warn("No movies found for query:", query);
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const getTrendingMovies = async () => {
  if (!API_KEY) {
    console.error("OMDb API key is missing!");
    return [];
  }

  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=trending&type=movie`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response === "True") {
      return data.Search;
    } else {
      console.warn("No trending movies found.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

export const getMovieDetails = async (id) => {
  if (!API_KEY) {
    console.error("OMDb API key is missing!");
    return null;
  }

  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response === "True") {
      return {
        title: data.Title,
        year: data.Year,
        genre: data.Genre,
        runtime: data.Runtime,
        director: data.Director,
        actors: data.Actors,
        plot: data.Plot,
        poster: data.Poster !== "N/A" ? data.Poster : FALLBACK_IMAGE,
        rating: data.imdbRating,
      };
    } else {
      console.warn("Movie details not found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};