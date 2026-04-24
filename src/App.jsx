import React from 'react'
import { useGame } from './hooks/useGame'
import HomePage   from './components/HomePage'
import GamePage   from './components/GamePage'
import ResultPage from './components/ResultPage'

export default function App() {
  const game = useGame()

  if (game.screen === 'home') {
    return <HomePage onStart={game.startGame} />
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
        queueIndex={game.queueIndex}
        totalPuzzles={game.totalPuzzles}
        wrongThreshold={game.wrongThreshold}
        onUnlockHint={game.unlockHint}
        onSubmit={game.submitAnswer}
        onGoResult={game.goResult}
        onGoHome={game.goHome}
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
        onNext={game.nextQuestion}
        onHome={game.goHome}
      />
    )
  }

  return null
}
