// src/components/Player.jsx
import { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { 
  PlayIcon, 
  PauseIcon, 
  ForwardIcon, 
  BackwardIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowsPointingOutIcon,
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  MicrophoneIcon,
  ComputerDesktopIcon,
  XMarkIcon
} from '@heroicons/react/24/solid';
import Visualizer from './Visualizer';

export default function Player() {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlay, 
    nextTrack, 
    previousTrack,
    isShuffle,
    toggleShuffle,
    repeatMode,
    toggleRepeat,
    volume,
    changeVolume,
    progress,
    duration,
    seek
  } = usePlayer();

  const [isMuted, setIsMuted] = useState(false);
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [showDevices, setShowDevices] = useState(false);

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    seek(time);
  };

  const formatTime = (time) => {
    if (!time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleMute = () => {
    if (isMuted) {
      changeVolume(0.5);
      setIsMuted(false);
    } else {
      changeVolume(0);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (newVolume) => {
    changeVolume(newVolume);
    if (newVolume > 0 && isMuted) setIsMuted(false);
    if (newVolume === 0) setIsMuted(true);
  };

  if (!currentTrack) return null;

  return (
    <>
      
      {/* Visualizer Overlay */}
      {showVisualizer && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button 
            onClick={() => setShowVisualizer(false)}
            className="absolute top-4 right-4 text-white hover:text-[var(--neon-green)] z-50"
          >
            <XMarkIcon className="w-8 h-8" />
          </button>
          <div className="w-full h-full p-8">
             <Visualizer fullscreen={true} />
          </div>
          <div className="absolute bottom-10 left-0 right-0 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">{currentTrack.title}</h2>
            <p className="text-[var(--text-secondary)]">{currentTrack.artist}</p>
          </div>
        </div>
      )}

      {/* Lyrics Overlay */}
      {showLyrics && (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center p-8 overflow-hidden">
          <button 
            onClick={() => setShowLyrics(false)}
            className="absolute top-4 right-4 text-white hover:text-[var(--neon-green)] z-50"
          >
            <XMarkIcon className="w-8 h-8" />
          </button>
          
          <div className="flex gap-8 w-full max-w-6xl h-full">
            {/* Left: Album Art & Info */}
            <div className="hidden md:flex flex-col justify-center w-1/3">
              <img 
                src={currentTrack.image} 
                alt={currentTrack.title} 
                className="w-full aspect-square object-cover rounded-lg shadow-2xl mb-6"
              />
              <h2 className="text-3xl font-bold text-white mb-2">{currentTrack.title}</h2>
              <p className="text-xl text-[var(--text-secondary)]">{currentTrack.artist}</p>
            </div>

            {/* Right: Lyrics */}
            <div className="flex-1 h-full overflow-y-auto no-scrollbar flex flex-col items-center justify-center text-center space-y-8 mask-image-gradient">
              <p className="text-2xl md:text-4xl font-bold text-[var(--text-secondary)] opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                (Instrumental Intro)
              </p>
              <p className="text-2xl md:text-4xl font-bold text-white scale-110 transition-transform">
                This is a demo of the lyrics feature
              </p>
              <p className="text-2xl md:text-4xl font-bold text-[var(--text-secondary)] opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                Sing along to your favorite tracks
              </p>
              <p className="text-2xl md:text-4xl font-bold text-[var(--text-secondary)] opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                Lyrics would scroll automatically here
              </p>
              <p className="text-2xl md:text-4xl font-bold text-[var(--text-secondary)] opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                Based on the current playback time
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Devices Overlay */}
      {showDevices && (
        <div className="fixed bottom-24 right-4 w-72 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl shadow-2xl p-4 z-50 animate-fade-in-up">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[var(--text-primary)]">Connect to a device</h3>
            <button onClick={() => setShowDevices(false)}><svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-[var(--bg-tertiary)] rounded-lg text-[var(--neon-green)]">
              <ComputerDesktopIcon className="w-6 h-6" />
              <div>
                <p className="font-bold text-sm">Web Player (Current)</p>
                <p className="text-xs opacity-80">Listening on this browser</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 hover:bg-[var(--bg-tertiary)] rounded-lg text-[var(--text-secondary)] cursor-pointer transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              <div>
                <p className="font-medium text-sm">iPhone 13 Pro</p>
                <p className="text-xs">Spotify Connect</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-24 bg-[var(--bg-primary)] border-t border-[var(--border-color)] px-4 flex items-center justify-between z-40">
        
        {/* Track Info */}
        <div className="w-1/4 flex items-center gap-4">
          <div className="relative group">
            <img 
              src={currentTrack.image} 
              alt={currentTrack.title} 
              className={`w-14 h-14 rounded shadow-lg ${isPlaying ? 'animate-pulse-slow' : ''}`}
            />
            <button 
              onClick={() => setShowVisualizer(true)}
              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded"
            >
              <ArrowsPointingOutIcon className="w-6 h-6 text-white" />
            </button>
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold text-sm truncate hover:underline cursor-pointer text-[var(--text-primary)]">{currentTrack.title}</h4>
            <p className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer transition-colors">{currentTrack.artist}</p>
          </div>
          <button className="text-[var(--text-secondary)] hover:text-[var(--neon-green)] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex-1 flex flex-col items-center max-w-2xl px-4">
          <div className="flex items-center gap-6 mb-2">
            <button 
              onClick={toggleShuffle}
              className={`transition-colors ${isShuffle ? 'text-[var(--neon-green)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`} 
              title="Shuffle"
            >
              <ArrowsRightLeftIcon className="w-5 h-5" />
            </button>
            <button onClick={previousTrack} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              <BackwardIcon className="w-6 h-6" />
            </button>
            <button 
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              {isPlaying ? (
                <PauseIcon className="w-6 h-6" />
              ) : (
                <PlayIcon className="w-6 h-6 ml-1" />
              )}
            </button>
            <button onClick={nextTrack} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              <ForwardIcon className="w-6 h-6" />
            </button>
            <button 
              onClick={toggleRepeat}
              className={`transition-colors ${repeatMode !== 'off' ? 'text-[var(--neon-green)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`} 
              title={`Repeat ${repeatMode === 'one' ? 'One' : 'All'}`}
            >
              <ArrowPathIcon className="w-5 h-5" />
              {repeatMode === 'one' && <span className="absolute text-[8px] font-bold -mt-2 ml-2">1</span>}
            </button>
          </div>
          
          <div className="w-full flex items-center gap-2 text-xs text-[var(--text-secondary)] font-mono">
            <span>{formatTime(progress)}</span>
            <div className="flex-1 h-1 bg-[var(--bg-tertiary)] rounded-full relative group cursor-pointer">
              <div 
                className="absolute top-0 left-0 h-full bg-[var(--text-primary)] rounded-full group-hover:bg-[var(--neon-green)] transition-colors"
                style={{ width: `${(progress / duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={progress}
                onChange={handleSeek}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume & Extra Controls */}
        <div className="w-1/4 flex items-center justify-end gap-3">
          {/* Lyrics Toggle */}
          <button
            onClick={() => setShowLyrics(!showLyrics)}
            className={`p-2 transition-all hover:scale-110 ${showLyrics ? 'text-[var(--neon-green)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
            title="Lyrics"
          >
            <MicrophoneIcon className="w-5 h-5" />
          </button>

          {/* Devices */}
          <button
            onClick={() => setShowDevices(!showDevices)}
            className={`p-2 transition-all hover:scale-110 ${showDevices ? 'text-[var(--neon-green)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
            title="Connect to a device"
          >
            <ComputerDesktopIcon className="w-5 h-5" />
          </button>

          {/* Visualizer Toggle */}
          <button
            onClick={() => setShowVisualizer(true)}
            className="p-2 hover:text-[var(--neon-green)] transition-colors"
            aria-label="Show Visualizer"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="10" width="2" height="8" rx="1"/>
              <rect x="7" y="6" width="2" height="12" rx="1"/>
              <rect x="11" y="8" width="2" height="10" rx="1"/>
              <rect x="15" y="4" width="2" height="16" rx="1"/>
              <rect x="19" y="7" width="2" height="12" rx="1"/>
            </svg>
          </button>

          {/* Volume Control */}
          <div className="flex items-center gap-2 group w-32">
            <button 
              onClick={toggleMute}
              className="p-2 hover:text-[var(--neon-green)] transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <SpeakerXMarkIcon className="w-5 h-5" />
              ) : (
                <SpeakerWaveIcon className="w-5 h-5" />
              )}
            </button>
            
            {/* Custom Volume Slider */}
            <div className="flex-1 h-1 bg-[var(--bg-tertiary)] rounded-full relative cursor-pointer group/vol">
              <div 
                className="absolute top-0 left-0 h-full bg-[var(--text-primary)] rounded-full group-hover/vol:bg-[var(--neon-green)] transition-colors"
                style={{ width: `${isMuted ? 0 : volume * 100}%` }}
              >
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover/vol:opacity-100 transition-opacity" />
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => changeVolume(parseFloat(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
