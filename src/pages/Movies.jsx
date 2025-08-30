import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { searchPagedWithFallback } from "../Utils/searchPagedWithFallback";
import { getGenresWithFallback, searchDiscoverWithFallback } from "../Utils/searchDiscoverWithFallback";
import { useI18n } from "../i18n/I18nProvider";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("Avengers");
  const [year, setYear] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState(() => (typeof window !== 'undefined' && localStorage.getItem('cineverse-sort')) || "relevance"); // relevance | title-asc | title-desc | year-desc | year-asc | rating-desc | rating-asc
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState("");
  const { t } = useI18n();

  useEffect(() => {
    fetchMovies(query, page, year, genreId);
  }, [query, page, year, genreId]);

  useEffect(() => {
    function onSortChange(e) {
      setSort(e.detail?.value || (localStorage.getItem('cineverse-sort') || 'relevance'));
    }
    window.addEventListener('cineverse-sort-changed', onSortChange);
    return () => window.removeEventListener('cineverse-sort-changed', onSortChange);
  }, []);

  useEffect(() => {
    (async () => {
      const list = await getGenresWithFallback();
      setGenres(list);
    })();
  }, []);

  async function fetchMovies(searchTerm, pageNum = 1, y, gId) {
    setLoading(true);
    const useDiscover = gId && String(gId).length > 0;
    const { results, total_pages } = useDiscover
      ? await searchDiscoverWithFallback({ page: pageNum, year: y || undefined, genreId: gId })
      : await searchPagedWithFallback(searchTerm, { page: pageNum, year: y || undefined });
    setMovies(results);
    setTotalPages(total_pages || 1);
    setLoading(false);
  }

  function handleSearch(e) {
    e.preventDefault();
    const term = e.target.search.value;
    const yr = e.target.year.value.trim();
  if (term) {
      setQuery(term);
      setPage(1);
    }
    setYear(yr);
  }

  return (
  <div className="min-h-screen bg-primary dark:bg-[#0e0c07] text-text px-4 sm:px-8 py-8 sm:py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">{t('movieLibrary')}</h2>

      {/* Search Bar */}
  <form onSubmit={handleSearch} className="flex flex-wrap justify-center mb-6 sm:mb-8 gap-2">
        <input
          type="text"
          name="search"
          defaultValue={query}
          placeholder={t('searchPlaceholder')}
          className="px-3 py-2 rounded-lg bg-secondary text-text focus:outline-none w-48 sm:w-64"
        />
        <select
          value={genreId}
          onChange={(e) => { setGenreId(e.target.value); setPage(1); }}
          className="px-3 py-2 rounded-lg bg-secondary text-text focus:outline-none w-40 sm:w-48"
        >
          <option value="">{t('genreAny')}</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
        <input
          type="number"
          name="year"
          defaultValue={year}
          placeholder={t('year')}
          className="px-3 py-2 rounded-lg bg-secondary text-text focus:outline-none w-24 sm:w-28"
          min="1900"
          max="2099"
        />
  {/* Sort moved to Header; still allow local override if needed in the future */}
        <button type="submit" className="bg-accent text-black font-semibold px-4 py-2 rounded-lg hover:opacity-90">
          {t('apply')}
        </button>
      </form>

      {loading ? (
        <p className="text-center">{t('loadingMovies')}</p>
      ) : movies.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies
              .slice()
              .sort((a, b) => {
                if (sort === 'title-asc') return (a.title||'').localeCompare(b.title||'');
                if (sort === 'title-desc') return (b.title||'').localeCompare(a.title||'');
                const ay = a.release_date ? String(a.release_date).slice(0,4) : '';
                const by = b.release_date ? String(b.release_date).slice(0,4) : '';
                if (sort === 'year-desc') return (by||'0').localeCompare(ay||'0');
                if (sort === 'year-asc') return (ay||'0').localeCompare(by||'0');
                if (sort === 'rating-desc') return (Number(b.vote_average||0) - Number(a.vote_average||0));
                if (sort === 'rating-asc') return (Number(a.vote_average||0) - Number(b.vote_average||0));
                return 0;
              })
              .map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
      <div className="flex items-center justify-center gap-2 mt-8">
            <button
              className="px-3 py-1 rounded bg-secondary disabled:opacity-40"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
        {t('prev')}
            </button>
            <span className="text-white/80">Page {page} of {totalPages}</span>
            <button
              className="px-3 py-1 rounded bg-secondary disabled:opacity-40"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
        {t('next')}
            </button>
          </div>
        </div>
      ) : (
    <p className="text-center">{t('noMovies')}</p>
      )}

    </div>
  );
}
