import React from "react";

const FALLBACK_IMAGE = "https://via.placeholder.com/200x300?text=No+Poster";

export default function MovieCard({ movie }) {
  const handleAddToList = () => {
    let list = JSON.parse(localStorage.getItem("myList")) || [];
    if (!list.find((m) => m.imdbID === movie.imdbID)) {
      list.push(movie);
      localStorage.setItem("myList", JSON.stringify(list));
      alert(`${movie.Title} added to My List`);
    }
  };

  const handleContinueWatching = () => {
    let history = JSON.parse(localStorage.getItem("continueWatching")) || [];
    // move to front if exists
    history = history.filter((m) => m.imdbID !== movie.imdbID);
    history.unshift(movie);
    if (history.length > 15) history.pop(); // keep last 15
    localStorage.setItem("continueWatching", JSON.stringify(history));
    alert(`${movie.Title} added to Continue Watching`);
  };

  return (
    <div
      className="relative w-[180px] flex-shrink-0 cursor-pointer group"
      onClick={handleContinueWatching}
    >
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : FALLBACK_IMAGE}
        alt={movie.Title}
        className="rounded-lg w-full h-[270px] object-cover group-hover:scale-105 transition"
      />
      <div className="mt-2">
        <h3 className="text-white text-sm font-semibold truncate">
          {movie.Title}
        </h3>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleAddToList();
        }}
        className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
      >
        +
      </button>
    </div>
  );
}
