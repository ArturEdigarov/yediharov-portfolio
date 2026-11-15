import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { getProject, projectImages, projects, type Project, type ProjectImage } from '../data/projects'
import useLandingStore, { projectSlugFromHash } from '../store/landing'

// A picture that opens full size. `tint` is what shows while it loads.
const Picture = ({
  image,
  tint,
  onZoom,
  className = '',
  imgClassName = 'w-full',
  priority = false,
}: {
  image: ProjectImage
  tint: string
  onZoom: (element: HTMLElement) => void
  className?: string
  imgClassName?: string
  priority?: boolean
}) => (
  <figure className={className}>
    <button
      type="button"
      onClick={(event) => onZoom(event.currentTarget)}
      aria-label={`View full size: ${image.caption ?? image.alt}`}
      className="group block w-full cursor-zoom-in overflow-hidden rounded-xl ring-1 ring-line"
      style={{ backgroundColor: tint }}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        className={`block h-auto transition-transform duration-500 group-hover:scale-[1.02] ${imgClassName}`}
      />
    </button>
    {image.caption && <figcaption className="mt-2 text-sm text-ink-soft">{image.caption}</figcaption>}
  </figure>
)

const SheetSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mt-10">
    <h3 className="text-lg font-semibold text-ink">{title}</h3>
    <div className="mt-3 text-base leading-relaxed text-ink-soft">{children}</div>
  </section>
)

