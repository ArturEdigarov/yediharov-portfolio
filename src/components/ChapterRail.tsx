import { useEffect, useRef } from 'react'
import useLandingStore, { CHAPTERS, chapterProgress, scrollOffset, type ChapterIndex } from '../store/landing'

// Shows where the reader is in the story, how much of the current chapter is left,
// and lets them jump between chapters.
const ChapterRail = () => {
  const chapter = useLandingStore((s) => s.chapter)
  const goToChapter = useLandingStore((s) => s.goToChapter)
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([])

  // Fills follow the scroll every frame, so they bypass React and write transforms directly.
  useEffect(
    () =>
      scrollOffset.subscribe((offset) => {
        fillRefs.current.forEach((fill, index) => {
          if (fill) fill.style.transform = `scaleX(${chapterProgress(offset, index)})`
        })
      }),
    [],
  )

  return (
    <nav
      aria-label="Chapters"
      className="landing fixed bottom-6 left-[56%] z-40 w-[min(36rem,38vw)] max-md:inset-x-5 max-md:w-auto"
    >
      <ol className="grid grid-cols-4 gap-3">
        {CHAPTERS.map((item, index) => {
          const isActive = chapter === index
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => goToChapter(index as ChapterIndex)}
                aria-current={isActive ? 'step' : undefined}
                className="group w-full cursor-pointer pt-3 text-left"
              >
                <span aria-hidden className="relative block h-[3px] overflow-hidden rounded-full bg-ink/15">
                  <span
                    ref={(el) => {
                      fillRefs.current[index] = el
                    }}
                    style={{ transform: 'scaleX(0)' }}
                    className={`absolute inset-0 origin-left rounded-full transition-colors duration-500 ${
                      isActive ? 'bg-accent-text' : 'bg-ink-soft'
                    }`}
                  />
                </span>
                <span
                  className={`mt-2 block text-xs transition-colors duration-500 ${
                    isActive ? 'text-ink' : 'text-ink-soft group-hover:text-ink'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default ChapterRail
