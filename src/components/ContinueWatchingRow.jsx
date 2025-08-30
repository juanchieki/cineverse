import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

export default function ContinueWatchingRow() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("continueWatching")) || [];
    setHistory(saved);
  }, []);

  if (history.length === 0) return null;

  return (
    <div className="mb-8 px-6">
      <h2 className="text-2xl font-semibold text-accent mb-3">Continue Watching</h2>
      <div className="flex gap-4 overflow-x-scroll scrollbar-hide pb-4">
        {history.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
