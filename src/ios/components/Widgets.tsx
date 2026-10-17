import { ChevronRight } from 'lucide-react'
import { availability, desktopPhotos } from '../../data/desktop'
import { timeParts, useNow } from '../time'

const WIDGET_CLASS =
  'ios-glass relative overflow-hidden rounded-[22px] bg-[var(--ios-widget)] text-left shadow-[0_2px_10px_rgb(0_0_0/0.18)]'

// Wide widget: whether the visitor can hire Artur, in what format, and the local time there.
export const AvailabilityWidget = ({ onPress }: { onPress: (el: HTMLElement) => void }) => {
  const now = useNow(15_000)
  const hannover = new Intl.DateTimeFormat('en-GB', {
    timeZone: availability.timeZone,
    hour: '2-digit',
    minute: '2-digit',
  }).format(now)

  return (
    <button
      type="button"
      onClick={(event) => onPress(event.currentTarget)}
      aria-label="Availability, open contact"
      className={`${WIDGET_CLASS} flex h-full w-full flex-col justify-between p-4 transition-transform duration-150 active:scale-[0.97]`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-[15px] leading-5 font-semibold">
            <span className="size-2.5 rounded-full bg-[var(--ios-green)] shadow-[0_0_0_3px_rgb(48_209_88/0.25)]" />
            {availability.status}
          </p>
          <ul className="mt-2 space-y-0.5 text-[13.5px] leading-[18px] text-[var(--ios-label-2)]">
            {availability.looking.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="text-right">
          <p className="text-[30px] leading-8 font-light tracking-[-0.03em] tabular-nums">{hannover}</p>
          <p className="text-[12px] leading-4 text-[var(--ios-label-2)]">Hannover</p>
        </div>
      </div>
      <div className="flex items-center justify-between text-[12.5px] leading-4">
        <span className="text-[var(--ios-label-2)]">{availability.languages.join(', ')}</span>
        <span className="flex items-center font-medium text-[var(--ios-tint)]">
          Get in touch
          <ChevronRight aria-hidden className="size-3.5" strokeWidth={2.6} />
        </span>
      </div>
    </button>
  )
}

// Small square widget: the first visible photo from the desktop data.
export const PhotoWidget = ({ onPress }: { onPress: (el: HTMLElement) => void }) => {
  const photo = desktopPhotos.find((item) => !item.hidden) ?? desktopPhotos[0]

  return (
    <button
      type="button"
      onClick={(event) => onPress(event.currentTarget)}
      aria-label="Photos, open gallery"
      className={`${WIDGET_CLASS} h-full w-full transition-transform duration-150 active:scale-[0.97]`}
    >
      <img src={photo.src} alt="" draggable={false} className="size-full object-cover" />
    </button>
  )
}

const TICKS = Array.from({ length: 60 }, (_, index) => index)

// Small square widget: an analogue clock set to Artur's time zone.
export const ClockWidget = () => {
  const now = useNow(1000)
  const { h, m, s } = timeParts(availability.timeZone, now)
  const hourAngle = (h % 12) * 30 + m * 0.5
  const minuteAngle = m * 6 + s * 0.1
  const secondAngle = s * 6

  return (
    <div
      className={`${WIDGET_CLASS} grid h-full w-full place-items-center`}
      style={{ background: 'var(--ios-clock-face)' }}
      role="img"
      aria-label="Local time in Hannover"
    >
      <svg viewBox="0 0 100 100" aria-hidden className="size-[88%]">
        {TICKS.map((tick) => {
          const major = tick % 5 === 0
          return (
            <line
              key={tick}
              x1="50"
              y1="4"
              x2="50"
              y2={major ? 10 : 7}
              stroke="var(--ios-label)"
              strokeWidth={major ? 1.6 : 0.7}
              opacity={major ? 1 : 0.55}
              transform={`rotate(${tick * 6} 50 50)`}
            />
          )
        })}
        {[
          ['12', 50, 24],
          ['3', 77, 51.5],
          ['6', 50, 79],
          ['9', 23, 51.5],
        ].map(([label, x, y]) => (
          <text key={label} x={x} y={y} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ios-label)">
            {label}
          </text>
        ))}
        <line x1="50" y1="52" x2="50" y2="29" stroke="var(--ios-label)" strokeWidth="3.6" strokeLinecap="round" transform={`rotate(${hourAngle} 50 50)`} />
        <line x1="50" y1="54" x2="50" y2="15" stroke="var(--ios-label)" strokeWidth="2.6" strokeLinecap="round" transform={`rotate(${minuteAngle} 50 50)`} />
        <g transform={`rotate(${secondAngle} 50 50)`}>
          <line x1="50" y1="58" x2="50" y2="12" stroke="var(--ios-orange)" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="50" cy="50" r="2.6" fill="var(--ios-orange)" />
        </g>
        <circle cx="50" cy="50" r="1.2" fill="var(--ios-clock-face)" />
      </svg>
      <p className="absolute bottom-2.5 left-3.5 text-[11px] leading-none font-semibold text-[var(--ios-orange)]">HAN</p>
    </div>
  )
}
