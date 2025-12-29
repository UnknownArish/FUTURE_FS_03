// src/pages/Music.jsx
import { useState } from 'react';
import PlaylistCard from '../components/PlaylistCard';

export default function Music() {
  const [activeGenre, setActiveGenre] = useState('all');

  const genres = [
    { id: 'all', label: 'All Genres', color: 'from-[var(--neon-green)] to-[var(--cyan)]' },
    { id: 'pop', label: 'Pop', color: 'from-pink-500 to-rose-500' },
    { id: 'rock', label: 'Rock', color: 'from-orange-500 to-red-500' },
    { id: 'hiphop', label: 'Hip-Hop', color: 'from-purple-500 to-indigo-500' },
    { id: 'electronic', label: 'Electronic', color: 'from-cyan-500 to-blue-500' },
    { id: 'jazz', label: 'Jazz', color: 'from-yellow-500 to-amber-500' },
  ];

  const musicPlaylists = [
    {
      id: 'top-50',
      title: 'Global Top 50',
      description: 'The most played songs right now',
      image: 'https://placehold.co/300x300/1DB954/FFFFFF?text=Global+Top+50',
      genre: 'all'
    },
    {
      id: 'viral-hits',
      title: 'Viral Hits',
      description: 'Trending tracks going viral',
      image: 'https://placehold.co/300x300/FF0090/FFFFFF?text=Viral+Hits',
      genre: 'pop'
    },
    {
      id: 'rock-legends',
      title: 'Rock Legends',
      description: 'Iconic rock anthems',
      image: 'https://placehold.co/300x300/8B0000/FFFFFF?text=Rock+Legends',
      genre: 'rock'
    },
    {
      id: 'bass-drops',
      title: 'Bass Drops',
      description: 'Electronic music with heavy bass',
      image: 'https://placehold.co/300x300/0000FF/FFFFFF?text=Bass+Drops',
      genre: 'electronic'
    },
  ];

  const filteredPlaylists = activeGenre === 'all' 
    ? musicPlaylists 
    : musicPlaylists.filter(p => p.genre === activeGenre);

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl p-12 glass">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-green)]/30 via-[var(--cyan)]/20 to-[var(--cyber-pink)]/30"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-3 neon-text text-[var(--text-primary)]">🎵 Music</h1>
          <p className="text-xl text-[var(--text-secondary)]">
            Discover millions of songs from around the world
          </p>
        </div>
      </div>

      {/* Genre Filter Pills */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => setActiveGenre(genre.id)}
            className={`px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all ${
              activeGenre === genre.id
                ? `bg-gradient-to-r ${genre.color} text-white shadow-lg scale-105`
                : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            {genre.label}
          </button>
        ))}
      </div>

      {/* Featured Charts */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-[var(--text-primary)]">Featured Charts</h2>
          <button className="text-[var(--neon-green)] hover:text-[var(--cyan)] font-semibold transition-colors">
            See all →
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredPlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} {...playlist} />
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-[var(--text-primary)]">New Releases</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {musicPlaylists.slice(0, 5).map((playlist) => (
            <PlaylistCard key={playlist.id} {...playlist} />
          ))}
        </div>
      </section>
    </div>
  );
}
