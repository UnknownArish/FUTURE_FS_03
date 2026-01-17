// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlaylistCard from '../components/PlaylistCard';
import { usePlayer } from '../context/PlayerContext';

export default function Home() {
  const { playTrack } = usePlayer();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('Good evening');
  const [topTracks, setTopTracks] = useState([]);
  const [topPlaylists, setTopPlaylists] = useState([]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    // Fetch Real Trending Data
    fetch('http://localhost:3001/api/chart')
      .then(res => res.json())
      .then(data => {
        if(data.tracks && data.tracks.data) {
           const tracks = data.tracks.data.map(track => ({
             id: track.id,
             title: track.title,
             artist: track.artist.name,
             album: track.album.title,
             image: track.album.cover_medium,
             duration: track.duration,
             audio: track.preview
           }));
           setTopTracks(tracks);
        }
        
         if(data.playlists && data.playlists.data) {
             const playlists = data.playlists.data.map(p => ({
                 id: p.id,
                 title: p.title,
                 description: `By ${p.user.name}`,
                 image: p.picture_medium
             }));
             setTopPlaylists(playlists);
         }
      })
      .catch(err => console.error("Failed to fetch chart", err));
  }, []);

  return (
    <div className="space-y-10 animate-fade-in-up pb-24">
      {/* Greeting & Quick Grid (Replaced with Real Top Tracks) */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold neon-text">{greeting}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(topTracks.length > 0 ? topTracks.slice(0, 6) : []).map((track) => (
            <div 
              key={track.id}
              onClick={() => playTrack(track, topTracks)} 
              // Using track as playlist entry for now to play directly
              className="flex items-center gap-4 bg-[var(--bg-secondary)]/60 hover:bg-[var(--bg-secondary)] rounded-[4px] overflow-hidden cursor-pointer transition-colors group"
            >
              <img 
                src={track.image} 
                alt={track.title} 
                className="w-20 h-20 object-cover shadow-lg"
              />
              <div className="flex-1 py-2 pr-4 flex items-center justify-between min-w-0">
                <div className="mr-2 overflow-hidden">
                    <span className="font-bold truncate text-[var(--text-primary)] block">{track.title}</span>
                    <span className="text-xs text-[var(--text-secondary)] truncate block">{track.artist}</span>
                </div>
                {/* Play button that appears on hover */}
                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[var(--neon-green)] flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all mr-2 hover:scale-105">
                  <svg className="w-5 h-5 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

       {/* Real Top Playlists */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
             <h2 className="text-2xl font-bold mb-1 hover:underline cursor-pointer decoration-[var(--text-primary)] text-[var(--text-primary)]">Global Top Playlists</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {topPlaylists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                title={playlist.title}
                description={playlist.description}
                image={playlist.image}
                id={playlist.id}
              />
            ))}
          </div>
        </section>

    </div>
  );
}
