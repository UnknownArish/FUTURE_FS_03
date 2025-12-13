import React from 'react';
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Music, Reimagined
            <span className="block text-green-500">with AI</span>
          </h1>

          <p className="mt-6 text-lg text-gray-400 max-w-xl">
            Discover, personalize, and experience music through an
            AI-powered platform designed for creators and listeners.
          </p>

          <div className="mt-10 flex gap-4">
            <button className="bg-green-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-green-400 transition">
              Get Started
            </button>
            <button className="border border-white/20 px-8 py-3 rounded-full hover:bg-white/5 transition">
              Learn More
            </button>
          </div>
        </div>

        <Image
          src="/hero.png"
          alt="AI Music Visual"
          width={520}
          height={520}
          className="rounded-3xl shadow-2xl"
        />
      </div>
    </section>
  );
}
