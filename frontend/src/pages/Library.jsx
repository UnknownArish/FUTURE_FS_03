// src/pages/Library.jsx
import { useState } from 'react';
import { PlayIcon, HeartIcon, ClockIcon } from '@heroicons/react/24/solid';

// Mock Data (Replace with real data later)
const librarySongs = [
  { id: 1, title: "Save Your Tears", artist: "The Weeknd", album: "After Hours", duration: "3:35", image: "https://placehold.co/40x40/1DB954/FFFFFF?text=SYT", added: "2 days ago" },
  { id: 2, title: "Good 4 U", artist: "Olivia Rodrigo", album: "SOUR", duration: "2:58", image: "https://placehold.co/40x40/1DB954/FFFFFF?text=G4U", added: "5 days ago" },
  { id: 3, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:20", image: "https://placehold.co/40x40/1DB954/FFFFFF?text=BL", added: "1 week ago" },
  { id: 4, title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:23", image: "https://placehold.co/40x40/1DB954/FFFFFF?text=Lev", added: "2 weeks ago" },
];

export default function Library() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Playlists', 'Artists', 'Albums'];

  return (
    <div className="min-h-screen pb-32">
      {/* Hero Section with Gradient Blob */}
      <div className="relative pt-10 px-8 pb-6">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--neon-green)] opacity-10 blur-[100px] -z-10 pointer-events-none"></div>
        
        <div className="flex items-end gap-6 mb-8">
          <div className="w-52 h-52 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl shadow-[var(--neon-green)]/20 flex items-center justify-center rounded-lg transform hover:scale-105 transition-transform duration-500">
            <HeartIcon className="w-24 h-24 text-white drop-shadow-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="uppercase text-xs font-bold tracking-widest text-[var(--text-secondary)]">Playlist</span>
            <h1 className="text-7xl font-black tracking-tighter text-[var(--text-primary)] drop-shadow-2xl mb-2">
              Your Library
            </h1>
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] font-medium">
              <span className="text-[var(--text-primary)]">UnknownArish</span>
              <span>•</span>
              <span>{librarySongs.length} songs</span>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-4">
              <button className="w-14 h-14 rounded-full bg-[var(--neon-green)] text-black flex items-center justify-center hover:scale-105 hover:brightness-110 transition-all shadow-lg shadow-[var(--neon-green)]/40">
                <PlayIcon className="w-7 h-7 ml-1" />
              </button>
              <button className="w-10 h-10 rounded-full border border-[var(--text-secondary)] flex items-center justify-center text-[var(--text-secondary)] hover:border-white hover:text-white transition-all">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </button>
           </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-3 mb-6 sticky top-0 z-10 py-4 bg-[var(--bg-primary)]/80 backdrop-blur-md -mx-8 px-8 border-b border-[var(--border-color)]">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeFilter === filter
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)] shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border-transparent hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-[16px_4fr_3fr_2fr_minmax(120px,1fr)] gap-4 px-4 py-2 text-xs text-[var(--text-secondary)] border-b border-[var(--border-color)] mb-4 uppercase tracking-wider font-semibold">
          <div>#</div>
          <div>Title</div>
          <div>Album</div>
          <div>Date Added</div>
          <div className="text-right"><ClockIcon className="w-5 h-5 inline" /></div>
        </div>

        {/* Song List */}
        <div className="space-y-1">
          {librarySongs.map((song, index) => (
            <div 
              key={song.id}
              className="group grid grid-cols-[16px_4fr_3fr_2fr_minmax(120px,1fr)] gap-4 px-4 py-3 rounded-md hover:bg-[var(--bg-secondary)] transition-colors items-center cursor-pointer"
            >
              <div className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] text-sm">
                <span className="group-hover:hidden">{index + 1}</span>
                <PlayIcon className="w-4 h-4 hidden group-hover:block text-[var(--text-primary)]" />
              </div>
              
              <div className="flex items-center gap-4">
                <img src={song.image} alt={song.title} className="w-10 h-10 rounded shadow-md" />
                <div>
                  <div className="font-medium text-[var(--text-primary)] group-hover:text-[var(--neon-green)] transition-colors truncate">
                    {song.title}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                    {song.artist}
                  </div>
                </div>
              </div>

              <div className="text-sm text-[var(--text-secondary)] group-hover:text-white transition-colors truncate">
                {song.album}
              </div>

              <div className="text-sm text-[var(--text-secondary)] group-hover:text-white transition-colors">
                {song.added}
              </div>

              <div className="text-sm text-[var(--text-secondary)] text-right font-mono">
                {song.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
