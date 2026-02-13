import React from 'react';
import { MOCK_CAPSULES } from '../constants';
import { Lock, Unlock, Hourglass } from 'lucide-react';

export const TimeCapsule: React.FC = () => {
  const calculateDaysLeft = (dateStr: string) => {
    const diff = new Date(dateStr).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="flex flex-col h-full bg-black/20 rounded-t-[25px] backdrop-blur-[15px] border-t border-white/10 p-5 overflow-y-auto diary-stream">
      <div className="text-[1.1rem] font-bold mb-6 text-center tracking-[2px] text-moon-primary">
        - 跨越光年的延迟信号 -
      </div>

      <div className="space-y-4">
        {MOCK_CAPSULES.map((capsule) => {
           const daysLeft = calculateDaysLeft(capsule.unlockDate);
           
           return (
            <div key={capsule.id} className={`relative p-5 rounded-xl border overflow-hidden ${
                capsule.isLocked 
                ? 'bg-space-bg1/50 border-white/10' 
                : 'bg-moon-primary/10 border-moon-primary/30'
            }`}>
                {/* Background Pattern for locked */}
                {capsule.isLocked && (
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #1a1a2e 25%, #1a1a2e 75%, #000 75%, #000)',
                        backgroundPosition: '0 0, 10px 10px',
                        backgroundSize: '20px 20px'
                    }}></div>
                )}

                <div className="relative z-10 flex justify-between items-start mb-3">
                    <div>
                        <h3 className={`font-bold text-lg ${capsule.isLocked ? 'text-text-secondary' : 'text-moon-primary'}`}>
                            {capsule.title}
                        </h3>
                        <p className="text-xs text-text-secondary mt-1">解锁时间: {capsule.unlockDate}</p>
                    </div>
                    <div className={`p-2 rounded-full ${capsule.isLocked ? 'bg-white/5' : 'bg-moon-primary/20'}`}>
                        {capsule.isLocked ? <Lock size={18} className="text-text-secondary" /> : <Unlock size={18} className="text-moon-primary" />}
                    </div>
                </div>

                {capsule.isLocked ? (
                    <div className="flex items-center gap-2 text-earth-water text-sm font-mono mt-4">
                        <Hourglass size={14} className="animate-spin" style={{ animationDuration: '3s' }} />
                        <span>信号传输中... 剩余 {daysLeft} 天</span>
                    </div>
                ) : (
                    <div className="mt-2 text-white/90 text-sm leading-relaxed border-t border-moon-primary/20 pt-3">
                        {capsule.content}
                    </div>
                )}
            </div>
           );
        })}
      </div>
    </div>
  );
};