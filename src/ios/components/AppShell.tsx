import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState, type ReactNode } from 'react'
import StatusBar from './StatusBar'

// iOS's own easing: quick at the start, a long soft landing.
const IOS_EASE = [0.32, 0.72, 0, 1] as const

const insetFor = (rect: DOMRect, viewport: { width: number; height: number }, radius: number) =>
  `inset(${rect.top}px ${viewport.width - rect.right}px ${viewport.height - rect.bottom}px ${rect.left}px round ${radius}px)`

// A full-screen app. It opens out of the icon it was launched from and closes back into it.
// The pill at the bottom is the home indicator: tap it or swipe up to go home.
const AppShell = ({ origin, onClose, children }: { origin: DOMRect; onClose: () => void; children: ReactNode }) => {
  const reduceMotion = useReducedMotion()
  const [viewport] = useState(() => ({ width: window.innerWidth, height: window.innerHeight }))

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const closed = reduceMotion
    ? { opacity: 0 }
    : {
        clipPath: insetFor(origin, viewport, 14),
        scale: 0.9,
        opacity: 0,
      }
  const opened = reduceMotion
    ? { opacity: 1 }
    : {
        clipPath: insetFor(new DOMRect(0, 0, viewport.width, viewport.height), viewport, 0),
        scale: 1,
        opacity: 1,
      }

  return (
    <motion.div
      initial={closed}
      animate={opened}
      exit={closed}
      transition={{ duration: reduceMotion ? 0.2 : 0.46, ease: IOS_EASE }}
      style={{ transformOrigin: `${origin.left + origin.width / 2}px ${origin.top + origin.height / 2}px` }}
      className="absolute inset-0 z-20 overflow-hidden bg-[var(--ios-grouped-bg)]"
    >
      {children}
      <StatusBar />
      <motion.button
        type="button"
        aria-label="Go home"
        onTap={onClose}
        onPanEnd={(_, info) => {
          if (info.offset.y < -24 || info.velocity.y < -300) onClose()
        }}
        style={{ touchAction: 'none' }}
        className="absolute inset-x-0 bottom-0 z-30 flex h-[34px] items-end justify-center pb-2"
      >
        <span className="h-[5px] w-[134px] rounded-full bg-[var(--ios-label)]" />
      </motion.button>
    </motion.div>
  )
}

export default AppShell
