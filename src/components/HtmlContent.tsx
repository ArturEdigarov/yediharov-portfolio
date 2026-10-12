import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { projects, type Project } from '../data/projects'
import { experience, profile, stack } from '../data/profile'
import useLandingStore from '../store/landing'

// A pinned chapter: it stays in place while the reader scrolls through it,
// and hands over to the next one with a short crossfade.
const Chapter = ({ children, labelledBy }: { children: ReactNode; labelledBy: string }) => {
  const reduceMotion = useReducedMotion()
  const shift = reduceMotion ? 0 : 14
  // A relay rather than a swap: the old chapter leaves quickly,
  // the new one arrives a beat later and settles slowly.
  const motionProps = {
    initial: { opacity: 0, y: shift },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const },
    },
    exit: {
      opacity: 0,
      y: -shift,
      transition: { duration: 0.35, ease: [0.4, 0, 1, 1] as const },
    },
  }

  return (
    <motion.section aria-labelledby={labelledBy} {...motionProps} className="absolute inset-0">
      <div className="absolute top-1/2 left-[56%] w-[min(36rem,38vw)] -translate-y-1/2 max-md:inset-x-4 max-md:w-auto max-md:rounded-2xl max-md:bg-stage/85 max-md:p-5">
        {children}
      </div>
    </motion.section>
  )
}

// The intro reveal plays once per page load, not every time the reader scrolls back.
let introHasRevealed = false

const Intro = () => {
  const reduceMotion = useReducedMotion()
  const shouldReveal = !reduceMotion && !introHasRevealed
  useEffect(() => {
    introHasRevealed = true
  }, [])
  // The single orchestrated moment on the page: name, promise, actions.
  const reveal = (delay: number) =>
    !shouldReveal
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <Chapter labelledBy="intro-title">
      <motion.h1
        id="intro-title"
        {...reveal(0.2)}
        className="text-[clamp(3rem,6vw,4.5rem)] leading-[0.95] font-extrabold tracking-[-0.035em] text-aluminium"
      >
        Artur
        <br />
        Yediharov
      </motion.h1>

      <motion.p {...reveal(0.35)} className="mt-6 max-w-[30ch] text-[1.5rem] leading-snug font-medium text-aluminium">
        I build web products end to end, from the interface down to the machines it controls.
      </motion.p>

      <motion.p {...reveal(0.45)} className="mt-4 max-w-[46ch] text-base leading-relaxed text-graphite">
        Fullstack developer in Hannover with over a year of commercial experience.
        Open to working student roles at 20 hours a week and to remote contracts.
      </motion.p>

      <motion.div {...reveal(0.6)} className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={profile.cvUrl}
          download={profile.cvFileName}
          className="rounded-full bg-keylight px-5 py-2.5 text-[0.9375rem] font-semibold text-stage transition-colors hover:bg-keylight-strong"
        >
          Download CV
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="rounded-full px-5 py-2.5 text-[0.9375rem] font-semibold text-aluminium ring-1 ring-line transition-colors ring-inset hover:ring-graphite"
        >
          Email me
        </a>
      </motion.div>
    </Chapter>
  )
}

const ProjectRow = ({ project }: { project: Project }) => {
  const openProject = useLandingStore((s) => s.openProject)

  return (
    <li className="border-t border-line last:border-b">
      <button
        type="button"
        onClick={() => openProject(project.slug)}
        aria-haspopup="dialog"
        className="group grid w-full cursor-pointer grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1.5 py-5 text-left"
      >
        <span className="text-[1.75rem] leading-tight font-bold tracking-[-0.02em] text-aluminium transition-colors group-hover:text-keylight">
          {project.name}
        </span>
        <span className="text-sm text-graphite tabular-nums">{project.year}</span>

        <span className="col-span-2 max-w-[48ch] text-base leading-relaxed text-graphite">
          {project.summary}
        </span>

        <span className="col-span-2 mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span className="text-aluminium">
            {project.kind === 'Commercial' ? `Client work, ${project.client}` : 'Personal project'}
          </span>
          <span className="text-graphite">{project.stack.slice(0, 3).join(', ')}</span>
          <span className="ml-auto font-semibold text-keylight opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 max-md:opacity-100">
            Read case study
          </span>
        </span>
      </button>
    </li>
  )
}

const Work = () => (
  <Chapter labelledBy="work-title">
    <h2 id="work-title" className="text-[2.25rem] leading-tight font-bold tracking-tight text-aluminium">
      Selected work
    </h2>
    <p className="mt-2 text-base text-graphite">Two products for clients and one I built to learn.</p>
    <ul className="mt-8">
      {projects.map((project) => (
        <ProjectRow key={project.slug} project={project} />
      ))}
    </ul>
  </Chapter>
)

const Experience = () => (
  <Chapter labelledBy="experience-title">
    <h2 id="experience-title" className="text-[2.25rem] leading-tight font-bold tracking-tight text-aluminium">
      Experience
    </h2>

    <ol className="mt-8 space-y-6">
      {experience.map((entry) => (
        <li key={entry.place} className="grid grid-cols-[7.5rem_1fr] gap-x-6 max-sm:grid-cols-1">
          <span className="pt-0.5 text-sm text-graphite tabular-nums">{entry.period}</span>
          <div>
            <p className="text-lg leading-snug font-semibold text-aluminium">{entry.title}</p>
            <p className="text-base text-aluminium/80">{entry.place}</p>
            <p className="mt-1 text-sm leading-relaxed text-graphite">{entry.detail}</p>
          </div>
        </li>
      ))}
    </ol>

    <dl className="mt-10 grid grid-cols-[7.5rem_1fr] gap-x-6 gap-y-2 border-t border-line pt-6 text-sm max-sm:grid-cols-1">
      {stack.map(({ area, tools }) => (
        <div key={area} className="contents">
          <dt className="text-graphite">{area}</dt>
          <dd className="text-aluminium">{tools.join(', ')}</dd>
        </div>
      ))}
    </dl>
  </Chapter>
)

// A quiet hint that the page continues; it leaves once the reader reaches the next chapter.
const ScrollHint = () => {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.8, delay: 1.4 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-graphite max-md:bottom-20"
    >
      <span className="text-xs">Scroll</span>
      <motion.span
        aria-hidden
        animate={reduceMotion ? undefined : { y: [0, 6, 0], opacity: [1, 0.45, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-5 w-5 text-keylight" />
      </motion.span>
    </motion.div>
  )
}

const CHAPTER_VIEWS = [Intro, Work, Experience]

// Rendered through a portal into drei's sticky layer, so wheel and touch
// over the text still scroll the page and drive the 3D scene.
export const HtmlContent = () => {
  const fixedEl = useLandingStore((s) => s.fixedEl)
  const chapter = useLandingStore((s) => s.chapter)
  if (!fixedEl) return null

  // Chapter 3 is the throw: the stage belongs to the character, so no text.
  const ChapterView = CHAPTER_VIEWS[chapter]

  return createPortal(
    <div className="landing absolute inset-0">
      <AnimatePresence initial={false}>{ChapterView && <ChapterView key={chapter} />}</AnimatePresence>
      <AnimatePresence>{chapter === 0 && <ScrollHint />}</AnimatePresence>
    </div>,
    fixedEl,
  )
}
