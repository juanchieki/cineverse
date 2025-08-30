/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'cineverse-lang';

const messages = {
  en: {
    appTitle: 'CineVerse',
    searchPlaceholder: 'Search for movies...',
    search: 'Search',
    clear: 'Clear',
    searchResults: 'Search Results',
    noResults: 'No results found for "{q}".',
  switchLanguage: 'Switch Language',
    movieLibrary: 'Movie Library',
    loadingMovies: 'Loading movies...',
    noMovies: 'No movies found. Try another search!',
    apply: 'Apply',
    year: 'Year',
    genreAny: 'Genre: Any',
    sortRelevance: 'Sort: Relevance',
    titleAZ: 'Title A–Z',
    titleZA: 'Title Z–A',
    releaseNewest: 'Release: Newest',
    releaseOldest: 'Release: Oldest',
  ratingHigh: 'Rating: Highest',
  ratingLow: 'Rating: Lowest',
    prev: 'Prev',
    next: 'Next',
  genericError: 'Something went wrong. Please try again.',
    synopsis: 'Synopsis',
    trailer: 'Trailer',
    genre: 'Genre',
    runtime: 'Runtime',
    director: 'Director',
    rating: 'Rating',
    rottenTomatoes: 'Rotten Tomatoes',
    metacritic: 'Metacritic',
    cast: 'Cast',
    role: 'Role',
    similarMovies: 'Similar Movies',
    recentlyAdded: 'Recently Added',
    trendingNow: 'Trending Now',
  },
  es: {
    appTitle: 'CineVerse',
    searchPlaceholder: 'Buscar películas...',
    search: 'Buscar',
    clear: 'Limpiar',
    searchResults: 'Resultados de búsqueda',
    noResults: 'No se encontraron resultados para "{q}".',
  switchLanguage: 'Cambiar idioma',
    movieLibrary: 'Biblioteca de Películas',
    loadingMovies: 'Cargando películas...',
    noMovies: 'No se encontraron películas. ¡Prueba otra búsqueda!',
    apply: 'Aplicar',
    year: 'Año',
    genreAny: 'Género: Cualquiera',
    sortRelevance: 'Orden: Relevancia',
    titleAZ: 'Título A–Z',
    titleZA: 'Título Z–A',
    releaseNewest: 'Estreno: Más recientes',
    releaseOldest: 'Estreno: Más antiguos',
  ratingHigh: 'Calificación: Mayor',
  ratingLow: 'Calificación: Menor',
    prev: 'Anterior',
    next: 'Siguiente',
  genericError: 'Algo salió mal. Inténtalo de nuevo.',
    synopsis: 'Sinopsis',
    trailer: 'Tráiler',
    genre: 'Género',
    runtime: 'Duración',
    director: 'Director',
    rating: 'Calificación',
    rottenTomatoes: 'Rotten Tomatoes',
    metacritic: 'Metacritic',
    cast: 'Reparto',
    role: 'Papel',
    similarMovies: 'Películas Similares',
    recentlyAdded: 'Recién agregado',
    trendingNow: 'Tendencias',
  },
  fr: {
    appTitle: 'CineVerse', searchPlaceholder: 'Rechercher des films...', search: 'Rechercher', clear: 'Effacer',
    searchResults: 'Résultats de recherche', noResults: 'Aucun résultat pour "{q}".', movieLibrary: 'Bibliothèque de Films',
    loadingMovies: 'Chargement des films...', noMovies: 'Aucun film trouvé. Essayez une autre recherche !', apply: 'Appliquer', year: 'Année',
    genreAny: 'Genre : Tous', sortRelevance: 'Tri : Pertinence', titleAZ: 'Titre A–Z', titleZA: 'Titre Z–A', releaseNewest: 'Sortie : Plus récents', releaseOldest: 'Sortie : Plus anciens',
    prev: 'Précédent', next: 'Suivant', synopsis: 'Synopsis', trailer: 'Bande-annonce', genre: 'Genre', runtime: 'Durée', director: 'Réalisateur', rating: 'Note', rottenTomatoes: 'Rotten Tomatoes', metacritic: 'Metacritic', cast: 'Distribution', role: 'Rôle', similarMovies: 'Films similaires', recentlyAdded: 'Récemment ajoutés', trendingNow: 'Tendance', genericError: 'Un problème est survenu. Veuillez réessayer.'
  },
  de: {
    appTitle: 'CineVerse', searchPlaceholder: 'Filme suchen...', search: 'Suchen', clear: 'Löschen',
    searchResults: 'Suchergebnisse', noResults: 'Keine Ergebnisse für "{q}".', movieLibrary: 'Filmbibliothek',
    loadingMovies: 'Filme werden geladen...', noMovies: 'Keine Filme gefunden. Versuchen Sie eine andere Suche!', apply: 'Anwenden', year: 'Jahr',
    genreAny: 'Genre: Beliebig', sortRelevance: 'Sortierung: Relevanz', titleAZ: 'Titel A–Z', titleZA: 'Titel Z–A', releaseNewest: 'Veröffentlichung: Neueste', releaseOldest: 'Veröffentlichung: Älteste',
    prev: 'Zurück', next: 'Weiter', synopsis: 'Zusammenfassung', trailer: 'Trailer', genre: 'Genre', runtime: 'Laufzeit', director: 'Regie', rating: 'Bewertung', rottenTomatoes: 'Rotten Tomatoes', metacritic: 'Metacritic', cast: 'Besetzung', role: 'Rolle', similarMovies: 'Ähnliche Filme', recentlyAdded: 'Kürzlich hinzugefügt', trendingNow: 'Aktuell im Trend', genericError: 'Etwas ist schief gelaufen. Bitte erneut versuchen.'
  },
  pt: {
    appTitle: 'CineVerse', searchPlaceholder: 'Pesquisar filmes...', search: 'Pesquisar', clear: 'Limpar',
    searchResults: 'Resultados da pesquisa', noResults: 'Nenhum resultado para "{q}".', movieLibrary: 'Biblioteca de Filmes',
    loadingMovies: 'Carregando filmes...', noMovies: 'Nenhum filme encontrado. Tente outra busca!', apply: 'Aplicar', year: 'Ano',
    genreAny: 'Gênero: Qualquer', sortRelevance: 'Ordenar: Relevância', titleAZ: 'Título A–Z', titleZA: 'Título Z–A', releaseNewest: 'Lançamento: Mais novos', releaseOldest: 'Lançamento: Mais antigos',
    prev: 'Anterior', next: 'Próximo', synopsis: 'Sinopse', trailer: 'Trailer', genre: 'Gênero', runtime: 'Duração', director: 'Diretor', rating: 'Avaliação', rottenTomatoes: 'Rotten Tomatoes', metacritic: 'Metacritic', cast: 'Elenco', role: 'Papel', similarMovies: 'Filmes semelhantes', recentlyAdded: 'Adicionados recentemente', trendingNow: 'Em alta', genericError: 'Algo deu errado. Tente novamente.'
  },
  it: {
    appTitle: 'CineVerse', searchPlaceholder: 'Cerca film...', search: 'Cerca', clear: 'Cancella',
    searchResults: 'Risultati di ricerca', noResults: 'Nessun risultato per "{q}".', movieLibrary: 'Libreria di Film',
    loadingMovies: 'Caricamento film...', noMovies: 'Nessun film trovato. Prova un’altra ricerca!', apply: 'Applica', year: 'Anno',
    genreAny: 'Genere: Qualsiasi', sortRelevance: 'Ordina: Rilevanza', titleAZ: 'Titolo A–Z', titleZA: 'Titolo Z–A', releaseNewest: 'Uscita: Più recenti', releaseOldest: 'Uscita: Più vecchi',
    prev: 'Precedente', next: 'Successivo', synopsis: 'Trama', trailer: 'Trailer', genre: 'Genere', runtime: 'Durata', director: 'Regista', rating: 'Valutazione', rottenTomatoes: 'Rotten Tomatoes', metacritic: 'Metacritic', cast: 'Cast', role: 'Ruolo', similarMovies: 'Film simili', recentlyAdded: 'Aggiunti di recente', trendingNow: 'Di tendenza', genericError: 'Qualcosa è andato storto. Riprova.'
  },
  ja: {
    appTitle: 'CineVerse', searchPlaceholder: '映画を検索...', search: '検索', clear: 'クリア',
    searchResults: '検索結果', noResults: '"{q}" の検索結果はありません。', movieLibrary: '映画ライブラリ',
    loadingMovies: '映画を読み込み中...', noMovies: '映画が見つかりません。別の検索をお試しください。', apply: '適用', year: '年',
    genreAny: 'ジャンル：指定なし', sortRelevance: '並び替え：関連度', titleAZ: 'タイトル A–Z', titleZA: 'タイトル Z–A', releaseNewest: '公開：新しい順', releaseOldest: '公開：古い順',
    prev: '前へ', next: '次へ', synopsis: 'あらすじ', trailer: '予告編', genre: 'ジャンル', runtime: '上映時間', director: '監督', rating: '評価', rottenTomatoes: 'ロッテン・トマト', metacritic: 'メタクリティック', cast: 'キャスト', role: '役', similarMovies: '類似作品', recentlyAdded: '新着', trendingNow: 'トレンド', genericError: '問題が発生しました。もう一度お試しください。'
  },
  zh: {
    appTitle: 'CineVerse', searchPlaceholder: '搜索电影...', search: '搜索', clear: '清除',
    searchResults: '搜索结果', noResults: '未找到与 “{q}” 相关的结果。', movieLibrary: '电影库',
    loadingMovies: '正在加载电影...', noMovies: '未找到电影。请尝试其他搜索！', apply: '应用', year: '年份',
    genreAny: '类型：不限', sortRelevance: '排序：相关性', titleAZ: '标题 A–Z', titleZA: '标题 Z–A', releaseNewest: '上映：最新', releaseOldest: '上映：最早',
    prev: '上一页', next: '下一页', synopsis: '剧情简介', trailer: '预告片', genre: '类型', runtime: '时长', director: '导演', rating: '评分', rottenTomatoes: '烂番茄', metacritic: 'Metacritic', cast: '演职员', role: '角色', similarMovies: '相似影片', recentlyAdded: '最新添加', trendingNow: '热门趋势', genericError: '出现错误。请重试。'
  },
  hi: {
    appTitle: 'CineVerse', searchPlaceholder: 'फिल्में खोजें...', search: 'खोजें', clear: 'साफ करें',
    searchResults: 'खोज परिणाम', noResults: '"{q}" के लिए कोई परिणाम नहीं मिला।', movieLibrary: 'फिल्म लाइब्रेरी',
    loadingMovies: 'फिल्में लोड हो रही हैं...', noMovies: 'कोई फिल्म नहीं मिली। कृपया फिर से खोजें!', apply: 'लागू करें', year: 'साल',
    genreAny: 'शैली: कोई भी', sortRelevance: 'क्रमबद्ध करें: प्रासंगिकता', titleAZ: 'शीर्षक A–Z', titleZA: 'शीर्षक Z–A', releaseNewest: 'रिलीज़: नए', releaseOldest: 'रिलीज़: पुराने',
    prev: 'पिछला', next: 'अगला', synopsis: 'कहानी', trailer: 'ट्रेलर', genre: 'शैली', runtime: 'समय', director: 'निर्देशक', rating: 'रेटिंग', rottenTomatoes: 'रॉटन टोमैटो', metacritic: 'Metacritic', cast: 'कलाकार', role: 'भूमिका', similarMovies: 'समान फिल्में', recentlyAdded: 'हाल ही में जोड़ा गया', trendingNow: 'ट्रेंडिंग', genericError: 'कुछ गलत हो गया। कृपया पुनः प्रयास करें।'
  },
  ar: {
    appTitle: 'CineVerse', searchPlaceholder: 'ابحث عن أفلام...', search: 'بحث', clear: 'مسح',
    searchResults: 'نتائج البحث', noResults: 'لا توجد نتائج لـ "{q}".', movieLibrary: 'مكتبة الأفلام',
    loadingMovies: 'جاري تحميل الأفلام...', noMovies: 'لم يتم العثور على أفلام. جرّب بحثًا آخر!', apply: 'تطبيق', year: 'السنة',
    genreAny: 'النوع: أي', sortRelevance: 'الفرز: الصلة', titleAZ: 'العنوان A–Z', titleZA: 'العنوان Z–A', releaseNewest: 'الإصدار: الأحدث', releaseOldest: 'الإصدار: الأقدم',
    prev: 'السابق', next: 'التالي', synopsis: 'الملخص', trailer: 'المقطع الدعائي', genre: 'النوع', runtime: 'المدة', director: 'المخرج', rating: 'التقييم', rottenTomatoes: 'Rotten Tomatoes', metacritic: 'Metacritic', cast: 'طاقم التمثيل', role: 'الدور', similarMovies: 'أفلام مشابهة', recentlyAdded: 'أُضيف حديثًا', trendingNow: 'الشائع الآن', genericError: 'حدث خطأ ما. حاول مرة أخرى.'
  },
};

const I18nContext = createContext({ t: (k) => k, lang: 'en', setLang: () => {} });

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    return localStorage.getItem(STORAGE_KEY) || 'en';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const t = useMemo(() => {
    const dict = messages[lang] || messages.en;
    return (key, vars = {}) => {
      let str = dict[key] ?? messages.en[key] ?? key;
      Object.keys(vars).forEach((k) => {
        str = str.replaceAll(`{${k}}`, String(vars[k]));
      });
      return str;
    };
  }, [lang]);

  return (
    <I18nContext.Provider value={{ t, lang, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
