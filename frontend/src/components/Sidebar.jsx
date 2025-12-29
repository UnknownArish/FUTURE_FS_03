// src/components/Sidebar.jsx - COMPLETE REPLACEMENT
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  BuildingLibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  ClockIcon,
  MusicalNoteIcon,
  MicrophoneIcon,
  BookOpenIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/solid';

const ChevronRightIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
  </svg>
);

const PlusIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
  </svg>
);

export default function Sidebar({ isCollapsed, onToggle }) {
  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Home' },
    { path: '/search', icon: MagnifyingGlassIcon, label: 'Search' },
    { path: '/library', icon: BuildingLibraryIcon, label: 'Your Library' },
  ];

  const categoryItems = [
    { path: '/music', icon: MusicalNoteIcon, label: 'Music' },
    { path: '/podcasts', icon: MicrophoneIcon, label: 'Podcasts' },
    { path: '/audiobooks', icon: BookOpenIcon, label: 'Audiobooks' },
  ];

  const collectionItems = [
    { path: '/liked', icon: HeartIcon, label: 'Liked Songs' },
    { path: '/recent', icon: ClockIcon, label: 'Recently Played' },
  ];

  // Mock user playlists
  const myPlaylists = [
    "Cyberpunk 2077 OST",
    "Coding Focus",
    "Late Night Drive",
    "Gym Phonk",
    "Synthwave Essentials",
    "Top 50 Global",
    "Discover Weekly"
  ];

  return (
    <aside 
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } bg-[var(--bg-secondary)]/60 glass border-r border-[var(--border-color)] flex flex-col transition-all duration-300 relative animate-slide-in-left h-full`}
    >
      {/* Logo & Toggle */}
      <div className="p-6 flex items-center justify-between flex-shrink-0">
        {!isCollapsed && (
          <div className="flex items-center gap-2 animate-fade-in-up">
            {/* Logo Icon */}
            <div className="w-8 h-8 bg-gradient-to-br from-[var(--neon-green)] to-[var(--cyan)] rounded-full flex items-center justify-center shadow-[0_0_15px_var(--neon-green)] flex-shrink-0">
              <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.42c-.18.3-.58.39-.88.21-2.42-1.48-5.47-1.81-9.07-.99-.33.07-.66-.14-.73-.47-.07-.33.14-.66.47-.73 3.96-.9 7.35-.53 10.01 1.1.3.18.39.58.21.88zm1.26-2.8c-.23.37-.72.49-1.09.26-2.85-1.75-7.19-2.26-10.55-1.24-.41.12-.84-.11-.96-.52-.12-.41.11-.84.52-.96 3.82-1.16 8.64-.59 11.83 1.37.37.23.49.72.26 1.09zm.11-2.92c-3.41-2.03-9.05-2.21-12.31-1.22-.52.16-1.07-.13-1.23-.65-.16-.52.13-1.07.65-1.23 3.76-1.14 10.01-.93 13.94 1.41.47.28.62.89.34 1.36-.28.47-.89.62-1.36.34z"/>
              </svg>
            </div>
            {/* Logo Text */}
            <h1 className="text-xl font-bold tracking-tight leading-none">
              <span className="text-[var(--text-primary)] block text-xs tracking-[0.2em] opacity-80">SPOTIFY</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--neon-green)] via-[var(--cyan)] to-[var(--cyber-pink)] font-black italic text-lg drop-shadow-[0_0_5px_rgba(29,185,84,0.5)]">
                REVISED
              </span>
            </h1>
          </div>
        )}
        <button 
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-6 h-6 text-[var(--neon-green)]" />
          ) : (
            <ChevronLeftIcon className="w-6 h-6 text-[var(--neon-green)]" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-6 overflow-y-auto scrollbar-hide">
        {/* Main Navigation */}
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-lg transition-all group ${
                  isActive
                    ? 'bg-[var(--neon-green)]/20 text-[var(--neon-green)] neon-glow'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-6 h-6 flex-shrink-0 ${isActive ? 'animate-pulse-slow' : ''}`} />
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Categories */}
        {!isCollapsed && (
          <div className="space-y-1">
            <h3 className="px-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
              Categories
            </h3>
            {categoryItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[var(--cyan)]/20 text-[var(--cyan)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                  }`
                }
              >
                <item.icon className="w-6 h-6 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        )}

        {/* Collections */}
        {!isCollapsed && (
          <div className="space-y-1">
            <h3 className="px-4 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
              Your Collection
            </h3>
            {collectionItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="flex items-center gap-4 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all"
              >
                <item.icon className="w-6 h-6 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        )}

        {/* My Playlists (Scrollable Area) */}
        {!isCollapsed && (
          <div className="pt-4 border-t border-[var(--border-color)] mt-4">
             <div className="flex items-center justify-between px-4 mb-2">
                <h3 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  My Playlists
                </h3>
                <button className="text-[var(--text-secondary)] hover:text-[var(--neon-green)] transition-colors">
                  <PlusIcon className="w-5 h-5" />
                </button>
             </div>
             <div className="space-y-1">
               {myPlaylists.map((playlist, idx) => (
                 <NavLink 
                   key={idx}
                   to={`/playlist/${encodeURIComponent(playlist)}`}
                   className={({ isActive }) =>
                     `block px-4 py-2 text-sm truncate transition-all hover:translate-x-1 ${
                       isActive 
                         ? 'text-[var(--neon-green)]' 
                         : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                     }`
                   }
                 >
                   {playlist}
                 </NavLink>
               ))}
             </div>
          </div>
        )}
      </nav>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="p-4 border-t border-[var(--border-color)] flex-shrink-0">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--bg-secondary)] cursor-pointer transition-all group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--neon-green)] to-[var(--cyan)] flex items-center justify-center font-bold text-lg group-hover:neon-glow transition-all">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate text-[var(--text-primary)]">User Profile</p>
              <p className="text-xs text-[var(--text-secondary)] truncate">Premium</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
