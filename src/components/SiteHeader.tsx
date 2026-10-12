import { profile } from '../data/profile'
import useLandingStore, { CHAPTERS, type ChapterIndex } from '../store/landing'

const SECTION_LINKS: ChapterIndex[] = [1, 2, 3]

const SiteHeader = () => {
  const chapter = useLandingStore((s) => s.chapter)
  const goToChapter = useLandingStore((s) => s.goToChapter)

  return (
    <header className="landing pointer-events-none fixed inset-x-0 top-0 z-50 px-6 py-5 max-sm:px-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        <button
          type="button"
          onClick={() => goToChapter(0)}
          className="pointer-events-auto cursor-pointer text-[0.9375rem] font-bold tracking-tight text-aluminium"
        >
          {profile.name}
        </button>

        <div className="pointer-events-auto flex items-center gap-1 text-sm">
          <nav aria-label="Sections" className="flex items-center gap-1 max-md:hidden">
            {SECTION_LINKS.map((index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToChapter(index)}
                aria-current={chapter === index ? 'true' : undefined}
                className="cursor-pointer rounded-full px-3 py-1.5 text-graphite transition-colors hover:text-aluminium aria-[current]:text-aluminium"
              >
                {CHAPTERS[index].label}
              </button>
            ))}
          </nav>

          <span aria-hidden className="mx-2 h-4 w-px bg-line max-md:hidden" />

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-3 py-1.5 text-graphite transition-colors hover:text-aluminium"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-3 py-1.5 text-graphite transition-colors hover:text-aluminium max-sm:hidden"
          >
            LinkedIn
          </a>
          <a
            href={profile.cvUrl}
            download={profile.cvFileName}
            className="ml-2 rounded-full bg-keylight px-4 py-1.5 font-semibold text-stage transition-colors hover:bg-keylight-strong"
          >
            Download CV
          </a>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
