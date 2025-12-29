// src/context/PlayerContext.jsx
import { createContext, useContext, useState, useEffect, useRef } from 'react';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // 'off', 'all', 'one'
  const [audioFrequencies, setAudioFrequencies] = useState([]);
  
  const audioRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);

  // Initialize audio context for visualizer
  useEffect(() => {
    if (audioRef.current && !analyserRef.current) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audioRef.current);
      
      analyser.fftSize = 256;
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      
      analyserRef.current = analyser;
    }
  }, [currentTrack]);

  // Visualizer animation
  const updateFrequencies = () => {
    if (analyserRef.current && isPlaying) {
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current.getByteFrequencyData(dataArray);
      setAudioFrequencies(Array.from(dataArray));
      animationRef.current = requestAnimationFrame(updateFrequencies);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      updateFrequencies();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  // Handle audio playback
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Playback failed:", error);
            setIsPlaying(false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  // Handle volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
          if (e.ctrlKey) nextTrack();
          break;
        case 'ArrowLeft':
          if (e.ctrlKey) previousTrack();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, queue, currentIndex]); // Dependencies for closures

  const playTrack = (track, trackQueue = []) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    if (trackQueue.length > 0) {
      setQueue(trackQueue);
      const index = trackQueue.findIndex(t => t.id === track.id);
      setCurrentIndex(index >= 0 ? index : 0);
    }
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (queue.length === 0) return;
    
    let nextIndex;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = (currentIndex + 1) % queue.length;
    }
    
    setCurrentIndex(nextIndex);
    setCurrentTrack(queue[nextIndex]);
    setIsPlaying(true);
  };

  const previousTrack = () => {
    if (queue.length === 0) return;
    
    const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setCurrentTrack(queue[prevIndex]);
    setIsPlaying(true);
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const toggleRepeat = () => {
    const modes = ['off', 'all', 'one'];
    const currentModeIndex = modes.indexOf(repeatMode);
    setRepeatMode(modes[(currentModeIndex + 1) % modes.length]);
  };

  const seek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const changeVolume = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const addToQueue = (track) => {
    setQueue([...queue, track]);
  };

  const removeFromQueue = (index) => {
    const newQueue = queue.filter((_, i) => i !== index);
    setQueue(newQueue);
  };

  return (
    <PlayerContext.Provider value={{
      currentTrack,
      isPlaying,
      queue,
      volume,
      progress,
      duration,
      isShuffle,
      repeatMode,
      audioFrequencies,
      playTrack,
      pauseTrack,
      togglePlay,
      nextTrack,
      previousTrack,
      toggleShuffle,
      toggleRepeat,
      seek,
      changeVolume,
      addToQueue,
      removeFromQueue,
      setProgress,
      setDuration,
      audioRef
    }}>
      {children}
      <audio
        ref={audioRef}
        src={currentTrack?.audio}
        crossOrigin="anonymous"
        onTimeUpdate={(e) => setProgress(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={nextTrack}
      />
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
