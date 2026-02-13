import React, { useEffect, useRef, useState } from 'react';
import { CAPTAIN_HARDCODED_LOGS } from '../constants';
import { fetchRemoteLogs, sendLog } from '../services/supabaseService';
import { DiaryLog } from '../types';

export const DiarySection: React.FC = () => {
  const [logs, setLogs] = useState<DiaryLog[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
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
      // Only update if length changes to avoid unnecessary renders/scroll jumps, 
      // though detailed comparison would be better for a real app.
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
    const success = await sendLog(text);
    
    if (success) {
      setInputValue('');
      await loadData(); // Refresh immediately
    } else {
      alert("信号发射失败，请重试！");
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
      <div className="text-[1.1rem] font-bold mb-4 text-center tracking-[2px] text-moon-primary">
        - 轨道通讯日志 -
      </div>

      <div 
        ref={streamRef}
        className="flex-1 overflow-y-auto pr-1 mb-4 diary-stream scroll-smooth"
      >
        {logs.map((log, index) => (
          <div key={`${log.created_at}-${index}`} className="bg-card rounded-xl p-3 mb-3 border border-white/5 animate-fade-in">
            <div className="flex justify-between text-xs text-text-secondary mb-1.5">
              <span className={`font-bold ${log.is_captain ? 'text-moon-primary' : 'text-earth-water'}`}>
                {log.author}
              </span>
              <span>{formatTime(log.created_at)}</span>
            </div>
            <div className="text-[0.9rem] leading-normal break-words whitespace-pre-wrap">
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
          placeholder="输入通讯内容..."
          rows={1}
          className="flex-1 bg-black/30 border border-white/20 rounded-[18px] px-4 py-2.5 text-white text-[0.9rem] outline-none resize-none h-[42px] placeholder:text-white/30"
        />
        <button
          onClick={handleSend}
          disabled={isSending}
          className="bg-moon-primary text-black border-none rounded-full w-[42px] h-[42px] font-bold flex justify-center items-center cursor-pointer shadow-[0_0_10px_rgba(255,215,0,0.4)] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-sm"
        >
          {isSending ? '...' : '发送'}
        </button>
      </div>
    </div>
  );
};