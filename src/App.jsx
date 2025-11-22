import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { X, Check, Film, RotateCcw, List, Download, FileSpreadsheet, Heart, Clock, Eye, ChevronLeft, Key, Loader2, Star, Filter, Layers, Trash2, AlertTriangle, Plus, Play, Settings2, FilePlus, ExternalLink, HelpCircle } from 'lucide-react';

// --- CUSTOM LOGO COMPONENT ---
const FilmLoggerIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={className}>
    <title>FilmLogger Icon</title>
    <path fill="currentColor" fillRule="evenodd" d="
      M50,5 A45,45 0 1,1 5,50 A45,45 0 0,1 50,5 Z
      M50,20 A30,30 0 1,1 20,50 A30,30 0 0,1 50,20 Z
      M50,35 A15,15 0 1,1 35,50 A15,15 0 0,1 50,35 Z
      M50,24 C52.5,24 54.5,26 54.5,28.5 L54.5,41.5 C54.5,44 52.5,46 50,46 C47.5,46 45.5,44 45.5,41.5 L45.5,28.5 C45.5,26 47.5,24 50,24 Z
      M76,50 C76,52.5 74,54.5 71.5,54.5 L58.5,54.5 C56,54.5 54,52.5 54,50 C54,47.5 56,45.5 58.5,45.5 L71.5,45.5 C74,45.5 76,47.5 76,50 Z
      M50,76 C47.5,76 45.5,74 45.5,71.5 L45.5,58.5 C45.5,56 47.5,54 50,54 C52.5,54 54.5,56 54.5,58.5 L54.5,71.5 C54.5,74 52.5,76 50,76 Z
      M24,50 C24,47.5 26,45.5 28.5,45.5 L41.5,45.5 C44,45.5 46,47.5 46,50 C46,52.5 44,54.5 41.5,54.5 L28.5,54.5 C26,54.5 24,52.5 24,50 Z
    "/>
  </svg>
);

