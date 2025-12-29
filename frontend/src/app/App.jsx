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
        
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
          
          <main className="flex-1 overflow-y-auto scrollbar-hide bg-gradient-to-b from-transparent to-black/30 px-8 py-6">
            <AppRouter />
          </main>
        </div>
      </div>

      <Player />
    </div>
  );
}
