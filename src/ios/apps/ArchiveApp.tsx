import { AnimatePresence } from 'framer-motion'
import { Image as ImageIcon } from 'lucide-react'
import { useState } from 'react'
import { locations } from '../../macOS/constants'
import type { FinderItem } from '../../macOS/types'
import PhotoViewer from '../components/PhotoViewer'
import { Group, Row, Screen } from '../components/Screen'

// Archive: old files, listed like the Files app.
const ArchiveApp = () => {
  const [opened, setOpened] = useState<FinderItem | null>(null)
  const files = locations.trash.children

  return (
    <>
      <Screen title="Archive">
        <Group>
          {files.map((file) => (
            <Row key={file.id} onPress={file.imageUrl ? () => setOpened(file) : undefined}>
              <span className="grid size-8 shrink-0 place-items-center rounded-[7px] bg-[var(--ios-fill)] text-[var(--ios-tint)]">
                <ImageIcon aria-hidden className="size-[18px]" strokeWidth={2} />
              </span>
              <span className="truncate">{file.name}</span>
            </Row>
          ))}
        </Group>
        <p className="px-9 pt-3 text-[13px] leading-[18px] text-[var(--ios-label-2)]">
          {files.length} {files.length === 1 ? 'item' : 'items'}
        </p>
      </Screen>

      <AnimatePresence>
        {opened?.imageUrl && (
          <PhotoViewer key={opened.id} src={opened.imageUrl} title={opened.name} onClose={() => setOpened(null)} />
        )}
      </AnimatePresence>
    </>
  )
}

export default ArchiveApp
