// src/pages/Search.jsx
import { useState, useEffect } from 'react';
import SongRow from '../components/SongRow';
import { usePlayer } from '../context/PlayerContext';

const categories = [
  { id: 1, title: "Podcasts", color: "from-orange-500 to-red-500", image: "https://picsum.photos/200/200?random=10" },
  { id: 2, title: "Live Events", color: "from-purple-500 to-indigo-500", image: "https://picsum.photos/200/200?random=11" },
  { id: 3, title: "Made For You", color: "from-green-500 to-emerald-700", image: "https://picsum.photos/200/200?random=12" },
  { id: 4, title: "New Releases", color: "from-pink-500 to-rose-500", image: "https://picsum.photos/200/200?random=13" },
  { id: 5, title: "Cyberpunk", color: "from-yellow-400 to-orange-500", image: "https://picsum.photos/200/200?random=14" },
  { id: 6, title: "Synthwave", color: "from-blue-400 to-cyan-300", image: "https://picsum.photos/200/200?random=15" },
  { id: 7, title: "Pop", color: "from-green-400 to-teal-500", image: "https://picsum.photos/200/200?random=16" },
  { id: 8, title: "Hip-Hop", color: "from-orange-400 to-red-400", image: "https://picsum.photos/200/200?random=17" },
  { id: 9, title: "Rock", color: "from-red-600 to-red-900", image: "https://picsum.photos/200/200?random=18" },
  { id: 10, title: "Gaming", color: "from-purple-600 to-blue-600", image: "https://picsum.photos/200/200?random=19" },
  { id: 11, title: "Focus", color: "from-gray-600 to-gray-800", image: "https://picsum.photos/200/200?random=20" },
  { id: 12, title: "Metal", color: "from-red-800 to-black", image: "https://picsum.photos/200/200?random=21" },
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { playTrack } = usePlayer();

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 2) {
        setIsLoading(true);
        try {
          const response = await fetch(`http://localhost:3001/api/search?q=${encodeURIComponent(searchQuery)}`);
          const data = await response.json();
          
          if(data.data) {
             const tracks = data.data.map(track => ({
                id: track.id,
                title: track.title,
                artist: track.artist.name,
                album: track.album.title,
                image: track.album.cover_medium,
                duration: track.duration,
                audio: track.preview
            }));
            setSearchResults(tracks);
          }
        } catch (error) {
          console.error("Search failed:", error);
        } finally {
            setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <div className="space-y-6 pb-24">
      {/* Search Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold neon-text">Search</h1>
        
        {/* Search Input */}
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[var(--text-secondary)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What do you want to listen to?"
            className="w-full pl-14 pr-6 py-4 text-lg rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] border-2 border-[var(--border-color)] focus:border-[var(--neon-green)] focus:ring-2 focus:ring-[var(--neon-green)]/20 transition-all outline-none"
            autoFocus
          />
        </div>
      </div>

      {searchQuery ? (
        <div className="space-y-6">
           {isLoading ? (
               <div className="flex items-center justify-center py-10">
                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
               </div>
           ) : (
             <>
               {searchResults.length > 0 ? (
                 <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold mb-4">Top Results</h2>
                    {searchResults.map((song, index) => (
                       <SongRow 
                          key={song.id} 
                          song={song} 
                          index={index} 
                          onClick={() => playTrack(song, searchResults)}
                       />
                    ))}
                 </div>
               ) : (
                   <div className="text-center py-10 text-[var(--text-secondary)]">
                       No results found for "{searchQuery}"
                   </div>
               )}
             </>
           )}
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Browse all</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {categories.map(category => (
              <div 
                key={category.id} 
                className={`h-48 rounded-lg p-4 relative overflow-hidden bg-gradient-to-br ${category.color} hover:scale-[1.02] transition-transform cursor-pointer group`}
              >
                <h3 className="text-2xl font-bold text-white break-words max-w-[80%]">{category.title}</h3>
                <img 
                  src={category.image} 
                  className="absolute -bottom-4 -right-4 w-28 h-28 rotate-[25deg] shadow-lg rounded-md group-hover:rotate-[30deg] transition-all" 
                  alt={category.title} 
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
