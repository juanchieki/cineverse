import React from "react";
import { Link } from "react-router-dom";

export default function Intro() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Welcome to <span className="text-accent">CineVerse</span>
            </h1>
            <p className="mt-4 text-white/80 text-sm sm:text-base">
              Discover trending movies, explore details, and build your watchlist. Log in to sync your list across devices or continue as a guest.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/signup" className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 font-medium text-black hover:opacity-90">
                Sign Up
              </Link>
              <Link to="/login" className="inline-flex items-center justify-center rounded-md border border-white/20 px-4 py-2 font-medium hover:bg-white/10">
                Log In
              </Link>
              <Link to="/" className="inline-flex items-center justify-center rounded-md px-4 py-2 font-medium hover:bg-white/10">
                Explore as Guest
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-accent/30 to-accent/5 ring-1 ring-white/10 flex items-center justify-center">
              <div className="text-center px-6">
                <div className="text-6xl">🎬</div>
                <p className="mt-3 text-white/70 text-sm">Streamlined movie discovery with localized content and dark mode.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
