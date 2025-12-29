import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  BellIcon,
  Bars3Icon,
  SunIcon
} from '@heroicons/react/24/outline';

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const showSearch = true; 

  return (
    <header className="h-16 bg-black/50 glass sticky top-0 z-30 px-6 flex items-center justify-between backdrop-blur-md border-b border-[var(--border-color)]">
      {/* Left Section: Nav & Search */}
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center gap-2 flex-shrink-0">
          <button 
            onClick={() => navigate(-1)}
            className="p-1 rounded-full bg-black/40 hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            title="Go Back"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button 
            onClick={() => navigate(1)}
            className="p-1 rounded-full bg-black/40 hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            title="Go Forward"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>

        {showSearch && (
          <div className="relative max-w-md w-full ml-4 group">
            <input 
              type="text" 
              placeholder="Search for songs, artists, albums, or podcasts..." 
              className="block w-full bg-[var(--bg-tertiary)] text-sm text-[var(--text-primary)] rounded-full py-3 pl-4 pr-4 border border-transparent focus:border-[var(--border-color)] focus:bg-[var(--bg-secondary)] outline-none transition-all placeholder:text-[var(--text-secondary)]"
            />
          </div>
        )}
      </div>

      {/* Right Section: User Actions */}
      <div className="flex items-center gap-4 justify-end flex-shrink-0">
        <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors relative">
          <BellIcon className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-[var(--cyber-pink)] rounded-full animate-pulse"></span>
        </button>
        
        <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors md:hidden" onClick={onMenuClick}>
          <Bars3Icon className="w-6 h-6" />
        </button>
        
        <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
           <SunIcon className="w-6 h-6" />
        </button>
        
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--neon-green)] to-[var(--cyan)] flex items-center justify-center text-black font-bold text-sm cursor-pointer hover:scale-105 transition-transform shadow-[0_0_10px_rgba(29,185,84,0.3)]">
          U
        </div>
      </div>
    </header>
  );
}
