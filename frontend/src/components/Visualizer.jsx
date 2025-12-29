// src/components/Visualizer.jsx
import { useEffect, useRef } from 'react';
import { usePlayer } from '../context/PlayerContext';

export default function Visualizer({ fullscreen = false }) {
  const canvasRef = useRef(null);
  const { audioFrequencies, isPlaying, currentTrack } = usePlayer();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    const height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const draw = () => {
      // Fallback data if no audio frequencies (e.g. CORS issues or silence)
      let data = audioFrequencies;
      if (isPlaying && (data.length === 0 || data.every(f => f === 0))) {
        // Generate fake data for visual effect
        data = new Array(64).fill(0).map(() => Math.random() * 150 + 50);
      }

      if (!isPlaying && data.length === 0) {
        ctx.clearRect(0, 0, width, height);
        return;
      }

      // Clear with fade effect
      ctx.fillStyle = 'rgba(10, 14, 39, 0.2)';
      ctx.fillRect(0, 0, width, height);

      const barWidth = (width / (data.length || 64)) * 2;
      const centerY = height / 2;

      (data.length > 0 ? data : []).forEach((freq, index) => {
        const barHeight = (freq / 255) * (height / 2) * 0.8;
        const x = index * barWidth;
        
        // Create gradient
        const gradient = ctx.createLinearGradient(x, centerY - barHeight, x, centerY + barHeight);
        gradient.addColorStop(0, '#0FFF50'); // Neon green
        gradient.addColorStop(0.5, '#00F0FF'); // Cyan
        gradient.addColorStop(1, '#FF006E'); // Cyber pink

        ctx.fillStyle = gradient;
        
        // Draw symmetrical bars
        ctx.fillRect(x, centerY - barHeight, barWidth - 2, barHeight);
        ctx.fillRect(x, centerY, barWidth - 2, barHeight);

        // Add glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#0FFF50';
      });

      requestAnimationFrame(draw);
    };

    draw();
  }, [audioFrequencies, isPlaying]);

  return (
    <div className={`relative ${fullscreen ? 'w-full h-full' : 'w-full h-20'}`}>
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: 'crisp-edges' }}
      />
      {fullscreen && currentTrack && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            {currentTrack.image && (
              <img 
                src={currentTrack.image} 
                alt={currentTrack.title}
                className="w-64 h-64 mx-auto rounded-lg shadow-2xl mb-8 animate-pulse-slow"
              />
            )}
            <h2 className="text-5xl font-bold neon-text mb-4 text-white">{currentTrack.title}</h2>
            <p className="text-2xl text-[var(--text-secondary)]">{currentTrack.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
