import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { getProject, projects, type Project } from '../data/projects'
import useLandingStore, { projectSlugFromHash } from '../store/landing'

const ScreenshotSlot = ({ label, large = false }: { label: string; large?: boolean }) => (
  <figure
    className={`flex items-center justify-center rounded-lg border border-dashed border-ink-soft/40 bg-ink/5 ${
      large ? 'aspect-[16/10]' : 'aspect-[4/3]'
    }`}
  >
    <figcaption className="px-4 text-center text-sm text-ink-soft">Screenshot: {label}</figcaption>
  </figure>
)

const SheetSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mt-10">
    <h3 className="text-lg font-semibold text-ink">{title}</h3>
    <div className="mt-3 text-base leading-relaxed text-ink-soft">{children}</div>
  </section>
)

const CaseStudy = ({ project }: { project: Project }) => {
  const openProject = useLandingStore((s) => s.openProject)
  const index = projects.findIndex((p) => p.slug === project.slug)
  const previous = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <article className="px-10 pt-6 pb-12 max-sm:px-5">
      <p className="text-sm text-ink-soft">
        {project.kind === 'Commercial' ? `Client work for ${project.client}` : 'Personal project'}
      </p>
      <h2 id="case-study-title" className="mt-2 text-[3rem] leading-none font-extrabold tracking-[-0.03em] text-ink max-sm:text-[2.25rem]">
        {project.name}
      </h2>
      <p className="mt-4 max-w-[40ch] text-[1.3125rem] leading-snug text-ink">{project.summary}</p>

      <dl className="mt-8 grid grid-cols-[1fr_0.5fr_1.6fr] gap-6 border-y border-line py-5 text-sm max-sm:grid-cols-1 max-sm:gap-3">
        <div>
          <dt className="text-ink-soft">Role</dt>
          <dd className="mt-1 text-ink">{project.role}</dd>
        </div>
        <div>
          <dt className="text-ink-soft">Year</dt>
          <dd className="mt-1 text-ink tabular-nums">{project.year}</dd>
        </div>
        <div>
          <dt className="text-ink-soft">Stack</dt>
          <dd className="mt-1 text-ink">{project.stack.join(', ')}</dd>
        </div>
      </dl>

      <div className="mt-8 space-y-3">
        <ScreenshotSlot label={project.screenshots[0]} large />
        <div className="grid grid-cols-2 gap-3">
          {project.screenshots.slice(1, 3).map((label) => (
            <ScreenshotSlot key={label} label={label} />
          ))}
        </div>
      </div>

      <SheetSection title="The problem">
        <p className="max-w-[60ch]">{project.problem}</p>
      </SheetSection>

      <SheetSection title="What I did">
        <ul className="max-w-[60ch] space-y-2">
          {project.contribution.map((item) => (
            <li key={item} className="grid grid-cols-[1rem_1fr]">
              <span aria-hidden className="mt-[0.7em] block h-1 w-1 rounded-full bg-action" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </SheetSection>

      <SheetSection title="Result">
        <p className="max-w-[60ch]">{project.outcome}</p>
        <dl className="mt-6 grid grid-cols-3 gap-6 max-sm:grid-cols-2">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="sr-only">{metric.label}</dt>
              <dd className="text-[2.25rem] leading-none font-bold tracking-tight text-ink tabular-nums">
                {metric.value}
              </dd>
              <dd className="mt-2 text-sm text-ink-soft">{metric.label}</dd>
            </div>
          ))}
        </dl>
      </SheetSection>

      <div className="mt-10 flex flex-wrap gap-3">
        {project.links.length > 0 ? (
          project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-action px-5 py-2.5 text-[0.9375rem] font-semibold text-action-ink transition-colors hover:bg-action-hover"
            >
              {link.label}
            </a>
          ))
        ) : (
          <p className="text-sm text-ink-soft">
            The code and screens are under NDA. I'm happy to walk you through them on a call.
          </p>
        )}
      </div>

      <nav aria-label="Other projects" className="mt-14 grid grid-cols-2 gap-6 border-t border-line pt-6 text-sm">
        <button type="button" onClick={() => openProject(previous.slug)} className="cursor-pointer text-left">
          <span className="block text-ink-soft">Previous project</span>
          <span className="mt-1 block font-semibold text-ink hover:text-ink">{previous.name}</span>
        </button>
        <button type="button" onClick={() => openProject(next.slug)} className="cursor-pointer text-right">
          <span className="block text-ink-soft">Next project</span>
          <span className="mt-1 block font-semibold text-ink hover:text-ink">{next.name}</span>
        </button>
      </nav>
    </article>
  )
}

const ProjectSheet = () => {
  const slug = useLandingStore((s) => s.openProjectSlug)
  const openProject = useLandingStore((s) => s.openProject)
  const closeProject = useLandingStore((s) => s.closeProject)
  const reduceMotion = useReducedMotion()
  const project = slug ? getProject(slug) : undefined

  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  // Deep link: /#work/solmix opens that case study on load.
  useEffect(() => {
    const initialSlug = projectSlugFromHash(window.location.hash)
    if (initialSlug && getProject(initialSlug)) openProject(initialSlug)
  }, [openProject])

  // Remember what opened the sheet, move focus in, and give it back on close.
  useEffect(() => {
    if (!project) return
    returnFocusRef.current ??= document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus({ preventScroll: true })
    panelRef.current?.scrollTo({ top: 0 })
  }, [project])

  useEffect(() => {
    if (project) return
    returnFocusRef.current?.focus({ preventScroll: true })
    returnFocusRef.current = null
  }, [project])

  useEffect(() => {
    if (!project) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProject()
      // Keep Tab inside the dialog.
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>('a[href], button')
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [project, closeProject])

  const slide = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } }

  return (
    <AnimatePresence>
      {project && (
        <div className="landing fixed inset-0 z-[60]">
          <motion.div
            aria-hidden
            onClick={closeProject}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-stage/80"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            {...slide}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 w-[min(44rem,100%)] overflow-y-auto overscroll-contain border-l border-line bg-sheet"
          >
            <div className="sticky top-0 z-10 flex justify-end bg-sheet px-6 py-4">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeProject}
                className="flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 text-sm text-ink-soft ring-1 ring-line transition-colors ring-inset hover:text-ink"
              >
                <X className="h-4 w-4" aria-hidden />
                Close
              </button>
            </div>
            <CaseStudy key={project.slug} project={project} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ProjectSheet
