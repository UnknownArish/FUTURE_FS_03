import React from 'react';

export default function BlogPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-10">Latest Updates</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((post) => (
          <div
            key={post}
            className="border border-white/10 rounded-xl p-6 hover:border-green-500 transition"
          >
            <h3 className="text-xl font-semibold mb-2">
              AI Meets Music Design
            </h3>
            <p className="text-gray-400 text-sm">
              Exploring how AI can reshape digital music experiences.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
