import { create } from 'zustand'

export const useGameStore = create((set) => ({
  ready: false,
  started: false,
  carPosition: { x: 0, y: 0, z: 0 },
  speed: 0,
  activePanel: null,
  setReady: () => set({ ready: true }),
  setStarted: () => set({ started: true }),
  setCarPosition: (pos) => set({ carPosition: pos }),
  setSpeed: (spd) => set({ speed: spd }),
  setActivePanel: (panel) => set({ activePanel: panel }),
}))
