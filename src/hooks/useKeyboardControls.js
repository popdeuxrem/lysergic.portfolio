import { useEffect, useRef } from 'react'

const keyMap = {
  KeyW: 'forward', ArrowUp: 'forward',
  KeyS: 'backward', ArrowDown: 'backward',
  KeyA: 'left', ArrowLeft: 'left',
  KeyD: 'right', ArrowRight: 'right',
  ControlLeft: 'brake', KeyB: 'brake',
  ShiftLeft: 'boost',
}

export function useKeyboardControls() {
  const keysRef = useRef({ forward: false, backward: false, left: false, right: false, brake: false, boost: false })

  useEffect(() => {
    const handleDown = (e) => { if (keyMap[e.code]) keysRef.current[keyMap[e.code]] = true }
    const handleUp = (e) => { if (keyMap[e.code]) keysRef.current[keyMap[e.code]] = false }
    window.addEventListener('keydown', handleDown)
    window.addEventListener('keyup', handleUp)
    return () => { window.removeEventListener('keydown', handleDown); window.removeEventListener('keyup', handleUp) }
  }, [])

  return keysRef.current
}
