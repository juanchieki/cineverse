import HeroBanner from "../components/HeroBanner";
import MovieRow from "../components/MovieRow";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-[#231f10] text-white min-h-screen">
      <HeroBanner />
      <MovieRow title="Trending Now" category="Avengers" />
      <MovieRow title="Action" category="Action" />
      <MovieRow title="Romance" category="Romance" />
      <MovieRow title="Animation" category="Animation" />
      <Footer />
    </div>
  );
}

