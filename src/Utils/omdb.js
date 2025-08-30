// src/services/omdb.js


const API_KEY = import.meta.env.VITE_OMDB_API_KEY || "";
const FALLBACK_IMAGE = "https://via.placeholder.com/200x300?text=No+Poster";

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
      const { reportError } = await import('./errors');
      reportError(`OMDb: ${data.Error || 'No movies found'}`);
      return [];
    }
  } catch (error) {
    const { reportError } = await import('./errors');
    reportError(`OMDb search failed: ${error?.message || error}`);
    return [];
  }
};

// Paged search with optional year; returns normalized TMDb-like pagination shape
export const fetchMoviesPaged = async (query, { page = 1, year, type = 'movie' } = {}) => {
  if (!API_KEY) return { page: 1, results: [], total_pages: 1, total_results: 0 };
  const params = new URLSearchParams({ apikey: API_KEY, s: query || '', type, page: String(page) });
  if (year) params.set('y', String(year));
  const url = `https://www.omdbapi.com/?${params.toString()}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response === "True") {
      const totalResults = parseInt(data.totalResults || '0', 10);
      const total_pages = Math.max(1, Math.ceil(totalResults / 10));
      return { page, results: data.Search, total_pages, total_results: totalResults };
    }
    return { page, results: [], total_pages: 1, total_results: 0 };
  } catch {
    return { page, results: [], total_pages: 1, total_results: 0 };
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
      const { reportError } = await import('./errors');
      reportError('OMDb trending returned no results');
      return [];
    }
  } catch (error) {
    const { reportError } = await import('./errors');
    reportError(`OMDb trending failed: ${error?.message || error}`);
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
      // Normalize to a TMDb-like shape so the UI can render consistently
      const releaseYear = data.Year && data.Year !== 'N/A' ? data.Year : null;
      const runtimeMinutes = data.Runtime && data.Runtime !== 'N/A' ? parseInt(data.Runtime, 10) : null;
      const genres = data.Genre && data.Genre !== 'N/A' ? data.Genre.split(', ').map((name) => ({ id: name, name })) : [];
      const cast = data.Actors && data.Actors !== 'N/A' ? data.Actors.split(', ').map((name) => ({ id: name, name, character: '' })) : [];
      const crew = data.Director && data.Director !== 'N/A' ? [{ id: data.Director, name: data.Director, job: 'Director' }] : [];
      // Ratings extraction
      const ratingsArr = Array.isArray(data.Ratings) ? data.Ratings : [];
      const imdbRating = data.imdbRating && data.imdbRating !== 'N/A' ? data.imdbRating : null;
      const rt = ratingsArr.find((r) => r.Source === 'Rotten Tomatoes');
      const rottenTomatoesRating = rt ? rt.Value : null;
      const metacriticRating = data.Metascore && data.Metascore !== 'N/A' ? `${data.Metascore}/100` : null;
  return {
        id: data.imdbID,
        title: data.Title,
        release_date: releaseYear ? `${releaseYear}-01-01` : null,
        overview: data.Plot && data.Plot !== 'N/A' ? data.Plot : null,
        poster_path: data.Poster && data.Poster !== 'N/A' ? data.Poster : null,
        backdrop_path: null,
        runtime: runtimeMinutes,
        genres,
        credits: { cast, crew },
        vote_average: imdbRating ? parseFloat(imdbRating) : null,
        omdbRatings: {
          imdb: imdbRating,
          rottenTomatoes: rottenTomatoesRating,
          metacritic: metacriticRating,
          sources: ratingsArr,
        },
      };
    } else {
      const { reportError } = await import('./errors');
      reportError(`OMDb details not found: ${data.Error || 'Unknown error'}`);
      return null;
    }
  } catch (error) {
    const { reportError } = await import('./errors');
    reportError(`OMDb details failed: ${error?.message || error}`);
    return null;
  }
};
