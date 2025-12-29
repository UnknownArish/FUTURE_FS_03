// src/components/QueuePanel.jsx
import { usePlayer } from '../context/PlayerContext';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function QueuePanel({ isOpen, onClose }) {
  const { queue, currentTrack, removeFromQueue, playTrack } = usePlayer();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <aside className="fixed right-0 top-0 bottom-0 w-96 bg-[var(--bg-primary)] glass border-l border-[var(--border-color)] z-50 flex flex-col animate-slide-in-left">
        {/* Header */}
        <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Queue</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Current Track */}
        {currentTrack && (
          <div className="p-6 border-b border-[var(--border-color)] bg-[var(--neon-green)]/10">
            <p className="text-xs text-[var(--text-secondary)] mb-2">Now Playing</p>
            <div className="flex items-center gap-3">
              {currentTrack.image && (
                <img 
                  src={currentTrack.image} 
                  alt={currentTrack.title}
                  className="w-12 h-12 rounded object-cover"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate text-[var(--text-primary)]">{currentTrack.title}</p>
                <p className="text-sm text-[var(--text-secondary)] truncate">
                  {currentTrack.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Queue List */}
        <div className="flex-1 overflow-y-auto p-6">
          {queue.length === 0 ? (
            <p className="text-center text-[var(--text-secondary)] mt-8">
              Queue is empty
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-[var(--text-secondary)] mb-3">Next in Queue</p>
              {queue.map((track, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--bg-secondary)] cursor-pointer group transition-all"
                  onClick={() => playTrack(track, queue)}
                >
                  {track.image && (
                    <img 
                      src={track.image} 
                      alt={track.title}
                      className="w-10 h-10 rounded object-cover"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-sm text-[var(--text-primary)]">{track.title}</p>
                    <p className="text-xs text-[var(--text-secondary)] truncate">
                      {track.description}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromQueue(index);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-2 hover:bg-[var(--bg-tertiary)] rounded transition-all"
                  >
                    <TrashIcon className="w-4 h-4 text-[var(--text-secondary)]" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
