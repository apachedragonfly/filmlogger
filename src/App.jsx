import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Check, Film, RotateCcw, List, Download, FileSpreadsheet, Heart, Clock, Eye, ChevronLeft, Key, Loader2, Star, Filter, Layers, Trash2, AlertTriangle } from 'lucide-react';

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

// --- STATIC DATA (Built-in for Offline Mode) ---
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
  { id: 21, title: "The Shining", year: "1980", director: "Stanley Kubrick", rating: 8.2, genre_ids: [27, 53], poster: "https://image.tmdb.org/t/p/w780/xmbU4JTUm8qAMqM8KMkHRr0uU65.jpg", overview: "Jack Torrance accepts a caretaker job at the Overlook Hotel, where he, along with his wife Wendy and their son Danny, must live isolated from the rest of the world.", isStatic: true },
  { id: 22, title: "WALL·E", year: "2008", director: "Andrew Stanton", rating: 8.3, genre_ids: [16, 10751, 878], poster: "https://image.tmdb.org/t/p/w780/h1B7tW0t399VDjAcWbP8m8urSo4.jpg", overview: "WALL·E is the last robot left on an Earth that has been overrun with garbage and all humans have fled to outer space.", isStatic: true },
  { id: 23, title: "Django Unchained", year: "2012", director: "Quentin Tarantino", rating: 8.1, genre_ids: [18, 37], poster: "https://image.tmdb.org/t/p/w780/7oWY8VDWW7thTzWh3OKQTFZrmN5.jpg", overview: "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.", isStatic: true },
  { id: 24, title: "Alien", year: "1979", director: "Ridley Scott", rating: 8.1, genre_ids: [27, 878], poster: "https://image.tmdb.org/t/p/w780/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg", overview: "During its return to the earth, commercial spaceship Nostromo intercepts a distress signal from a distant planet.", isStatic: true },
  { id: 25, title: "Oldboy", year: "2003", director: "Park Chan-wook", rating: 8.2, genre_ids: [18, 53, 9648], poster: "https://image.tmdb.org/t/p/w780/pWDtjs568Zf42BpMEwKxDwirIKp.jpg", overview: "With no clue how he came to be imprisoned, drugged and tortured for 15 years, a desperate businessman seeks revenge on his captors.", isStatic: true },
  { id: 26, title: "Princess Mononoke", year: "1997", director: "Hayao Miyazaki", rating: 8.3, genre_ids: [12, 14, 16], poster: "https://image.tmdb.org/t/p/w780/cMyJU9UaMF84yI6YpCq170ZtN5P.jpg", overview: "Ashitaka, a prince of the disappearing Emishi people, is cursed by a demonized boar god and must journey to the west to find a cure.", isStatic: true },
  { id: 27, title: "Coco", year: "2017", director: "Lee Unkrich", rating: 8.2, genre_ids: [16, 10751, 14, 10402], poster: "https://image.tmdb.org/t/p/w780/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg", overview: "Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz.", isStatic: true },
  { id: 28, title: "Avengers: Infinity War", year: "2018", director: "Anthony Russo", rating: 8.2, genre_ids: [12, 28, 878], poster: "https://image.tmdb.org/t/p/w780/7WsyChQLEftFiDOVTGjy3PDTuE5.jpg", overview: "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos.", isStatic: true },
  { id: 29, title: "Your Name.", year: "2016", director: "Makoto Shinkai", rating: 8.5, genre_ids: [10749, 16, 18], poster: "https://image.tmdb.org/t/p/w780/q719jXXEzOoYaps6babgKnONONX.jpg", overview: "High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places.", isStatic: true },
  { id: 30, title: "Top Gun: Maverick", year: "2022", director: "Joseph Kosinski", rating: 8.2, genre_ids: [28, 18], poster: "https://image.tmdb.org/t/p/w780/62HCnUTziyWcpDaBO2i1DX17ljH.jpg", overview: "After more than thirty years of service as one of the Navy’s top aviators, and dodging the advancement in rank that would ground him, Pete “Maverick” Mitchell finds himself training a detachment of TOP GUN graduates.", isStatic: true }
];

// --- CONFIGURATION ---
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w780';

// --- FILTER CONSTANTS ---
const GENRES = [
    { id: 'all', label: 'All Genres' },
    { id: 28, label: 'Action' },
    { id: 16, label: 'Animation' },
    { id: 35, label: 'Comedy' },
    { id: 80, label: 'Crime' },
    { id: 18, label: 'Drama' },
    { id: 14, label: 'Fantasy' },
    { id: 27, label: 'Horror' },
    { id: 878, label: 'Sci-Fi' },
    { id: 53, label: 'Thriller' },
];

