import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

// Stages:
// IDLE: Waiting for user click
// METEORS: Meteors flying diagonally (0s - 2.5s)
// DRAWING: XHY starts drawing (2.5s - 5.0s)
// FINISHING: Stars glow, text appears (5.0s - 6.5s)
// EXIT: Fade out (6.5s+)
type Stage = 'IDLE' | 'METEORS' | 'DRAWING' | 'FINISHING' | 'EXIT';

export const IntroScreen: React.FC<Props> = ({ onComplete }) => {
  const [stage, setStage] = useState<Stage>('IDLE');

  const handleStart = () => {
    setStage('METEORS');
    
    // 1. Meteors fly for 2.5 seconds
    setTimeout(() => {
      setStage('DRAWING');
    }, 2500);

    // 2. Drawing takes about 3.5 seconds
    setTimeout(() => {
      setStage('FINISHING');
    }, 6000);

    // 3. Hold finish state
    setTimeout(() => {
      setStage('EXIT');
    }, 7500);

    // 4. Complete
    setTimeout(() => {
      onComplete();
    }, 8500);
  };

  // Generate random meteors
  const meteors = Array.from({ length: 15 }).map((_, i) => ({
    top: `${Math.random() * 60}%`, 
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 1.5}s`, 
    duration: `${0.8 + Math.random() * 0.5}s`,
    width: `${100 + Math.random() * 100}px`
  }));

  return (
    <div 
      className={`fixed inset-0 z-[100] w-full h-full flex flex-col items-center justify-center bg-[#0d0d18] transition-opacity duration-1000 ${
        stage === 'EXIT' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 🌌 Phase 1: Meteor Shower (Diagonal) */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${stage === 'METEORS' ? 'opacity-100' : 'opacity-0'}`}>
        {meteors.map((m, i) => (
            <div 
            key={i}
            className="absolute h-[2px] bg-gradient-to-r from-transparent via-white to-transparent animate-meteor-fall"
            style={{
                top: m.top,
                left: m.left,
                width: m.width,
                animationDelay: m.delay,
                animationDuration: m.duration,
                boxShadow: '0 0 10px rgba(255,255,255,0.5)'
            }}
            />
        ))}
      </div>

      {/* 🌟 IDLE State: Start Button */}
      {stage === 'IDLE' && (
        <div className="text-center z-10 animate-fade-in">
          <button 
            onClick={handleStart}
            className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-full cursor-pointer"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="absolute inset-0 border border-white/30 rounded-full"></div>
            <div className="flex items-center gap-2 text-white/80 tracking-[4px] text-sm group-hover:text-white transition-colors">
              <Sparkles size={16} />
              <span>点亮星空</span>
            </div>
          </button>
        </div>
      )}

      {/* ✨ Phase 2 & 3: XHY Romantic Drawing */}
      {(stage === 'DRAWING' || stage === 'FINISHING' || stage === 'EXIT') && (
        <div className="relative w-full max-w-md px-4 aspect-video flex items-center justify-center">
            {/* 
              XHY in WHITE.
              Perfect Symmetrical Heart surrounding the text.
            */}
            <svg 
              viewBox="0 0 320 180" 
              className={`w-full h-full transition-all duration-1000 ${stage === 'FINISHING' || stage === 'EXIT' ? 'drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]' : ''}`}
            >
                {/* 使用纯白色 stroke-white 替代渐变，确保 H 能清晰显示 */}
                <g className="stroke-white stroke-[3] fill-none stroke-linecap-round stroke-linejoin-round">
                    
                    {/* --- X (保持原样) --- */}
                    <path d="M 50 55 Q 65 75 80 105" className="animate-draw-line" style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: '0.0s' }} />
                    <path d="M 80 55 Q 65 75 50 105" className="animate-draw-line" style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: '0.3s' }} />

                    {/* --- H (改为直线，修复不显示问题) --- */}
                    {/* 左竖线 */}
                    <path d="M 115 50 L 115 110" className="animate-draw-line" style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: '0.8s' }} />
                    {/* 右竖线 */}
                    <path d="M 165 50 L 165 110" className="animate-draw-line" style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: '1.0s' }} />
                    {/* 横线 (直) */}
                    <path d="M 115 80 L 165 80" className="animate-draw-line" style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: '1.3s' }} />

                    {/* --- Y (去除弯钩，改为直线) --- */}
                    {/* 左分叉 */}
                    <path d="M 200 55 L 215 80" className="animate-draw-line" style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: '1.6s' }} />
                    {/* 右分叉 */}
                    <path d="M 230 55 L 215 80" className="animate-draw-line" style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: '1.7s' }} />
                    {/* 垂直向下 (无弯钩) */}
                    <path d="M 215 80 L 215 110" className="animate-draw-line" style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: '1.8s' }} />

                    {/* --- Perfect Heart (Surrounding) --- */}
                    <path 
                      d="M 140 35
                         C 140 0, 30 0, 30 65
                         C 30 110, 100 145, 140 170
                         C 180 145, 250 110, 250 65
                         C 250 0, 140 0, 140 35 Z"
                      className="animate-draw-line stroke-pink-300/80"
                      style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: '2.4s', strokeWidth: 2 }} 
                    />
                </g>
            </svg>
        </div>
      )}
      
      {/* Caption */}
      <div className={`absolute bottom-20 flex flex-col items-center gap-2 transition-opacity duration-1000 ${stage === 'FINISHING' || stage === 'EXIT' ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-xs text-white/60 tracking-[4px] uppercase font-light">
             Written in the Stars
          </div>
      </div>
    </div>
  );
};