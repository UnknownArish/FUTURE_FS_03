// backend/server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const DEEZER_API_BASE = 'https://api.deezer.com';

// 1. Search Proxy
app.get('/api/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json({ data: [] });

  try {
    // 1. Try Primary Search (Tracks)
    let response = await axios.get(`${DEEZER_API_BASE}/search?q=${encodeURIComponent(q)}`);
    
    // 2. Fallback: If no tracks found, search for Playlists and return their tracks
    // This is useful if the API restricts direct track search by region/IP
    if (!response.data.data || response.data.data.length === 0) {
       console.log(`No direct tracks found for "${q}". Falling back to Playlist search...`);
       
       const playlistSearch = await axios.get(`${DEEZER_API_BASE}/search/playlist?q=${encodeURIComponent(q)}`);
       
       if (playlistSearch.data.data && playlistSearch.data.data.length > 0) {
           // Fetch tracks from the first playlist found
           const topPlaylistId = playlistSearch.data.data[0].id;
           const playlistTracksResponse = await axios.get(`${DEEZER_API_BASE}/playlist/${topPlaylistId}/tracks`);
           
           if (playlistTracksResponse.data && playlistTracksResponse.data.data) {
               console.log(`Fallback successful: Returning tracks from playlist ${topPlaylistId}`);
               return res.json(playlistTracksResponse.data);
           }
       }
    }

    res.json(response.data);
  } catch (error) {
    console.error('Search Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// 2. Get Trending/CHART Proxy (For Home Page)
app.get('/api/chart', async (req, res) => {
  try {
    const response = await axios.get(`${DEEZER_API_BASE}/chart`);
    res.json(response.data);
  } catch (error) {
     console.error('Chart Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch chart' });
  }
});

app.listen(3001, () => {
    console.log('Spotify Revamped Backend (Deezer Proxy) running on port 3001');
});
