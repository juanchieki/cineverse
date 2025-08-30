import { getRecentReleases, isTMDbEnabled } from "./tmdb";
import { getTrendingWithFallback } from "./trendingWithFallback";

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

export async function getRecentWithFallback() {
  if (isTMDbEnabled()) {
    try {
      const tmdb = await getRecentReleases();
      const norm = normalizeFromTMDb(tmdb);
      if (norm.length) return norm;
    } catch {
      // ignore and fallback
    }
  }
  // OMDb has no good "recent" API; reuse trending fallback as a proxy
  return await getTrendingWithFallback();
}