const DECADES = [
    { id: 'all', label: 'All Time' },
    { id: '2020', label: '2020s' },
    { id: '2010', label: '2010s' },
    { id: '2000', label: '2000s' },
    { id: '1990', label: '1990s' },
    { id: '1980', label: '1980s' },
    { id: 'old', label: 'Classics (<1980)' },
];

const SORTS = [
    { id: 'popularity.desc', label: 'Most Popular' },
    { id: 'vote_average.desc', label: 'Top Rated' },
    { id: 'primary_release_date.desc', label: 'Newest' },
];

// --- MODE CONFIGURATION ---
const MODES = {
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
  },
  liked: {
    id: 'liked',
    label: 'Did you like it?',
    yesLabel: 'LIKED',
    noLabel: 'MEH',
    yesColor: 'text-pink-400',
    yesBorder: 'border-pink-400',
    yesBg: 'bg-pink-500',
    icon: <Heart size={24} />,
    themeColor: 'text-pink-500'
  }
};

// --- API UTILS ---
const fetchWithCredits = async (apiKey, page = 1, filters) => {
  try {
    // Construct API URL based on filters
    let url = `${TMDB_BASE_URL}/discover/movie?api_key=${apiKey}&language=en-US&sort_by=${filters.sort}&page=${page}&vote_count.gte=200`;
    
    if (filters.genre !== 'all') {
        url += `&with_genres=${filters.genre}`;
    }

    if (filters.year !== 'all') {
        const currentYear = new Date().getFullYear();
        if (filters.year === '2020') url += `&primary_release_date.gte=2020-01-01&primary_release_date.lte=${currentYear}-12-31`;
        if (filters.year === '2010') url += `&primary_release_date.gte=2010-01-01&primary_release_date.lte=2019-12-31`;
        if (filters.year === '2000') url += `&primary_release_date.gte=2000-01-01&primary_release_date.lte=2009-12-31`;
        if (filters.year === '1990') url += `&primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-12-31`;
        if (filters.year === '1980') url += `&primary_release_date.gte=1980-01-01&primary_release_date.lte=1989-12-31`;
        if (filters.year === 'old') url += `&primary_release_date.lte=1979-12-31`;
    }

    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.results) throw new Error("Invalid API Response");

    const enrichedMovies = await Promise.all(
      data.results.map(async (movie) => {
        try {
          // Fetch credits for director
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
            isStatic: false
          };
        } catch (e) {
          return { ...movie, director: 'Unknown', isStatic: false };
        }
      })
    );

    return enrichedMovies;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

const Card = ({ movie, index, isFront, dragOffset, dragDirection, modeConfig }) => {
  // SAFEGUARD: Return null if movie doesn't exist (protects against undefined errors)
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
           <p><span className="text-zinc-500 uppercase text-[10px] font-bold tracking-wider">Director</span> {movie.director}</p>
        </div>
        <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed max-w-prose opacity-80">
          {movie.overview}
        </p>
      </div>
    </div>
  );
};

