import React from "react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div>
          <h4 className="font-semibold text-accent mb-3">CineVerse</h4>
          <p className="text-white/70">
            Your gateway to movies. Built with ❤️ using React + Tailwind.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Browse</h4>
          <ul className="space-y-2 text-white/70">
            <li><a href="#" className="hover:text-accent">Home</a></li>
            <li><a href="#" className="hover:text-accent">Movies</a></li>
            <li><a href="#" className="hover:text-accent">Genres</a></li>
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
      <div className="text-center text-white/60 text-xs mt-6">
        © {new Date().getFullYear()} CineVerse. All rights reserved.
      </div>
    </footer>
  );
}
