import React, { useEffect, useState } from "react";
import { getTrendingMovies } from "../utils/omdb";

const FALLBACK_IMAGE = "https://via.placeholder.com/800x450?text=CineVerse+Movie";

export default function HeroBanner() {
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    async function fetchFeatured() {
      const trending = await getTrendingMovies();
      if (trending && trending.length > 0) {
        setFeatured(trending[0]); // pick first as hero
      }
    }
    fetchFeatured();
  }, []);

  if (!featured) return null;

  return (
    <div
      className="relative h-[70vh] w-full bg-cover bg-center flex items-center justify-start px-8"
      style={{
        backgroundImage: `url(${featured.Poster !== "N/A" ? featured.Poster : FALLBACK_IMAGE})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
      <div className="relative z-10 max-w-xl">
        <h1 className="text-4xl font-bold text-white mb-4">{featured.Title}</h1>
        <p className="text-lg text-white/80 mb-6">
          {featured.Year} • {featured.Type}
        </p>
        <div className="flex gap-4">
          <button className="bg-accent text-primary font-semibold px-6 py-2 rounded hover:bg-white transition">
            Play
          </button>
          <button className="bg-secondary text-white px-6 py-2 rounded hover:bg-accent hover:text-primary transition">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}
