import { useProgress } from '@react-three/drei'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { profile } from '../data/profile'
import useLandingStore from '../store/landing'

// Keep the loading screen long enough to read, even when everything is cached.
const MIN_VISIBLE_MS = 900
// If something never finishes (blocked request), let the visitor in anyway.
const GIVE_UP_MS = 20_000
// While assets are still loading the counter waits here instead of showing a false 100.
const WAITING_CEILING = 96

// The same layout lives in index.html as a static first frame, so this screen
// replaces it without a visible jump. Keep the two in sync.
const Loader = () => {
  const { progress, active } = useProgress()
  const sceneReady = useLandingStore((s) => s.sceneReady)
  const bootDone = useLandingStore((s) => s.bootDone)
  const reduceMotion = useReducedMotion()

  const countRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)
  const goal = useRef(0)
  const gaveUp = useRef(false)

  const loaded = sceneReady && !active
  useEffect(() => {
    goal.current = loaded || gaveUp.current ? 100 : Math.min(progress, WAITING_CEILING)
  }, [loaded, progress])

  // The number and the bar follow the goal every frame, bypassing React re-renders.
  useEffect(() => {
    const startedAt = performance.now()
    let shown = 0
    let frame = 0

    const tick = (now: number) => {
      shown += (goal.current - shown) * 0.1
      if (goal.current === 100 && shown > 99.4) shown = 100

      if (countRef.current) countRef.current.textContent = String(Math.round(shown))
      if (barRef.current) barRef.current.style.transform = `scaleX(${shown / 100})`

      if (shown === 100 && now - startedAt >= MIN_VISIBLE_MS) {
        useLandingStore.getState().finishBoot()
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    const giveUp = setTimeout(() => {
      gaveUp.current = true
      goal.current = 100
    }, GIVE_UP_MS)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(giveUp)
    }
  }, [])

  return (
    <AnimatePresence>
      {!bootDone && (
        <motion.div
          key="loader"
          role="status"
          aria-label="Loading the portfolio"
          exit={reduceMotion ? { opacity: 0 } : { y: '-100%' }}
          transition={{ duration: reduceMotion ? 0.4 : 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="landing landing-stage fixed inset-0 z-[100]"
        >
          <div className="mx-auto flex h-full max-w-7xl flex-col justify-between px-6 py-5 max-sm:px-4">
            <span className="text-[0.9375rem] font-bold tracking-tight">{profile.name}</span>
            <span
              aria-hidden
              className="pb-6 text-[clamp(5rem,14vw,11rem)] leading-[0.8] font-extrabold tracking-[-0.04em] tabular-nums"
            >
              <span ref={countRef}>0</span>
              <span className="ml-1 align-top text-[0.18em] font-bold tracking-normal text-ink-soft">%</span>
            </span>
          </div>
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-ink/15">
            <span
              ref={barRef}
              style={{ transform: 'scaleX(0)' }}
              className="absolute inset-0 origin-left bg-accent-text"
            />
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Loader
