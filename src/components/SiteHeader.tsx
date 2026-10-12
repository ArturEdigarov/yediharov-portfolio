import { Moon, Sun } from 'lucide-react'
import { profile } from '../data/profile'
import useThemeStore from '../store/theme'
import useLandingStore, { CHAPTERS, type ChapterIndex } from '../store/landing'

const SECTION_LINKS: ChapterIndex[] = [1, 2, 3]

const SiteHeader = () => {
  const chapter = useLandingStore((s) => s.chapter)
  const goToChapter = useLandingStore((s) => s.goToChapter)
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)

  return (
    <header className="landing pointer-events-none fixed inset-x-0 top-0 z-50 px-6 py-5 max-sm:px-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        <button
          type="button"
          onClick={() => goToChapter(0)}
          className="pointer-events-auto cursor-pointer text-[0.9375rem] font-bold tracking-tight whitespace-nowrap text-ink"
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
                className="cursor-pointer rounded-full px-3 py-1.5 text-ink-soft transition-colors hover:text-ink aria-[current]:text-ink"
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
            className="rounded-full px-3 py-1.5 text-ink-soft transition-colors hover:text-ink max-sm:hidden"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-3 py-1.5 text-ink-soft transition-colors hover:text-ink max-sm:hidden"
          >
            LinkedIn
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="ml-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-ink/10 hover:text-ink"
          >
            {theme === 'dark' ? <Sun aria-hidden className="h-[1.125rem] w-[1.125rem]" /> : <Moon aria-hidden className="h-[1.125rem] w-[1.125rem]" />}
          </button>
          <a
            href={profile.cvUrl}
            download={profile.cvFileName}
            className="ml-2 rounded-full bg-action px-4 py-1.5 font-semibold whitespace-nowrap text-action-ink transition-colors hover:bg-action-hover"
          >
            Download CV
          </a>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
