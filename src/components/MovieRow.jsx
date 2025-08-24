import { useEffect, useState } from "react";
import { fetchMovies } from "../Utils/omdb";

export default function MovieRow({ title, category }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    console.log(`Fetching movies for category: ${category}`);
    const loadMovies = async () => {
      const results = await fetchMovies(category);
      console.log(`Fetched movies for ${category}:`, results);
      setMovies(results);
    };
    loadMovies();
  }, [category]);

  return (
    <div className="my-6">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="flex overflow-x-auto space-x-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className="min-w-[150px]">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
                alt={movie.Title}
                className="w-full h-auto rounded-md"
              />
              <p className="text-sm mt-1">{movie.Title}</p>
            </div>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
}
