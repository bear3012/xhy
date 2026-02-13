import React, { useState } from 'react';
import { MOCK_GALLERY } from '../constants';
import { Quote, X } from 'lucide-react';

export const PlanetaryGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const activeItem = MOCK_GALLERY.find(item => item.id === selectedImage);

  return (
    <div className="flex flex-col h-full bg-black/20 rounded-t-[25px] backdrop-blur-[15px] border-t border-white/10 p-4">
      <div className="text-[1.1rem] font-bold mb-4 text-center tracking-[2px] text-moon-primary">
        - 行星观测影像 -
      </div>

      <div className="grid grid-cols-2 gap-3 overflow-y-auto pb-4 diary-stream flex-1">
        {MOCK_GALLERY.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setSelectedImage(item.id)}
            className="aspect-square relative rounded-xl overflow-hidden cursor-pointer border border-white/10 group"
          >
            <img src={item.imageUrl} alt={item.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2 opacity-100">
              <p className="text-xs text-white truncate w-full">{item.caption}</p>
            </div>
            {item.captainNote && (
               <div className="absolute top-2 right-2 bg-moon-primary text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
                 批注
               </div>
            )}
          </div>
        ))}
        {/* Placeholder for upload */}
        <div className="aspect-square rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-text-secondary opacity-50">
            <span className="text-2xl mb-1">+</span>
            <span className="text-xs">上传观测记录</span>
        </div>
      </div>

      {/* Detail Modal */}
      {activeItem && (
        <div className="absolute inset-0 z-50 bg-space-bg1/95 backdrop-blur-md p-6 flex flex-col justify-center animate-fade-in">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white/50 hover:text-white"
          >
            <X size={24} />
          </button>
          
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-6">
            <img src={activeItem.imageUrl} alt={activeItem.caption} className="w-full max-h-[50vh] object-cover" />
          </div>

          <div className="space-y-4">
            <div>
                <h3 className="text-xl font-bold text-white mb-1">{activeItem.caption}</h3>
                <p className="text-xs text-text-secondary">{activeItem.date}</p>
            </div>

            {activeItem.captainNote && (
                <div className="bg-moon-primary/10 border-l-4 border-moon-primary p-4 rounded-r-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <Quote size={14} className="text-moon-primary fill-moon-primary" />
                        <span className="text-xs font-bold text-moon-primary uppercase tracking-wider">队长批注</span>
                    </div>
                    <p className="text-sm text-white/90 italic leading-relaxed">
                        "{activeItem.captainNote}"
                    </p>
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};