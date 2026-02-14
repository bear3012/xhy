import React, { useEffect, useRef, useState } from 'react';
import { CAPTAIN_HARDCODED_LOGS } from '../constants';
import { fetchRemoteLogs, sendLog } from '../services/supabaseService';
import { DiaryLog } from '../types';

export const DiarySection: React.FC = () => {
  const [logs, setLogs] = useState<DiaryLog[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  // Default to false (Earth Member), user can toggle to Captain
  const [isCaptainMode, setIsCaptainMode] = useState(false);
  const streamRef = useRef<HTMLDivElement>(null);

  // Format date helper
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getMonth() + 1}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  // Fetch data logic
  const loadData = async () => {
    const remoteLogs = await fetchRemoteLogs();
    const allLogs = [...CAPTAIN_HARDCODED_LOGS, ...remoteLogs].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
    setLogs(prev => {
      if (prev.length !== allLogs.length) {
        return allLogs;
      }
      return prev;
    });
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom when logs change
  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.scrollTop = streamRef.current.scrollHeight;
    }
  }, [logs]);

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || isSending) return;

    setIsSending(true);
    // Pass the current identity mode to the service
    const result = await sendLog(text, isCaptainMode);
    
    if (result.success) {
      setInputValue('');
      await loadData(); 
    } else {
      alert(`信号发射失败：${result.error || '可能是权限不足或网络问题'}`);
    }
    setIsSending(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/20 rounded-t-[25px] backdrop-blur-[15px] border-t border-white/10 p-5 pb-safe">
      <div className="relative mb-4 text-center">
        <div className="text-[1.1rem] font-bold tracking-[2px] text-moon-primary">
          - 轨道通讯日志 -
        </div>
        
        {/* Identity Switcher */}
        <div className="flex justify-center mt-3">
          <div className="flex bg-black/40 rounded-full p-1 border border-white/10">
            <button
              onClick={() => setIsCaptainMode(false)}
              className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                !isCaptainMode 
                  ? 'bg-earth-water text-black shadow-[0_0_10px_rgba(77,166,255,0.4)]' 
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              🌍 地球队员
            </button>
            <button
              onClick={() => setIsCaptainMode(true)}
              className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                isCaptainMode 
                  ? 'bg-moon-primary text-black shadow-[0_0_10px_rgba(255,215,0,0.4)]' 
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              🌕 月球队长
            </button>
          </div>
        </div>
      </div>

      <div 
        ref={streamRef}
        className="flex-1 overflow-y-auto pr-1 mb-4 diary-stream scroll-smooth"
      >
        {logs.map((log, index) => (
          <div key={`${log.created_at}-${index}`} className={`rounded-xl p-3 mb-3 border animate-fade-in ${
            log.is_captain 
              ? 'bg-moon-primary/5 border-moon-primary/20' // Style for Captain logs
              : 'bg-card border-white/5' // Style for Earth logs
          }`}>
            <div className="flex justify-between text-xs text-text-secondary mb-1.5">
              <span className={`font-bold ${log.is_captain ? 'text-moon-primary' : 'text-earth-water'}`}>
                {log.author}
              </span>
              <span>{formatTime(log.created_at)}</span>
            </div>
            <div className="text-[0.9rem] leading-normal break-words whitespace-pre-wrap text-white/90">
              {log.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2.5 items-end">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={isCaptainMode ? "队长，请发送指令..." : "呼叫月球基站..."}
          rows={1}
          className={`flex-1 bg-black/30 border rounded-[18px] px-4 py-2.5 text-white text-[0.9rem] outline-none resize-none h-[42px] placeholder:text-white/30 transition-colors ${
            isCaptainMode ? 'border-moon-primary/50 focus:border-moon-primary' : 'border-white/20 focus:border-earth-water'
          }`}
        />
        <button
          onClick={handleSend}
          disabled={isSending}
          className={`border-none rounded-full w-[42px] h-[42px] font-bold flex justify-center items-center cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-sm transition-all ${
            isCaptainMode 
              ? 'bg-moon-primary text-black shadow-[0_0_10px_rgba(255,215,0,0.4)]' 
              : 'bg-earth-water text-white shadow-[0_0_10px_rgba(77,166,255,0.4)]'
          }`}
        >
          {isSending ? '...' : '发送'}
        </button>
      </div>
    </div>
  );
};