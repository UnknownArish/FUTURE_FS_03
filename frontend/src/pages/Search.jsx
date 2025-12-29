// src/pages/Search.jsx
import { useState } from 'react';
import SongRow from '../components/SongRow';
import PlaylistCard from '../components/PlaylistCard';

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
  const [activeTab, setActiveTab] = useState('all'); // all, songs, playlists, artists

  // Mock search results (replace with real API data)
  const mockSongs = [
    {
      id: 1,
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours',
      duration: 200,
      image: 'https://i.scdn.co/image/ab67616d00001e02a0b8e1c7c7c7c7c7c7c7c7'
    },
    {
      id: 2,
      title: 'Levitating',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      duration: 203,
      image: 'https://i.scdn.co/image/ab67616d00001e02b1b1b1b1b1b1b1b1b1b1b1b1'
    },
  ];

  const mockPlaylists = [
    {
      id: 1,
      title: 'Today\'s Top Hits',
      description: 'The hottest tracks right now',
      image: 'https://i.scdn.co/image/ab67706f00000002c5c5c5c5c5c5c5c5c5c5c5c5'
    },
  ];

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'songs', label: 'Songs' },
    { id: 'playlists', label: 'Playlists' },
    { id: 'artists', label: 'Artists' },
  ];

  return (
    <div className="space-y-6">
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
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[var(--neon-green)] text-black'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results */}
      {searchQuery ? (
        <div className="space-y-8">
          {/* Songs Section */}
          {(activeTab === 'all' || activeTab === 'songs') && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Songs</h2>
              <div className="space-y-1">
                {mockSongs.map((song, index) => (
                  <SongRow
                    key={song.id}
                    song={song}
                    index={index}
                    songs={mockSongs}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Playlists Section */}
          {(activeTab === 'all' || activeTab === 'playlists') && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Playlists</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {mockPlaylists.map((playlist) => (
                  <PlaylistCard key={playlist.id} {...playlist} />
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        /* Browse Categories When No Search */
        <div className="p-8 pb-32 animate-fade-in-up">
          <h2 className="text-3xl font-bold mb-6 neon-text">Browse All</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {categories.map((category) => (
              <div 
                key={category.id}
                className={`
                  relative h-48 rounded-xl overflow-hidden cursor-pointer group 
                  bg-gradient-to-br ${category.color}
                  hover:scale-[1.02] transition-all duration-300
                  shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]
                `}
              >
                {/* Title */}
                <h3 className="absolute top-4 left-4 text-2xl font-bold text-white drop-shadow-md z-10 break-words w-2/3">
                  {category.title}
                </h3>

                {/* Image (Rotated and positioned off-screen like Spotify) */}
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="absolute -bottom-2 -right-2 w-28 h-28 object-cover shadow-2xl transform rotate-[25deg] translate-x-[10%] translate-y-[5%] group-hover:rotate-[30deg] group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Glass Overlay on Hover */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
