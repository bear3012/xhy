import React from 'react';
import { MOCK_TIMELINE } from '../constants';
import { Star } from 'lucide-react';

export const OrbitalEvents: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-black/20 rounded-t-[25px] backdrop-blur-[15px] border-t border-white/10 p-5 overflow-y-auto diary-stream">
      <div className="text-[1.1rem] font-bold mb-6 text-center tracking-[2px] text-moon-primary">
        - 轨道大事件 -
      </div>
      
      <div className="relative pl-4">
        {/* Vertical Line */}
        <div className="absolute left-[23px] top-2 bottom-0 w-[2px] border-l-2 border-dashed border-white/20"></div>

        {MOCK_TIMELINE.map((event) => (
          <div key={event.id} className="relative mb-8 pl-8 group">
            {/* Dot */}
            <div className={`absolute left-[15px] top-1 w-4 h-4 rounded-full border-2 border-space-bg1 z-10 ${event.type === 'special' ? 'bg-moon-primary shadow-[0_0_10px_rgba(255,215,0,0.5)]' : 'bg-earth-water'}`}></div>
            
            {/* Content */}
            <div className="bg-card p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-moon-primary font-mono bg-moon-primary/10 px-2 py-0.5 rounded">{event.date}</span>
                {event.type === 'special' && <Star size={12} className="text-moon-primary fill-moon-primary" />}
              </div>
              <h3 className="text-white font-bold text-lg mb-1">{event.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{event.description}</p>
            </div>
          </div>
        ))}
        
        <div className="relative pl-8">
             <div className="bg-card/50 p-4 rounded-xl border border-dashed border-white/10 text-center text-text-secondary text-sm">
                未完待续...
             </div>
        </div>
      </div>
    </div>
  );
};