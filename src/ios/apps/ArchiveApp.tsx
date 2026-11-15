import { ChevronRight, Folder } from 'lucide-react'
import { archiveProjects } from '../../data/extras'
import { Group, Row, Screen } from '../components/Screen'

// Archive: earlier projects, listed like the Files app. A tap opens the repository.
const ArchiveApp = () => (
  <Screen title="Archive">
    <Group>
      {archiveProjects.map((project) => (
        <Row key={project.id} href={project.href} className="items-start py-3">
          <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-[9px] bg-[var(--ios-fill)] text-[var(--ios-tint)]">
            <Folder aria-hidden className="size-5" fill="currentColor" strokeWidth={1.5} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate">{project.name}</span>
            <span className="mt-0.5 line-clamp-2 block text-[14px] leading-[19px] text-[var(--ios-label-2)]">
              {project.description}
            </span>
            <span className="mt-1 block text-[13px] text-[var(--ios-label-3)]">
              {project.language}, {project.year}
            </span>
          </span>
          <ChevronRight aria-hidden className="mt-1 size-[18px] shrink-0 text-[var(--ios-label-3)]" strokeWidth={2.6} />
        </Row>
      ))}
    </Group>
    <p className="px-9 pt-3 text-[13px] leading-[18px] text-[var(--ios-label-2)]">
      Earlier projects, from before my commercial work.
    </p>
  </Screen>
)

export default ArchiveApp
