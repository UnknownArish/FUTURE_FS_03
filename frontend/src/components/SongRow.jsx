// src/components/SongRow.jsx
import { PlayIcon } from '@heroicons/react/24/solid';

export default function SongRow({ song, index, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center gap-4 p-2 rounded-md hover:bg-[var(--bg-secondary)] cursor-pointer group transition-colors"
    >
      <div className="w-8 text-center text-[var(--text-secondary)] group-hover:hidden">
        {index + 1}
      </div>
      <div className="w-8 hidden group-hover:flex justify-center text-[var(--text-primary)]">
        <PlayIcon className="w-4 h-4" />
      </div>
      
      <img src={song.image} alt={song.title} className="w-10 h-10 rounded" />
      
      <div className="flex-1 min-w-0">
        <div className="text-[var(--text-primary)] font-medium truncate">{song.title}</div>
        <div className="text-sm text-[var(--text-secondary)] truncate">{song.artist}</div>
      </div>
      
      <div className="hidden md:block text-sm text-[var(--text-secondary)] w-1/3 truncate">
        {song.album}
      </div>
      
      <div className="text-sm text-[var(--text-secondary)] font-mono">
        {Math.floor(song.duration / 60)}:{String(song.duration % 60).padStart(2, '0')}
      </div>
    </div>
  );
}
