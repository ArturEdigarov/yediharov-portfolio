import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronRight, ExternalLink, Folder } from 'lucide-react'
import { useState } from 'react'
import { projects, type Project } from '../../data/projects'
import { Group, PushScreen, Row, Screen } from '../components/Screen'

const IOS_EASE = [0.32, 0.72, 0, 1] as const

const ProjectDetail = ({ project, onBack }: { project: Project; onBack: () => void }) => (
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

    {/* Screenshots scroll sideways and snap, like a Photos strip. */}
    <div className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4">
      {project.screenshots.map((label) => (
        <figure
          key={label}
          className="grid aspect-[4/3] w-[82%] shrink-0 snap-center place-items-center rounded-[14px] border border-dashed border-[var(--ios-label-3)] bg-[var(--ios-cell)]"
        >
          <figcaption className="px-4 text-center text-[14px] text-[var(--ios-label-2)]">Screenshot: {label}</figcaption>
        </figure>
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
          The code and screens are under NDA. I'm happy to walk you through them on a call.
        </p>
      )}
    </div>
  </Screen>
)

// Work: the project list. A tap pushes the full case study over it.
const PortfolioApp = () => {
  const [selected, setSelected] = useState<Project | null>(null)
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
                <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-[9px] bg-gradient-to-b from-[#4db3ff] to-[#1b7cff] text-white">
                  <Folder aria-hidden className="size-5" fill="currentColor" strokeWidth={1.5} />
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
            Two client products and one personal project.
          </p>
        </Screen>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <PushScreen key={selected.slug} onBack={() => setSelected(null)}>
            <ProjectDetail project={selected} onBack={() => setSelected(null)} />
          </PushScreen>
        )}
      </AnimatePresence>
    </>
  )
}

export default PortfolioApp
