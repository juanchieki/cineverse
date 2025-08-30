import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-10 mt-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div>
          <h4 className="font-semibold text-accent mb-3">CineVerse</h4>
          <p className="text-white/80">Modern movie browsing. Built with React + Tailwind.</p>
          <p className="mt-3 text-xs text-white/60">
            Data from <a href="https://www.themoviedb.org/" className="underline hover:text-accent" target="_blank" rel="noreferrer">TMDb</a> 
            and <a href="https://www.omdbapi.com/" className="underline hover:text-accent" target="_blank" rel="noreferrer">OMDb</a>.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Browse</h4>
          <ul className="space-y-2 text-white/70">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <li><Link to="/" className="hover:text-accent">Trending</Link></li>
            <li><Link to="/movies" className="hover:text-accent">Movies</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-white/70">
            <li><a href="#" className="hover:text-accent">Help Center</a></li>
            <li><a href="#" className="hover:text-accent">FAQ</a></li>
            <li><a href="#" className="hover:text-accent">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Social</h4>
          <ul className="space-y-2 text-white/70">
            <li><a href="#" className="hover:text-accent">Twitter</a></li>
            <li><a href="#" className="hover:text-accent">Instagram</a></li>
            <li><a href="#" className="hover:text-accent">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-6">
        <div className="text-center text-white/60 text-xs">
          © {new Date().getFullYear()} CineVerse. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
