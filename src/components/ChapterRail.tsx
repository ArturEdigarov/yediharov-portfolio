import useLandingStore, { CHAPTERS, type ChapterIndex } from '../store/landing'

// Shows where the reader is in the story and lets them jump between chapters.
const ChapterRail = () => {
  const chapter = useLandingStore((s) => s.chapter)
  const goToChapter = useLandingStore((s) => s.goToChapter)

  return (
    <nav
      aria-label="Chapters"
      className="landing fixed bottom-6 left-[56%] z-40 w-[min(36rem,38vw)] max-md:inset-x-5 max-md:w-auto"
    >
      <ol className="grid grid-cols-4 gap-3">
        {CHAPTERS.map((item, index) => {
          const isActive = chapter === index
          const isPast = index < chapter
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => goToChapter(index as ChapterIndex)}
                aria-current={isActive ? 'step' : undefined}
                className="group w-full cursor-pointer pt-3 text-left"
              >
                <span
                  aria-hidden
                  className={`block h-0.5 rounded-full transition-colors duration-500 ${
                    isActive ? 'bg-keylight' : isPast ? 'bg-graphite/60' : 'bg-line group-hover:bg-graphite/60'
                  }`}
                />
                <span
                  className={`mt-2 block text-xs transition-colors ${
                    isActive ? 'text-aluminium' : 'text-graphite group-hover:text-aluminium'
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
