import { Canvas } from '@react-three/fiber'
import { Environment, Preload, ScrollControls } from '@react-three/drei'
import { Model as Character } from './components/model.tsx'
import { SceneController } from './components/SceneController.tsx'
import { SceneReady } from './components/SceneReady.tsx'
import Loader from './components/Loader.tsx'
import { HtmlContent } from './components/HtmlContent.tsx'
import { AnimatePresence, motion } from 'framer-motion'
import { lazy, Suspense, useEffect, useState } from 'react'
import useIsPhone from './hooks/useIsPhone.ts'
import useLandingStore from './store/landing.ts'

// The macOS desktop (windows, PDF viewer, fonts, wallpaper) is only needed at the end of the scroll.
const loadMacDesktop = () => import('./macOS/MacDesktop.tsx')
const MacDesktop = lazy(loadMacDesktop)
// Phones get an iPhone home screen instead.
const loadIosDesktop = () => import('./ios/IosDesktop.tsx')
const IosDesktop = lazy(loadIosDesktop)
const DESKTOP_WALLPAPER = '/images/wallpaper.webp'
import SiteHeader from './components/SiteHeader.tsx'
import ChapterRail from './components/ChapterRail.tsx'
import ProjectSheet from './components/ProjectSheet.tsx'

function App() {
const [isDesktopOpen, setIsDesktopOpen] = useState(false)
const isProjectOpen = useLandingStore((s) => s.openProjectSlug !== null)
const sceneReady = useLandingStore((s) => s.sceneReady)
const isPhone = useIsPhone()

// Leaving the phone screen returns to the story: scroll back up so the scene wakes up again.
const leavePhoneScreen = () => {
  setIsDesktopOpen(false)
  useLandingStore.getState().goToChapter(2)
}

// Once the first screen is up and the browser is idle, fetch the desktop and its wallpaper
// so they are already there by the end of the scroll.
useEffect(() => {
  if (!sceneReady) return
  const prefetch = () => {
    void (isPhone ? loadIosDesktop() : loadMacDesktop())
    new Image().src = DESKTOP_WALLPAPER
  }
  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(prefetch, { timeout: 4000 })
    return () => window.cancelIdleCallback(id)
  }
  const id = setTimeout(prefetch, 2000)
  return () => clearTimeout(id)
}, [sceneReady, isPhone])

  return (
    <>
    <div className="landing-stage" style={{ width: '100vw', height: '100dvh', position:"relative", overflow: 'hidden'}}>
      
      {/* Canvas теперь на весь экран, но скролл будет управлять контентом */}
      {/* Pause rendering while an overlay fully covers the scene. */}
      <Canvas
        shadows
        camera={{ position: [-0.4, 0.3, 1.7], fov: 38 }}
        frameloop={isDesktopOpen || isProjectOpen ? 'never' : 'always'}
      >
        
        <ScrollControls pages={4} damping={0.2}>
          
          {/* Everything heavy suspends here together; the loader covers it until the first frames are drawn. */}
          <Suspense fallback={null}>
            <SceneController onOpenDesktop={(isOpen) => setIsDesktopOpen(isOpen)}>
              <group position={[-0.4, -1.3, 0]}>
                <Character />
              </group>
            </SceneController>

            {/* Self-hosted copy of the drei "city" preset, so no third-party server is needed. */}
            <Environment files="/hdri/potsdamer_platz_1k.hdr" />
            <Preload all />
            <SceneReady />
          </Suspense>

          {/* Свет */}
          <ambientLight intensity={0.3} />
          <directionalLight
            castShadow
            position={[5, 5, 5]}
            intensity={2}
                        shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0002}
            shadow-camera-far={20}
          />
        </ScrollControls>
      </Canvas>

      {/* Pinned chapter text, portalled into drei's sticky scroll layer */}
      <HtmlContent />
      <SiteHeader />
      <ChapterRail />
      <ProjectSheet />
      <Loader />

      <AnimatePresence>
        {isDesktopOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100dvh',
              zIndex: 9999,
              pointerEvents: 'auto',
              backgroundImage: `url('${DESKTOP_WALLPAPER}')`,
              backgroundSize: 'cover',   // Чтобы картинка заполнила весь экран
              backgroundPosition: 'center'
            }}
          >
            
            <Suspense fallback={null}>
              {isPhone ? <IosDesktop onClose={leavePhoneScreen} /> : <MacDesktop onClose={() => setIsDesktopOpen(false)} />}
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  )
}

export default App