import React, { useEffect, useState } from 'react'
import Confetti from './Confetti'

export default function ResultPage({
  puzzle, score, hintsUnlocked, attempts, totalScore, sessionCount, skipped,
  onNext, onHome,
}) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (!skipped && score > 0) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 4000)
    }
  }, [])

  const isSuccess = !skipped && score > 0

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col items-center justify-center px-4 py-12">
      <Confetti active={showConfetti} />
      <div className="w-full max-w-md animate-bounce-in">

        {/* Status label */}
        <div className="text-center mb-6">
          {isSuccess ? (
            <div>
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-sm font-bold text-brand-600">答对了！</p>
            </div>
          ) : (
            <div>
              <div className="text-4xl mb-2">😅</div>
              <p className="text-sm text-gray-400">{skipped ? '已放弃本题' : '下次加油'}</p>
            </div>
          )}
        </div>

        {/* Answer card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4 shadow-sm">
          <p className="text-xs text-gray-400 text-center mb-1">{puzzle.nationality}</p>
          <h2 className="font-display font-bold text-4xl text-gray-900 text-center mb-1">{puzzle.answer}</h2>
          <p className="text-xs text-gray-400 text-center mb-6 line-clamp-1">{puzzle.hints[0].text}</p>

          {/* Score */}
          <div className="text-center mb-6">
            <p className={`font-display font-bold text-6xl ${isSuccess ? 'text-brand-500' : 'text-gray-300'}`}>
              {score}
            </p>
            <p className="text-xs text-gray-400 mt-1">本题得分</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
            <div className="text-center">
              <p className="font-display font-bold text-xl text-gray-900">{hintsUnlocked}</p>
              <p className="text-xs text-gray-400 mt-0.5">使用提示</p>
            </div>
            <div className="text-center">
              <p className="font-display font-bold text-xl text-gray-900">{attempts}</p>
              <p className="text-xs text-gray-400 mt-0.5">尝试次数</p>
            </div>
            <div className="text-center">
              <p className={`font-display font-bold text-xl ${totalScore > 0 ? 'text-brand-500' : 'text-gray-300'}`}>
                {totalScore}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">累计总分</p>
            </div>
          </div>
        </div>

        {/* Session streak */}
        {sessionCount > 1 && (
          <p className="text-center text-xs text-brand-500 mb-3 font-bold">
            🔥 本局连续答对 {sessionCount} 题
          </p>
        )}

        {/* Aliases */}
        {puzzle.aliases.length > 0 && (
          <p className="text-center text-xs text-gray-400 mb-4">
            也可叫：{puzzle.aliases.join('、')}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={onHome}
            className="flex-1 py-4 rounded-2xl border-2 border-gray-200 bg-white hover:bg-gray-50 active:scale-[0.98] transition-all font-display font-bold text-sm text-gray-600">
            返回首页
          </button>
          <button onClick={onNext}
            className="flex-1 py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 active:scale-[0.98] transition-all font-display font-bold text-sm text-white shadow-sm">
            下一题 →
          </button>
        </div>

      </div>
    </div>
  )
}
