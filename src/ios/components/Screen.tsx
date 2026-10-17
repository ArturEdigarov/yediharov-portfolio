import { ChevronLeft } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useState, type ReactNode } from 'react'

const IOS_EASE = [0.32, 0.72, 0, 1] as const

// A screen with an iOS large title. Scroll and the title shrinks into the navigation bar,
// which turns into frosted glass with a hairline under it.
export const Screen = ({
  title,
  backLabel,
  onBack,
  children,
}: {
  title: string
  backLabel?: string
  onBack?: () => void
  children: ReactNode
}) => {
  const [scrolled, setScrolled] = useState(false)

  return (
    <div className="absolute inset-0 bg-[var(--ios-grouped-bg)]">
      <header
        className={`absolute inset-x-0 top-0 z-10 flex h-[88px] items-end justify-center px-2 pb-1 transition-colors duration-200 ${
          scrolled ? 'ios-glass border-b border-[var(--ios-sep)] bg-[var(--ios-material)]' : 'border-b border-transparent'
        }`}
      >
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="absolute bottom-0 left-1 flex h-11 items-center gap-0.5 pr-3 pl-1 text-[17px] text-[var(--ios-tint)] transition-opacity active:opacity-40"
          >
            <ChevronLeft aria-hidden className="size-[22px]" strokeWidth={2.6} />
            {backLabel}
          </button>
        )}
        <h2
          aria-hidden={!scrolled}
          className={`mb-2.5 max-w-[55%] truncate text-[17px] leading-[22px] font-semibold transition-opacity duration-150 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {title}
        </h2>
      </header>

      <div
        onScroll={(event) => setScrolled(event.currentTarget.scrollTop > 34)}
        className="no-scrollbar absolute inset-0 overflow-y-auto overscroll-contain pt-[88px] pb-[50px]"
      >
        <h1 className="px-5 pt-1 pb-3 text-[34px] leading-[41px] font-bold tracking-[-0.022em]">{title}</h1>
        {children}
      </div>
    </div>
  )
}

// A rounded, inset group of rows on a grouped background.
export const Group = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mx-4 overflow-hidden rounded-[10px] bg-[var(--ios-cell)] ${className}`}>{children}</div>
)

// One row. Separators start inset from the left edge and skip the last row.
export const Row = ({
  children,
  onPress,
  href,
  className = '',
}: {
  children: ReactNode
  onPress?: () => void
  href?: string
  className?: string
}) => {
  const base = `relative flex min-h-11 w-full items-center gap-3 px-4 py-2.5 text-left text-[17px] after:absolute after:right-0 after:bottom-0 after:left-4 after:h-px after:bg-[var(--ios-sep)] last:after:hidden ${className}`
  const tappable = 'transition-colors active:bg-[var(--ios-fill)]'

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${tappable}`}>
        {children}
      </a>
    )
  }
  if (onPress) {
    return (
      <button type="button" onClick={onPress} className={`${base} ${tappable}`}>
        {children}
      </button>
    )
  }
  return <div className={base}>{children}</div>
}

// Small grey section title above a group, as in Settings.
export const SectionHeader = ({ children }: { children: ReactNode }) => (
  <h3 className="px-9 pt-6 pb-1.5 text-[13px] leading-4 text-[var(--ios-label-2)] uppercase">{children}</h3>
)

// A screen that slides in from the right over the one below, and goes back with a swipe from the left edge.
export const PushScreen = ({ onBack, children }: { onBack: () => void; children: ReactNode }) => {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { x: '100%' }}
      animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { x: '100%' }}
      transition={{ duration: reduceMotion ? 0.15 : 0.38, ease: IOS_EASE }}
      className="absolute inset-0 z-10 shadow-[-12px_0_32px_rgb(0_0_0/0.3)]"
    >
      {children}
      <motion.div
        aria-hidden
        onPanEnd={(_, info) => {
          if (info.offset.x > 70 && Math.abs(info.offset.y) < 80) onBack()
        }}
        style={{ touchAction: 'pan-y' }}
        className="absolute inset-y-0 left-0 z-20 w-5"
      />
    </motion.div>
  )
}
