import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { dockItems, gridItems, type AppId, type HomeItem } from '../apps'
import AppIcon from './AppIcon'
import { AvailabilityWidget, ClockWidget, PhotoWidget } from './Widgets'

// Everything pops in once, like icons do when an iPhone unlocks.
const Entrance = ({ index, className = '', children }: { index: number; className?: string; children: ReactNode }) => {
  const reduceMotion = useReducedMotion()
  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.82 },
        animate: { opacity: 1, scale: 1 },
        transition: { type: 'spring' as const, stiffness: 420, damping: 30, delay: 0.04 + index * 0.028 },
      }

  return (
    <motion.div {...motionProps} className={className}>
      {children}
    </motion.div>
  )
}

const HomeScreen = ({ onOpenApp }: { onOpenApp: (id: AppId, anchor: HTMLElement) => void }) => {
  const press = (item: HomeItem) => (anchor: HTMLElement) => {
    if (item.kind === 'app') onOpenApp(item.id, anchor)
    // A mailto link must go through the page itself; a new tab would stay blank.
    else if (item.href.startsWith('mailto:')) window.location.href = item.href
    else window.open(item.href, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="absolute inset-0 flex flex-col px-5 pt-[52px] pb-3">
      <div className="grid grid-cols-2 gap-4 [--widget-h:clamp(104px,17vh,160px)] [&>*]:h-[var(--widget-h)]">
        <Entrance index={0} className="col-span-2">
          <AvailabilityWidget onPress={(anchor) => onOpenApp('contact', anchor)} />
        </Entrance>
        <Entrance index={1}>
          <PhotoWidget onPress={(anchor) => onOpenApp('gallery', anchor)} />
        </Entrance>
        <Entrance index={2}>
          <ClockWidget />
        </Entrance>
      </div>

      <ul className="mt-6 grid grid-cols-4 gap-y-[18px]">
        {gridItems.map((item, index) => (
          <li key={item.id}>
            <Entrance index={3 + index}>
              <AppIcon name={item.name} Art={item.Art} onPress={press(item)} />
            </Entrance>
          </li>
        ))}
      </ul>

      <Entrance index={9} className="mt-auto">
        <ul className="ios-glass flex justify-between rounded-[2rem] bg-[var(--ios-dock)] px-[14px] py-3">
          {dockItems.map((item) => (
            <li key={item.id}>
              <AppIcon name={item.name} Art={item.Art} onPress={(anchor) => onOpenApp(item.id, anchor)} showLabel={false} />
            </li>
          ))}
        </ul>
      </Entrance>
    </div>
  )
}

export default HomeScreen
