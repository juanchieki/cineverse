import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function MyList() {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("myList")) || [];
    setMyList(saved);
  }, []);

  return (
    <div className="px-6 py-4">
      <h1 className="text-3xl font-bold mb-4">My List</h1>
      {myList.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {myList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>No movies in your list.</p>
      )}
    </div>
  );
}
