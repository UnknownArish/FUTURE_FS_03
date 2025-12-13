import React from 'react';
import Card from "./Card";

export default function FeatureSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="mb-14 max-w-2xl">
        <h2 className="text-4xl font-bold mb-4">
          Built for the Future of Music
        </h2>
        <p className="text-gray-400">
          Inspired by AI-driven creativity and modern listening habits.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card
          title="AI Discovery"
          desc="Find music that adapts to your mood, taste, and creativity."
        />
        <Card
          title="Creator First"
          desc="Tools designed for artists, producers, and storytellers."
        />
        <Card
          title="Modern Experience"
          desc="Fast, responsive, and built with a premium dark UI."
        />
      </div>
    </section>
  );
}
