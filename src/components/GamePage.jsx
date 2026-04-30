import React, { useState, useEffect, useRef } from 'react'

function HintCard({ hint, index }) {
  return (
    <div className="animate-slide-up bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
         style={{ animationDelay: `${index * 60}ms` }}>
      {hint.type === 'stat' ? (
        <div>
          <p className="text-xs text-gray-400 mb-1">{hint.label}</p>
          <p className="font-display font-bold text-2xl text-gray-900">{hint.value}</p>
        </div>
      ) : (
        <p className="text-sm text-gray-700 leading-relaxed">{hint.text}</p>
      )}
    </div>
  )
}

export default function GamePage({
  puzzle, score, hintsUnlocked, attempts, lastDelta, shakeInput,
  queueIndex, totalPuzzles, wrongThreshold, maxAttempts, skipped,
  onUnlockHint, onSubmit, onGoResult, onGoHome, onGiveUp,
}) {
  const [inputVal, setInputVal]   = useState('')
  const [feedback, setFeedback]   = useState(null)
  const [solved, setSolved]       = useState(false)
  const [showGiveUp, setShowGiveUp] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    setInputVal('')
    setFeedback(null)
    setSolved(false)
    setShowGiveUp(false)
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [puzzle?.id])

  // 达到上限或放弃时自动跳转结果页
  useEffect(() => {
    if (skipped && !solved) {
      setFeedback('skipped')
      setTimeout(() => onGoResult(), 1200)
    }
  }, [skipped])

  function handleSubmit() {
    if (solved || skipped || !inputVal.trim()) return
    const result = onSubmit(inputVal)
    if (result.correct) {
      setFeedback('correct')
      setSolved(true)
      setTimeout(() => onGoResult(), 900)
    } else if (result.maxReached) {
      setFeedback('maxReached')
      setInputVal('')
    } else {
      setFeedback('wrong')
      setInputVal('')
      setTimeout(() => setFeedback(null), 1600)
    }
  }

  function handleGiveUp() {
    onGiveUp()
  }

  const canUnlock = hintsUnlocked < puzzle.hints.length && !solved && !skipped
  const visibleHints = puzzle.hints.slice(0, hintsUnlocked)
  const attemptsLeft = maxAttempts - attempts
  const isDisabled = solved || skipped

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-md">

        {/* Top bar */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-3">
            <button onClick={onGoHome} className="flex items-center gap-1 text-gray-400 hover:text-gray-600 text-xs mt-1 transition-colors">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              菜单
            </button>
            <div>
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full mb-1">
                足球球星
              </span>
              <p className="text-xs text-gray-400">第 {queueIndex + 1} / {totalPuzzles} 题</p>
            </div>
          </div>
          <div className="text-right relative">
            <p className="text-xs text-gray-400 mb-0.5">当前得分</p>
            <p className={`font-display font-bold text-3xl text-gray-900 ${lastDelta ? 'animate-pop' : ''}`}>
              {score}
            </p>
            {lastDelta !== null && (
              <span className="absolute -top-1 right-0 text-xs font-bold text-red-500 animate-delta pointer-events-none">
                {lastDelta}
              </span>
            )}
          </div>
        </div>

        {/* Hints */}
        <div className="space-y-3 mb-4">
          {visibleHints.map((hint, i) => (
            <HintCard key={i} hint={hint} index={i} />
          ))}
        </div>

        {/* Unlock hint */}
        {canUnlock && (
          <button onClick={onUnlockHint}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-gray-200 hover:border-brand-300 text-gray-400 hover:text-brand-500 text-sm transition-all mb-4 bg-white">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
              <rect x="3" y="7" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.3"/>
            </svg>
            <span>解锁下一条提示</span>
            <span className="ml-auto text-xs font-bold text-red-400">−10 分</span>
          </button>
        )}

        {/* Attempts counter */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-gray-400">请输入中文或英文名称</p>
          {attempts > 0 && (
            <p className={`text-xs font-bold ${attemptsLeft <= 3 ? 'text-red-400' : 'text-gray-400'}`}>
              还剩 {attemptsLeft} 次机会
            </p>
          )}
        </div>

        {/* Feedback */}
        <div className="min-h-[22px] mb-2">
          {feedback === 'correct' && (
            <p className="text-sm text-brand-600 font-bold animate-slide-up">✓ 答对了！太厉害了！</p>
          )}
          {feedback === 'wrong' && (
            <p className="text-sm text-red-400 animate-slide-up">✗ 不对，再想想</p>
          )}
          {feedback === 'maxReached' && (
            <p className="text-sm text-orange-400 animate-slide-up">已达答题上限，即将显示答案...</p>
          )}
          {feedback === 'skipped' && (
            <p className="text-sm text-gray-400 animate-slide-up">已放弃本题，查看答案...</p>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-3">
          <input
            ref={inputRef}
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            disabled={isDisabled}
            placeholder="输入名字..."
            className={`
              flex-1 bg-white border-2 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-300
              focus:outline-none transition-colors disabled:opacity-40 disabled:bg-gray-50
              ${shakeInput ? 'animate-shake border-red-300' : 'border-gray-200 focus:border-brand-400'}
            `}
          />
          <button
            onClick={handleSubmit}
            disabled={isDisabled || !inputVal.trim()}
            className="px-5 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed font-display font-bold text-sm text-white transition-all"
          >
            提交
          </button>
        </div>

        {/* Give up */}
        {!solved && !skipped && (
          <div className="text-center">
            {!showGiveUp ? (
              <button onClick={() => setShowGiveUp(true)} className="text-xs text-gray-300 hover:text-gray-500 transition-colors underline underline-offset-2">
                放弃本题
              </button>
            ) : (
              <div className="bg-white border border-red-100 rounded-xl p-3 animate-slide-up">
                <p className="text-sm text-gray-600 mb-3">确定放弃？将得 0 分并查看答案</p>
                <div className="flex gap-2">
                  <button onClick={() => setShowGiveUp(false)}
                    className="flex-1 py-2 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors">
                    取消
                  </button>
                  <button onClick={handleGiveUp}
                    className="flex-1 py-2 rounded-lg bg-red-400 hover:bg-red-500 text-white text-sm font-bold transition-colors">
                    确认放弃
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
