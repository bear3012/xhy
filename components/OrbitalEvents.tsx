import React, { useState, useEffect } from 'react';
import { MOCK_TIMELINE } from '../constants';
import { Star, Plus, Save, X, Calendar as CalendarIcon, Type, FileText } from 'lucide-react';
import { TimelineEvent } from '../types';
import { fetchTimelineEvents, addTimelineEvent } from '../services/supabaseService';

export const OrbitalEvents: React.FC = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // New: Captain Mode Toggle
  const [isCaptainMode, setIsCaptainMode] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    title: '',
    description: ''
  });

  // Load data on mount
  const loadEvents = async () => {
    const remoteEvents = await fetchTimelineEvents();
    // Combine mock data + remote data
    const allEvents = [...MOCK_TIMELINE, ...remoteEvents];
    
    // Sort by date
    const sorted = allEvents.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    setEvents(sorted);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("请填写完整的观测记录信号");
      return;
    }

    setIsSaving(true);

    const newEventPayload = {
      date: formData.date,
      title: formData.title,
      description: formData.description,
      type: isCaptainMode ? 'special' : 'normal', // Captain events are special by default
      is_captain: isCaptainMode
    };

    const result = await addTimelineEvent(newEventPayload as any);

    if (result.success) {
      await loadEvents();
      setFormData({
        date: new Date().toISOString().split('T')[0],
        title: '',
        description: ''
      });
      setIsAdding(false);
    } else {
      alert(`归档失败：${result.error}`);
    }
    
    setIsSaving(false);
  };

  return (
    <div className="flex flex-col h-full bg-black/20 rounded-t-[25px] backdrop-blur-[15px] border-t border-white/10 p-5 overflow-y-auto diary-stream">
      <div className="text-[1.1rem] font-bold mb-6 text-center tracking-[2px] text-moon-primary">
        - 轨道大事件 -
      </div>
      
      <div className="relative pl-4 pb-20">
        {/* Vertical Line */}
        <div className="absolute left-[23px] top-2 bottom-0 w-[2px] border-l-2 border-dashed border-white/20"></div>

        {events.map((event, index) => {
           // Determine style based on is_captain OR type
           const isSpecial = event.type === 'special' || event.is_captain;
           
           return (
            <div key={`${event.id}-${index}`} className="relative mb-8 pl-8 group animate-fade-in">
                {/* Dot */}
                <div className={`absolute left-[15px] top-1 w-4 h-4 rounded-full border-2 border-space-bg1 z-10 ${
                    isSpecial 
                    ? 'bg-moon-primary shadow-[0_0_10px_rgba(255,215,0,0.5)]' 
                    : 'bg-earth-water shadow-[0_0_10px_rgba(77,166,255,0.5)]'
                }`}></div>
                
                {/* Content */}
                <div className={`p-4 rounded-xl border transition-colors ${
                    isSpecial 
                    ? 'bg-moon-primary/5 border-moon-primary/20 hover:bg-moon-primary/10' 
                    : 'bg-card border-white/10 hover:bg-white/10'
                }`}>
                <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                        isSpecial 
                        ? 'text-moon-primary bg-moon-primary/10' 
                        : 'text-earth-water bg-earth-water/10'
                    }`}>{event.date}</span>
                    {isSpecial && <Star size={12} className="text-moon-primary fill-moon-primary" />}
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{event.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">{event.description}</p>
                </div>
            </div>
           );
        })}
        
        {/* Add Event Section */}
        <div className="relative pl-8">
             <div className="absolute left-[15px] top-0 w-4 h-4 rounded-full border-2 border-space-bg1 bg-white/20 z-10"></div>

             {!isAdding ? (
               <button 
                 onClick={() => setIsAdding(true)}
                 className="w-full bg-card/30 p-4 rounded-xl border border-dashed border-white/20 text-text-secondary hover:bg-white/5 hover:border-moon-primary/50 hover:text-moon-primary transition-all flex flex-col items-center gap-2 group"
               >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Plus size={20} />
                  </div>
                  <span className="text-sm tracking-wide">记录新的星际轨道</span>
               </button>
             ) : (
               <div className={`p-4 rounded-xl border animate-fade-in shadow-2xl relative overflow-hidden transition-colors ${
                   isCaptainMode 
                   ? 'bg-moon-primary/10 border-moon-primary/50' 
                   : 'bg-space-bg1/80 border-white/20'
               }`}>
                  {/* Decorative glow */}
                  <div className={`absolute top-0 right-0 w-20 h-20 blur-xl rounded-full -mr-10 -mt-10 pointer-events-none ${
                      isCaptainMode ? 'bg-moon-primary/20' : 'bg-earth-water/20'
                  }`}></div>

                  <div className="flex justify-between items-center mb-4">
                      <h3 className={`text-sm font-bold flex items-center gap-2 ${
                          isCaptainMode ? 'text-moon-primary' : 'text-earth-water'
                      }`}>
                        <Star size={14} className={isCaptainMode ? 'fill-moon-primary' : ''} /> 
                        {isCaptainMode ? '队长日志归档' : '队员观测记录'}
                      </h3>
                      <button onClick={() => setIsAdding(false)} className="text-white/40 hover:text-white">
                        <X size={18} />
                      </button>
                  </div>

                  {/* Identity Toggle */}
                  <div className="flex bg-black/40 rounded-lg p-1 border border-white/10 mb-4">
                        <button
                        onClick={() => setIsCaptainMode(false)}
                        className={`flex-1 py-1.5 rounded-md text-[10px] font-bold transition-all ${
                            !isCaptainMode 
                            ? 'bg-earth-water text-black shadow-[0_0_10px_rgba(77,166,255,0.4)]' 
                            : 'text-text-secondary hover:text-white'
                        }`}
                        >
                        🌍 地球队员
                        </button>
                        <button
                        onClick={() => setIsCaptainMode(true)}
                        className={`flex-1 py-1.5 rounded-md text-[10px] font-bold transition-all ${
                            isCaptainMode 
                            ? 'bg-moon-primary text-black shadow-[0_0_10px_rgba(255,215,0,0.4)]' 
                            : 'text-text-secondary hover:text-white'
                        }`}
                        >
                        🌕 月球队长
                        </button>
                  </div>

                  <div className="space-y-3">
                    {/* Date Input */}
                    <div className="relative group">
                        <div className="absolute left-3 top-2.5 text-white/40 pointer-events-none">
                            <CalendarIcon size={16} />
                        </div>
                        <input 
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                            className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-moon-primary/50 transition-colors [color-scheme:dark]"
                        />
                    </div>

                    {/* Title Input */}
                    <div className="relative group">
                        <div className="absolute left-3 top-2.5 text-white/40 pointer-events-none">
                            <Type size={16} />
                        </div>
                        <input 
                            type="text"
                            placeholder="标题..."
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-moon-primary/50 transition-colors"
                        />
                    </div>

                    {/* Description Input */}
                    <div className="relative group">
                        <div className="absolute left-3 top-2.5 text-white/40 pointer-events-none">
                            <FileText size={16} />
                        </div>
                        <textarea 
                            rows={3}
                            placeholder={isCaptainMode ? "队长，记录下此刻的引力波动..." : "队员，报告今日的观测结果..."}
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-moon-primary/50 transition-colors resize-none"
                        />
                    </div>

                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`w-full font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                            isCaptainMode 
                            ? 'bg-moon-primary text-black shadow-[0_0_15px_rgba(255,215,0,0.3)]' 
                            : 'bg-earth-water text-white shadow-[0_0_15px_rgba(77,166,255,0.3)]'
                        }`}
                    >
                        {isSaving ? (
                            <span>上传数据中...</span>
                        ) : (
                            <>
                                <Save size={16} />
                                <span>确认归档</span>
                            </>
                        )}
                    </button>
                  </div>
               </div>
             )}
        </div>
      </div>
    </div>
  );
};