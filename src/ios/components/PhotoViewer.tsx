import { motion, useReducedMotion } from 'framer-motion'

// Full-screen photo on black, closed with the button or a tap on the picture.
const PhotoViewer = ({ src, title, onClose }: { src: string; title: string; onClose: () => void }) => {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
      transition={{ duration: 0.22 }}
      className="absolute inset-0 z-40 bg-black text-white"
    >
      <button type="button" aria-label="Close photo" onClick={onClose} className="absolute inset-0 grid place-items-center">
        <img src={src} alt={title} draggable={false} className="max-h-[78%] w-full object-contain" />
      </button>
      <p className="pointer-events-none absolute inset-x-0 top-[52px] truncate px-20 text-center text-[15px] font-semibold">{title}</p>
      <button
        type="button"
        onClick={onClose}
        className="absolute top-[46px] right-4 z-10 rounded-full px-2 py-1.5 text-[17px] font-semibold text-[var(--ios-tint)] active:opacity-40"
      >
        Done
      </button>
    </motion.div>
  )
}

export default PhotoViewer
