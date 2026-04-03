import { Vehicle } from './Vehicle'
import { Environment } from './Environment'
import { CameraRig } from './CameraRig'
import { PostProcessing } from './PostProcessing'
import { TriggerZones } from './TriggerZones'

export function Experience() {
  return (
    <>
      <CameraRig />
      <Environment />
      <Vehicle />
      <TriggerZones />
      <PostProcessing />
    </>
  )
}
