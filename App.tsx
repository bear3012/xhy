import React, { useState } from 'react';
import { StarBackground } from './components/StarBackground';
import { SystemStage } from './components/SystemStage';
import { DiarySection } from './components/DiarySection';
import { OrbitalEvents } from './components/OrbitalEvents';
import { WeatherMonitor } from './components/WeatherMonitor';
import { TimeCapsule } from './components/TimeCapsule';
import { ModuleNavigation } from './components/ModuleNavigation';
import { BackgroundMusic } from './components/BackgroundMusic';
import { AppModule } from './types';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<AppModule>('diary');

  const renderModule = () => {
    switch (activeModule) {
      case 'diary': return <DiarySection />;
      case 'timeline': return <OrbitalEvents />;
      case 'mood': return <WeatherMonitor />;
      case 'capsule': return <TimeCapsule />;
      default: return <DiarySection />;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-space-bg1 to-space-bg2 font-sans text-text-primary flex flex-col">
      <StarBackground />
      
      <div className="flex-1 flex flex-col w-full h-full max-w-md mx-auto relative z-10">
        {/* Top Section: Visual Stage */}
        <div className="flex-[0_0_42%] flex flex-col justify-center items-center relative transition-all duration-500 ease-in-out">
          <BackgroundMusic />
          <SystemStage />
        </div>

        {/* Bottom Section: Active Module */}
        <div className="flex-1 overflow-hidden relative">
          {renderModule()}
        </div>
        
        {/* Navigation Bar */}
        <div className="flex-shrink-0 z-50">
           <ModuleNavigation activeModule={activeModule} onChange={setActiveModule} />
        </div>
      </div>
    </div>
  );
};

export default App;