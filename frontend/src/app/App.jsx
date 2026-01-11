// src/app/App.jsx
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Player from '../components/Player';
import AppRouter from './Router';

export default function App() {
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-hidden selection:bg-[var(--neon-green)] selection:text-black">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        />
        
        <div className="flex-1 flex flex-col min-w-0 h-full py-2 pr-2">
           <div className="flex-1 bg-[var(--bg-secondary)] rounded-lg overflow-hidden relative flex flex-col">
              <Topbar onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
              
              <main className="flex-1 overflow-y-auto scrollbar-hide bg-gradient-to-b from-[#1f1f1f] to-[#121212] px-8 py-6">
                <AppRouter />
              </main>
          </div>
        </div>
      </div>

      <Player />
    </div>
  );
}
