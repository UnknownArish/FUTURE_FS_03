const axios = require('axios');

async function testDeezer() {
    try {
        console.log('--- Testing Playlist Tracs ---');
        const playlistTracks = await axios.get('https://api.deezer.com/playlist/1130102843/tracks');
        console.log('Playlist Tracks Count:', playlistTracks.data.data ? playlistTracks.data.data.length : 0);
        if (playlistTracks.data.data && playlistTracks.data.data.length > 0) {
            console.log('First Track:', playlistTracks.data.data[0].title, playlistTracks.data.data[0].preview);
        }

        console.log('\n--- Testing Track Search (Simple) ---');
        const search = await axios.get('https://api.deezer.com/search?q=weeknd');
        console.log('Search Data Length:', search.data.data ? search.data.data.length : 0);

        console.log('\n--- Testing Playlist Search ---');
        const searchPlaylist = await axios.get('https://api.deezer.com/search/playlist?q=weeknd');
        console.log('Playlist Search Data Length:', searchPlaylist.data.data ? searchPlaylist.data.data.length : 0);
        if (searchPlaylist.data.data && searchPlaylist.data.data.length > 0) {
            console.log('First Playlist ID:', searchPlaylist.data.data[0].id);
        }
    } catch (e) {
        console.error(e.message);
    }
}

testDeezer();