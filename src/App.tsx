import { Canvas } from '@react-three/fiber'
import { Environment, ScrollControls, Scroll } from '@react-three/drei'
import { Model as Character } from './components/model.jsx'
import { SceneController } from './components/SceneController.tsx'
import { HtmlContent } from './components/HtmlContent.jsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import MacDesktop from './macOS/MacDesktop.tsx'

import './macOS/MacOs.css'
import './macOS/MacOs2.css'
import NavLink from './components/NavLink.tsx'
import ScrollIndicator from './components/ScrollIndicator.tsx'

function App() {
const [isDesktopOpen, setIsDesktopOpen] = useState(false)

  return (
    <>
    <div style={{ width: '100vw', height: '100vh', background: '#0b0b0b', position:"relative", overflow: 'hidden'}}>
      
      {/* Canvas теперь на весь экран, но скролл будет управлять контентом */}
      <Canvas shadows camera={{ position: [-0.4, 0.3, 1.7], fov: 38 }}>
        
        <ScrollControls pages={4} damping={0.2}>
          
          <SceneController onOpenDesktop={(isOpen) => setIsDesktopOpen(isOpen)}>
            <group position={[-0.4, -1.3, 0]}>
              <Character />
            </group>
          </SceneController>

          {/* Свет и окружение */}
          <Environment preset="city" />
          <ambientLight intensity={0.3} />
          <directionalLight
            castShadow
            position={[5, 5, 5]}
            intensity={2}
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0002}
            shadow-camera-far={20}
          />
          {/* HTML-слой с "привязкой" */}
          
          <HtmlContent />
          
        </ScrollControls>
      </Canvas>

      <NavLink />
      <ScrollIndicator />

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
              height: '100vh',
              zIndex: 9999,
              pointerEvents: 'auto',
              backgroundImage: "url('/images/wallpaper.jpeg')", // Добавили url() и убрали ../
              backgroundSize: 'cover',   // Чтобы картинка заполнила весь экран
              backgroundPosition: 'center'
            }}
          >
            
            {/* Твой компонент macOS */}
            <MacDesktop onClose={() => setIsDesktopOpen(false)}/>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  )
}

export default App