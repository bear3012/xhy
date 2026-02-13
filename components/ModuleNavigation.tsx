import React from 'react';
import { AppModule } from '../types';
import { MessageSquare, Calendar, CloudRain, Clock } from 'lucide-react';

interface Props {
  activeModule: AppModule;
  onChange: (module: AppModule) => void;
}

export const ModuleNavigation: React.FC<Props> = ({ activeModule, onChange }) => {
  const modules: { id: AppModule; icon: React.ReactNode; label: string }[] = [
    { id: 'diary', icon: <MessageSquare size={18} />, label: '日志' },
    { id: 'timeline', icon: <Calendar size={18} />, label: '轨道' },
    { id: 'mood', icon: <CloudRain size={18} />, label: '气象' },
    { id: 'capsule', icon: <Clock size={18} />, label: '信号' },
  ];

  return (
    <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto no-scrollbar w-full border-t border-white/5 bg-space-bg1/50 backdrop-blur-md justify-around">
      {modules.map((m) => (
        <button
          key={m.id}
          onClick={() => onChange(m.id)}
          className={`flex flex-col items-center justify-center min-w-[50px] p-2 rounded-xl transition-all ${
            activeModule === m.id 
              ? 'bg-moon-primary text-black shadow-[0_0_10px_rgba(255,215,0,0.4)] scale-105' 
              : 'text-text-secondary hover:bg-white/5 hover:text-white'
          }`}
        >
          <div className="mb-1">{m.icon}</div>
          <span className="text-[10px] font-bold">{m.label}</span>
        </button>
      ))}
    </div>
  );
};