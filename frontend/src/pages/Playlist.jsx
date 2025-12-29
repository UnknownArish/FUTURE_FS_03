import { useParams } from 'react-router-dom';
import { PlayIcon, ClockIcon, HeartIcon } from '@heroicons/react/24/solid';
import { playlists } from './homePlaylists';
import { usePlayer } from '../context/PlayerContext';

export default function Playlist() {
  const { id } = useParams();
  const { playTrack } = usePlayer();
  
  // Find playlist from mock data or use a default
  // If id is numeric, look in playlists array. If string (user playlist), mock it.
  const playlistId = parseInt(id);
  const playlistData = playlists.find(p => p.id === playlistId) || {
    title: decodeURIComponent(id) || "Unknown Playlist",
    description: "User created playlist",
    image: `https://placehold.co/300x300?text=${id || 'Playlist'}`,
    songs: []
  };

  // Mock songs for the playlist with audio URLs
  const songs = [
    { 
      id: 1, 
      title: "Song 1", 
      artist: "Artist 1", 
      album: "Album 1", 
      duration: "3:00", 
      image: "https://placehold.co/40x40",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
    },
    { 
      id: 2, 
      title: "Song 2", 
      artist: "Artist 2", 
      album: "Album 2", 
      duration: "4:15", 
      image: "https://placehold.co/40x40",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" 
    },
    { 
      id: 3, 
      title: "Song 3", 
      artist: "Artist 3", 
      album: "Album 3", 
      duration: "2:45", 
      image: "https://placehold.co/40x40",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" 
    },
  ];

  const handlePlayPlaylist = () => {
    if (songs.length > 0) {
      playTrack(songs[0], songs);
    }
  };

  return (
    <div className="min-h-screen pb-32">
      <div className="relative pt-10 px-8 pb-6">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--neon-green)] opacity-10 blur-[100px] -z-10 pointer-events-none"></div>
        
        <div className="flex items-end gap-6 mb-8">
          <img 
            src={playlistData.image} 
            alt={playlistData.title}
            className="w-52 h-52 shadow-2xl shadow-[var(--neon-green)]/20 rounded-lg object-cover"
          />
          <div className="flex flex-col gap-2">
            <span className="uppercase text-xs font-bold tracking-widest text-[var(--text-secondary)]">Playlist</span>
            <h1 className="text-7xl font-black tracking-tighter text-[var(--text-primary)] drop-shadow-2xl mb-2">
              {playlistData.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] font-medium">
              <span className="text-[var(--text-primary)]">UnknownArish</span>
              <span>•</span>
              <span>{songs.length} songs</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-4">
              <button 
                onClick={handlePlayPlaylist}
                className="w-14 h-14 rounded-full bg-[var(--neon-green)] text-black flex items-center justify-center hover:scale-105 hover:brightness-110 transition-all shadow-lg shadow-[var(--neon-green)]/40"
              >
                <PlayIcon className="w-7 h-7 ml-1" />
              </button>
              <button className="w-10 h-10 rounded-full border border-[var(--text-secondary)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] transition-all">
                 <HeartIcon className="w-6 h-6" />
              </button>
           </div>
        </div>

        <div className="grid grid-cols-[16px_4fr_3fr_2fr_minmax(120px,1fr)] gap-4 px-4 py-2 text-xs text-[var(--text-secondary)] border-b border-[var(--border-color)] mb-4 uppercase tracking-wider font-semibold">
          <div>#</div>
          <div>Title</div>
          <div>Album</div>
          <div>Date Added</div>
          <div className="text-right"><ClockIcon className="w-5 h-5 inline" /></div>
        </div>

        <div className="space-y-1">
          {songs.map((song, index) => (
            <div 
              key={song.id}
              onClick={() => playTrack(song, songs)}
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
              
              <div className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] text-sm truncate">
                {song.album}
              </div>
              
              <div className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] text-sm">
                2 days ago
              </div>
              
              <div className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] text-sm text-right">
                {song.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
