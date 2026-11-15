import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronRight, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { projectImages, projects, type Project } from '../../data/projects'
import PhotoViewer from '../components/PhotoViewer'
import { Group, PushScreen, Row, Screen } from '../components/Screen'

const IOS_EASE = [0.32, 0.72, 0, 1] as const

const ProjectDetail = ({
  project,
  onBack,
  onOpenImage,
}: {
  project: Project
  onBack: () => void
  onOpenImage: (index: number) => void
}) => (
  <Screen title={project.name} backLabel="Work" onBack={onBack}>
    <p className="px-5 pb-5 text-[17px] leading-[23px] text-[var(--ios-label-2)]">{project.summary}</p>

    <Group>
      <Row>
        <span>Role</span>
        <span className="ml-auto text-right text-[var(--ios-label-2)]">{project.role}</span>
      </Row>
      <Row>
        <span>Year</span>
        <span className="ml-auto text-[var(--ios-label-2)] tabular-nums">{project.year}</span>
      </Row>
      <Row>
        <span>{project.kind === 'Commercial' ? 'Client' : 'Type'}</span>
        <span className="ml-auto text-right text-[var(--ios-label-2)]">
          {project.kind === 'Commercial' ? project.client : 'Personal project'}
        </span>
      </Row>
      <Row className="items-start">
        <span>Stack</span>
        <span className="ml-auto max-w-[68%] text-right text-[var(--ios-label-2)]">{project.stack.join(', ')}</span>
      </Row>
    </Group>

    {/* Pictures scroll sideways and snap, like a Photos strip. A tap opens one full screen. */}
    <div className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4">
      {projectImages(project).map((image, index) => (
        <button
          key={image.src}
          type="button"
          onClick={() => onOpenImage(index)}
          aria-label={`Open ${image.caption ?? image.alt}`}
          className="shrink-0 snap-center overflow-hidden rounded-[14px] bg-[var(--ios-cell)] active:opacity-70"
          style={{ backgroundColor: project.tint }}
        >
          <img
            src={image.src}
            alt={image.alt}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            draggable={false}
            className="block h-[190px] w-auto max-w-none"
          />
        </button>
      ))}
    </div>

    <h3 className="px-5 pt-8 pb-2 text-[22px] leading-7 font-bold tracking-[-0.02em]">The problem</h3>
    <p className="px-5 text-[17px] leading-[23px] text-[var(--ios-label-2)]">{project.problem}</p>

    <h3 className="px-5 pt-8 pb-2 text-[22px] leading-7 font-bold tracking-[-0.02em]">What I did</h3>
    <ul className="space-y-2.5 px-5 text-[17px] leading-[23px] text-[var(--ios-label-2)]">
      {project.contribution.map((item) => (
        <li key={item} className="grid grid-cols-[14px_1fr]">
          <span aria-hidden className="mt-[9px] size-[6px] rounded-full bg-[var(--ios-tint)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>

    <h3 className="px-5 pt-8 pb-2 text-[22px] leading-7 font-bold tracking-[-0.02em]">Key decisions</h3>
    <dl className="space-y-4 px-5">
      {project.decisions.map((decision) => (
        <div key={decision.title}>
          <dt className="text-[17px] leading-[22px] font-semibold">{decision.title}</dt>
          <dd className="mt-0.5 text-[17px] leading-[23px] text-[var(--ios-label-2)]">{decision.text}</dd>
        </div>
      ))}
    </dl>

    <h3 className="px-5 pt-8 pb-2 text-[22px] leading-7 font-bold tracking-[-0.02em]">Result</h3>
    <p className="px-5 text-[17px] leading-[23px] text-[var(--ios-label-2)]">{project.outcome}</p>
    <dl className="mt-4 grid grid-cols-3 gap-2 px-4">
      {project.metrics.map((metric) => (
        <div key={metric.label} className="rounded-[14px] bg-[var(--ios-cell)] px-3 py-3.5">
          <dd className="text-[26px] leading-8 font-bold tracking-[-0.03em] tabular-nums">{metric.value}</dd>
          <dt className="mt-1 text-[12px] leading-[15px] text-[var(--ios-label-2)]">{metric.label}</dt>
        </div>
      ))}
    </dl>

    <div className="mt-8 space-y-3 px-4">
      {project.links.length > 0 ? (
        project.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[50px] items-center justify-center gap-2 rounded-[14px] bg-[var(--ios-tint)] text-[17px] font-semibold text-white transition-opacity active:opacity-60"
          >
            {link.label}
            <ExternalLink aria-hidden className="size-4" strokeWidth={2.4} />
          </a>
        ))
      ) : (
        <p className="px-1 text-[15px] leading-[21px] text-[var(--ios-label-2)]">
          This is a private client project, so the code is not public. I'm happy to walk you through it on a call.
        </p>
      )}
    </div>
  </Screen>
)

// Work: the project list. A tap pushes the full case study over it.
const PortfolioApp = () => {
  const [selected, setSelected] = useState<Project | null>(null)
  const [openImage, setOpenImage] = useState<number | null>(null)
  const images = selected ? projectImages(selected) : []
  const viewed = openImage === null ? undefined : images[openImage]
  const reduceMotion = useReducedMotion()

  return (
    <>
      <motion.div
        animate={{ x: selected && !reduceMotion ? '-28%' : 0 }}
        transition={{ duration: 0.38, ease: IOS_EASE }}
        className="absolute inset-0"
      >
        <Screen title="Work">
          <Group>
            {projects.map((project) => (
              <Row key={project.slug} onPress={() => setSelected(project)} className="items-start py-3">
                <span
                  className="mt-0.5 block aspect-[16/10] w-[68px] shrink-0 overflow-hidden rounded-[9px] ring-1 ring-black/10"
                  style={{ backgroundColor: project.tint }}
                >
                  <img src={project.cover.src} alt="" loading="lazy" decoding="async" draggable={false} className="size-full object-cover" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate">{project.name}</span>
                  <span className="mt-0.5 line-clamp-2 block text-[14px] leading-[19px] text-[var(--ios-label-2)]">
                    {project.summary}
                  </span>
                </span>
                <span className="mt-0.5 flex shrink-0 items-center gap-0.5 text-[15px] text-[var(--ios-label-2)] tabular-nums">
                  {project.year}
                  <ChevronRight aria-hidden className="size-[18px] text-[var(--ios-label-3)]" strokeWidth={2.6} />
                </span>
              </Row>
            ))}
          </Group>
          <p className="px-9 pt-3 text-[13px] leading-[18px] text-[var(--ios-label-2)]">
            Two commercial products and one of my own.
          </p>
        </Screen>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <PushScreen key={selected.slug} onBack={() => setSelected(null)}>
            <ProjectDetail project={selected} onBack={() => setSelected(null)} onOpenImage={setOpenImage} />
          </PushScreen>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {viewed && (
          <PhotoViewer
            key={viewed.src}
            src={viewed.src}
            title={viewed.caption ?? viewed.alt}
            onClose={() => setOpenImage(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default PortfolioApp
