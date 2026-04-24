import React from 'react'

export default function ResultPage({
  puzzle,
  score,
  hintsUnlocked,
  attempts,
  totalScore,
  sessionCount,
  onNext,
  onHome,
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-slide-up">

        {/* Small label */}
        <p className="text-xs text-white/30 tracking-widest uppercase mb-6 text-center">
          答对了
        </p>

        {/* Answer card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-4 text-center">
          <p className="text-xs text-white/30 mb-2">{puzzle.nationality}</p>
          <h2 className="font-display font-bold text-4xl text-white mb-1">{puzzle.answer}</h2>
          <p className="text-xs text-white/30 mb-6 line-clamp-1">
            {puzzle.hints[0].text}
          </p>

          {/* Score */}
          <div className="mb-6">
            <p className="font-display font-bold text-6xl text-pitch-500">{score}</p>
            <p className="text-xs text-white/30 mt-1">本题得分</p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/10">
            <div>
              <p className="font-display font-bold text-xl text-white">{hintsUnlocked}</p>
              <p className="text-xs text-white/30 mt-1">使用提示</p>
            </div>
            <div>
              <p className="font-display font-bold text-xl text-white">{attempts}</p>
              <p className="text-xs text-white/30 mt-1">尝试次数</p>
            </div>
            <div>
              <p className="font-display font-bold text-xl text-pitch-500">{totalScore}</p>
              <p className="text-xs text-white/30 mt-1">累计总分</p>
            </div>
          </div>
        </div>

        {/* Session streak */}
        {sessionCount > 1 && (
          <p className="text-center text-xs text-pitch-500/70 mb-4">
            🔥 本局已答对 {sessionCount} 题
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-2">
          <button
            onClick={onHome}
            className="flex-1 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 active:scale-[0.98] transition-all font-display font-bold text-sm text-white/70"
          >
            返回首页
          </button>
          <button
            onClick={onNext}
            className="flex-1 py-4 rounded-2xl bg-pitch-500 hover:bg-pitch-600 active:scale-[0.98] transition-all font-display font-bold text-sm text-white"
          >
            下一题 →
          </button>
        </div>

      </div>
    </div>
  )
}
