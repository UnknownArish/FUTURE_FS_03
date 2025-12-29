// src/pages/Settings.jsx
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [audioQuality, setAudioQuality] = useState('high');
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up pb-20">
      <h1 className="text-4xl font-bold mb-8 text-[var(--text-primary)]">Settings</h1>

      {/* Account Settings */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Account</h2>
        <div className="bg-[var(--bg-secondary)] rounded-xl p-6 space-y-4 glass">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-[var(--text-primary)]">Username</p>
              <p className="text-sm text-[var(--text-secondary)]">UnknownArish</p>
            </div>
            <button className="px-4 py-2 rounded-full border border-[var(--text-secondary)] hover:border-[var(--text-primary)] text-[var(--text-primary)] transition-colors">
              Edit Profile
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-[var(--text-primary)]">Email</p>
              <p className="text-sm text-[var(--text-secondary)]">arish@example.com</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-[var(--text-primary)]">Subscription</p>
              <p className="text-sm text-[var(--text-secondary)]">Premium Plan</p>
            </div>
            <button className="text-[var(--neon-green)] hover:underline">Manage Plan</button>
          </div>
        </div>
      </section>

      {/* App Settings */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">App Settings</h2>
        <div className="bg-[var(--bg-secondary)] rounded-xl p-6 space-y-6 glass">
          {/* Theme */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-[var(--text-primary)]">Appearance</p>
              <p className="text-sm text-[var(--text-secondary)]">Choose your preferred theme</p>
            </div>
            <div className="flex items-center gap-3 bg-[var(--bg-tertiary)] p-1 rounded-full">
              <button 
                onClick={() => theme === 'light' && toggleTheme()}
                className={`px-4 py-1.5 rounded-full text-sm transition-all ${theme === 'dark' ? 'bg-[var(--bg-primary)] text-white shadow-md' : 'text-[var(--text-secondary)]'}`}
              >
                Dark
              </button>
              <button 
                onClick={() => theme === 'dark' && toggleTheme()}
                className={`px-4 py-1.5 rounded-full text-sm transition-all ${theme === 'light' ? 'bg-white text-black shadow-md' : 'text-[var(--text-secondary)]'}`}
              >
                Light
              </button>
            </div>
          </div>

          {/* Audio Quality */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-[var(--text-primary)]">Audio Quality</p>
              <p className="text-sm text-[var(--text-secondary)]">Streaming quality</p>
            </div>
            <select 
              value={audioQuality}
              onChange={(e) => setAudioQuality(e.target.value)}
              className="bg-[var(--bg-tertiary)] text-[var(--text-primary)] border-none rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-[var(--neon-green)]"
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="lossless">Lossless</option>
            </select>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-[var(--text-primary)]">Notifications</p>
              <p className="text-sm text-[var(--text-secondary)]">Push notifications for new releases</p>
            </div>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-[var(--neon-green)]' : 'bg-[var(--bg-tertiary)]'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${notifications ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
