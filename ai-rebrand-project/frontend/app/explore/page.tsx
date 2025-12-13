import React from 'react';

export default function ExplorePage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-6">Explore Music</h1>
      <p className="text-gray-400 mb-10">
        Discover playlists, artists, and AI-curated experiences.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-zinc-900 rounded-xl p-6 hover:bg-zinc-800 transition"
          >
            <p className="font-semibold">Featured Playlist</p>
          </div>
        ))}
      </div>
    </section>
  );
}
