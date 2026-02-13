import React from 'react';

export const StarBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-0 filter blur-[20px]">
      <div 
        className="absolute w-full h-full"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 100, 150, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)
          `
        }}
      />
    </div>
  );
};