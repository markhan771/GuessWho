import React from 'react'

const levels = [
  {
    id: '球童',
    emoji: '⚽',
    label: '球童水平',
    desc: '随便猜猜，轻松入门',
    color: 'bg-green-50 border-green-200 hover:border-green-400',
    badge: 'bg-green-100 text-green-700',
    hint: '提示更直接，适合新手',
  },
  {
    id: '球迷',
    emoji: '🏟️',
    label: '球迷水平',
    desc: '需要一定球迷积累',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
    badge: 'bg-blue-100 text-blue-700',
    hint: '提示较为隐晦，考验日常积累',
  },
  {
    id: '球探',
    emoji: '🔭',
    label: '球探水平',
    desc: '真正的硬核考验',
    color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
    badge: 'bg-purple-100 text-purple-700',
    hint: '冷僻线索，非死忠球迷难以招架',
  },
]

export default function DifficultyPage({ onSelect, onBack }) {
  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-slide-up">

        {/* Back */}
        <button onClick={onBack} className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 text-sm mb-8 transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          返回
        </button>

        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">选择难度</h1>
          <p className="text-gray-500 text-sm">难度影响题目范围和提示梯度，选择适合你的挑战</p>
        </div>

        {/* Rules card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">游戏规则</p>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <span className="text-brand-500 font-bold mt-0.5">·</span>
              <span>初始 <strong>100分</strong>，每解锁一条提示扣 <strong>10分</strong></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-brand-500 font-bold mt-0.5">·</span>
              <span>错误超过3次，每次额外扣 <strong>10分</strong></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-brand-500 font-bold mt-0.5">·</span>
              <span>最多尝试 <strong>10次</strong>，超过自动跳过</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-brand-500 font-bold mt-0.5">·</span>
              <span>可随时选择 <strong>放弃本题</strong> 查看答案</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-brand-500 font-bold mt-0.5">·</span>
              <span>接受标准中文名或英文全名</span>
            </div>
          </div>
        </div>

        {/* Difficulty options */}
        <div className="space-y-3">
          {levels.map(lv => (
            <button
              key={lv.id}
              onClick={() => onSelect(lv.id)}
              className={`w-full text-left rounded-2xl border-2 p-4 transition-all active:scale-[0.98] ${lv.color}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{lv.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-display font-bold text-gray-900">{lv.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${lv.badge}`}>{lv.id}</span>
                  </div>
                  <p className="text-xs text-gray-500">{lv.hint}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-300">
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}
