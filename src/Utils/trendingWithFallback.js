import { getTrending as getTMDbTrending } from "./tmdb";
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
    poster_path: m.Poster && m.Poster !== 'N/A' ? m.Poster : null,
    release_date: m.Year || null,
    overview: null,
  }));
}

export async function getTrendingWithFallback() {
  try {
    const tmdb = await getTMDbTrending('week');
    const norm = normalizeFromTMDb(tmdb);
    if (norm.length) return norm;
  } catch {
    // ignore and fallback
  }

  // OMDb has no trending; use a broad popular query as a reasonable fallback
  const omdb = await searchOMDb('popular');
  return normalizeFromOMDb(omdb);
}