// --- STATIC DATA ---
const STATIC_MOVIES = [
  { id: 1, title: "The Godfather", year: "1972", director: "Francis Ford Coppola", rating: 9.2, genre_ids: [80, 18], poster: "https://image.tmdb.org/t/p/w780/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.", isStatic: true },
  { id: 2, title: "Pulp Fiction", year: "1994", director: "Quentin Tarantino", rating: 8.9, genre_ids: [53, 80], poster: "https://image.tmdb.org/t/p/w780/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales.", isStatic: true },
  { id: 3, title: "The Dark Knight", year: "2008", director: "Christopher Nolan", rating: 9.0, genre_ids: [18, 28, 80, 53], poster: "https://image.tmdb.org/t/p/w780/qJ2tW6WMUDux911r6m7haRef0WH.jpg", overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent.", isStatic: true },
  { id: 4, title: "Spirited Away", year: "2001", director: "Hayao Miyazaki", rating: 8.5, genre_ids: [16, 10751, 14], poster: "https://image.tmdb.org/t/p/w780/39wmItIWsg5sZMyRUKG52Gm07fl.jpg", overview: "A young girl, Chihiro, becomes trapped in a strange new world of spirits.", isStatic: true },
  { id: 5, title: "Parasite", year: "2019", director: "Bong Joon-ho", rating: 8.5, genre_ids: [35, 53, 18], poster: "https://image.tmdb.org/t/p/w780/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", overview: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks.", isStatic: true },
  { id: 6, title: "Interstellar", year: "2014", director: "Christopher Nolan", rating: 8.6, genre_ids: [12, 18, 878], poster: "https://image.tmdb.org/t/p/w780/gEU2QniL6C8zEfVbsoEW3M6QznZ.jpg", overview: "The adventures of a group of explorers who make use of a newly discovered wormhole.", isStatic: true },
  { id: 7, title: "Whiplash", year: "2014", director: "Damien Chazelle", rating: 8.5, genre_ids: [18, 10402], poster: "https://image.tmdb.org/t/p/w780/7fn624j5g3iRYBxXpmo0D1wIbpv.jpg", overview: "Under the direction of a ruthless instructor, a talented young drummer begins to pursue perfection at any cost.", isStatic: true },
  { id: 8, title: "The Empire Strikes Back", year: "1980", director: "Irvin Kershner", rating: 8.4, genre_ids: [12, 28, 878], poster: "https://image.tmdb.org/t/p/w780/2l05cFWJacyIsTpsq0ImszewZsa.jpg", overview: "The epic saga continues as Luke Skywalker, in hopes of defeating the evil Galactic Empire, learns the ways of the Jedi.", isStatic: true },
  { id: 9, title: "Fight Club", year: "1999", director: "David Fincher", rating: 8.4, genre_ids: [18], poster: "https://image.tmdb.org/t/p/w780/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", overview: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.", isStatic: true },
  { id: 10, title: "Goodfellas", year: "1990", director: "Martin Scorsese", rating: 8.7, genre_ids: [18, 80], poster: "https://image.tmdb.org/t/p/w780/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg", overview: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.", isStatic: true },
  { id: 11, title: "Inception", year: "2010", director: "Christopher Nolan", rating: 8.8, genre_ids: [28, 878, 12], poster: "https://image.tmdb.org/t/p/w780/9gk7admal4zlTpeq5KXO704nr61.jpg", overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life.", isStatic: true },
  { id: 12, title: "The Matrix", year: "1999", director: "Lana Wachowski", rating: 8.7, genre_ids: [28, 878], poster: "https://image.tmdb.org/t/p/w780/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", overview: "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents.", isStatic: true },
  { id: 13, title: "Se7en", year: "1995", director: "David Fincher", rating: 8.3, genre_ids: [80, 9648, 53], poster: "https://image.tmdb.org/t/p/w780/6yoghtyTpznpBik8EngEmJskVUO.jpg", overview: "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.", isStatic: true },
  { id: 14, title: "Silence of the Lambs", year: "1991", director: "Jonathan Demme", rating: 8.6, genre_ids: [80, 18, 53], poster: "https://image.tmdb.org/t/p/w780/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg", overview: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.", isStatic: true },
  { id: 15, title: "City of God", year: "2002", director: "Fernando Meirelles", rating: 8.4, genre_ids: [18, 80], poster: "https://image.tmdb.org/t/p/w780/k7eYdWvhYQyRQoU2TB2A2Xu2TfD.jpg", overview: "In the slums of Rio, two kids' paths diverge as one struggles to become a photographer and the other a kingpin.", isStatic: true },
  { id: 16, title: "Life Is Beautiful", year: "1997", director: "Roberto Benigni", rating: 8.5, genre_ids: [35, 18], poster: "https://image.tmdb.org/t/p/w780/mfnkSeeVOBVheuyn2lo4tfmOPQb.jpg", overview: "When an open-minded Jewish librarian and his son become victims of the Holocaust, he uses a perfect mixture of will, humor, and imagination.", isStatic: true },
  { id: 17, title: "It's a Wonderful Life", year: "1946", director: "Frank Capra", rating: 8.3, genre_ids: [18, 10751, 14], poster: "https://image.tmdb.org/t/p/w780/bDg21baU9J0dG5x6gS0bZ2eT6a0.jpg", overview: "A holiday favourite for generations...  George Bailey has spent his entire life giving to the people of Bedford Falls.", isStatic: true },
  { id: 18, title: "Seven Samurai", year: "1954", director: "Akira Kurosawa", rating: 8.5, genre_ids: [28, 18], poster: "https://image.tmdb.org/t/p/w780/8OKmBV5BUFzmozICVEIn5nwWDDx.jpg", overview: "A samurai answers a village's request for protection after he falls on hard times. The town needs protection from bandits.", isStatic: true },
  { id: 19, title: "Back to the Future", year: "1985", director: "Robert Zemeckis", rating: 8.5, genre_ids: [12, 35, 878], poster: "https://image.tmdb.org/t/p/w780/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg", overview: "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean.", isStatic: true },
  { id: 20, title: "Spider-Man: Into the Spider-Verse", year: "2018", director: "Rodney Rothman", rating: 8.4, genre_ids: [28, 12, 16, 878], poster: "https://image.tmdb.org/t/p/w780/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg", overview: "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions.", isStatic: true },
  { id: 30, title: "Top Gun: Maverick", year: "2022", director: "Joseph Kosinski", rating: 8.2, genre_ids: [28, 18], poster: "https://image.tmdb.org/t/p/w780/62HCnUTziyWcpDaBO2i1DX17ljH.jpg", overview: "After more than thirty years of service as one of the Navy’s top aviators, and dodging the advancement in rank that would ground him, Pete “Maverick” Mitchell finds himself training a detachment of TOP GUN graduates.", isStatic: true }
];

// --- CONFIGURATION ---
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w780';

// --- FILTER CONSTANTS ---
const GENRES = [
    { id: 'all', label: 'All Genres' },
    { id: 28, label: 'Action' },
    { id: 12, label: 'Adventure' },
    { id: 16, label: 'Animation' },
    { id: 35, label: 'Comedy' },
    { id: 80, label: 'Crime' },
    { id: 99, label: 'Documentary' },
    { id: 18, label: 'Drama' },
    { id: 10751, label: 'Family' },
    { id: 14, label: 'Fantasy' },
    { id: 36, label: 'History' },
    { id: 27, label: 'Horror' },
    { id: 10402, label: 'Music' },
    { id: 9648, label: 'Mystery' },
    { id: 10749, label: 'Romance' },
    { id: 878, label: 'Sci-Fi' },
    { id: 10770, label: 'TV Movie' },
    { id: 53, label: 'Thriller' },
    { id: 10752, label: 'War' },
    { id: 37, label: 'Western' },
];

const DECADES = [
    { id: 'all', label: 'All Time' },
    { id: '2020', label: '2020s' },
    { id: '2010', label: '2010s' },
    { id: '2000', label: '2000s' },
    { id: '1990', label: '1990s' },
    { id: '1980', label: '1980s' },
    { id: '1970', label: '1970s' },
    { id: '1960', label: '1960s' },
    { id: '1950', label: '1950s' },
    { id: '1940', label: '1940s' },
    { id: 'old', label: 'Pre-1940' },
];

const SORTS = [
    { id: 'random', label: 'Random' },
    { id: 'popularity.desc', label: 'Most Popular' },
    { id: 'vote_average.desc', label: 'Top Rated' },
    { id: 'primary_release_date.desc', label: 'Newest' },
];

// --- STANDARD MODES ---
const STANDARD_MODES = {
  watched: {
    id: 'watched',
    label: 'Have you watched?',
    yesLabel: 'WATCHED',
    noLabel: 'SKIP',
    yesColor: 'text-green-400',
    yesBorder: 'border-green-400',
    yesBg: 'bg-green-500',
    icon: <Eye size={24} />,
    themeColor: 'text-green-500'
  },
  watchlist: {
    id: 'watchlist',
    label: 'Add to Watchlist?',
    yesLabel: 'ADD',
    noLabel: 'PASS',
    yesColor: 'text-blue-400',
    yesBorder: 'border-blue-400',
    yesBg: 'bg-blue-500',
    icon: <Clock size={24} />,
    themeColor: 'text-blue-500'
  }
};

// Helper to get mode config
const getModeConfig = (modeId, customMeta) => {
    if (STANDARD_MODES[modeId]) return STANDARD_MODES[modeId];
    return {
        id: modeId,
        label: customMeta?.[modeId]?.name || 'Custom List',
        yesLabel: 'ADD',
        noLabel: 'SKIP',
        yesColor: 'text-purple-400',
        yesBorder: 'border-purple-400',
        yesBg: 'bg-purple-500',
        icon: <List size={24} />,
        themeColor: 'text-purple-500',
        isCustom: true
    };
};

// --- UTILITY: SEARCH PERSON ---
const searchPersonByName = async (apiKey, name) => {
  try {
    const searchUrl = `${TMDB_BASE_URL}/search/person?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(name)}`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    if (searchData.results && searchData.results.length > 0) {
      return searchData.results[0].id;
    }
    return null;
  } catch (e) {
    console.error(`Error searching for person: ${name}`, e);
    return null;
  }
};

// --- UTILITY: SHUFFLE ---
const shuffleArray = (array) => {
  let shuffled = [...array];
  const passes = Math.max(3, Math.floor(array.length / 10));
  for (let pass = 0; pass < passes; pass++) {
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  }
  return shuffled;
};

// --- API UTILS ---

// 1. RAW DISCOVERY FETCH (Just gets the IDs/Basic Data)
const fetchRawDiscovery = async (apiKey, page, filters) => {
    let url = `${TMDB_BASE_URL}/discover/movie?api_key=${apiKey}&language=en-US&sort_by=${filters.sort === 'random' ? 'popularity.desc' : filters.sort}&page=${page}&vote_count.gte=200`;
    
    if (filters.genre !== 'all') {
        url += `&with_genres=${filters.genre}`;
    }
    if (filters.year !== 'all') {
        const currentYear = new Date().getFullYear();
        if (filters.year === 'old') {
             url += `&primary_release_date.lte=1939-12-31`;
        } else {
             const decadeStart = parseInt(filters.year);
             const decadeEnd = Math.min(decadeStart + 9, currentYear); 
             url += `&primary_release_date.gte=${decadeStart}-01-01&primary_release_date.lte=${decadeEnd}-12-31`;
        }
    }
    const response = await fetch(url);
    return await response.json();
};

// 2. ENRICHMENT (Takes a list of basic movie objects and adds Director)
const enrichMovies = async (apiKey, movies) => {
    const enriched = await Promise.all(
        movies.map(async (movie) => {
            try {
                const creditRes = await fetch(`${TMDB_BASE_URL}/movie/${movie.id}/credits?api_key=${apiKey}`);
                const creditData = await creditRes.json();
                const director = creditData.crew?.find(p => p.job === 'Director')?.name || "Unknown";
                
                return {
                    id: movie.id,
                    title: movie.title,
                    year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
                    poster_path: movie.poster_path,
                    director: director,
                    rating: movie.vote_average,
                    overview: movie.overview,
                    vote_count: movie.vote_count,
                    genre_ids: movie.genre_ids,
                    release_date: movie.release_date,
                    isStatic: false
                };
            } catch (e) {
                return { ...movie, director: 'Unknown', isStatic: false };
            }
        })
    );
    return enriched;
};

// 3. DIRECTOR FETCH (Specific Logic)
const fetchFullDirectorFilmography = async (apiKey, personId, filters) => {
    try {
        const url = `${TMDB_BASE_URL}/person/${personId}/movie_credits?api_key=${apiKey}&language=en-US`;
        const response = await fetch(url);
        const data = await response.json();
        
        let movies = (data.crew || [])
            .filter(m => m.job === 'Director')
            .map(m => ({
                id: m.id,
                title: m.title,
                year: m.release_date ? m.release_date.split('-')[0] : 'N/A',
                poster_path: m.poster_path,
                director: 'Selected Director', 
                rating: m.vote_average,
                overview: m.overview,
                vote_count: m.vote_count,
                genre_ids: m.genre_ids,
                release_date: m.release_date,
                isStatic: false
            }));

        movies = movies.filter(m => m.vote_count >= 10); 

        if (filters.genre !== 'all') {
            movies = movies.filter(m => m.genre_ids && m.genre_ids.includes(Number(filters.genre)));
        }

        if (filters.year !== 'all') {
            if (filters.year === 'old') {
                movies = movies.filter(m => m.release_date && m.release_date < '1940-01-01');
            } else {
                const startYear = parseInt(filters.year);
                const endYear = startYear + 9;
                movies = movies.filter(m => {
                    if (!m.release_date) return false;
                    const y = parseInt(m.release_date.split('-')[0]);
                    return y >= startYear && y <= endYear;
                });
            }
        }

        if (filters.sort === 'random') {
            movies = shuffleArray(movies);
        } else if (filters.sort === 'vote_average.desc') {
            movies.sort((a, b) => b.rating - a.rating);
        } else if (filters.sort === 'primary_release_date.desc') {
            movies.sort((a, b) => new Date(b.release_date || '') - new Date(a.release_date || ''));
        } else {
            movies.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        }

        return movies;
    } catch (e) {
        console.error("Error fetching director credits", e);
        return [];
    }
};

const Card = ({ movie, index, isFront, dragOffset, dragDirection, modeConfig }) => {
  if (!movie) return null;

  const rotate = isFront ? dragOffset.x * 0.05 : 0;
  
  const style = isFront 
    ? {
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotate}deg)`,
        cursor: 'grab',
        zIndex: 10,
      }
    : {
        transform: `scale(0.95) translateY(10px)`,
        zIndex: 5,
        opacity: 0.6,
      };

  const yesOpacity = isFront && dragDirection === 'right' ? Math.min(Math.abs(dragOffset.x) / 100, 1) : 0;
  const noOpacity = isFront && dragDirection === 'left' ? Math.min(Math.abs(dragOffset.x) / 100, 1) : 0;
  // Calculate opacity for swipe-up (watchlist) logic
  const watchlistOpacity = isFront && dragDirection === 'up' ? Math.min(Math.abs(dragOffset.y) / 100, 1) : 0;

  const imageUrl = movie.isStatic === false 
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : movie.poster;

  return (
    <div 
      className="absolute w-full h-full rounded-2xl shadow-2xl overflow-hidden bg-zinc-900 select-none border border-white/5"
      style={style}
    >
      <img 
        src={imageUrl} 
        alt={movie.title || "Movie Poster"}
        className="absolute inset-0 w-full h-full object-cover"
        draggable="false"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      {isFront && (
        <>
          <div 
            className={`absolute top-8 left-8 border-4 ${modeConfig.yesBorder} ${modeConfig.yesColor} font-bold text-2xl px-4 py-2 rounded -rotate-12 pointer-events-none z-20 bg-black/40 backdrop-blur-sm shadow-lg`}
            style={{ opacity: yesOpacity }}
          >
            {modeConfig.yesLabel}
          </div>
          <div 
            className="absolute top-8 right-8 border-4 border-red-500 text-red-500 font-bold text-2xl px-4 py-2 rounded rotate-12 pointer-events-none z-20 bg-black/40 backdrop-blur-sm shadow-lg"
            style={{ opacity: noOpacity }}
          >
            {modeConfig.noLabel}
          </div>
          
          {/* Swipe Up WATCHLIST Indicator */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-blue-400 text-blue-400 font-bold text-2xl px-4 py-2 rounded pointer-events-none z-20 bg-black/40 backdrop-blur-sm shadow-lg whitespace-nowrap"
            style={{ opacity: watchlistOpacity }}
          >
            WATCHLIST
          </div>
        </>
      )}

      <div className="absolute bottom-0 left-0 w-full p-6 text-white z-10 bg-gradient-to-t from-black/90 to-transparent pt-20">
        <h2 className="text-3xl font-bold leading-tight mb-2 drop-shadow-lg font-display">{movie.title}</h2>
        <div className="flex items-center space-x-3 mb-3 text-sm font-medium text-zinc-300">
          <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-white border border-white/10">{movie.year}</span>
          <div className="flex items-center text-yellow-400">
             <Star size={14} className="fill-yellow-400 mr-1" />
             {movie.rating}
          </div>
        </div>
        <div className="space-y-1 text-sm text-zinc-300/90 mb-4">
           <p><span className="text-zinc-500 uppercase text-[10px] font-bold tracking-wider">{movie.director}</span></p>
        </div>
        <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed max-w-prose opacity-80">
          {movie.overview}
        </p>
      </div>
    </div>
  );
};

export default function App() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('tmdb_api_key') || '');
  const [useStatic, setUseStatic] = useState(() => !localStorage.getItem('tmdb_api_key'));
  const [appState, setAppState] = useState('menu'); 
  const [currentMode, setCurrentMode] = useState('watched');
  
  // --- CUSTOM LIST CREATION STATE ---
  const [newListConfig, setNewListConfig] = useState({
      name: '',
      filters: {
          genre: 'all',
          year: 'all',
          sort: 'popularity.desc',
          directors: []
      }
  });

  // --- LISTS STATE & METADATA ---
  const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem('film_logger_lists');
    if (savedLists) {
        const parsed = JSON.parse(savedLists);
        if(!parsed.watched) parsed.watched = [];
        if(!parsed.watchlist) parsed.watchlist = [];
        return parsed;
    }
    return { watched: [], watchlist: [] };
  });
  
  const [customListMeta, setCustomListMeta] = useState(() => {
      const savedMeta = localStorage.getItem('film_logger_custom_meta');
      return savedMeta ? JSON.parse(savedMeta) : {};
  });

  useEffect(() => {
    localStorage.setItem('film_logger_lists', JSON.stringify(lists));
  }, [lists]);

  useEffect(() => {
    localStorage.setItem('film_logger_custom_meta', JSON.stringify(customListMeta));
  }, [customListMeta]);

  // --- FILTERS STATE (Standard Modes) ---
  const [filters, setFilters] = useState({
    genre: 'all',
    year: 'all',
    sort: 'popularity.desc',
    directors: []
  });
  const [showFilters, setShowFilters] = useState(false);
  const [directorInput, setDirectorInput] = useState('');
  const [showDirectorSuggestions, setShowDirectorSuggestions] = useState(false);

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- MODAL & UI STATE ---
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);
  const [viewingListId, setViewingListId] = useState(null); 
  const [showListPreview, setShowListPreview] = useState(false); 
  const [showSettings, setShowSettings] = useState(false);
  
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const activeConfig = getModeConfig(currentMode, customListMeta);
  const processedIdsRef = useRef(new Set());

  useEffect(() => {
    const ids = new Set();
    Object.values(lists).forEach(list => {
        if(list && Array.isArray(list)) {
            list.forEach(movie => ids.add(movie.id));
        }
    });
    processedIdsRef.current = ids;
  }, [lists]);

  // Get unique directors for autocomplete
  const availableDirectors = useMemo(() => {
    const directorsSet = new Set();
    STATIC_MOVIES.forEach(movie => {
      if (movie.director && movie.director !== 'Unknown') directorsSet.add(movie.director);
    });
    movies.forEach(movie => {
      if (movie.director && movie.director !== 'Unknown') directorsSet.add(movie.director);
    });
    return Array.from(directorsSet).sort();
  }, [movies]);

  // --- REMOVE MOVIES IN CURRENT LIST FROM VIEW STACK ---
  useEffect(() => {
    if (movies.length > 0) {
      const currentListIds = new Set(lists[currentMode]?.map(m => m.id) || []);
      // Only filter if we find a match to avoid unnecessary re-renders
      const needsFiltering = movies.some(m => currentListIds.has(m.id));
      
      if (needsFiltering) {
         setMovies(prev => prev.filter(m => !currentListIds.has(m.id)));
      }
    }
  }, [lists, currentMode, movies]);

  // --- MOVIE LOADING ---
  const loadMovies = useCallback(async (pageNum, reset = false, modeOverride = null, customFilters = null) => {
    setIsLoading(true);
    
    let newMovies = [];
    const activeMode = modeOverride || currentMode;
    const activeFilters = customFilters || filters; 
    
    // Get movie IDs already in the CURRENT list to exclude
    const existingMovieIds = new Set();
    if (lists[activeMode]) {
      lists[activeMode].forEach(movie => {
        if (movie && movie.id) existingMovieIds.add(movie.id);
      });
    }
    
    // Get movie IDs currently in the stack to avoid duplicates during pagination
    const stackMovieIds = reset ? new Set() : new Set(movies.map(m => m.id));

    if (useStatic) {
        let filteredStatic = [...STATIC_MOVIES];
        
        if (activeFilters.genre !== 'all') {
            filteredStatic = filteredStatic.filter(m => m.genre_ids && m.genre_ids.includes(Number(activeFilters.genre)));
        }
        
        if (activeFilters.year !== 'all') {
            if (activeFilters.year === 'old') {
                 filteredStatic = filteredStatic.filter(m => parseInt(m.year) < 1940);
            } else {
                 const y = parseInt(activeFilters.year);
                 filteredStatic = filteredStatic.filter(m => {
                    const mYear = parseInt(m.year);
                    return mYear >= y && mYear < y + 10;
                 });
            }
        }

        if (activeFilters.directors && activeFilters.directors.length > 0) {
            const filterDirectorsLower = activeFilters.directors.map(d => String(d).trim().toLowerCase());
            filteredStatic = filteredStatic.filter(m => {
                if (!m.director) return false;
                return filterDirectorsLower.includes(m.director.toLowerCase());
            });
        }
        
        filteredStatic = filteredStatic.filter(m => !existingMovieIds.has(m.id) && !stackMovieIds.has(m.id));
        
        if (activeFilters.sort === 'random') {
             filteredStatic = shuffleArray(filteredStatic);
        } else if (activeFilters.sort === 'vote_average.desc') {
             filteredStatic.sort((a, b) => b.rating - a.rating);
        } else if (activeFilters.sort === 'primary_release_date.desc') {
             filteredStatic.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        } else {
             filteredStatic = shuffleArray(filteredStatic);
        }

        if (pageNum === 1) {
            newMovies = filteredStatic;
        } else {
            setIsLoading(false);
            return;
        }
    } else {
        if (apiKey) {
            // SPECIAL DIRECTOR LOGIC
            if (activeFilters.directors && Array.isArray(activeFilters.directors) && activeFilters.directors.length > 0) {
                 // Director Mode: Fetch everything at once on Page 1, then stop.
                 if (pageNum === 1) {
                     const personIdPromises = activeFilters.directors.map(dir => searchPersonByName(apiKey, dir));
                     const personIdResults = await Promise.all(personIdPromises);
                     const directorPersonIds = personIdResults.filter(id => id !== null);
                     
                     if (directorPersonIds.length > 0) {
                        const fetchPromises = directorPersonIds.map(personId => 
                          fetchFullDirectorFilmography(apiKey, personId, activeFilters)
                        );
                        const resultsArrays = await Promise.all(fetchPromises);
                        let allResults = resultsArrays.flat();
                        
                        // Deduplicate
                        const seenIds = new Set();
                        allResults = allResults.filter(movie => {
                          if (seenIds.has(movie.id)) return false;
                          seenIds.add(movie.id);
                          return true;
                        });
                        
                        newMovies = allResults.filter(m => !existingMovieIds.has(m.id) && !stackMovieIds.has(m.id));
                     }
                 } else {
                     // If page > 1 in Director mode, we stop (since we loaded all in page 1)
                     setIsLoading(false);
                     return;
                 }
            } else {
                 // STANDARD DISCOVERY LOGIC WITH REFILL
                 // We need to loop pages until we have enough new movies
                 let accumulatedMovies = [];
                 let currentPage = pageNum;
                 const MAX_PAGES_TO_FETCH = 5; // Safety break
                 const TARGET_SIZE = 10; // Minimum we want to add
                 
                 for (let i = 0; i < MAX_PAGES_TO_FETCH; i++) {
                     const data = await fetchRawDiscovery(apiKey, currentPage, activeFilters);
                     
                     if (!data.results || data.results.length === 0) break;

                     // Initial filter for duplicates before enrichment to save API calls
                     const validCandidates = data.results.filter(m => !existingMovieIds.has(m.id) && !stackMovieIds.has(m.id));
                     
                     if (validCandidates.length > 0) {
                         const enriched = await enrichMovies(apiKey, validCandidates);
                         accumulatedMovies = [...accumulatedMovies, ...enriched];
                     }
                     
                     // If we found movies on this page, increment page for next time
                     // Note: If we filter EVERYTHING out, we still need to advance page
                     currentPage++; 
                     
                     if (accumulatedMovies.length >= TARGET_SIZE) break;
                 }
                 
                 newMovies = accumulatedMovies;
                 
                 // Update the page state so next fetch continues where we left off
                 setPage(currentPage);
                 
                 // Random sort if needed
                 if (activeFilters.sort === 'random') {
                    newMovies = shuffleArray(newMovies);
                 }
            }
        }
    }
    
    if (reset) {
        setMovies(newMovies);
        setCurrentIndex(0);
    } else {
        setMovies(prev => [...prev, ...newMovies]);
    }
    setIsLoading(false);
  }, [apiKey, useStatic, filters, lists, currentMode, movies]); 

  const handleKeySubmit = (e) => {
    e.preventDefault();
    if (apiKey.length > 10) {
        localStorage.setItem('tmdb_api_key', apiKey);
        setUseStatic(false);
        setShowSettings(false);
    }
  };

  const clearApiKey = () => {
      localStorage.removeItem('tmdb_api_key');
      setApiKey('');
      setUseStatic(true);
  };

  // --- ACTIONS ---

  const startStandardMode = (modeKey) => {
      setCurrentMode(modeKey);
      setAppState('playing');
      setPage(1);
      loadMovies(1, true, modeKey); 
  };

  const openListCreator = () => {
      setNewListConfig({
          name: '',
          filters: { genre: 'all', year: 'all', sort: 'popularity.desc', directors: [] }
      });
      setAppState('create_list');
  };

  const createAndStartCustomList = () => {
      if (!newListConfig.name.trim()) {
          alert("Please give your list a name.");
          return;
      }

      const newId = `custom_${Date.now()}`;
      setLists(prev => ({ ...prev, [newId]: [] }));
      setCustomListMeta(prev => ({
          ...prev,
          [newId]: {
              name: newListConfig.name,
              createdAt: new Date().toISOString(),
              filters: newListConfig.filters
          }
      }));

      setCurrentMode(newId);
      setAppState('playing');
      setPage(1);
      loadMovies(1, true, newId, newListConfig.filters);
  };

  const deleteCustomList = () => {
      if(!listToDelete) return;
      const newLists = { ...lists };
      delete newLists[listToDelete];
      setLists(newLists);
      const newMeta = { ...customListMeta };
      delete newMeta[listToDelete];
      setCustomListMeta(newMeta);
      setShowDeleteConfirm(false);
      setListToDelete(null);
  };

  const returnToMenu = () => {
    setAppState('menu');
    setDragOffset({ x: 0, y: 0 });
  };

  const openViewList = (listId) => {
      setViewingListId(listId);
  };
  
  const closeViewList = () => {
      setViewingListId(null);
  };

  const finishSwipe = (direction) => {
    const currentMovie = movies[currentIndex];
    if (!currentMovie) return;

    // Swipe Up Logic -> Add to Watchlist
    if (direction === 'up') {
        const isAlreadyInWatchlist = lists.watchlist?.some(m => m.id === currentMovie.id);
        if (!isAlreadyInWatchlist) {
            setLists(prev => ({ ...prev, watchlist: [...(prev.watchlist || []), currentMovie] }));
        }
    } 
    // Swipe Right Logic -> Add to Current Mode (e.g. Watched or Custom)
    else if (direction === 'right') {
      const isAlreadyInList = lists[currentMode]?.some(m => m.id === currentMovie.id);
      if (!isAlreadyInList) {
        setLists(prev => ({ ...prev, [currentMode]: [...(prev[currentMode] || []), currentMovie] }));
      }
    }
    
    setDragOffset({ x: 0, y: 0 });
    const nextIndex = currentIndex + 1;
    
    if (nextIndex >= movies.length) {
      setCurrentIndex(movies.length);
      return;
    }
    
    setCurrentIndex(nextIndex);
    if (!useStatic && movies.length - nextIndex < 4 && !isLoading) {
        const nextPage = page + 1;
        // setPage(nextPage); // Handled inside loadMovies logic now
        
        let filtersToUse = filters;
        if (currentMode.startsWith('custom_')) {
             filtersToUse = customListMeta[currentMode]?.filters || filters;
        }
        loadMovies(page, false, currentMode, filtersToUse);
    }
  };

  const handleDragStart = (e) => {
    if (isLoading) return;
    if (currentIndex >= movies.length) return;
    setIsDragging(true);
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    setStartPos({ x: clientX, y: clientY });
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    setDragOffset({ x: clientX - startPos.x, y: clientY - startPos.y });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const threshold = 100; 
    if (dragOffset.y < -threshold) finishSwipe('up'); // Negative Y is UP
    else if (dragOffset.x > threshold) finishSwipe('right');
    else if (dragOffset.x < -threshold) finishSwipe('left');
    else setDragOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
        if(appState !== 'playing' || isLoading) return;
        if (e.key === 'ArrowRight') finishSwipe('right');
        if (e.key === 'ArrowLeft') finishSwipe('left');
        if (e.key === 'ArrowUp') finishSwipe('up');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [appState, currentIndex, movies.length, isLoading]);

  const downloadCSV = (modeToExport = currentMode) => {
    const currentList = lists[modeToExport];
    if (!currentList || currentList.length === 0) return;

    let headers = ['tmdbID', 'Title', 'Year', 'Directors'];
    const escapeCsv = (text) => {
        if (typeof text === 'string' && (text.includes(',') || text.includes('"'))) return `"${text.replace(/"/g, '""')}"`;
        return text;
    };
    let rowMapper = (movie) => [movie.id, escapeCsv(movie.title), movie.year, escapeCsv(movie.director)];
    
    if (modeToExport === 'watchlist') {
        headers.push('Watchlist');
        rowMapper = (movie) => [movie.id, escapeCsv(movie.title), movie.year, escapeCsv(movie.director), 'true'];
    } 
    
    const rows = currentList.map(rowMapper);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = modeToExport.startsWith('custom_') 
        ? `list_${customListMeta[modeToExport]?.name.replace(/\s+/g, '_').toLowerCase()}.csv`
        : `letterboxd_${modeToExport}_import.csv`;
        
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const confirmClear = () => {
      setLists(prev => ({ ...prev, [currentMode]: [] }));
      setShowClearConfirm(false);
  };

  const removeMovieFromList = (listId, movieId) => {
      setLists(prev => ({
          ...prev,
          [listId]: prev[listId].filter(m => m.id !== movieId)
      }));
  };

  // --- RENDER: CREATE LIST SCREEN ---
  if (appState === 'create_list') {
      return (
          <div className="fixed inset-0 bg-zinc-950 text-white flex flex-col p-6 font-sans overflow-y-auto">
              <div className="w-full max-w-md mx-auto">
                  <div className="flex items-center mb-6">
                      <button onClick={() => setAppState('menu')} className="p-2 -ml-2 hover:bg-zinc-900 rounded-full"><ChevronLeft /></button>
                      <h2 className="text-2xl font-bold ml-2">New Custom List</h2>
                  </div>

                  <div className="space-y-6">
                      <div>
                          <label className="block text-sm font-bold text-zinc-400 mb-2">List Name</label>
                          <input 
                            type="text" 
                            value={newListConfig.name}
                            onChange={(e) => setNewListConfig({...newListConfig, name: e.target.value})}
                            placeholder="e.g., Horror Marathon 2024"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500"
                          />
                      </div>

                      <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                          <div className="flex items-center space-x-2 text-purple-400 font-bold mb-4">
                              <Filter size={18} />
                              <span>Filter the Deck</span>
                          </div>

                          <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-zinc-500 uppercase font-bold mb-2">Sort By</label>
                                <div className="flex flex-wrap gap-2">
                                    {SORTS.map(s => (
                                        <button 
                                            key={s.id} 
                                            onClick={() => setNewListConfig({...newListConfig, filters: {...newListConfig.filters, sort: s.id}})} 
                                            className={`px-3 py-1 rounded-full text-xs font-medium border ${newListConfig.filters.sort === s.id ? 'bg-white text-black border-white' : 'bg-zinc-950 text-zinc-400 border-zinc-800'}`}
                                        >
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-zinc-500 uppercase font-bold mb-2">Genre</label>
                                <div className="flex flex-wrap gap-2">
                                    {GENRES.map(g => (
                                        <button 
                                            key={g.id} 
                                            onClick={() => setNewListConfig({...newListConfig, filters: {...newListConfig.filters, genre: g.id}})} 
                                            className={`px-3 py-1 rounded-full text-xs font-medium border ${newListConfig.filters.genre === g.id ? 'bg-white text-black border-white' : 'bg-zinc-950 text-zinc-400 border-zinc-800'}`}
                                        >
                                            {g.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-zinc-500 uppercase font-bold mb-2">Decade</label>
                                <div className="flex flex-wrap gap-2">
                                    {DECADES.map(d => (
                                        <button 
                                            key={d.id} 
                                            onClick={() => setNewListConfig({...newListConfig, filters: {...newListConfig.filters, year: d.id}})} 
                                            className={`px-3 py-1 rounded-full text-xs font-medium border ${newListConfig.filters.year === d.id ? 'bg-white text-black border-white' : 'bg-zinc-950 text-zinc-400 border-zinc-800'}`}
                                        >
                                            {d.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* DIRECTOR FILTER FOR CUSTOM LIST */}
                            <div>
                                <label className="block text-xs text-zinc-500 uppercase font-bold mb-2">Director</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        value={directorInput}
                                        onChange={(e) => {
                                            setDirectorInput(e.target.value);
                                            setShowDirectorSuggestions(e.target.value.length > 0);
                                        }}
                                        onFocus={() => { if (directorInput.length > 0) setShowDirectorSuggestions(true); }}
                                        onBlur={() => setTimeout(() => setShowDirectorSuggestions(false), 200)}
                                        placeholder="Type director name..."
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 px-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                                    />
                                    {showDirectorSuggestions && directorInput.length > 0 && (
                                        <div className="absolute z-50 w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-lg max-h-48 overflow-y-auto shadow-xl">
                                            {availableDirectors
                                                .filter(dir => dir.toLowerCase().includes(directorInput.toLowerCase()) && !newListConfig.filters.directors?.includes(dir))
                                                .slice(0, 8)
                                                .map(dir => (
                                                    <button 
                                                        key={dir} 
                                                        onClick={() => {
                                                            setNewListConfig({
                                                                ...newListConfig, 
                                                                filters: {
                                                                    ...newListConfig.filters,
                                                                    directors: [...(newListConfig.filters.directors || []), dir]
                                                                }
                                                            });
                                                            setDirectorInput('');
                                                            setShowDirectorSuggestions(false);
                                                        }}
                                                        className="w-full text-left px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors"
                                                    >
                                                        {dir}
                                                    </button>
                                                ))}
                                                {/* Allow adding custom name if not found */}
                                                <button 
                                                    onClick={() => {
                                                        setNewListConfig({
                                                            ...newListConfig, 
                                                            filters: {
                                                                ...newListConfig.filters,
                                                                directors: [...(newListConfig.filters.directors || []), directorInput]
                                                            }
                                                        });
                                                        setDirectorInput('');
                                                        setShowDirectorSuggestions(false);
                                                    }}
                                                    className="w-full text-left px-3 py-2 text-sm text-purple-400 hover:bg-zinc-800 transition-colors italic border-t border-zinc-800"
                                                >
                                                    Add "{directorInput}"
                                                </button>
                                        </div>
                                    )}
                                </div>
                                {newListConfig.filters.directors && newListConfig.filters.directors.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {newListConfig.filters.directors.map(dir => (
                                            <div key={dir} className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white text-black border border-white">
                                                <span>{dir}</span>
                                                <button 
                                                    onClick={() => {
                                                        setNewListConfig({
                                                            ...newListConfig,
                                                            filters: {
                                                                ...newListConfig.filters,
                                                                directors: newListConfig.filters.directors.filter(d => d !== dir)
                                                            }
                                                        });
                                                    }}
                                                    className="ml-1 hover:text-red-500 transition-colors"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                          </div>
                      </div>

                      <button 
                        onClick={createAndStartCustomList}
                        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all"
                      >
                        <Play size={20} fill="currentColor" />
                        <span>Start Swiping</span>
                      </button>
                  </div>
              </div>
          </div>
      )
  }

  // --- RENDER: MENU ---
  if (appState === 'menu') {
    return (
      <div className="fixed inset-0 bg-zinc-950 text-white flex flex-col items-center justify-center p-6 font-sans animate-in fade-in duration-500 overflow-y-auto">
        
        {/* VIEW LIST MODAL */}
        {viewingListId && (
            <div className="absolute inset-0 z-50 bg-black/90 flex flex-col animate-in fade-in duration-200 backdrop-blur-sm">
                <div className="p-4 flex items-center justify-between border-b border-white/10 bg-zinc-950">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        {getModeConfig(viewingListId, customListMeta).icon}
                        {getModeConfig(viewingListId, customListMeta).label}
                    </h3>
                    <button onClick={() => setViewingListId(null)} className="p-2 bg-zinc-900 rounded-full border border-zinc-800 text-zinc-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    {(!lists[viewingListId] || lists[viewingListId].length === 0) ? (
                        <div className="h-full flex flex-col items-center justify-center text-zinc-500 opacity-50">
                            <Film size={48} className="mb-2" />
                            <p>No movies yet</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-3">
                            {lists[viewingListId].map((m, i) => (
                                <div key={`${m.id}-${i}`} className="flex items-center justify-between gap-3 bg-zinc-900/50 p-2 rounded-xl border border-white/5">
                                     <div className="flex items-center gap-3 overflow-hidden">
                                         <div className="w-10 h-14 bg-zinc-800 rounded-lg overflow-hidden shrink-0">
                                            <img src={m.isStatic === false ? `${IMAGE_BASE_URL}${m.poster_path}` : m.poster} className="w-full h-full object-cover" />
                                         </div>
                                         <div className="overflow-hidden text-left">
                                            <p className="font-bold text-sm truncate">{m.title}</p>
                                            <p className="text-xs text-zinc-500">{m.year} • {m.director}</p>
                                         </div>
                                     </div>
                                     <button 
                                        onClick={() => removeMovieFromList(viewingListId, m.id)}
                                        className="p-2 text-zinc-600 hover:text-red-500 transition-colors"
                                     >
                                         <Trash2 size={16} />
                                     </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* DELETE LIST MODAL */}
        {showDeleteConfirm && (
           <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 max-w-xs text-center">
                 <h3 className="text-xl font-bold mb-2">Delete List?</h3>
                 <p className="text-zinc-400 mb-6 text-sm">Delete "{customListMeta[listToDelete]?.name}"?</p>
                 <div className="flex space-x-3">
                    <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-3 rounded-xl bg-zinc-800 font-bold">Cancel</button>
                    <button onClick={deleteCustomList} className="flex-1 py-3 rounded-xl bg-red-600 font-bold text-white">Delete</button>
                 </div>
              </div>
           </div>
        )}

        {/* API Settings Toggle */}
        <div className="absolute top-6 right-6">
            <button onClick={() => setShowSettings(!showSettings)} className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors border border-zinc-800">
                <Key size={20} className={apiKey ? "text-green-500" : "text-zinc-500"} />
            </button>
        </div>
        {showSettings && (
            <div className="absolute top-20 right-6 w-80 bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-xl z-50 animate-in slide-in-from-top-2">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-sm">API Configuration</h3>
                    <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer" className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1">
                        Get Key <ExternalLink size={10} />
                    </a>
                </div>
                
                <input 
                    type="text" 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Paste TMDB API Key (v3)..." 
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg py-2 px-3 text-xs text-white mb-3 focus:outline-none focus:border-green-500"
                />
                <button onClick={handleKeySubmit} className="w-full bg-green-600 text-white text-xs font-bold py-2.5 rounded-lg hover:bg-green-500 transition-colors mb-3">
                    Save & Connect
                </button>

                <div className="bg-zinc-950/50 rounded-lg p-3 border border-zinc-800/50 text-[10px] text-zinc-400 leading-relaxed">
                    <p className="font-bold text-zinc-300 mb-1 flex items-center gap-1"><HelpCircle size={10} /> How to get a key:</p>
                    <ol className="list-decimal ml-3 space-y-1">
                        <li>Log in to <span className="text-zinc-300">TheMovieDB.org</span></li>
                        <li>Go to <span className="text-zinc-300">Settings &gt; API</span></li>
                        <li>Click <span className="text-zinc-300">Create</span> (Select "Developer")</li>
                        <li>Accept terms & fill basics (URL can be localhost)</li>
                        <li>Copy your <span className="text-zinc-300">API Key (v3 auth)</span></li>
                    </ol>
                </div>
                
                {localStorage.getItem('tmdb_api_key') && (
                    <button onClick={clearApiKey} className="w-full mt-3 text-red-400 text-xs hover:text-red-300 transition-colors underline">
                        Disconnect Key
                    </button>
                )}

                {!apiKey && <p className="text-[10px] text-zinc-500 mt-3 text-center border-t border-zinc-800 pt-2">Currently using Offline Mode (30 movies)</p>}
            </div>
        )}

        <div className="mb-8 text-center">
           <div className="flex items-center justify-center space-x-3 mb-2">
                <FilmLoggerIcon className="text-blue-500 w-12 h-12" />
                <h1 className="text-4xl font-bold tracking-tighter">Film<span className="text-blue-500">Logger</span></h1>
           </div>
           <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{useStatic ? 'OFFLINE' : 'ONLINE'} • {movies.length} CACHED</p>
        </div>

        {/* FILTER SECTION (Standard Modes) */}
        <div className="w-full max-w-md mb-6 bg-zinc-900/30 p-4 rounded-2xl border border-zinc-800/50">
            <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setShowFilters(!showFilters)}>
                <div className="flex items-center space-x-2 text-sm font-bold text-zinc-300">
                    <Filter size={16} />
                    <span>Discovery Filters (Standard)</span>
                </div>
                <span className="text-xs text-zinc-500">{filters.genre === 'all' && filters.year === 'all' && (!filters.directors || filters.directors.length === 0) ? 'Default' : 'Active'}</span>
            </div>

            {showFilters && (
                <div className="space-y-4 animate-in slide-in-from-top-2">
                    <div>
                        <label className="block text-xs text-zinc-500 uppercase font-bold mb-2">Sort By</label>
                        <div className="flex flex-wrap gap-2">
                            {SORTS.map(s => (
                                <button key={s.id} onClick={() => setFilters({...filters, sort: s.id})} className={`px-2 py-1 rounded text-[10px] font-medium border ${filters.sort === s.id ? 'bg-white text-black' : 'bg-zinc-950 text-zinc-500 border-zinc-800'}`}>{s.label}</button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs text-zinc-500 uppercase font-bold mb-2">Genre</label>
                        <div className="flex flex-wrap gap-2">
                            {GENRES.map(g => (
                                <button key={g.id} onClick={() => setFilters({...filters, genre: g.id})} className={`px-2 py-1 rounded text-[10px] font-medium border ${filters.genre === g.id ? 'bg-white text-black' : 'bg-zinc-950 text-zinc-500 border-zinc-800'}`}>{g.label}</button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs text-zinc-500 uppercase font-bold mb-2">Decade</label>
                        <div className="flex flex-wrap gap-2">
                            {DECADES.map(d => (
                                <button key={d.id} onClick={() => setFilters({...filters, year: d.id})} className={`px-2 py-1 rounded text-[10px] font-medium border ${filters.year === d.id ? 'bg-white text-black' : 'bg-zinc-950 text-zinc-500 border-zinc-800'}`}>{d.label}</button>
                            ))}
                        </div>
                    </div>

                    {/* DIRECTOR FILTER FOR STANDARD MODE */}
                    <div>
                        <label className="block text-xs text-zinc-500 uppercase font-bold mb-2">Director</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                value={directorInput}
                                onChange={(e) => {
                                    setDirectorInput(e.target.value);
                                    setShowDirectorSuggestions(e.target.value.length > 0);
                                }}
                                onFocus={() => { if (directorInput.length > 0) setShowDirectorSuggestions(true); }}
                                onBlur={() => setTimeout(() => setShowDirectorSuggestions(false), 200)}
                                placeholder="Type director name..."
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 px-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                            />
                            {showDirectorSuggestions && directorInput.length > 0 && (
                                <div className="absolute z-50 w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-lg max-h-48 overflow-y-auto shadow-xl">
                                    {availableDirectors
                                        .filter(dir => dir.toLowerCase().includes(directorInput.toLowerCase()) && !filters.directors?.includes(dir))
                                        .slice(0, 8)
                                        .map(dir => (
                                            <button 
                                                key={dir} 
                                                onClick={() => {
                                                    setFilters({
                                                        ...filters, 
                                                        directors: [...(filters.directors || []), dir]
                                                    });
                                                    setDirectorInput('');
                                                    setShowDirectorSuggestions(false);
                                                }}
                                                className="w-full text-left px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors"
                                            >
                                                {dir}
                                            </button>
                                        ))}
                                        <button 
                                            onClick={() => {
                                                setFilters({
                                                    ...filters, 
                                                    directors: [...(filters.directors || []), directorInput]
                                                });
                                                setDirectorInput('');
                                                setShowDirectorSuggestions(false);
                                            }}
                                            className="w-full text-left px-3 py-2 text-sm text-purple-400 hover:bg-zinc-800 transition-colors italic border-t border-zinc-800"
                                        >
                                            Add "{directorInput}"
                                        </button>
                                </div>
                            )}
                        </div>
                        {filters.directors && filters.directors.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {filters.directors.map(dir => (
                                    <div key={dir} className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white text-black border border-white">
                                        <span>{dir}</span>
                                        <button 
                                            onClick={() => {
                                                setFilters({
                                                    ...filters,
                                                    directors: filters.directors.filter(d => d !== dir)
                                                });
                                            }}
                                            className="ml-1 hover:text-red-500 transition-colors"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>

        <div className="w-full max-w-md space-y-3">
          {Object.values(STANDARD_MODES).map((mode) => (
            <div key={mode.id} className="flex items-center gap-2">
                <button onClick={() => startStandardMode(mode.id)} className="flex-1 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-600 p-4 rounded-xl flex items-center justify-between group transition-all">
                    <div className="flex items-center space-x-4">
                    <div className={`p-2 bg-white/5 ${mode.themeColor} rounded-lg`}>{mode.icon}</div>
                    <div className="text-left">
                        <h3 className="font-bold text-base">{mode.label}</h3>
                        <p className="text-zinc-500 text-xs">{lists[mode.id].length} items</p>
                    </div>
                    </div>
                    <div className="text-zinc-600 group-hover:translate-x-1 transition-transform">→</div>
                </button>
                <button onClick={() => setViewingListId(mode.id)} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">
                    <Eye size={20} />
                </button>
            </div>
          ))}
        </div>

        {/* CUSTOM LISTS */}
        <div className="pt-4 border-t border-zinc-800">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-zinc-400 text-sm uppercase tracking-wider">Custom Lists</h3>
                <button onClick={openListCreator} className="text-purple-400 hover:text-purple-300 text-xs font-bold flex items-center space-x-1">
                    <Plus size={14} />
                    <span>CREATE NEW</span>
                </button>
            </div>

            <div className="grid gap-3">
                {Object.keys(customListMeta).length === 0 ? (
                    <div onClick={openListCreator} className="border-2 border-dashed border-zinc-800 rounded-xl p-6 text-center text-zinc-600 hover:border-zinc-700 hover:text-zinc-500 cursor-pointer transition-colors">
                        <p className="text-sm">No custom lists yet.</p>
                        <p className="text-xs mt-1">Tap to create one</p>
                    </div>
                ) : (
                    Object.entries(customListMeta).map(([id, meta]) => (
                        <div key={id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex items-center justify-between group">
                            <div className="flex items-center space-x-3 cursor-pointer flex-1" onClick={() => {
                                setCurrentMode(id);
                                setAppState('playing');
                                setPage(1);
                                loadMovies(1, true, id, meta.filters);
                            }}>
                                <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
                                    <List size={18} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">{meta.name}</h4>
                                    <p className="text-xs text-zinc-500">{lists[id]?.length || 0} items</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1">
                                <button onClick={() => setViewingListId(id)} className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg"><Eye size={16} /></button>
                                <button onClick={() => downloadCSV(id)} className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg"><Download size={16} /></button>
                                <button onClick={() => { setListToDelete(id); setShowDeleteConfirm(true); }} className="p-2 text-zinc-500 hover:text-red-500 hover:bg-zinc-800 rounded-lg"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
      </div>
    );
  }

  // --- RENDER: SUMMARY ---
  if (appState === 'summary') {
    const activeList = lists[currentMode];
    const modeLabel = STANDARD_MODES[currentMode] ? STANDARD_MODES[currentMode].label : customListMeta[currentMode]?.name;

    return (
      <div className="fixed inset-0 bg-zinc-950 text-white flex flex-col items-center justify-center p-6 font-sans relative">
        
        {/* VIEW LIST MODAL (Summary) */}
        {viewingListId && (
            <div className="absolute inset-0 z-50 bg-black/90 flex flex-col animate-in fade-in duration-200 backdrop-blur-sm">
                <div className="p-4 flex items-center justify-between border-b border-white/10 bg-zinc-950">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        {getModeConfig(viewingListId, customListMeta).icon}
                        {getModeConfig(viewingListId, customListMeta).label}
                    </h3>
                    <button onClick={closeViewList} className="p-2 bg-zinc-900 rounded-full border border-zinc-800 text-zinc-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="grid grid-cols-1 gap-3">
                        {lists[viewingListId]?.map((m, i) => (
                            <div key={`${m.id}-${i}`} className="flex items-center justify-between gap-3 bg-zinc-900/50 p-2 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-12 h-16 bg-zinc-800 rounded-lg overflow-hidden shrink-0">
                                        <img src={m.isStatic === false ? `${IMAGE_BASE_URL}${m.poster_path}` : m.poster} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="overflow-hidden text-left">
                                        <p className="font-bold text-sm truncate">{m.title}</p>
                                        <p className="text-xs text-zinc-500">{m.year} • {m.director}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => removeMovieFromList(viewingListId, m.id)} className="p-2 text-zinc-600 hover:text-red-500 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {showClearConfirm && (
           <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50 animate-in fade-in duration-200">
              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 max-w-xs text-center shadow-2xl">
                 <h3 className="text-xl font-bold mb-2 text-white">Clear List?</h3>
                 <div className="flex space-x-3 mt-6">
                    <button onClick={() => setShowClearConfirm(false)} className="flex-1 py-3 rounded-xl bg-zinc-800 font-bold">Cancel</button>
                    <button onClick={confirmClear} className="flex-1 py-3 rounded-xl bg-red-600 font-bold">Clear</button>
                 </div>
              </div>
           </div>
        )}

        <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-6 shadow-2xl border border-zinc-800 text-center">
          <h2 className="text-2xl font-bold mb-2">{modeLabel}</h2>
          <p className="text-zinc-400 mb-6">{activeList?.length || 0} movies collected.</p>
          
          <div className="bg-zinc-950 rounded-xl p-4 mb-6 max-h-60 overflow-y-auto text-left border border-zinc-800 scrollbar-thin scrollbar-thumb-zinc-700">
            {!activeList || activeList.length === 0 ? <p className="text-center text-zinc-600 italic py-4">List is empty.</p> : (
              <ul className="space-y-3">
                {activeList.map((m, i) => (
                  <li key={i} className="flex items-center space-x-3 text-zinc-300">
                    <div className="w-8 h-12 bg-zinc-800 rounded overflow-hidden shrink-0">
                        <img src={m.isStatic === false ? `${IMAGE_BASE_URL}${m.poster_path}` : m.poster} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="overflow-hidden text-left">
                        <p className="truncate font-medium text-sm">{m.title}</p>
                        <p className="text-zinc-600 text-xs">{m.year}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="space-y-3">
             {activeList && activeList.length > 0 && (
                <>
                    <button onClick={() => downloadCSV(currentMode)} className={`w-full ${activeConfig.yesBg} text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 hover:brightness-110 transition-all`}>
                    <FileSpreadsheet size={20} />
                    <span>Download CSV</span>
                    </button>
                    <button onClick={() => setShowClearConfirm(true)} className="w-full bg-red-900/20 text-red-500 border border-red-900/50 font-bold py-3 rounded-xl flex items-center justify-center space-x-2 hover:bg-red-900/40 transition-all">
                        <Trash2 size={20} />
                        <span>Clear List</span>
                    </button>
                </>
             )}
            <button onClick={returnToMenu} className="w-full bg-zinc-800 text-zinc-300 font-bold py-3 rounded-xl flex items-center justify-center space-x-2 hover:bg-zinc-700 transition-colors">
              <RotateCcw size={20} />
              <span>Back to Menu</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER: PLAYING ---
  return (
    <div className="fixed inset-0 bg-zinc-950 text-white overflow-hidden flex flex-col font-sans">
      {/* LIST PREVIEW MODAL */}
      {showListPreview && (
          <div className="absolute inset-0 z-50 bg-black/90 flex flex-col animate-in fade-in duration-200 backdrop-blur-sm">
              <div className="p-4 flex items-center justify-between border-b border-white/10 bg-zinc-950">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                      {activeConfig.icon}
                      {activeConfig.yesLabel} List
                  </h3>
                  <button onClick={() => setShowListPreview(false)} className="p-2 bg-zinc-900 rounded-full border border-zinc-800 text-zinc-400 hover:text-white">
                      <X size={20} />
                  </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                  {lists[currentMode]?.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-zinc-500 opacity-50">
                          <Film size={48} className="mb-2" />
                          <p>No movies yet</p>
                      </div>
                  ) : (
                      <div className="grid grid-cols-1 gap-3">
                          {lists[currentMode]?.map((m, i) => (
                              <div key={i} className="flex items-center gap-3 bg-zinc-900/50 p-2 rounded-xl border border-white/5">
                                   <div className="w-12 h-16 bg-zinc-800 rounded-lg overflow-hidden shrink-0">
                                      <img src={m.isStatic === false ? `${IMAGE_BASE_URL}${m.poster_path}` : m.poster} className="w-full h-full object-cover" />
                                   </div>
                                   <div>
                                      <p className="font-bold text-sm">{m.title}</p>
                                      <p className="text-xs text-zinc-500">{m.year} • {m.director}</p>
                                   </div>
                              </div>
                          ))}
                      </div>
                  )}
              </div>
          </div>
      )}

      <header className="p-4 flex items-center justify-between bg-zinc-950 z-20">
        <button onClick={returnToMenu} className="p-2 hover:bg-zinc-900 rounded-full transition-colors"><ChevronLeft size={24} className="text-zinc-400" /></button>
        <div className={`flex items-center space-x-2 ${activeConfig.themeColor}`}>
          {activeConfig.icon}
          <span className="font-bold text-lg tracking-tight hidden sm:inline">{activeConfig.label}</span>
        </div>
        <button onClick={() => setShowListPreview(true)} className="flex items-center space-x-2 bg-zinc-900 px-3 py-1 rounded-full text-sm font-medium border border-zinc-800">
            <List size={14} className="text-zinc-500" />
            <span>{lists[currentMode]?.length || 0}</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center relative p-4" ref={containerRef} onMouseDown={handleDragStart} onMouseMove={handleDragMove} onMouseUp={handleDragEnd} onMouseLeave={handleDragEnd} onTouchStart={handleDragStart} onTouchMove={handleDragMove} onTouchEnd={handleDragEnd}>
        <div className="relative w-full max-w-sm aspect-[2/3] max-h-[600px]">
           {isLoading && movies.length === 0 && (
             <div className="absolute inset-0 flex items-center justify-center z-50">
                <Loader2 size={48} className="text-green-500 animate-spin" />
             </div>
           )}
           {currentIndex + 1 < movies.length && (
            <Card movie={movies[currentIndex + 1]} index={currentIndex + 1} isFront={false} dragOffset={{ x: 0, y: 0 }} dragDirection={null} modeConfig={activeConfig} />
           )}
           {currentIndex < movies.length ? (
             <Card movie={movies[currentIndex]} index={currentIndex} isFront={true} dragOffset={dragOffset} dragDirection={dragOffset.x > 0 ? 'right' : 'left'} modeConfig={activeConfig} />
           ) : (
             !isLoading && (
                 <div className="flex flex-col items-center justify-center h-full text-zinc-500">
                     <p>No more movies found.</p>
                     <button onClick={returnToMenu} className="mt-4 text-white underline">Return to Menu</button>
                 </div>
             )
           )}
        </div>
      </main>
      <footer className="p-6 pb-8 flex justify-center items-center space-x-8 z-20">
        <button onClick={() => finishSwipe('left')} disabled={isLoading || movies.length === 0} className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 text-red-500 flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white hover:border-red-500 hover:scale-110 transition-all duration-200 disabled:opacity-50 disabled:scale-100"><X size={32} strokeWidth={3} /></button>
        <button onClick={() => finishSwipe('right')} disabled={isLoading || movies.length === 0} className={`w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 ${activeConfig.themeColor} flex items-center justify-center shadow-lg hover:${activeConfig.yesBg} hover:text-white hover:${activeConfig.yesBorder} hover:scale-110 transition-all duration-200 disabled:opacity-50 disabled:scale-100`}>
          {currentMode.startsWith('custom_') ? <Plus size={32} strokeWidth={3} /> : (currentMode === 'liked' ? <Heart size={32} strokeWidth={3} /> : <Check size={32} strokeWidth={3} />)}
        </button>
      </footer>
    </div>
  );
}