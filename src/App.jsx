import React from 'react'
import { useGame } from './hooks/useGame'
import HomePage       from './components/HomePage'
import DifficultyPage from './components/DifficultyPage'
import GamePage       from './components/GamePage'
import ResultPage     from './components/ResultPage'

export default function App() {
  const game = useGame()

  if (game.screen === 'home') {
    return <HomePage onStart={game.goToDifficulty} />
  }

  if (game.screen === 'difficulty') {
    return (
      <DifficultyPage
        onSelect={(diff) => game.startGame(diff, game.pendingTags)}
        onBack={game.goBack}
      />
    )
  }

  if (game.screen === 'game' && game.currentPuzzle) {
    return (
      <GamePage
        puzzle={game.currentPuzzle}
        score={game.score}
        hintsUnlocked={game.hintsUnlocked}
        attempts={game.attempts}
        lastDelta={game.lastDelta}
        shakeInput={game.shakeInput}
        skipped={game.skipped}
        queueIndex={game.queueIndex}
        totalPuzzles={game.totalPuzzles}
        wrongThreshold={game.wrongThreshold}
        maxAttempts={game.maxAttempts}
        onUnlockHint={game.unlockHint}
        onSubmit={game.submitAnswer}
        onGoResult={game.goResult}
        onGoHome={game.goHome}
        onGiveUp={game.giveUp}
      />
    )
  }

  if (game.screen === 'result' && game.currentPuzzle) {
    return (
      <ResultPage
        puzzle={game.currentPuzzle}
        score={game.score}
        hintsUnlocked={game.hintsUnlocked}
        attempts={game.attempts}
        totalScore={game.totalScore}
        sessionCount={game.sessionCount}
        skipped={game.skipped}
        onNext={game.nextQuestion}
        onHome={game.goHome}
      />
    )
  }

  return null
}