export default function App() {
  // Initialize from localStorage if available
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('tmdb_api_key') || '');
  const [useStatic, setUseStatic] = useState(() => !localStorage.getItem('tmdb_api_key'));
  
  const [appState, setAppState] = useState('menu'); 
  const [currentMode, setCurrentMode] = useState('watched');
  
  // --- FILTERS STATE ---
  const [filters, setFilters] = useState({
    genre: 'all',
    year: 'all',
    sort: 'popularity.desc'
  });
  const [showFilters, setShowFilters] = useState(false);

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // --- LISTS INITIALIZATION FROM LOCAL STORAGE ---
  const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem('film_logger_lists');
    return savedLists ? JSON.parse(savedLists) : { watched: [], watchlist: [], liked: [] };
  });

  // --- SAVE LISTS TO LOCAL STORAGE ---
  useEffect(() => {
    localStorage.setItem('film_logger_lists', JSON.stringify(lists));
  }, [lists]);

  // --- MODAL STATE ---
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showListPreview, setShowListPreview] = useState(false);

  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [showSettings, setShowSettings] = useState(false);

  const activeConfig = MODES[currentMode];

  const loadMovies = useCallback(async (pageNum, reset = false) => {
    setIsLoading(true);
    
    let newMovies = [];
    
    if (useStatic) {
        // --- OFFLINE FILTERING LOGIC ---
        let filteredStatic = [...STATIC_MOVIES];
        
        // Genre Filter
        if (filters.genre !== 'all') {
            filteredStatic = filteredStatic.filter(m => m.genre_ids && m.genre_ids.includes(Number(filters.genre)));
        }
        // Year Filter (Approximate for static)
        if (filters.year !== 'all') {
            const y = parseInt(filters.year);
            filteredStatic = filteredStatic.filter(m => {
                const mYear = parseInt(m.year);
                if (filters.year === 'old') return mYear < 1980;
                return mYear >= y && mYear < y + 10;
            });
        }
        
        // Sort
        if (filters.sort === 'vote_average.desc') {
             filteredStatic.sort((a, b) => b.rating - a.rating);
        } else if (filters.sort === 'primary_release_date.desc') {
             filteredStatic.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        } else {
             // Default shuffle for popularity feel
             filteredStatic.sort(() => Math.random() - 0.5);
        }

        if (pageNum === 1) {
            newMovies = filteredStatic;
        } else {
            setIsLoading(false);
            return;
        }
    } else {
        // --- API FILTERING LOGIC ---
        if (apiKey) {
            newMovies = await fetchWithCredits(apiKey, pageNum, filters);
        }
    }
    
    if (reset) {
        setMovies(newMovies);
        setCurrentIndex(0);
    } else {
        setMovies(prev => [...prev, ...newMovies]);
    }
    setIsLoading(false);
  }, [apiKey, useStatic, filters]);

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
      // No need to close settings immediately, let user see it's cleared
  };

  const selectMode = (modeKey) => {
    setCurrentMode(modeKey);
    setAppState('playing');
    setPage(1);
    loadMovies(1, true);
  };

  const returnToMenu = () => {
    setAppState('menu');
    setDragOffset({ x: 0, y: 0 });
  };

  const finishSwipe = (direction) => {
    // SAFEGUARD: Check if movie exists before processing
    const currentMovie = movies[currentIndex];
    if (!currentMovie) return;

    if (direction === 'right') {
      setLists(prev => ({ ...prev, [currentMode]: [...prev[currentMode], currentMovie] }));
    }
    setDragOffset({ x: 0, y: 0 });
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    if (!useStatic && movies.length - nextIndex < 4 && !isLoading) {
        const nextPage = page + 1;
        setPage(nextPage);
        loadMovies(nextPage, false);
    }
  };

  const handleDragStart = (e) => {
    if (isLoading) return;
    // SAFEGUARD: Don't start drag if index is invalid
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
    if (dragOffset.x > threshold) finishSwipe('right');
    else if (dragOffset.x < -threshold) finishSwipe('left');
    else setDragOffset({ x: 0, y: 0 });
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
        if(appState !== 'playing' || isLoading) return;
        if (e.key === 'ArrowRight') finishSwipe('right');
        if (e.key === 'ArrowLeft') finishSwipe('left');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [appState, currentIndex, movies.length, isLoading]);

  const downloadCSV = () => {
    const currentList = lists[currentMode];
    // Added 'tmdbID' as required by Letterboxd import format
    let headers = ['tmdbID', 'Title', 'Year', 'Directors'];
    const escapeCsv = (text) => {
        if (typeof text === 'string' && (text.includes(',') || text.includes('"'))) return `"${text.replace(/"/g, '""')}"`;
        return text;
    };
    // Included movie.id in the mapper
    let rowMapper = (movie) => [movie.id, escapeCsv(movie.title), movie.year, escapeCsv(movie.director)];
    
    if (currentMode === 'watchlist') {
        headers.push('Watchlist');
        rowMapper = (movie) => [movie.id, escapeCsv(movie.title), movie.year, escapeCsv(movie.director), 'true'];
    } else if (currentMode === 'liked') {
        headers.push('Like');
        rowMapper = (movie) => [movie.id, escapeCsv(movie.title), movie.year, escapeCsv(movie.director), 'true'];
    }
    const rows = currentList.map(rowMapper);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `letterboxd_${currentMode}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const confirmClear = () => {
      setLists(prev => ({ ...prev, [currentMode]: [] }));
      setShowClearConfirm(false);
  };

  // --- RENDER: MENU ---
  if (appState === 'menu') {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 font-sans animate-in fade-in duration-500">
        
        {/* API Settings Toggle */}
        <div className="absolute top-6 right-6">
            <button onClick={() => setShowSettings(!showSettings)} className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors border border-zinc-800">
                <Key size={20} className={apiKey ? "text-green-500" : "text-zinc-500"} />
            </button>
        </div>
        {showSettings && (
            <div className="absolute top-20 right-6 w-72 bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-xl z-50 animate-in slide-in-from-top-2">
                <h3 className="font-bold mb-2 text-sm">API Settings</h3>
                <input 
                    type="text" 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Paste TMDB Key..." 
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg py-2 px-3 text-xs text-white mb-2"
                />
                <button onClick={handleKeySubmit} className="w-full bg-green-600 text-white text-xs font-bold py-2 rounded-lg">
                    Save & Go Online
                </button>
                
                {/* Clear Key Button */}
                {localStorage.getItem('tmdb_api_key') && (
                    <button onClick={clearApiKey} className="w-full mt-2 bg-red-900/30 text-red-400 border border-red-900/50 text-xs font-bold py-2 rounded-lg hover:bg-red-900/50 transition-colors">
                        Remove Key
                    </button>
                )}

                {!apiKey && <p className="text-[10px] text-zinc-500 mt-2">Currently using Offline Mode (30 movies)</p>}
            </div>
        )}

        <div className="mb-8 text-center">
           <p className="text-xs font-mono text-zinc-500 mb-2 uppercase tracking-widest">{useStatic ? 'OFFLINE' : 'ONLINE'} • {movies.length} CACHED</p>
           <div className="flex items-center justify-center space-x-3">
                <FilmLoggerIcon className="text-blue-500 w-12 h-12" />
                <h1 className="text-4xl font-bold tracking-tighter">Film<span className="text-blue-500">Logger</span></h1>
           </div>
        </div>

        {/* FILTER SECTION */}
        <div className="w-full max-w-md mb-6 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800">
            <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setShowFilters(!showFilters)}>
                <div className="flex items-center space-x-2 text-sm font-bold text-zinc-300">
                    <Filter size={16} />
                    <span>Discovery Filters</span>
                </div>
                <span className="text-xs text-zinc-500">{filters.genre === 'all' && filters.year === 'all' ? 'Default (Popular)' : 'Custom Active'}</span>
            </div>

            {showFilters && (
                <div className="space-y-4 animate-in slide-in-from-top-2">
                    <div>
                        <label className="block text-xs text-zinc-500 uppercase font-bold mb-2">Sort By</label>
                        <div className="flex flex-wrap gap-2">
                            {SORTS.map(s => (
                                <button key={s.id} onClick={() => setFilters({...filters, sort: s.id})} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${filters.sort === s.id ? 'bg-white text-black border-white' : 'bg-zinc-950 text-zinc-400 border-zinc-800'}`}>{s.label}</button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs text-zinc-500 uppercase font-bold mb-2">Genre</label>
                        <div className="flex flex-wrap gap-2">
                            {GENRES.map(g => (
                                <button key={g.id} onClick={() => setFilters({...filters, genre: g.id})} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${filters.genre === g.id ? 'bg-white text-black border-white' : 'bg-zinc-950 text-zinc-400 border-zinc-800'}`}>{g.label}</button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs text-zinc-500 uppercase font-bold mb-2">Decade</label>
                        <div className="flex flex-wrap gap-2">
                            {DECADES.map(d => (
                                <button key={d.id} onClick={() => setFilters({...filters, year: d.id})} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${filters.year === d.id ? 'bg-white text-black border-white' : 'bg-zinc-950 text-zinc-400 border-zinc-800'}`}>{d.label}</button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>

        <div className="w-full max-w-md space-y-3">
          {Object.values(MODES).map((mode) => (
            <button key={mode.id} onClick={() => selectMode(mode.id)} className="w-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-600 p-5 rounded-xl flex items-center justify-between group transition-all hover:scale-[1.02] active:scale-95">
                <div className="flex items-center space-x-4">
                <div className={`p-3 bg-white/5 ${mode.themeColor} rounded-xl`}>
                    {mode.icon}
                </div>
                <div className="text-left">
                    <h3 className="font-bold text-base">{mode.label}</h3>
                </div>
                </div>
                <div className="text-zinc-600 group-hover:translate-x-1 transition-transform">→</div>
            </button>
          ))}
        </div>
        
        <div className="mt-8">
            <button onClick={() => setAppState('summary')} className="text-zinc-500 hover:text-white text-sm flex items-center space-x-2 transition-colors">
                <FileSpreadsheet size={16} />
                <span>Export & Summary</span>
            </button>
        </div>
      </div>
    );
  }

  // --- RENDER: SUMMARY ---
  if (appState === 'summary') {
    const activeList = lists[currentMode];
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 font-sans relative">
        
        {/* CONFIRMATION MODAL */}
        {showClearConfirm && (
           <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50 animate-in fade-in duration-200">
              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 max-w-xs text-center shadow-2xl transform scale-100">
                 <div className="w-12 h-12 bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle size={24} />
                 </div>
                 <h3 className="text-xl font-bold mb-2 text-white">Clear List?</h3>
                 <p className="text-zinc-400 mb-6 text-sm">This will remove all movies from your <span className="text-white font-bold">{MODES[currentMode].label}</span> list. This action cannot be undone.</p>
                 <div className="flex space-x-3">
                    <button onClick={() => setShowClearConfirm(false)} className="flex-1 py-3 rounded-xl bg-zinc-800 font-bold text-zinc-300 hover:bg-zinc-700 transition-colors">Cancel</button>
                    <button onClick={confirmClear} className="flex-1 py-3 rounded-xl bg-red-600 font-bold text-white hover:bg-red-500 transition-colors">Clear</button>
                 </div>
              </div>
           </div>
        )}

        <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-6 shadow-2xl border border-zinc-800 text-center">
           <div className="flex justify-center space-x-4 mb-6">
                {Object.values(MODES).map(m => (
                    <button key={m.id} onClick={() => setCurrentMode(m.id)} className={`p-2 rounded-lg transition-all ${currentMode === m.id ? `bg-white/10 ${m.themeColor}` : 'text-zinc-600 hover:text-zinc-400'}`}>
                        {m.icon}
                    </button>
                ))}
           </div>
          <h2 className="text-2xl font-bold mb-2">{activeConfig.label}</h2>
          <p className="text-zinc-400 mb-6">You have {activeList.length} movies in this list.</p>
          <div className="bg-zinc-950 rounded-xl p-4 mb-6 max-h-60 overflow-y-auto text-left border border-zinc-800 scrollbar-thin scrollbar-thumb-zinc-700">
            {activeList.length === 0 ? <p className="text-center text-zinc-600 italic py-4">No movies added yet.</p> : (
              <ul className="space-y-3">
                {activeList.map((m, i) => (
                  <li key={i} className="flex items-center space-x-3 text-zinc-300">
                    <div className="w-8 h-12 bg-zinc-800 rounded overflow-hidden shrink-0">
                        <img src={m.isStatic === false ? `${IMAGE_BASE_URL}${m.poster_path}` : m.poster} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="overflow-hidden text-left">
                        <p className="truncate font-medium text-sm">{m.title}</p>
                        <p className="text-zinc-600 text-xs">{m.year} • {m.director}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="space-y-3">
             {activeList.length > 0 && (
                <>
                    <button onClick={downloadCSV} className={`w-full ${activeConfig.yesBg} text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 hover:brightness-110 transition-all`}>
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
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden flex flex-col font-sans relative">
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
                  {lists[currentMode].length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-zinc-500 opacity-50">
                          <Film size={48} className="mb-2" />
                          <p>No movies yet</p>
                      </div>
                  ) : (
                      <div className="grid grid-cols-1 gap-3">
                          {lists[currentMode].filter(Boolean).map((m, i) => (
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
        <button 
            onClick={() => setShowListPreview(true)}
            className="flex items-center space-x-2 bg-zinc-900 px-3 py-1 rounded-full text-sm font-medium border border-zinc-800 hover:bg-zinc-800 transition-colors active:scale-95"
        >
            <List size={14} className="text-zinc-500" />
            <span>{lists[currentMode].length}</span>
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
                     {useStatic && <p className="text-xs mt-2 opacity-50">Try changing filters or using an API key.</p>}
                     <button onClick={returnToMenu} className="mt-4 text-white underline">Return to Menu</button>
                 </div>
             )
           )}
        </div>
      </main>
      <footer className="p-6 pb-8 flex justify-center items-center space-x-8 z-20">
        <button onClick={() => finishSwipe('left')} disabled={isLoading || movies.length === 0} className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 text-red-500 flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white hover:border-red-500 hover:scale-110 transition-all duration-200 disabled:opacity-50 disabled:scale-100"><X size={32} strokeWidth={3} /></button>
        <button onClick={() => finishSwipe('right')} disabled={isLoading || movies.length === 0} className={`w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 ${activeConfig.themeColor} flex items-center justify-center shadow-lg hover:${activeConfig.yesBg} hover:text-white hover:${activeConfig.yesBorder} hover:scale-110 transition-all duration-200 disabled:opacity-50 disabled:scale-100`}>
          {currentMode === 'liked' ? <Heart size={32} strokeWidth={3} /> : <Check size={32} strokeWidth={3} />}
        </button>
      </footer>
    </div>
  );
}