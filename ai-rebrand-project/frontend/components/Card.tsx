import React from 'react';

export default function Card({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="group bg-zinc-900/60 backdrop-blur rounded-2xl p-6 border border-white/10 hover:border-green-500/40 transition">
      <h3 className="text-xl font-semibold mb-3 group-hover:text-green-400 transition">
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
