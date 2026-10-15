import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import useLandingStore from '../store/landing'

// Mounted inside the same Suspense boundary as the model, so it only exists once everything
// has loaded. It waits a few frames, so the first heavy frames happen behind the loading screen.
const FRAMES_BEFORE_READY = 3

export const SceneReady = () => {
  const frames = useRef(0)

  useFrame(() => {
    frames.current += 1
    if (frames.current === FRAMES_BEFORE_READY) useLandingStore.getState().setSceneReady()
  })

  return null
}
