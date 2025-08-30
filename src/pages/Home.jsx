import HeroBanner from "../components/HeroBanner";
import MovieRow from "../components/MovieRow";
import ContinueWatchingRow from "../components/ContinueWatchingRow";
import { useI18n } from "../i18n/I18nProvider";
// ...existing code...

export default function Home() {
  const { t } = useI18n();
  return (
  <div className="bg-[#231f10] dark:bg-[#0e0c07] text-white min-h-screen">
  <HeroBanner />
  <ContinueWatchingRow />
  <MovieRow title={t('recentlyAdded')} category="recent" />
  <MovieRow title={t('trendingNow')} category="Avengers" />
      <MovieRow title="Action" category="Action" />
      <MovieRow title="Romance" category="Romance" />
      <MovieRow title="Animation" category="Animation" />
  {/* <Footer /> */}
    </div>
  );
}

