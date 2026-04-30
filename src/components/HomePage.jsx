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
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="font-display text-5xl font-bold tracking-tight text-gray-900 mb-1">
            Guess<span className="text-brand-500">Arena</span>
          </h1>
          <p className="text-sm text-gray-400 tracking-widest uppercase">
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
                relative rounded-2xl border-2 p-5 text-left transition-all duration-200 bg-white
                ${cat.available ? 'cursor-pointer hover:border-brand-400' : 'cursor-not-allowed opacity-50'}
                ${selectedCat === cat.id ? 'border-brand-500 bg-brand-50' : 'border-gray-200'}
              `}
            >
              {selectedCat === cat.id && (
                <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-brand-500" />
              )}
              <span className="text-2xl mb-3 block">{cat.icon}</span>
              <span className="font-display font-bold text-sm text-gray-900 block">{cat.label}</span>
              {!cat.available
                ? <span className="text-xs text-gray-400 mt-1 block">即将上线</span>
                : <span className="text-xs text-brand-600 mt-1 block">{cat.count} 题可玩</span>
              }
            </button>
          ))}
        </div>

        {/* Tag filter */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">筛选范围（可多选）</p>
          <div className="flex flex-wrap gap-2">
            {tagOptions.map(tag => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className={`
                  px-3 py-1.5 rounded-full text-xs font-bold transition-all border
                  ${selectedTags.includes(tag.id)
                    ? 'bg-brand-500 border-brand-500 text-white'
                    : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300'}
                `}
              >
                {tag.label}
              </button>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <button onClick={() => setSelectedTags([])} className="mt-2 text-xs text-gray-300 hover:text-gray-500 transition-colors">
              清除筛选
            </button>
          )}
        </div>

        {/* Start button */}
        <button
          onClick={() => onStart(selectedTags)}
          className="w-full py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 active:scale-[0.98] transition-all font-display font-bold text-white text-base tracking-wide shadow-sm"
        >
          开始游戏 →
        </button>

        {/* Leaderboard */}
        <div className="mt-8">
          <h2 className="font-display font-bold text-xs text-gray-400 tracking-widest uppercase mb-3">本周排行</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {leaderboard.map((row, i) => (
              <div key={row.rank} className={`flex items-center gap-3 px-4 py-3 ${i < leaderboard.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <span className={`w-6 text-sm font-display font-bold ${row.rank <= 3 ? 'text-brand-500' : 'text-gray-300'}`}>
                  {row.rank}
                </span>
                <span className="flex-1 text-sm text-gray-700">{row.name}</span>
                <span className="text-sm font-display font-bold text-gray-900">{row.score}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