const CaseStudy = ({ project, onZoom }: { project: Project; onZoom: (index: number, element: HTMLElement) => void }) => {
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

      <Picture
        image={project.cover}
        tint={project.tint}
        priority
        className="mt-8"
        onZoom={(element) => onZoom(0, element)}
      />

      <SheetSection title="The problem">
        <p className="max-w-[60ch]">{project.problem}</p>
      </SheetSection>

      <SheetSection title="What I did">
        <ul className="max-w-[60ch] space-y-2">
          {project.contribution.map((item) => (
            <li key={item} className="grid grid-cols-[1rem_1fr]">
              <span aria-hidden className="mt-[0.7em] block h-1.5 w-1.5 rounded-full bg-accent-text" />
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

      <SheetSection title="Screens">
        <div className="grid grid-cols-2 gap-x-3 gap-y-5 max-sm:grid-cols-1">
          {project.gallery.map((image, index) => (
            <Picture
              key={image.src}
              image={image}
              tint={project.tint}
              onZoom={(element) => onZoom(1 + index, element)}
            />
          ))}
        </div>
      </SheetSection>

      {project.mobile.length > 0 && (
        <SheetSection title="On the phone">
          <div className="no-scrollbar -mx-10 flex snap-x gap-3 overflow-x-auto px-10 pb-2 max-sm:-mx-5 max-sm:px-5">
            {project.mobile.map((image, index) => (
              <Picture
                key={image.src}
                image={image}
                tint={project.tint}
                imgClassName="h-80 w-auto max-w-none"
                className="shrink-0 snap-start"
                onZoom={(element) => onZoom(1 + project.gallery.length + index, element)}
              />
            ))}
          </div>
        </SheetSection>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        {project.links.length > 0 ? (
          project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-accent px-5 py-2.5 text-[0.9375rem] font-semibold text-accent-ink transition-colors hover:bg-accent-hover"
            >
              {link.label}
            </a>
          ))
        ) : (
          <p className="text-sm text-ink-soft">
            This is a private client project, so the code is not public. I'm happy to walk you through it on a call.
          </p>
        )}
      </div>

      <nav aria-label="Other projects" className="mt-14 grid grid-cols-2 gap-6 border-t border-line pt-6 text-sm">
        <button type="button" onClick={() => openProject(previous.slug)} className="cursor-pointer text-left">
          <span className="block text-ink-soft">Previous project</span>
          <span className="mt-1 block font-semibold text-ink hover:text-accent-text">{previous.name}</span>
        </button>
        <button type="button" onClick={() => openProject(next.slug)} className="cursor-pointer text-right">
          <span className="block text-ink-soft">Next project</span>
          <span className="mt-1 block font-semibold text-ink hover:text-accent-text">{next.name}</span>
        </button>
      </nav>
    </article>
  )
}

// Full-size viewer over the case study. Arrow keys move between pictures, Esc closes only the viewer.
const Lightbox = ({
  images,
  index,
  onIndex,
  onClose,
  tint,
}: {
  images: ProjectImage[]
  index: number
  onIndex: (index: number) => void
  onClose: () => void
  tint: string
}) => {
  const closeRef = useRef<HTMLButtonElement>(null)
  const image = images[index]

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true })
  }, [])

  const go = (step: number) => onIndex((index + step + images.length) % images.length)

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Picture viewer"
      data-lightbox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-10 flex flex-col bg-stage/95"
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <p className="min-w-0 truncate text-sm text-ink-soft">
          <span className="tabular-nums">
            {index + 1} / {images.length}
          </span>
          {image.caption ? `, ${image.caption}` : ''}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 text-sm text-ink-soft ring-1 ring-line transition-colors ring-inset hover:text-ink"
        >
          <X className="h-4 w-4" aria-hidden />
          Close
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6">
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          draggable={false}
          className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
          style={{ backgroundColor: tint }}
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous picture"
              onClick={() => go(-1)}
              className="absolute left-3 grid size-11 cursor-pointer place-items-center rounded-full bg-sheet/80 text-ink ring-1 ring-line backdrop-blur transition-colors hover:bg-sheet"
            >
              <ChevronLeft aria-hidden className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next picture"
              onClick={() => go(1)}
              className="absolute right-3 grid size-11 cursor-pointer place-items-center rounded-full bg-sheet/80 text-ink ring-1 ring-line backdrop-blur transition-colors hover:bg-sheet"
            >
              <ChevronRight aria-hidden className="size-5" />
            </button>
          </>
        )}
      </div>
    </motion.div>
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

  // Which picture is open full size, and what to focus again when it closes.
  const [zoom, setZoom] = useState<{ slug: string; index: number } | null>(null)
  const zoomReturnRef = useRef<HTMLElement | null>(null)
  const images = project ? projectImages(project) : []
  const zoomIndex = project && zoom?.slug === project.slug ? zoom.index : null

  const openZoom = (index: number, element: HTMLElement) => {
    if (!project) return
    zoomReturnRef.current = element
    setZoom({ slug: project.slug, index })
  }
  const closeZoom = () => {
    setZoom(null)
    zoomReturnRef.current?.focus({ preventScroll: true })
  }

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
      const viewerOpen = zoomIndex !== null

      if (e.key === 'Escape') {
        // One layer at a time: the picture viewer first, then the case study.
        if (viewerOpen) closeZoom()
        else closeProject()
        return
      }

      if (viewerOpen && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        const step = e.key === 'ArrowRight' ? 1 : -1
        setZoom({ slug: project.slug, index: (zoomIndex + step + images.length) % images.length })
        return
      }

      // Keep Tab inside whichever layer is on top.
      if (e.key === 'Tab') {
        const scope = viewerOpen
          ? panelRef.current?.parentElement?.querySelector<HTMLElement>('[data-lightbox]')
          : panelRef.current
        if (!scope) return
        const focusable = scope.querySelectorAll<HTMLElement>('a[href], button')
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
  }, [project, closeProject, zoomIndex, images.length])

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
            <CaseStudy key={project.slug} project={project} onZoom={openZoom} />
          </motion.div>

          <AnimatePresence>
            {zoomIndex !== null && (
              <Lightbox
                key="lightbox"
                images={images}
                index={zoomIndex}
                tint={project.tint}
                onIndex={(index) => setZoom({ slug: project.slug, index })}
                onClose={closeZoom}
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ProjectSheet
