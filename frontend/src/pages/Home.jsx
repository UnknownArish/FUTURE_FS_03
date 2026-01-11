// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlaylistCard from '../components/PlaylistCard';
import { playlists } from './homePlaylists';
import { usePlayer } from '../context/PlayerContext';

export default function Home() {
  const { playTrack } = usePlayer();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('Good evening');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  // Quick access items (Spotify-style top grid)
  const quickPicks = playlists.slice(0, 6);

  // Mood-based categories
  const moodCategories = [
    {
      name: '🎵 For You Today',
      description: 'AI-curated based on your listening habits',
      playlists: playlists.slice(0, 3),
    },
    {
      name: '😊 Feel Good Vibes',
      description: 'Happy and energetic tracks',
      playlists: [
        {
          id: 4,
          title: 'Energy Boost',
          description: 'High-energy tracks to pump you up',
          image: 'https://placehold.co/300x300/FF4500/FFFFFF?text=Energy+Boost'
        },
        {
          id: 5,
          title: 'Happy Hits',
          description: 'Feel-good songs that make you smile',
          image: 'https://placehold.co/300x300/FFD700/000000?text=Happy+Hits'
        }
      ],
    },
    {
      name: '😌 Chill & Relax',
      description: 'Peaceful vibes for relaxation',
      playlists: [
        {
          id: 6,
          title: 'Lo-Fi Beats',
          description: 'Chill lo-fi hip hop to relax/study to',
          image: 'https://placehold.co/300x300/4B0082/FFFFFF?text=Lo-Fi+Beats'
        },
        {
          id: 7,
          title: 'Ambient Dreams',
          description: 'Atmospheric soundscapes',
          image: 'https://placehold.co/300x300/00CED1/FFFFFF?text=Ambient+Dreams'
        }
      ],
    },
  ];

  return (
    <div className="space-y-10 animate-fade-in-up pb-24">
      {/* Greeting & Quick Grid */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold neon-text">{greeting}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickPicks.map((playlist) => (
            <div 
              key={playlist.id}
              onClick={() => navigate(`/playlist/${playlist.id}`)}
              className="flex items-center gap-4 bg-[var(--bg-secondary)]/60 hover:bg-[var(--bg-secondary)] rounded-[4px] overflow-hidden cursor-pointer transition-colors group"
            >
              <img 
                src={playlist.image} 
                alt={playlist.title} 
                className="w-20 h-20 object-cover shadow-lg"
              />
              <div className="flex-1 py-2 pr-4 flex items-center justify-between">
                <span className="font-bold truncate text-[var(--text-primary)]">{playlist.title}</span>
                {/* Play button that appears on hover */}
                <div className="w-12 h-12 rounded-full bg-[var(--neon-green)] flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all mr-2 hover:scale-105">
                  <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mood-based Categories */}
      {moodCategories.map((category, index) => (
        <section key={index} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1 hover:underline cursor-pointer decoration-[var(--text-primary)] text-[var(--text-primary)]">{category.name}</h2>
              <p className="text-sm text-[var(--text-secondary)]">
                {category.description}
              </p>
            </div>
            <button className="text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] tracking-widest uppercase transition-colors">
              Show All
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {category.playlists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                title={playlist.title}
                description={playlist.description}
                image={playlist.image}
                id={playlist.id}
                onClick={() => navigate(`/playlist/${playlist.id}`)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
