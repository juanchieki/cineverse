import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../Utils/omdb";

export default function Header({ onSearch }) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      navigate("/");
    }
  };

  const handleSearch = async () => {
    if (query.trim()) {
      const results = await fetchMovies(query);
      setSearchResults(results);
      console.log("Search results:", results);
    }
  };

  return (
    <header className="bg-[#231f10] text-white py-4 px-6">
      <div className="flex items-center justify-between">
        <h1 
          className="text-2xl font-bold text-red-500 cursor-pointer"
          onClick={() => navigate("/")}
        >
          CineVerse
        </h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-[#2c2c2c] text-white px-4 py-2 rounded-md focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-accent text-primary px-4 py-2 rounded-md hover:bg-white hover:text-black transition"
          >
            Search
          </button>
        </div>
      </div>
      {searchResults.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Search Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {searchResults.map((movie) => (
              <div key={movie.imdbID} className="bg-[#2c2c2c] text-white p-4 rounded-md">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Poster"}
                  alt={movie.Title}
                  className="w-full h-[300px] object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-bold truncate">{movie.Title}</h3>
                <p className="text-sm text-white/70">{movie.Year}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
