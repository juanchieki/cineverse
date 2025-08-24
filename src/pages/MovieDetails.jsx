import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../utils/omdb";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const details = await getMovieDetails(id);
      setMovie(details);
    }
    fetchData();
  }, [id]);

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark text-light">
        <p className="text-xl">Loading movie details...</p>
      </div>
    );
  }

  return (
    <div className="bg-dark text-white min-h-screen">
      {/* Poster + Details Layout */}
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto py-12 px-6 gap-8">
        
        {/* Poster */}
        <div className="flex-shrink-0 w-full md:w-1/3">
          <img
            src={movie.poster}
            alt={movie.title}
            className="rounded-2xl shadow-lg border-4 border-secondary w-full"
          />
        </div>

        {/* Movie Info */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-accent mb-4">
            {movie.title} <span className="text-light">({movie.year})</span>
          </h1>

          <p className="text-lg mb-4 text-light">{movie.plot}</p>

          <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-300">
            <p><span className="text-accent font-semibold">Genre:</span> {movie.genre}</p>
            <p><span className="text-accent font-semibold">Runtime:</span> {movie.runtime}</p>
            <p><span className="text-accent font-semibold">Director:</span> {movie.director}</p>
            <p><span className="text-accent font-semibold">Actors:</span> {movie.actors}</p>
            <p><span className="text-accent font-semibold">IMDb Rating:</span> ⭐ {movie.rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
