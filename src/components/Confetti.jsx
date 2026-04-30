import React, { useEffect, useState } from 'react'

const COLORS = ['#22c55e', '#16a34a', '#4ade80', '#fbbf24', '#f87171', '#60a5fa', '#a78bfa']
const SHAPES = ['●', '■', '▲', '★', '♦']

export default function Confetti({ active }) {
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    if (!active) return
    const arr = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 1.2,
      duration: 2 + Math.random() * 1.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      size: 10 + Math.random() * 14,
      rotate: Math.random() * 360,
    }))
    setPieces(arr)
    const t = setTimeout(() => setPieces([]), 4000)
    return () => clearTimeout(t)
  }, [active])

  if (!pieces.length) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map(p => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: '-20px',
            color: p.color,
            fontSize: `${p.size}px`,
            animation: `confetti-drop ${p.duration}s ${p.delay}s ease-in forwards`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          {p.shape}
        </div>
      ))}
    </div>
  )
}
