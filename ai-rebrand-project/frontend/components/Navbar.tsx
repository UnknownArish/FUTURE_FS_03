import React from 'react';
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={28} height={28} />
          <span className="font-semibold">Spotify AI</span>
        </div>

        <div className="hidden md:flex gap-8 text-sm text-gray-300">
          <Link href="/">Home</Link>
          <Link href="/explore">Explore</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
        </div>

        <button className="bg-green-500 text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-400 transition">
          Start Free
        </button>
      </nav>
    </header>
  );
}
