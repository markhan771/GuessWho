import React, { useState } from 'react'
import { categories, leaderboard, tagOptions } from '../data/puzzles'

export default function HomePage({ onStart }) {
  const [selectedCat, setSelectedCat] = useState('football')
  const [selectedTags, setSelectedTags] = useState([])

  function toggleTag(tagId) {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId]
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-10 text-center">
          <h1 className="font-display text-5xl font-bold tracking-tight text-white mb-2">
            Guess<span className="text-pitch-500">Arena</span>
          </h1>
          <p className="text-sm text-white/40 tracking-widest uppercase">
            猜球星 · 猜人物 · 猜歌词
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => cat.available && setSelectedCat(cat.id)}
              className={`
                relative rounded-2xl border p-5 text-left transition-all duration-200
                ${cat.available ? 'cursor-pointer hover:border-pitch-500/60' : 'cursor-not-allowed opacity-40'}
                ${selectedCat === cat.id ? 'border-pitch-500 bg-pitch-500/10' : 'border-white/10 bg-white/5'}
              `}
            >
              {selectedCat === cat.id && (
                <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-pitch-500" />
              )}
              <span className="text-2xl mb-3 block">{cat.icon}</span>
              <span className="font-display font-bold text-sm text-white block">{cat.label}</span>
              {!cat.available && (
                <span className="text-xs text-white/30 mt-1 block">即将上线</span>
              )}
            </button>
          ))}
        </div>

        {/* Tag filter */}
        <div className="mb-6">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-3">筛选范围（可多选）</p>
          <div className="flex flex-wrap gap-2">
            {tagOptions.map(tag => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className={`
                  px-3 py-1.5 rounded-full text-xs font-bold transition-all border
                  ${selectedTags.includes(tag.id)
                    ? 'bg-pitch-500/20 border-pitch-500 text-pitch-500'
                    : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30 hover:text-white/60'}
                `}
              >
                {tag.label}
              </button>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="mt-2 text-xs text-white/25 hover:text-white/50 transition-colors"
            >
              清除筛选
            </button>
          )}
        </div>

        {/* Start button */}
        <button
          onClick={() => onStart(selectedTags)}
          className="w-full py-4 rounded-2xl bg-pitch-500 hover:bg-pitch-600 active:scale-[0.98] transition-all font-display font-bold text-white text-base tracking-wide"
        >
          开始游戏
        </button>

        {/* Leaderboard */}
        <div className="mt-10">
          <h2 className="font-display font-bold text-xs text-white/30 tracking-widest uppercase mb-4">
            本周排行
          </h2>
          <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            {leaderboard.map((row, i) => (
              <div
                key={row.rank}
                className={`flex items-center gap-3 px-4 py-3 ${i < leaderboard.length - 1 ? 'border-b border-white/5' : ''}`}
              >
                <span className={`w-6 text-sm font-display font-bold ${row.rank <= 3 ? 'text-pitch-500' : 'text-white/20'}`}>
                  {row.rank}
                </span>
                <span className="flex-1 text-sm text-white/70">{row.name}</span>
                <span className="text-sm font-display font-bold text-white">{row.score}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
