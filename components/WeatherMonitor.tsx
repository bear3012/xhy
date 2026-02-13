import React, { useState } from 'react';
import { MOOD_OPTIONS } from '../constants';
import emailjs from '@emailjs/browser';
import { Send, Loader2 } from 'lucide-react';

// 🔴 必填：请去 emailjs.com 注册（免费），并替换下面的ID
// 1. 创建 Service (选择 Gmail 或其他) -> 获取 SERVICE_ID
// 2. 创建 Template (邮件模版) -> 获取 TEMPLATE_ID
//    模版内容建议： "{{to_name}}，地球队员的心情是：{{message}}，心情标签：{{mood_label}}"
// 3. Account -> API Keys -> 获取 PUBLIC_KEY
const EMAILJS_SERVICE_ID = "service_53akskr"; 
const EMAILJS_TEMPLATE_ID = "template_m8ddca6";
const EMAILJS_PUBLIC_KEY = "pemjHYbrYp1_X5FnR";

export const WeatherMonitor: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleMoodSelect = async (mood: typeof MOOD_OPTIONS[0]) => {
    setSelectedMood(mood.label);
    setResponse(mood.response);
    setEmailStatus('sending');

    try {
      // 构建发送给 EmailJS 的数据
      // 对应的模版变量需要在 EmailJS 后台配置 {{mood_label}}, {{message}}, {{time}}
      const templateParams = {
        to_email: '1922679984@qq.com',
        to_name: '队长',
        mood_label: mood.label,
        message: `队员选择了 [${mood.label}]。\n自动回复内容：${mood.response}`,
        time: new Date().toLocaleString(),
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setEmailStatus('success');
    } catch (error) {
      console.error('Email failed:', error);
      setEmailStatus('error');
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/20 rounded-t-[25px] backdrop-blur-[15px] border-t border-white/10 p-5 overflow-y-auto diary-stream">
      <div className="text-[1.1rem] font-bold mb-6 text-center tracking-[2px] text-moon-primary">
        - 地表气象监测 -
      </div>

      {!response ? (
        <div className="flex flex-col items-center justify-center flex-1 space-y-8 animate-fade-in">
          <p className="text-text-secondary text-sm text-center">
            队员，请上报今日地表气象数据
          </p>
          
          <div className="grid grid-cols-3 gap-4 w-full">
            {MOOD_OPTIONS.map((mood) => (
              <button
                key={mood.label}
                onClick={() => handleMoodSelect(mood)}
                className="flex flex-col items-center justify-center p-4 bg-card rounded-2xl border border-white/10 hover:bg-moon-primary/20 hover:border-moon-primary/50 transition-all group"
              >
                <span className="text-4xl mb-2 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform">
                    {mood.icon}
                </span>
                <span className="text-xs font-bold text-white/80">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 animate-fade-in space-y-6">
           <div className="w-16 h-16 rounded-full bg-moon-primary/20 flex items-center justify-center animate-pulse-slow">
               <span className="text-3xl">
                 {MOOD_OPTIONS.find(m => m.label === selectedMood)?.icon}
               </span>
           </div>
           
           <div className="bg-card p-6 rounded-xl border border-moon-primary/30 relative max-w-[90%]">
               <div className="absolute -top-3 left-6 px-2 bg-[#252538] text-moon-primary text-xs font-bold">
                   基站自动回复
               </div>
               <p className="text-white text-center leading-relaxed">
                   {response}
               </p>
           </div>
           
           <div className="text-[10px] text-text-secondary text-center px-4 flex items-center justify-center gap-2">
             {emailStatus === 'sending' && (
                <>
                    <Loader2 size={12} className="animate-spin" />
                    <span>正在向队长发送通知...</span>
                </>
             )}
             {emailStatus === 'success' && (
                <>
                    <Send size={12} className="text-green-400" />
                    <span className="text-green-400">通知已送达 1922679984@qq.com</span>
                </>
             )}
             {emailStatus === 'error' && (
                <span className="text-red-400">信号发射失败，请检查网络</span>
             )}
           </div>

           <button 
             onClick={() => { setResponse(null); setSelectedMood(null); setEmailStatus('idle'); }}
             className="text-xs text-text-secondary underline hover:text-white"
           >
             更新气象数据
           </button>
        </div>
      )}
    </div>
  );
};