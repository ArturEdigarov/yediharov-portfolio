import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useState, type ComponentType } from 'react'
import './ios.css'
import type { AppId } from './apps'
import AppShell from './components/AppShell'
import HomeScreen from './components/HomeScreen'
import StatusBar from './components/StatusBar'
import ArchiveApp from './apps/ArchiveApp'
import ArticlesApp from './apps/ArticlesApp'
import ContactApp from './apps/ContactApp'
import GalleryApp from './apps/GalleryApp'
import PortfolioApp from './apps/PortfolioApp'
import ResumeApp from './apps/ResumeApp'
import SkillsApp from './apps/SkillsApp'

const screens: Record<AppId, ComponentType> = {
  portfolio: PortfolioApp,
  gallery: GalleryApp,
  contact: ContactApp,
  resume: ResumeApp,
  skills: SkillsApp,
  articles: ArticlesApp,
  archive: ArchiveApp,
}

interface OpenApp {
  id: AppId
  // Where the app opens from, and where it closes back to.
  origin: DOMRect
}

// The phone version of the desktop: an iPhone home screen. `onClose` leaves it and returns to the story.
const IosDesktop = ({ onClose }: { onClose: () => void }) => {
  const [open, setOpen] = useState<OpenApp | null>(null)
  const reduceMotion = useReducedMotion()

  const openApp = useCallback((id: AppId, anchor: HTMLElement) => {
    setOpen({ id, origin: anchor.getBoundingClientRect() })
  }, [])
  const closeApp = useCallback(() => setOpen(null), [])

  const ActiveScreen = open ? screens[open.id] : null

  return (
    <main aria-label="Home screen" className="ios absolute inset-0 overflow-hidden">
      {/* The home screen steps back while an app is open, as it does on iOS. */}
      <motion.div
        animate={{ scale: open && !reduceMotion ? 0.94 : 1, opacity: open ? 0.55 : 1 }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        className="absolute inset-0"
      >
        <HomeScreen onOpenApp={openApp} />
      </motion.div>

      {!open && <StatusBar onWallpaper backLabel="Portfolio" onBack={onClose} />}

      <AnimatePresence>
        {open && ActiveScreen && (
          <AppShell key={open.id} origin={open.origin} onClose={closeApp}>
            <ActiveScreen />
          </AppShell>
        )}
      </AnimatePresence>
    </main>
  )
}

export default IosDesktop
