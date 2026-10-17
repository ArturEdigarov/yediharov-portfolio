import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { gallery } from '../../macOS/constants'
import PhotoViewer from '../components/PhotoViewer'
import { Screen } from '../components/Screen'

// Library: a three-column grid with hairline gaps, like Photos.
const GalleryApp = () => {
  const [openId, setOpenId] = useState<number | null>(null)
  const opened = gallery.find((photo) => photo.id === openId)

  return (
    <>
      <Screen title="Library">
        <ul className="grid grid-cols-3 gap-[2px]">
          {gallery.map((photo) => (
            <li key={photo.id}>
              <button type="button" onClick={() => setOpenId(photo.id)} aria-label={`Open photo ${photo.id}`} className="block aspect-square w-full overflow-hidden active:opacity-70">
                <img src={photo.img} alt="" draggable={false} className="size-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
        <p className="pt-6 text-center text-[15px] text-[var(--ios-label-2)]">
          {gallery.length} Photos
        </p>
      </Screen>

      <AnimatePresence>
        {opened && <PhotoViewer key={opened.id} src={opened.img} title={`Photo ${opened.id}`} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </>
  )
}

export default GalleryApp
