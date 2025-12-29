// src/pages/Podcasts.jsx
export default function Podcasts() {
  const podcastCategories = [
    { name: 'True Crime', icon: '🔍', color: 'from-red-500 to-orange-500' },
    { name: 'Comedy', icon: '😂', color: 'from-yellow-500 to-pink-500' },
    { name: 'News & Politics', icon: '📰', color: 'from-blue-500 to-cyan-500' },
    { name: 'Technology', icon: '💻', color: 'from-green-500 to-teal-500' },
    { name: 'Health & Fitness', icon: '💪', color: 'from-purple-500 to-pink-500' },
    { name: 'Education', icon: '📚', color: 'from-indigo-500 to-blue-500' },
  ];

  const trendingPodcasts = [
    {
      id: 1,
      title: 'Tech Talk Daily',
      description: 'Latest tech news and insights',
      image: 'https://placehold.co/300x300/008080/FFFFFF?text=Tech+Talk',
      episodes: 234
    },
    {
      id: 2,
      title: 'Crime Mysteries',
      description: 'True crime stories that shock',
      image: 'https://placehold.co/300x300/800000/FFFFFF?text=Crime+Mysteries',
      episodes: 156
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl p-12 glass">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-red-500/30"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-3 neon-text text-[var(--text-primary)]">🎙️ Podcasts</h1>
          <p className="text-xl text-[var(--text-secondary)]">
            Explore thousands of podcasts on every topic
          </p>
        </div>
      </div>

      {/* Browse Categories */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-[var(--text-primary)]">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {podcastCategories.map((category) => (
            <div
              key={category.name}
              className={`relative h-36 rounded-xl overflow-hidden cursor-pointer group hover-lift glass bg-gradient-to-br ${category.color}`}
            >
              <div className="p-6 h-full flex flex-col justify-between">
                <span className="text-5xl">{category.icon}</span>
                <h3 className="text-xl font-bold text-white drop-shadow-lg">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Podcasts */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-[var(--text-primary)]">Trending Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingPodcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="flex gap-4 p-4 rounded-xl bg-[var(--bg-secondary)] hover-lift glass cursor-pointer"
            >
              <img
                src={podcast.image}
                alt={podcast.title}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1 text-[var(--text-primary)]">{podcast.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  {podcast.description}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {podcast.episodes} episodes
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
