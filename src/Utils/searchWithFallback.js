import { searchMovies as searchTMDb, isTMDbEnabled } from "./tmdb";
import { fetchMovies as searchOMDb } from "./omdb";

function normalizeFromTMDb(results) {
  return (results || []).map((m) => ({
    id: m.id,
    title: m.title || m.original_title,
    poster_path: m.poster_path,
    backdrop_path: m.backdrop_path,
    release_date: m.release_date,
    overview: m.overview,
  }));
}

function normalizeFromOMDb(results) {
  return (results || []).map((m) => ({
    id: m.imdbID,
    title: m.Title,
    // OMDb returns absolute URLs in Poster; reuse getPosterUrl which now passes through absolute URLs
    poster_path: m.Poster && m.Poster !== 'N/A' ? m.Poster : null,
    release_date: m.Year || null,
    overview: null,
  }));
}

export async function searchMoviesWithFallback(query) {
  if (isTMDbEnabled()) {
    try {
      const tmdb = await searchTMDb(query);
      const normTmdb = normalizeFromTMDb(tmdb);
      if (normTmdb.length) return normTmdb;
    } catch {
      // ignore and fallback
    }
  }

  const omdb = await searchOMDb(query);
  return normalizeFromOMDb(omdb);
}
