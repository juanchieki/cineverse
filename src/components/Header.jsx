import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosterUrl } from "../Utils/tmdb";
import { searchMoviesWithFallback } from "../Utils/searchWithFallback";
import ThemeToggle from "./ThemeToggle";
import { useI18n } from "../i18n/I18nProvider";
import { languages } from "../i18n/languages";

export default function Header() {
  const { t, lang, setLang } = useI18n();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [sortSel, setSortSel] = useState(() => (typeof window !== 'undefined' && localStorage.getItem('cineverse-sort')) || 'relevance');
  const navigate = useNavigate();


  const handleSearch = async () => {
    if (query.trim()) {
  const results = await searchMoviesWithFallback(query);
      setSearchResults(results);
  setHasSearched(true);
      console.log("Search results:", results);
    }
  };

  return (
    <header className="bg-[#231f10] dark:bg-[#0e0c07] text-white py-4 px-4 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 
          className="text-2xl font-bold text-accent cursor-pointer"
          onClick={() => navigate("/home")}
        >
          {t('appTitle')}
        </h1>
    <div className="flex flex-wrap items-center gap-2 justify-end w-full sm:w-auto mt-2 sm:mt-0">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
      className="bg-[#2c2c2c] dark:bg-[#1f1f1f] text-white px-3 py-2 rounded-md focus:outline-none min-w-0 w-40 sm:w-56 md:w-64"
          />
          <button
            onClick={handleSearch}
      className="bg-accent text-primary px-4 py-2 rounded-md hover:bg-white hover:text-black transition whitespace-nowrap"
          >
            {t('search')}
          </button>
          <select
            aria-label={t('switchLanguage')}
            value={lang}
            onChange={(e) => setLang(e.target.value)}
      className="px-3 py-2 rounded-md bg-secondary text-text w-28 sm:w-32 md:w-auto"
          >
            {languages.map(l => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
          <select
            aria-label="Sort by rating"
            value={sortSel}
            onChange={(e) => {
              const val = e.target.value;
              setSortSel(val);
              if (typeof window !== 'undefined') {
                localStorage.setItem('cineverse-sort', val);
                window.dispatchEvent(new CustomEvent('cineverse-sort-changed', { detail: { value: val } }));
              }
            }}
      className="px-3 py-2 rounded-md bg-secondary text-text w-36 sm:w-44 md:w-auto"
          >
            <option value="relevance">{t('sortRelevance')}</option>
            <option value="rating-desc">{t('ratingHigh')}</option>
            <option value="rating-asc">{t('ratingLow')}</option>
          </select>
          <ThemeToggle />
          {/* Auth actions */}
          {(() => {
            let auth;
            try { auth = JSON.parse(localStorage.getItem('cineverse-auth') || 'null'); } catch {}
            if (auth?.email) {
              return (
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline text-white/70 text-sm">{auth.email}</span>
                  <button
                    onClick={() => { localStorage.removeItem('cineverse-auth'); window.location.reload(); }}
                    className="text-xs px-2 py-1 rounded-md border border-white/20 hover:bg-white/10"
                  >
                    Logout
                  </button>
                </div>
              );
            }
            return (
              <div className="flex items-center gap-2 text-sm">
                <a href="/login" className="px-2 py-1 rounded-md border border-white/20 hover:bg-white/10">Log in</a>
                <a href="/signup" className="px-2 py-1 rounded-md bg-accent text-black font-semibold hover:opacity-90">Sign up</a>
              </div>
            );
          })()}
        </div>
      </div>
      {(hasSearched || searchResults.length > 0) && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">{t('searchResults')}</h2>
            <button
              className="text-sm text-white/70 underline"
              onClick={() => { setSearchResults([]); setHasSearched(false); setQuery(""); }}
            >
              {t('clear')}
            </button>
          </div>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {searchResults.map((movie) => (
                <div key={movie.id} className="bg-[#2c2c2c] dark:bg-[#1b1b1b] text-white p-4 rounded-md hover:bg-[#3a3a3a] cursor-pointer" onClick={() => navigate(`/movie/${movie.id}`)}>
                  <img
                    src={movie.poster_path ? getPosterUrl(movie.poster_path) : "/fallback-poster.svg"}
                    alt={movie.title}
                    loading="lazy"
                    className="w-full h-[300px] object-cover rounded-md mb-2"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/fallback-poster.svg"; }}
                  />
                  <h3 className="text-base sm:text-lg font-bold truncate">{movie.title}</h3>
                  <p className="text-sm text-white/70">{movie.release_date ? movie.release_date.slice(0, 4) : ""}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/70">{t('noResults', { q: query })}</p>
          )}
        </div>
      )}
    </header>
  );
}
