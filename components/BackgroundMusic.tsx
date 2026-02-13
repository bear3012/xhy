import React, { useState, useRef, useEffect } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { BGM_URL } from '../constants';

export const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt autoplay with low volume on mount, but handle browser blocking gracefully
    if (audioRef.current) {
        audioRef.current.volume = 0.4;
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                setIsPlaying(true);
            }).catch(() => {
                // Auto-play was prevented.
                // We don't force it, just let the UI show "paused" state.
                setIsPlaying(false);
            });
        }
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="absolute top-4 right-4 z-50">
      <audio ref={audioRef} src={BGM_URL} loop />
      
      <button 
        onClick={togglePlay}
        className={`w-10 h-10 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md transition-all duration-500 ${
            isPlaying 
            ? 'bg-moon-primary/20 text-moon-primary shadow-[0_0_15px_rgba(255,215,0,0.3)] animate-[spin_4s_linear_infinite]' 
            : 'bg-black/40 text-white/50 hover:bg-white/10'
        }`}
        style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
      >
        {isPlaying ? (
          <Music size={18} />
        ) : (
          <div className="relative">
             <Music size={18} className="opacity-50" />
             <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-[120%] h-[2px] bg-white/50 rotate-45 transform origin-center translate-y-[1px]"></div>
             </div>
          </div>
        )}
      </button>
      
      {/* Visual equalizer bars (CSS only) */}
      {isPlaying && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-[2px] h-[3px]">
              <div className="w-[2px] bg-moon-primary animate-pulse" style={{ animationDuration: '0.6s' }}></div>
              <div className="w-[2px] bg-moon-primary animate-pulse" style={{ animationDuration: '0.8s' }}></div>
              <div className="w-[2px] bg-moon-primary animate-pulse" style={{ animationDuration: '1.0s' }}></div>
          </div>
      )}
    </div>
  );
};