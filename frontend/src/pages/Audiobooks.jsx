// src/pages/Audiobooks.jsx
export default function Audiobooks() {
  const audiobookGenres = [
    { name: 'Fiction', icon: '📖', color: 'from-blue-500 to-purple-500' },
    { name: 'Self-Help', icon: '🌟', color: 'from-yellow-500 to-orange-500' },
    { name: 'Mystery', icon: '🔎', color: 'from-gray-700 to-gray-900' },
    { name: 'Science Fiction', icon: '🚀', color: 'from-cyan-500 to-blue-500' },
    { name: 'Biography', icon: '👤', color: 'from-green-500 to-teal-500' },
    { name: 'Fantasy', icon: '🐉', color: 'from-purple-500 to-pink-500' },
  ];

  const featuredAudiobooks = [
    {
      id: 1,
      title: 'Atomic Habits',
      author: 'James Clear',
      duration: '5h 35m',
      image: 'https://placehold.co/300x300/FFD700/000000?text=Atomic+Habits',
    },
    {
      id: 2,
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      duration: '5h 48m',
      image: 'https://placehold.co/300x300/006400/FFFFFF?text=Psychology+of+Money',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl p-12 glass">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 via-orange-500/20 to-red-500/30"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-3 neon-text text-[var(--text-primary)]">📚 Audiobooks</h1>
          <p className="text-xl text-[var(--text-secondary)]">
            Immerse yourself in captivating stories
          </p>
        </div>
      </div>

      {/* Browse Genres */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-[var(--text-primary)]">Browse Genres</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {audiobookGenres.map((genre) => (
            <div
              key={genre.name}
              className={`relative h-36 rounded-xl overflow-hidden cursor-pointer group hover-lift glass bg-gradient-to-br ${genre.color}`}
            >
              <div className="p-6 h-full flex flex-col justify-between">
                <span className="text-5xl">{genre.icon}</span>
                <h3 className="text-xl font-bold text-white drop-shadow-lg">
                  {genre.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Audiobooks */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-[var(--text-primary)]">Featured Audiobooks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAudiobooks.map((book) => (
            <div
              key={book.id}
              className="flex gap-4 p-4 rounded-xl bg-[var(--bg-secondary)] hover-lift glass cursor-pointer"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1 text-[var(--text-primary)]">{book.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-1">
                  {book.author}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {book.duration}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coming Soon Message */}
      <div className="text-center py-16 glass rounded-2xl">
        <div className="text-6xl mb-4">🎧</div>
        <h3 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">More Audiobooks Coming Soon!</h3>
        <p className="text-[var(--text-secondary)]">
          We're working on bringing you an amazing audiobook experience
        </p>
      </div>
    </div>
  );
}
