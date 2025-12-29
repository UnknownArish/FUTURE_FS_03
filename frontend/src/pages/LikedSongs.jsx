import { PlayIcon, ClockIcon, HeartIcon } from '@heroicons/react/24/solid';
import { usePlayer } from '../context/PlayerContext';

export default function LikedSongs() {
  const { playTrack } = usePlayer();

  const songs = [
    { 
      id: 1, 
      title: "Liked Song 1", 
      artist: "Artist A", 
      album: "Album A", 
      duration: "3:30", 
      image: "https://placehold.co/40x40/1DB954/FFFFFF?text=1",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    { 
      id: 2, 
      title: "Liked Song 2", 
      artist: "Artist B", 
      album: "Album B", 
      duration: "4:00", 
      image: "https://placehold.co/40x40/1DB954/FFFFFF?text=2",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    { 
      id: 3, 
      title: "Liked Song 3", 
      artist: "Artist C", 
      album: "Album C", 
      duration: "2:50", 
      image: "https://placehold.co/40x40/1DB954/FFFFFF?text=3",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
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
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 opacity-10 blur-[100px] -z-10 pointer-events-none"></div>
        
        <div className="flex items-end gap-6 mb-8">
          <div className="w-52 h-52 bg-gradient-to-br from-purple-700 to-blue-500 flex items-center justify-center rounded-lg shadow-2xl">
            <HeartIcon className="w-24 h-24 text-white" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="uppercase text-xs font-bold tracking-widest text-[var(--text-secondary)]">Playlist</span>
            <h1 className="text-7xl font-black tracking-tighter text-[var(--text-primary)] drop-shadow-2xl mb-2">
              Liked Songs
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
