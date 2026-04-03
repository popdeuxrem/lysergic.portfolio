import { EffectComposer, Bloom } from '@react-three/postprocessing'

export function PostProcessing() {
  const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|Android/i.test(navigator.userAgent)

  if (isMobile) return null

  return (
    <EffectComposer multisampling={0}>
      <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
    </EffectComposer>
  )
}
