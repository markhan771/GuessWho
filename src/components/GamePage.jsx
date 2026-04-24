import React, { useState, useEffect, useRef } from 'react'

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="opacity-40 flex-shrink-0">
      <rect x="3" y="7" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  )
}

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function HintCard({ hint, index }) {
  return (
    <div
      className="animate-slide-up rounded-xl border border-white/10 bg-white/5 p-4"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {hint.type === 'stat' ? (
        <div>
          <p className="text-xs text-white/40 mb-1">{hint.label}</p>
          <p className="font-display font-bold text-2xl text-white">{hint.value}</p>
        </div>
      ) : (
        <p className="text-sm text-white/80 leading-relaxed">{hint.text}</p>
      )}
    </div>
  )
}

export default function GamePage({
  puzzle,
  score,
  hintsUnlocked,
  attempts,
  lastDelta,
  shakeInput,
  queueIndex,
  totalPuzzles,
  wrongThreshold,
  onUnlockHint,
  onSubmit,
  onGoResult,
  onGoHome,
}) {
  const [inputVal, setInputVal] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [solved, setSolved] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    setInputVal('')
    setFeedback(null)
    setSolved(false)
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [puzzle?.id])

  function handleSubmit() {
    if (solved || !inputVal.trim()) return
    const result = onSubmit(inputVal)
    if (result.correct) {
      setFeedback('correct')
      setSolved(true)
      setTimeout(() => onGoResult(), 900)
    } else {
      setFeedback('wrong')
      setInputVal('')
      setTimeout(() => setFeedback(null), 1800)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter') handleSubmit()
  }

  const canUnlock = hintsUnlocked < puzzle.hints.length && !solved
  const visibleHints = puzzle.hints.slice(0, hintsUnlocked)

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-md">

        {/* Top bar */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-start gap-3">
            {/* 返回菜单 */}
            <button
              onClick={onGoHome}
              className="flex items-center gap-1.5 text-white/30 hover:text-white/70 transition-colors mt-1"
              title="返回菜单"
            >
              <BackIcon />
              <span className="text-xs">菜单</span>
            </button>

            <div>
              <span className="inline-block text-xs font-display font-bold tracking-widest uppercase text-pitch-500 bg-pitch-500/10 px-3 py-1 rounded-full mb-2">
                足球球星
              </span>
              <p className="text-xs text-white/30">
                第 {queueIndex + 1} / {totalPuzzles} 题
              </p>
            </div>
          </div>

          {/* Score */}
          <div className="text-right relative">
            <p className="text-xs text-white/30 mb-1">当前得分</p>
            <p className={`font-display font-bold text-3xl text-white ${lastDelta ? 'animate-pop' : ''}`}>
              {score}
            </p>
            {lastDelta !== null && (
              <span className="absolute -top-1 right-0 text-xs font-bold text-red-400 animate-delta pointer-events-none">
                {lastDelta}
              </span>
            )}
          </div>
        </div>

        {/* Hints */}
        <div className="space-y-3 mb-5">
          {visibleHints.map((hint, i) => (
            <HintCard key={i} hint={hint} index={i} />
          ))}
        </div>

        {/* Unlock next hint */}
        {canUnlock && (
          <button
            onClick={onUnlockHint}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-white/15 hover:border-white/30 text-white/40 hover:text-white/60 text-sm transition-all mb-5"
          >
            <LockIcon />
            <span>解锁下一条提示</span>
            <span className="ml-auto text-xs text-red-400 font-bold">−20 分</span>
          </button>
        )}

        {/* Accepted answers hint */}
        <p className="text-xs text-white/20 mb-3">
          接受：{puzzle.acceptedAnswers.join(' / ')}
          {puzzle.aliases.length > 0 && (
            <span className="ml-2 text-white/15">（别名：{puzzle.aliases.join('、')}不计入答案）</span>
          )}
        </p>

        {/* Feedback */}
        <div className="min-h-[22px] mb-2">
          {feedback === 'correct' && (
            <p className="text-sm text-pitch-500 font-bold animate-slide-up">✓ 答对了！</p>
          )}
          {feedback === 'wrong' && (
            <p className="text-sm text-red-400 animate-slide-up">✗ 不对，再想想</p>
          )}
        </div>

        {/* Input row */}
        <div className="flex gap-2 mb-3">
          <input
            ref={inputRef}
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={handleKey}
            disabled={solved}
            placeholder="输入名字（中文或英文全名）..."
            className={`
              flex-1 bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/20
              focus:outline-none focus:border-pitch-500/60 transition-colors disabled:opacity-40
              ${shakeInput ? 'animate-shake border-red-500/50' : 'border-white/10'}
            `}
          />
          <button
            onClick={handleSubmit}
            disabled={solved || !inputVal.trim()}
            className="px-5 py-3 rounded-xl bg-pitch-500 hover:bg-pitch-600 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed font-display font-bold text-sm text-white transition-all"
          >
            提交
          </button>
        </div>

        {/* Attempts note */}
        {attempts >= wrongThreshold && !solved && (
          <p className="text-xs text-white/25">
            已尝试 {attempts} 次 · 继续答错每次扣 10 分
          </p>
        )}

      </div>
    </div>
  )
}
