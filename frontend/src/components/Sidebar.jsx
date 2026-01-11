// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  BuildingLibraryIcon,
  PlusIcon,
  ArrowRightIcon,
  ListBulletIcon
} from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';

export default function Sidebar({ isCollapsed, onToggle }) {
  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Home' },
    { path: '/search', icon: MagnifyingGlassIcon, label: 'Search' },
  ];

  const myPlaylists = [
    { name: "Liked Songs", type: "Playlist", icon: HeartIcon, isLiked: true },
    { name: "Cyberpunk 2077 OST", type: "Playlist", owner: "Spotify" },
    { name: "Coding Focus", type: "Playlist", owner: "User" },
    { name: "Late Night Drive", type: "Playlist", owner: "User" },
    { name: "Gym Phonk", type: "Playlist", owner: "User" },
    { name: "Synthwave Essentials", type: "Playlist", owner: "Spotify" },
    { name: "Top 50 Global", type: "Playlist", owner: "Spotify" },
    { name: "Discover Weekly", type: "Playlist", owner: "Spotify" },
    { name: "Rock Classics", type: "Playlist", owner: "User" },
    { name: "Jazz Vibes", type: "Playlist", owner: "User" },
    { name: "Lo-Fi Beats", type: "Playlist", owner: "User" },
    { name: "Metal Essentials", type: "Playlist", owner: "Spotify" },
  ];

  return (
    <aside className={`${isCollapsed ? 'w-[72px]' : 'w-[420px]'} flex flex-col gap-2 p-2 h-full transition-all duration-300`}>
      {/* Top Section: Navigation */}
      <div className="bg-[var(--bg-secondary)] rounded-lg p-3 md:p-5 flex flex-col gap-5">
        <div className="px-1 flex items-center gap-2 mb-1">
             {/* Simple Logo for Replica feel */}
             <svg className="w-8 h-8 text-[var(--text-primary)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.42c-.18.3-.58.39-.88.21-2.42-1.48-5.47-1.81-9.07-.99-.33.07-.66-.14-.73-.47-.07-.33.14-.66.47-.73 3.96-.9 7.35-.53 10.01 1.1.3.18.39.58.21.88zm1.26-2.8c-.23.37-.72.49-1.09.26-2.85-1.75-7.19-2.26-10.55-1.24-.41.12-.84-.11-.96-.52-.12-.41.11-.84.52-.96 3.82-1.16 8.64-.59 11.83 1.37.37.23.49.72.26 1.09zm.11-2.92c-3.41-2.03-9.05-2.21-12.31-1.22-.52.16-1.07-.13-1.23-.65-.16-.52.13-1.07.65-1.23 3.76-1.14 10.01-.93 13.94 1.41.47.28.62.89.34 1.36-.28.47-.89.62-1.36.34z"/>
              </svg>
              {!isCollapsed && <span className="font-bold text-lg tracking-tight">Spotify Revamped</span>}
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-5 px-3 py-3 rounded-md transition-all font-bold ${
                  isActive
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`
              }
            >
              <item.icon className="w-7 h-7" />
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Section: Library */}
      <div className="bg-[var(--bg-secondary)] rounded-lg flex-1 flex flex-col overflow-hidden">
        {/* Library Header */}
        <div className="p-4 shadow-sm flex items-center justify-between">
          <button 
            onClick={onToggle}
            className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-bold group"
          >
            <BuildingLibraryIcon className="w-7 h-7" />
            {!isCollapsed && <span>Your Library</span>}
          </button>
          
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-[var(--bg-tertiary)] rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                <PlusIcon className="w-5 h-5" />
              </button>
               <button className="p-1 hover:bg-[var(--bg-tertiary)] rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Filter Chips (Spotify style) */}
        {!isCollapsed && (
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
             <span className="bg-[var(--bg-tertiary)] px-3 py-1 rounded-full text-sm font-medium hover:bg-[#3e3e3e] cursor-pointer transition-colors whitespace-nowrap">Playlists</span>
             <span className="bg-[var(--bg-tertiary)] px-3 py-1 rounded-full text-sm font-medium hover:bg-[#3e3e3e] cursor-pointer transition-colors whitespace-nowrap">Artists</span>
             <span className="bg-[var(--bg-tertiary)] px-3 py-1 rounded-full text-sm font-medium hover:bg-[#3e3e3e] cursor-pointer transition-colors whitespace-nowrap">Albums</span>
          </div>
        )}

        {/* Search / Sort */}
        {!isCollapsed && (
             <div className="px-4 py-2 flex items-center justify-between text-[var(--text-secondary)]">
                 <button className="p-1 hover:bg-[var(--bg-tertiary)] rounded-full hover:text-[var(--text-primary)]">
                    <MagnifyingGlassIcon className="w-4 h-4" />
                 </button>
                 <button className="flex items-center gap-1 text-xs font-semibold hover:text-[var(--text-primary)] hover:scale-105 transition-all">
                    <span>Recents</span>
                    <ListBulletIcon className="w-4 h-4" />
                 </button>
             </div>
        )}

        {/* List Content */}
        <div className="flex-1 overflow-y-auto hover:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent p-2">
            <div className="space-y-0">
                {myPlaylists.map((playlist, idx) => (
                    <div 
                        key={idx} 
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-[var(--bg-tertiary)] cursor-pointer group"
                    >
                        <div className={`w-12 h-12 rounded-md flex items-center justify-center flex-shrink-0 ${playlist.isLiked ? 'bg-gradient-to-br from-[#450af5] to-[#c4efd9]' : 'bg-[var(--bg-tertiary)]'}`}>
                            {playlist.isLiked ? (
                                <HeartIcon className="w-6 h-6 text-white" />
                            ) : (
                                <span className="text-gray-500 text-xl">♫</span>
                            )}
                        </div>
                        {!isCollapsed && (
                            <div className="min-w-0">
                                <h4 className={`font-semibold truncate ${playlist.isLiked ? 'text-[var(--neon-green)]' : 'text-[var(--text-primary)]'} group-hover:text-[var(--text-primary)]`}>
                                    {playlist.name}
                                </h4>
                                <p className="text-sm text-[var(--text-secondary)] truncate flex items-center gap-1">
                                    {playlist.isLiked && <span className="rotate-45 text-[var(--neon-green)]">📌</span>}
                                    {playlist.type} • {playlist.owner}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
      </div>
    </aside>
  );
}
