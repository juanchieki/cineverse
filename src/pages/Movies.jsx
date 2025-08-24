import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../utils/omdb";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("Avengers");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMovies(query);
  }, [query]);

  async function fetchMovies(searchTerm) {
    setLoading(true);
    const results = await searchMovies(searchTerm);
    setMovies(results);
    setLoading(false);
  }

  function handleSearch(e) {
    e.preventDefault();
    const term = e.target.search.value;
    if (term) setQuery(term);
  }

  return (
    <div className="min-h-screen bg-primary text-text px-8 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Movie Library</h2>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-8 gap-2"
      >
        <input
          type="text"
          name="search"
          placeholder="Search movies..."
          className="px-4 py-2 rounded-lg bg-secondary text-text focus:outline-none w-1/2"
        />
        <button
          type="submit"
          className="bg-accent text-black font-semibold px-4 py-2 rounded-lg hover:opacity-90"
        >
          Search
        </button>
      </form>

      {loading ? (
        <p className="text-center">Loading movies...</p>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={{
                id: movie.imdbID,
                title: movie.Title,
                year: movie.Year,
                poster:
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Image",
              }}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">No movies found. Try another search!</p>
      )}
    </div>
  );
}
