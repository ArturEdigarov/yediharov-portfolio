import { ChevronLeft, Wifi } from 'lucide-react'
import { statusBarTime, useNow } from '../time'

const SignalBars = () => (
  <svg viewBox="0 0 18 12" aria-hidden className="h-3 w-[18px] fill-current">
    <rect x="0" y="8" width="3" height="4" rx="0.8" />
    <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" />
    <rect x="10" y="3" width="3" height="9" rx="0.8" />
    <rect x="15" y="0" width="3" height="12" rx="0.8" />
  </svg>
)

const BatteryIcon = () => (
  <svg viewBox="0 0 27 13" aria-hidden className="h-[13px] w-[27px]">
    <rect x="0.5" y="0.5" width="22" height="12" rx="3.6" fill="none" stroke="currentColor" opacity="0.4" />
    <rect x="2" y="2" width="19" height="9" rx="2.3" fill="currentColor" />
    <path d="M24 4.5v4c.9-.3 1.6-1.1 1.6-2s-.7-1.7-1.6-2z" fill="currentColor" opacity="0.45" />
  </svg>
)

// `onWallpaper` is white text over the wallpaper; otherwise it follows the app's colours.
// When `onBack` is given, the time is replaced by a "back to the site" link, like iOS does
// after jumping from one app to another.
const StatusBar = ({
  onWallpaper = false,
  backLabel,
  onBack,
}: {
  onWallpaper?: boolean
  backLabel?: string
  onBack?: () => void
}) => {
  const now = useNow(15_000)

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 z-30 flex h-11 items-center justify-between px-6 text-[15px] font-semibold ${
        onWallpaper ? 'text-white' : 'text-[var(--ios-label)]'
      }`}
    >
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="pointer-events-auto -ml-2.5 flex items-center rounded-full py-1.5 pr-3 pl-1 transition-opacity active:opacity-50"
        >
          <ChevronLeft aria-hidden className="size-[18px]" strokeWidth={3} />
          {backLabel}
        </button>
      ) : (
        <span className="tabular-nums">{statusBarTime(now)}</span>
      )}
      <span className="flex items-center gap-[6px]">
        <SignalBars />
        <Wifi aria-hidden className="size-[17px]" strokeWidth={2.6} />
        <BatteryIcon />
      </span>
    </div>
  )
}

export default StatusBar
