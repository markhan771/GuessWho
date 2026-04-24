import { useState, useCallback } from 'react'
import { puzzles } from '../data/puzzles'

const INITIAL_SCORE   = 100
const HINT_COST       = 10
const WRONG_COST      = 10
const WRONG_THRESHOLD = 3

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function useGame() {
  const [screen, setScreen]         = useState('home')
  const [queue, setQueue]           = useState([])
  const [queueIndex, setQueueIndex] = useState(0)
  const [score, setScore]           = useState(INITIAL_SCORE)
  const [hintsUnlocked, setHints]   = useState(1)
  const [attempts, setAttempts]     = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [sessionCount, setSession]  = useState(0)
  const [lastDelta, setLastDelta]   = useState(null)
  const [shakeInput, setShakeInput] = useState(false)

  const currentPuzzle = queue[queueIndex] ?? null

  const startGame = useCallback((selectedTags) => {
    // 按 tag 筛选，没选就全部
    const pool = selectedTags.length === 0
      ? puzzles
      : puzzles.filter(p => selectedTags.every(t => p.tags.includes(t)))
    const finalPool = pool.length > 0 ? pool : puzzles // fallback 防空
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
    // 只匹配 acceptedAnswers（规范答案）
    const isCorrect = currentPuzzle.acceptedAnswers.some(
      a => a.toLowerCase() === normalized
    )
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
      return { correct: false, attempts: newAttempts }
    }
  }, [currentPuzzle, score, attempts])

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

  function triggerDelta(value) {
    setLastDelta(value)
    setTimeout(() => setLastDelta(null), 1300)
  }

  return {
    screen,
    currentPuzzle,
    score,
    hintsUnlocked,
    attempts,
    totalScore,
    sessionCount,
    lastDelta,
    shakeInput,
    startGame,
    unlockHint,
    submitAnswer,
    goResult,
    nextQuestion,
    goHome,
    queueIndex,
    totalPuzzles: queue.length,
    wrongThreshold: WRONG_THRESHOLD,
  }
}
