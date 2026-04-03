import { Suspense } from 'react'
import { Vehicle } from './Vehicle'
import { Environment } from './Environment'
import { CameraRig } from './CameraRig'
import { PostProcessing } from './PostProcessing'
import { TriggerZones } from './TriggerZones'

export function Experience() {
  return (
    <>
      <CameraRig />
      <Suspense fallback={null}>
        <Environment />
        <Vehicle />
        <TriggerZones />
        <PostProcessing />
      </Suspense>
    </>
  )
}
