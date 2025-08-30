import React from "react";
import { useNavigate } from "react-router-dom";
import { getPosterUrl } from "../Utils/tmdb";

const FALLBACK_IMAGE = "/fallback-poster.svg";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const handleAddToList = () => {
    let list = JSON.parse(localStorage.getItem("myList")) || [];
    if (!list.find((m) => m.id === movie.id)) {
      list.push(movie);
      localStorage.setItem("myList", JSON.stringify(list));
      alert(`${movie.title} added to My List`);
    }
  };

  const handleContinueWatching = () => {
    let history = JSON.parse(localStorage.getItem("continueWatching")) || [];
    // move to front if exists
    history = history.filter((m) => m.id !== movie.id);
    history.unshift(movie);
    if (history.length > 15) history.pop(); // keep last 15
    localStorage.setItem("continueWatching", JSON.stringify(history));
    alert(`${movie.title} added to Continue Watching`);
  };

  return (
    <div
      className="relative w-[180px] flex-shrink-0 cursor-pointer group"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <img
        src={movie.poster_path ? getPosterUrl(movie.poster_path) : FALLBACK_IMAGE}
        alt={movie.title || 'Movie poster'}
        className="rounded-lg w-full h-[270px] object-cover group-hover:scale-105 transition"
        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMAGE; }}
      />
      <div className="mt-2">
        <h3 className="text-white text-sm font-semibold truncate">
          {movie.title}
        </h3>
      </div>
      <button
        title="Add to Continue Watching"
        onClick={(e) => { e.stopPropagation(); handleContinueWatching(); }}
        className="absolute top-2 left-2 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
      >
        ▶
      </button>
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
