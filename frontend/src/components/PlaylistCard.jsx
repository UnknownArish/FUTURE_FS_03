// src/components/PlaylistCard.jsx - COMPLETE REPLACEMENT
import { PlayIcon } from '@heroicons/react/24/solid';

export default function PlaylistCard({ title, description, image, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-[var(--bg-tertiary)] p-4 rounded-lg hover:bg-[var(--bg-secondary)] transition-all group cursor-pointer relative"
    >
      <div className="relative mb-4">
        <img src={image} alt={title} className="w-full aspect-square object-cover rounded-md shadow-lg" />
        <button className="absolute bottom-2 right-2 w-12 h-12 bg-[var(--neon-green)] rounded-full flex items-center justify-center shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-105">
          <PlayIcon className="w-6 h-6 text-black ml-1" />
        </button>
      </div>
      <h3 className="font-bold text-[var(--text-primary)] truncate mb-1">{title}</h3>
      <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{description}</p>
    </div>
  );
}
