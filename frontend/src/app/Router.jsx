// src/app/Router.jsx
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Search from '../pages/Search';
import Library from '../pages/Library';
import Music from '../pages/Music';
import Podcasts from '../pages/Podcasts';
import Audiobooks from '../pages/Audiobooks';
import Playlist from '../pages/Playlist';
import LikedSongs from '../pages/LikedSongs';
import RecentlyPlayed from '../pages/RecentlyPlayed';
import Settings from '../pages/Settings';
import Login from '../pages/Login';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/library" element={<Library />} />
      <Route path="/music" element={<Music />} />
      <Route path="/podcasts" element={<Podcasts />} />
      <Route path="/audiobooks" element={<Audiobooks />} />
      <Route path="/playlist/:id" element={<Playlist />} />
      <Route path="/liked" element={<LikedSongs />} />
      <Route path="/recent" element={<RecentlyPlayed />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
