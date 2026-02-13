import React, { useEffect, useState } from 'react';
import { START_SYNC_DATE } from '../constants';

export const SystemStage: React.FC = () => {
  const [timerString, setTimerString] = useState('00天 00:00:00');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = now.getTime() - START_SYNC_DATE.getTime();
      
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      
      const pad = (num: number) => num.toString().padStart(2, '0');
      setTimerString(`${d}天 ${pad(h)}:${pad(m)}:${pad(s)}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative w-[280px] h-[280px] flex justify-center items-center scale-90">
        {/* Earth */}
        <div 
          className="w-[80px] h-[80px] rounded-full absolute z-10 shadow-[inset_-8px_-8px_15px_rgba(0,0,0,0.3),_0_0_20px_rgba(77,166,255,0.4)]"
          style={{
            background: 'radial-gradient(circle at 40% 40%, #66cc99 20%, #4da6ff 80%)'
          }}
        />
        
        {/* Orbit */}
        <div className="w-[220px] h-[220px] border-[1.5px] border-dashed border-white/20 rounded-full absolute animate-orbit-rotate">
          {/* Moon Container (Counter Rotates to keep moon upright/positioned relative to orbit) */}
          <div className="absolute -top-[15px] left-1/2 -translate-x-1/2 animate-counter-rotate">
            {/* Moon - Removed Outer Glow */}
            <div 
              className="w-[30px] h-[30px] rounded-full animate-moon-phase"
              style={{
                background: 'radial-gradient(circle at 50% 100%, #fffebb 10%, #ffd700 60%, #cca000 100%)'
              }}
            />
          </div>
        </div>
      </div>

      <div className="-mt-2.5 bg-black/30 px-4 py-1.5 rounded-[20px] border border-white/10 text-[0.8rem] tracking-widest backdrop-blur-sm z-20">
        引力同步：<span className="text-moon-primary font-bold">{timerString}</span>
      </div>
    </>
  );
};