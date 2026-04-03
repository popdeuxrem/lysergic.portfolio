import { useRef, useEffect, useCallback } from 'react'
import { useGameStore } from '../store'

let audioContext = null

export function useAudio() {
  const engineRef = useRef(null)
  const activePanel = useGameStore(s => s.activePanel)
  const speed = useGameStore(s => s.speed)

  const initAudio = useCallback(() => {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)()
    }
    return audioContext
  }, [])

  const playBeep = useCallback(() => {
    const ctx = initAudio()
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(880, ctx.currentTime)
    
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.1)
  }, [initAudio])

  const playZoneEnter = useCallback(() => {
    const ctx = initAudio()
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(440, ctx.currentTime)
    oscillator.frequency.setValueAtTime(880, ctx.currentTime + 0.05)
    
    gainNode.gain.setValueAtTime(0.05, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.15)
  }, [initAudio])

  useEffect(() => {
    if (activePanel) {
      playZoneEnter()
    }
  }, [activePanel, playZoneEnter])

  return { playBeep, playZoneEnter, initAudio }
}