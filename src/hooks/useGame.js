import { useState, useCallback } from 'react'
import { puzzles } from '../data/puzzles'

const INITIAL_SCORE   = 100
const HINT_COST       = 10
const WRONG_COST      = 10
const WRONG_THRESHOLD = 3
const MAX_ATTEMPTS    = 10   // 答题上限

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function useGame() {
  const [screen, setScreen]         = useState('home')   // home | difficulty | game | result
  const [pendingTags, setPending]   = useState([])
  const [queue, setQueue]           = useState([])
  const [queueIndex, setQueueIndex] = useState(0)
  const [score, setScore]           = useState(INITIAL_SCORE)
  const [hintsUnlocked, setHints]   = useState(1)
  const [attempts, setAttempts]     = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [sessionCount, setSession]  = useState(0)
  const [lastDelta, setLastDelta]   = useState(null)
  const [shakeInput, setShakeInput] = useState(false)
  const [skipped, setSkipped]       = useState(false)   // 放弃/跳过标记

  const currentPuzzle = queue[queueIndex] ?? null

  // Step 1: 选分类+tag → 进难度选择页
  const goToDifficulty = useCallback((tags) => {
    setPending(tags)
    setScreen('difficulty')
  }, [])

  // Step 2: 选难度 → 开始游戏
  const startGame = useCallback((difficulty, tags) => {
    let pool = tags.length === 0 ? puzzles : puzzles.filter(p => tags.every(t => p.tags.includes(t)))
    // 按难度过滤，没有对应难度题目时fallback到全部
    const byDiff = pool.filter(p => p.difficulty === difficulty)
    const finalPool = byDiff.length > 0 ? byDiff : pool.length > 0 ? pool : puzzles
    setQueue(shuffle(finalPool))
    setQueueIndex(0)
    setTotalScore(0)
    setSession(0)
    resetRound()
    setScreen('game')
  }, [])

  function resetRound() {
    setScore(INITIAL_SCORE)
    setHints(1)
    setAttempts(0)
    setLastDelta(null)
    setShakeInput(false)
    setSkipped(false)
  }

  const unlockHint = useCallback(() => {
    if (!currentPuzzle) return
    if (hintsUnlocked >= currentPuzzle.hints.length) return
    const newScore = Math.max(0, score - HINT_COST)
    setScore(newScore)
    setHints(h => h + 1)
    triggerDelta(-HINT_COST)
  }, [currentPuzzle, hintsUnlocked, score])

  const submitAnswer = useCallback((input) => {
    if (!currentPuzzle) return { correct: false }
    const normalized = input.trim().toLowerCase()
    const isCorrect = currentPuzzle.acceptedAnswers.some(a => a.toLowerCase() === normalized)
    if (isCorrect) {
      setTotalScore(t => t + score)
      setSession(s => s + 1)
      return { correct: true }
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      if (newAttempts >= WRONG_THRESHOLD) {
        const newScore = Math.max(0, score - WRONG_COST)
        setScore(newScore)
        triggerDelta(-WRONG_COST)
      }
      setShakeInput(true)
      setTimeout(() => setShakeInput(false), 500)
      // 达到上限自动跳过
      if (newAttempts >= MAX_ATTEMPTS) {
        setSkipped(true)
        return { correct: false, maxReached: true, attempts: newAttempts }
      }
      return { correct: false, attempts: newAttempts }
    }
  }, [currentPuzzle, score, attempts])

  // 主动放弃
  const giveUp = useCallback(() => {
    setSkipped(true)
    setScore(0)
  }, [])

  const goResult = useCallback(() => setScreen('result'), [])

  const nextQuestion = useCallback(() => {
    const nextIdx = (queueIndex + 1) % queue.length
    setQueueIndex(nextIdx)
    resetRound()
    setScreen('game')
  }, [queue, queueIndex])

  const goHome = useCallback(() => {
    resetRound()
    setScreen('home')
  }, [])

  const goBack = useCallback(() => setScreen('home'), [])

  function triggerDelta(value) {
    setLastDelta(value)
    setTimeout(() => setLastDelta(null), 1300)
  }

  return {
    screen,
    pendingTags,
    currentPuzzle,
    score,
    hintsUnlocked,
    attempts,
    totalScore,
    sessionCount,
    lastDelta,
    shakeInput,
    skipped,
    startGame,
    goToDifficulty,
    unlockHint,
    submitAnswer,
    giveUp,
    goResult,
    nextQuestion,
    goHome,
    goBack,
    queueIndex,
    totalPuzzles: queue.length,
    wrongThreshold: WRONG_THRESHOLD,
    maxAttempts: MAX_ATTEMPTS,
  }
}
