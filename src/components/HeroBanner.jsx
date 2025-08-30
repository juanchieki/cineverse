import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosterUrl } from "../Utils/tmdb";
import { getTrendingWithFallback } from "../Utils/trendingWithFallback";

const FALLBACK_IMAGE = "/fallback-hero.svg";

export default function HeroBanner() {
  const [featured, setFeatured] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBannerMovie = async () => {
      try {
        const trending = await getTrendingWithFallback();
        if (trending && trending.length > 0) {
          const randomIndex = Math.floor(Math.random() * trending.length);
          setFeatured(trending[randomIndex]);
        } else {
          setError('No trending titles available.');
        }
  } catch {
        setError('Failed to load trending titles.');
      }
    };
    loadBannerMovie();
  }, []);

  if (error) {
    return (
      <div className="relative h-[40vh] w-full flex items-center justify-center bg-[#2c2c2c] text-white">
        <p className="text-white/80">{error}</p>
      </div>
    );
  }

  if (!featured) return (
    <div className="relative h-[40vh] w-full flex items-center justify-center bg-[#2c2c2c] text-white">
      <p className="text-white/60">Loading featured title…</p>
    </div>
  );

  return (
    <div
      className="relative w-full bg-cover bg-center flex items-center justify-start px-4 sm:px-8 h-[50vh] sm:h-[70vh]"
      style={{
  backgroundImage: `url(${featured.backdrop_path ? getPosterUrl(featured.backdrop_path) : FALLBACK_IMAGE})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
      <div className="relative z-10 max-w-xl">
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">{featured.title}</h1>
        <p className="text-sm sm:text-lg text-white/80 mb-2">
          {featured.release_date ? new Date(featured.release_date).getFullYear() : ''}
        </p>
        {featured.overview && (
          <p className="text-sm sm:text-base text-white/70 mb-4 sm:mb-6 line-clamp-3">{featured.overview}</p>
        )}
        <div className="flex gap-3 sm:gap-4 flex-wrap">
          <button className="bg-accent text-primary font-semibold px-5 sm:px-6 py-2 rounded hover:bg-white transition text-sm sm:text-base" onClick={() => featured && navigate(`/movie/${featured.id}`)}>
            Play
          </button>
          <button className="bg-secondary text-white px-5 sm:px-6 py-2 rounded hover:bg-accent hover:text-primary transition text-sm sm:text-base" onClick={() => featured && navigate(`/movie/${featured.id}`)}>
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}
