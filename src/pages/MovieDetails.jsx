import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails as getTMDbDetails, getPosterUrl, isTMDbEnabled } from "../Utils/tmdb";
import { getMovieDetails as getOMDbDetails } from "../Utils/omdb";
import MovieRow from "../components/MovieRow";
import Modal from "../components/Modal";
import { useI18n } from "../i18n/I18nProvider";

export default function MovieDetails() {
  const { t } = useI18n();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedActor, setSelectedActor] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let details = null;
      let omdbRatings = null;
      if (isTMDbEnabled()) {
        try {
          details = await getTMDbDetails(id);
        } catch {
          details = null;
        }
      }
      if (!details) {
        // No TMDb? Try OMDb directly by id (assumed imdbID)
        const omdb = await getOMDbDetails(id);
        details = omdb;
      } else {
        // If TMDb details exist, optionally enrich with OMDb ratings if imdb_id is available
        const imdbId = details.imdb_id || details.external_ids?.imdb_id;
        if (imdbId) {
          const omdb = await getOMDbDetails(imdbId);
          if (omdb && omdb.omdbRatings) omdbRatings = omdb.omdbRatings;
        }
      }
      if (details && omdbRatings) {
        details.omdbRatings = omdbRatings;
      }
      setMovie(details);
    }
    fetchData();
  }, [id]);

  if (!movie) {
    return (
      <div className="bg-dark dark:bg-[#0e0c07] text-white min-h-screen">
        <div className="max-w-6xl mx-auto py-12 px-6">
          <div className="animate-pulse grid md:grid-cols-3 gap-8">
            <div className="h-[450px] bg-white/10 rounded-2xl border-4 border-secondary" />
            <div className="md:col-span-2 space-y-4">
              <div className="h-8 bg-white/10 rounded w-2/3" />
              <div className="h-4 bg-white/10 rounded w-full" />
              <div className="h-4 bg-white/10 rounded w-5/6" />
              <div className="h-64 bg-white/5 rounded border-4 border-secondary" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark dark:bg-[#0e0c07] text-white min-h-screen">
      {/* Poster + Details Layout */}
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto py-12 px-6 gap-8">
        {/* Poster */}
        <div className="flex-shrink-0 w-full md:w-1/3">
          <img
            src={getPosterUrl(movie.poster_path)}
            alt={movie.title || movie.original_title || "No Title"}
            className="rounded-2xl shadow-lg border-4 border-secondary w-full"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/fallback-poster.svg"; }}
          />
        </div>

        {/* Movie Info */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-accent mb-4">
            {movie.title || movie.original_title || "No Title"} <span className="text-light">({movie.release_date ? movie.release_date.slice(0,4) : "N/A"})</span>
          </h1>

          {/* Synopsis Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-accent mb-2">{t('synopsis')}</h2>
            <p className="text-base text-white/80">{movie.overview || "No synopsis available."}</p>
          </div>

          {/* Trailer Section */}
          {movie.videos && movie.videos.results && movie.videos.results.length > 0 && (
            (() => {
              const yt = movie.videos.results.find(v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'));
              if (!yt) return null;
              return (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-accent mb-2">Trailer</h2>
                  <div className="aspect-video w-full rounded-xl overflow-hidden border-4 border-secondary">
                    <iframe
                      src={`https://www.youtube.com/embed/${yt.key}`}
                      title="Trailer"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              );
            })()
          )}

          <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-300">
            <p><span className="text-accent font-semibold">{t('genre')}:</span> {movie.genres && movie.genres.length > 0 ? movie.genres.map(g => g.name).join(", ") : "N/A"}</p>
            <p><span className="text-accent font-semibold">{t('runtime')}:</span> {movie.runtime ? `${movie.runtime} min` : "N/A"}</p>
            <p><span className="text-accent font-semibold">{t('director')}:</span> {movie.credits && movie.credits.crew ? (movie.credits.crew.find(c => c.job === "Director")?.name || "N/A") : "N/A"}</p>
            <p><span className="text-accent font-semibold">{t('rating')}:</span> ⭐ {movie.omdbRatings?.imdb || (movie.vote_average ? movie.vote_average.toFixed ? movie.vote_average.toFixed(1) : movie.vote_average : "N/A")}</p>
            {movie.omdbRatings && (
              <p><span className="text-accent font-semibold">{t('rottenTomatoes')}:</span> {movie.omdbRatings.rottenTomatoes || "N/A"}</p>
            )}
            {movie.omdbRatings && (
              <p><span className="text-accent font-semibold">{t('metacritic')}:</span> {movie.omdbRatings.metacritic || "N/A"}</p>
            )}
          </div>

          {/* Cast Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-accent mb-3">{t('cast')}</h2>
            <div className="flex gap-6 flex-wrap">
              {movie.credits && movie.credits.cast && movie.credits.cast.length > 0
                ? movie.credits.cast.slice(0,8).map((actor) => (
                    <button
                      key={actor.id}
                      className="flex flex-col items-center w-24 focus:outline-none"
                      onClick={() => setSelectedActor(actor)}
                    >
                      <img
                        src={actor.profile_path ? getPosterUrl(actor.profile_path) : `https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&background=333&color=fff&size=128`}
                        alt={actor.name}
                        className="rounded-full w-16 h-16 mb-2 shadow"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&background=333&color=fff&size=128`; }}
                      />
                      <span className="text-xs text-center text-white/90">{actor.name}</span>
                      <span className="text-xs text-center text-white/70">{actor.character}</span>
                    </button>
                  ))
                : <span className="text-white/70">No cast information available.</span>}
      {/* Cast Modal */}
      <Modal isOpen={!!selectedActor} onClose={() => setSelectedActor(null)}>
        {selectedActor && (
          <div className="flex flex-col items-center">
            <img
              src={selectedActor.profile_path ? getPosterUrl(selectedActor.profile_path) : `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedActor.name)}&background=ac1e2a&color=fff&size=128`}
              alt={selectedActor.name}
              className="rounded-full w-20 h-20 mb-3 shadow border-4 border-accent"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedActor.name)}&background=ac1e2a&color=fff&size=128`; }}
            />
            <h3 className="text-lg font-bold text-accent mb-2">{selectedActor.name}</h3>
            <p className="text-sm text-white/80 text-center mb-2">{selectedActor.character ? `${t('role')}: ${selectedActor.character}` : "No role info."}</p>
          </div>
        )}
      </Modal>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Movies Row */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
  <MovieRow title="Similar Movies" category={movie.genres && movie.genres.length > 0 ? movie.genres[0].name : ""} />
      </div>
    </div>
  );
}
