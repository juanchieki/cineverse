import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getPosterUrl } from "../Utils/tmdb";
import { searchMoviesWithFallback } from "../Utils/searchWithFallback";
import { getRecentWithFallback } from "../Utils/recentWithFallback";

export default function MovieRow({ title, category }) {
  const [movies, setMovies] = useState([]);
  const rowRef = useRef(null);
  const FALLBACK_IMAGE = "/fallback-poster.svg";
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      const results = category === 'recent'
        ? await getRecentWithFallback()
        : await searchMoviesWithFallback(category);
      setMovies(results);
    };
    loadMovies();
  }, [category]);

  const scrollRow = (direction) => {
    if (rowRef.current) {
      const scrollAmount = 400;
      rowRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="my-6 relative">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="flex items-center">
        {movies.length > 4 && (
          <button
            className="absolute left-0 z-10 h-full px-2 bg-gradient-to-r from-black/80 to-transparent text-white text-2xl"
            onClick={() => scrollRow("left")}
            aria-label="Scroll left"
          >
            &#8592;
          </button>
        )}
        <div
          ref={rowRef}
          className="flex overflow-x-auto space-x-4 scrollbar-hide pl-8 pr-8"
          style={{ scrollBehavior: "smooth" }}
        >
          {movies.length > 0 ? (
            movies
              .filter((movie) => movie.poster_path)
              .map((movie) => (
                <button key={movie.id} className="min-w-[150px] flex flex-col items-center focus:outline-none" onClick={() => navigate(`/movie/${movie.id}`)}>
                  <img
                    src={getPosterUrl(movie.poster_path)}
                    alt={movie.title}
                    className="w-full h-48 object-cover rounded-md shadow-lg transition-transform duration-200 hover:scale-105"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMAGE; }}
                  />
                  <p className="text-sm mt-2 text-center font-medium text-white/90 truncate w-full">{movie.title}</p>
                </button>
              ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
        {movies.length > 4 && (
          <button
            className="absolute right-0 z-10 h-full px-2 bg-gradient-to-l from-black/80 to-transparent text-white text-2xl"
            onClick={() => scrollRow("right")}
            aria-label="Scroll right"
          >
            &#8594;
          </button>
        )}
      </div>
    </div>
  );
}
