// TMDb API utility
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function getTmdbLanguage() {
  try {
    const lang = typeof window !== 'undefined' ? (localStorage.getItem('cineverse-lang') || 'en') : 'en';
    const map = {
      en: 'en-US',
      es: 'es-ES',
      fr: 'fr-FR',
      de: 'de-DE',
      pt: 'pt-PT',
      it: 'it-IT',
      ja: 'ja-JP',
      zh: 'zh-CN',
      hi: 'hi-IN',
      ar: 'ar-SA',
    };
    return map[lang] || 'en-US';
  } catch {
    return 'en-US';
  }
}

export async function searchMovies(query) {
  const url = `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=${getTmdbLanguage()}&query=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data?.status_code) throw new Error(data.status_message || 'TMDb error');
    return data.results || [];
  } catch (e) {
    const { reportError } = await import('./errors');
    reportError(`TMDb search failed: ${e?.message || e}`);
    return [];
  }
}

// Paged search with optional year filter; returns full TMDb payload
export async function searchMoviesPaged(query, { page = 1, year } = {}) {
  const params = new URLSearchParams({ api_key: TMDB_API_KEY, language: getTmdbLanguage(), query: query || '', page: String(page) });
  if (year) params.set('year', String(year));
  const url = `${BASE_URL}/search/movie?${params.toString()}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data?.status_code) throw new Error(data.status_message || 'TMDb error');
    return data; // { page, results, total_pages, total_results }
  } catch (e) {
    const { reportError } = await import('./errors');
    reportError(`TMDb paged search failed: ${e?.message || e}`);
    return { page, results: [], total_pages: 1, total_results: 0 };
  }
}

// Discover movies with optional genre and year; returns full TMDb payload
export async function discoverMoviesPaged({ page = 1, year, genreId, sortBy = 'popularity.desc' } = {}) {
  const params = new URLSearchParams({ api_key: TMDB_API_KEY, language: getTmdbLanguage(), page: String(page), sort_by: sortBy, include_adult: 'false', include_video: 'false' });
  if (genreId) params.set('with_genres', String(genreId));
  if (year) params.set('primary_release_year', String(year));
  const url = `${BASE_URL}/discover/movie?${params.toString()}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data?.status_code) throw new Error(data.status_message || 'TMDb error');
    return data;
  } catch (e) {
    const { reportError } = await import('./errors');
    reportError(`TMDb discover failed: ${e?.message || e}`);
    return { page, results: [], total_pages: 1, total_results: 0 };
  }
}

// Fetch TMDb genres list
export async function getGenres() {
  const url = `${BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=${getTmdbLanguage()}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data?.status_code) throw new Error(data.status_message || 'TMDb error');
    return data.genres || [];
  } catch (e) {
    const { reportError } = await import('./errors');
    reportError(`TMDb genres failed: ${e?.message || e}`);
    return [];
  }
}

export async function getTrending(period = 'week') {
  const url = `${BASE_URL}/trending/movie/${period}?api_key=${TMDB_API_KEY}&language=${getTmdbLanguage()}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data?.status_code) throw new Error(data.status_message || 'TMDb error');
    return data.results || [];
  } catch (e) {
    const { reportError } = await import('./errors');
    reportError(`TMDb trending failed: ${e?.message || e}`);
    return [];
  }
}

export async function getMovieDetails(id) {
  const url = `${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=${getTmdbLanguage()}&append_to_response=credits,external_ids,videos`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data?.status_code) throw new Error(data.status_message || 'TMDb error');
    return data;
  } catch (e) {
    const { reportError } = await import('./errors');
    reportError(`TMDb details failed: ${e?.message || e}`);
    return null;
  }
}

// Get recently released movies (last ~90 days), newest first
export async function getRecentReleases(page = 1) {
  const today = new Date();
  const past = new Date();
  past.setDate(today.getDate() - 90);
  const format = (d) => d.toISOString().slice(0, 10);
  const url = `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}` +
  `&language=${getTmdbLanguage()}&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page=${page}` +
    `&primary_release_date.gte=${format(past)}&primary_release_date.lte=${format(today)}` +
    `&vote_count.gte=20`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data?.status_code) throw new Error(data.status_message || 'TMDb error');
    return data.results || [];
  } catch (e) {
    const { reportError } = await import('./errors');
    reportError(`TMDb recent failed: ${e?.message || e}`);
    return [];
  }
}

export function getPosterUrl(path) {
  if (!path) return "/fallback-poster.svg";
  // If a full URL was provided (e.g., from OMDb), return as-is
  if (typeof path === 'string' && (path.startsWith('http://') || path.startsWith('https://'))) {
    return path;
  }
  return `${IMAGE_BASE_URL}${path}`;
}

export const isTMDbEnabled = () => Boolean(TMDB_API_KEY);
