import { ChevronRight } from 'lucide-react'
import { archiveProjects } from '../../data/extras'
import { Group, Row, Screen } from '../components/Screen'

// Archive: selected work, listed like the Files app. A tap opens the live page when there is one.
const ArchiveApp = () => (
  <Screen title="Archive">
    <Group>
      {archiveProjects.map((project) => (
        <Row key={project.id} href={project.href} className="items-start py-3">
          <span className="mt-0.5 block aspect-[16/10] w-[68px] shrink-0 overflow-hidden rounded-[9px] bg-[var(--ios-fill)] ring-1 ring-black/10">
            {project.image && (
              <img src={project.image} alt="" loading="lazy" decoding="async" draggable={false} className="size-full object-cover" />
            )}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate">{project.name}</span>
            <span className="mt-0.5 line-clamp-2 block text-[14px] leading-[19px] text-[var(--ios-label-2)]">
              {project.description}
            </span>
            <span className="mt-1 block text-[13px] text-[var(--ios-label-3)]">{project.meta}</span>
          </span>
          {project.href && (
            <ChevronRight aria-hidden className="mt-1 size-[18px] shrink-0 text-[var(--ios-label-3)]" strokeWidth={2.6} />
          )}
        </Row>
      ))}
    </Group>
    <p className="px-9 pt-3 text-[13px] leading-[18px] text-[var(--ios-label-2)]">
      Selected work. Tap an entry with an arrow to open it.
    </p>
  </Screen>
)

export default ArchiveApp
