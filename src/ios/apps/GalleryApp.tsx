import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { libraryPhotos } from '../../data/extras'
import PhotoViewer from '../components/PhotoViewer'
import { Screen } from '../components/Screen'

// Library: a three-column grid with hairline gaps, like Photos. Every picture from the case studies.
const GalleryApp = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const opened = openIndex === null ? undefined : libraryPhotos[openIndex]

  return (
    <>
      <Screen title="Library">
        <ul className="grid grid-cols-3 gap-[2px]">
          {libraryPhotos.map((photo, index) => (
            <li key={photo.src}>
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`Open ${photo.caption ?? photo.alt}`}
                className="block aspect-square w-full overflow-hidden bg-[var(--ios-fill)] active:opacity-70"
              >
                <img src={photo.src} alt="" loading="lazy" decoding="async" draggable={false} className="size-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
        <p className="pt-6 text-center text-[15px] text-[var(--ios-label-2)]">{libraryPhotos.length} Photos</p>
      </Screen>

      <AnimatePresence>
        {opened && (
          <PhotoViewer
            key={opened.src}
            src={opened.src}
            title={opened.caption ?? opened.project}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default GalleryApp
