import { searchMoviesPaged as searchTMDbPaged, isTMDbEnabled } from './tmdb';
import { fetchMoviesPaged as searchOMDbPaged } from './omdb';

function normalizeFromTMDb(results) {
  return (results || []).map((m) => ({
    id: m.id,
    title: m.title || m.original_title,
    poster_path: m.poster_path,
    backdrop_path: m.backdrop_path,
    release_date: m.release_date,
    overview: m.overview,
    vote_average: m.vote_average,
  }));
}

function normalizeFromOMDb(results) {
  return (results || []).map((m) => ({
    id: m.imdbID,
    title: m.Title,
    poster_path: m.Poster && m.Poster !== 'N/A' ? m.Poster : null,
    release_date: m.Year || null,
    overview: null,
    vote_average: null,
  }));
}

export async function searchPagedWithFallback(query, { page = 1, year } = {}) {
  if (isTMDbEnabled()) {
    try {
      const data = await searchTMDbPaged(query, { page, year });
      return {
        page: data.page || page,
        results: normalizeFromTMDb(data.results),
        total_pages: data.total_pages || 1,
        total_results: data.total_results || 0,
        source: 'tmdb',
      };
    } catch {
      // ignore and fallback
    }
  }
  const data = await searchOMDbPaged(query, { page, year });
  return {
    page: data.page || page,
    results: normalizeFromOMDb(data.results),
    total_pages: data.total_pages || 1,
    total_results: data.total_results || 0,
    source: 'omdb',
  };
}
