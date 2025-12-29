import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  MagnifyingGlassIcon,
  BellIcon,
  Bars3Icon,
  SunIcon,
  MoonIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
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
            {/* Icon positioned absolutely inside the relative container */}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-[var(--text-secondary)] group-focus-within:text-[var(--text-primary)] transition-colors" aria-hidden="true" />
            </div>
            <input 
              type="text" 
              placeholder="Search for songs, artists, albums, or podcasts..." 
              className="block w-full bg-[var(--bg-tertiary)] text-sm text-[var(--text-primary)] rounded-full py-3 pl-10 pr-4 border border-transparent focus:border-[var(--border-color)] focus:bg-[var(--bg-secondary)] outline-none transition-all placeholder:text-[var(--text-secondary)]"
            />
          </div>
        )}
      </div>

      {/* Right Section: User Actions */}
      <div className="flex items-center gap-4 justify-end flex-shrink-0 relative">
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors relative"
        >
          <BellIcon className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-[var(--cyber-pink)] rounded-full animate-pulse"></span>
        </button>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute top-12 right-16 w-80 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg shadow-2xl p-4 z-50 animate-fade-in-up text-[var(--text-primary)]">
            <h3 className="font-bold mb-3 text-lg text-[var(--text-primary)]">Notifications</h3>
            <div className="space-y-3">
              <div className="flex gap-3 items-start p-2 hover:bg-[var(--bg-tertiary)] rounded-md transition-colors cursor-pointer">
                <div className="w-2 h-2 mt-2 rounded-full bg-[var(--neon-green)] flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">New Album Release</p>
                  <p className="text-xs text-[var(--text-secondary)]">The Weeknd just dropped a new album!</p>
                </div>
              </div>
              <div className="flex gap-3 items-start p-2 hover:bg-[var(--bg-tertiary)] rounded-md transition-colors cursor-pointer">
                <div className="w-2 h-2 mt-2 rounded-full bg-[var(--cyber-pink)] flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Concert Alert</p>
                  <p className="text-xs text-[var(--text-secondary)]">Tickets for Taylor Swift are on sale.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors md:hidden" onClick={onMenuClick}>
          <Bars3Icon className="w-6 h-6" />
        </button>
        
        <button 
          onClick={toggleTheme}
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
           {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
        </button>
        
        <div 
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--neon-green)] to-[var(--cyan)] flex items-center justify-center text-black font-bold text-sm cursor-pointer hover:scale-105 transition-transform shadow-[0_0_1px_rgba(0,0,0,0.2)]"
        >
          U
        </div>

        {/* Profile Dropdown */}
        {showProfileMenu && (
          <div className="absolute top-12 right-0 w-48 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg shadow-2xl py-2 z-50 animate-fade-in-up text-[var(--text-primary)]">
            <div className="px-4 py-2 border-b border-[var(--border-color)] mb-2">
              <p className="font-bold text-sm text-[var(--text-primary)]">UnknownArish</p>
              <p className="text-xs text-[var(--text-secondary)]">Premium Plan</p>
            </div>
            <button 
              onClick={() => { setShowProfileMenu(false); navigate('/settings'); }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--bg-tertiary)] flex items-center gap-2 transition-colors text-[var(--text-primary)]"
            >
              <UserIcon className="w-4 h-4" /> Profile
            </button>
            <button 
              onClick={() => { setShowProfileMenu(false); navigate('/settings'); }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--bg-tertiary)] flex items-center gap-2 transition-colors text-[var(--text-primary)]"
            >
              <Cog6ToothIcon className="w-4 h-4" /> Settings
            </button>
            <div className="border-t border-[var(--border-color)] my-2"></div>
            <button 
              onClick={() => { setShowProfileMenu(false); navigate('/login'); }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--bg-tertiary)] flex items-center gap-2 text-red-400 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" /> Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
