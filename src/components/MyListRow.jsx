import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

export default function MyListRow() {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("myList")) || [];
    setMyList(saved);
  }, []);

  if (myList.length === 0) return null;

  return (
    <div className="mb-8 px-6">
      <h2 className="text-2xl font-semibold text-accent mb-3">My List</h2>
      <div className="flex gap-4 overflow-x-scroll scrollbar-hide pb-4">
        {myList.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}
