import { discoverMoviesPaged as discoverTMDb, getGenres as getTMDbGenres, isTMDbEnabled } from './tmdb';
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

export async function getGenresWithFallback() {
  if (isTMDbEnabled()) {
    try {
      return await getTMDbGenres();
    } catch {
      // ignore and use static fallback below
    }
  }
  // OMDb has no genre list; provide a small static set as a fallback
  return [
    { id: 'Action', name: 'Action' },
    { id: 'Comedy', name: 'Comedy' },
    { id: 'Drama', name: 'Drama' },
    { id: 'Romance', name: 'Romance' },
    { id: 'Animation', name: 'Animation' },
  ];
}

// If TMDb available, use Discover to filter by genre/year; otherwise, approximate by searching "<genre>"
export async function searchDiscoverWithFallback({ page = 1, year, genreId } = {}) {
  if (isTMDbEnabled()) {
    try {
      const data = await discoverTMDb({ page, year, genreId });
      return {
        page: data.page || page,
        results: normalizeFromTMDb(data.results),
        total_pages: data.total_pages || 1,
        total_results: data.total_results || 0,
        source: 'tmdb',
      };
    } catch {
      /* fall back to OMDb approximation */
    }
  }
  const genreQuery = typeof genreId === 'string' ? genreId : '';
  const data = await searchOMDbPaged(genreQuery, { page, year });
  return {
    page: data.page || page,
    results: normalizeFromOMDb(data.results),
    total_pages: data.total_pages || 1,
    total_results: data.total_results || 0,
    source: 'omdb',
  };
}
