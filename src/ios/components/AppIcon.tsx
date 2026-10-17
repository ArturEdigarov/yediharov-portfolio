import type { ComponentType } from 'react'

// One home screen icon. The icon rectangle (first child) is what apps zoom out of.
const AppIcon = ({
  name,
  Art,
  onPress,
  showLabel = true,
}: {
  name: string
  Art: ComponentType
  onPress: (iconEl: HTMLElement) => void
  showLabel?: boolean
}) => (
  <button
    type="button"
    aria-label={name}
    onClick={(event) => onPress(event.currentTarget.firstElementChild as HTMLElement)}
    className="group flex w-full flex-col items-center gap-[5px]"
  >
    <span className="relative block size-[60px] overflow-hidden rounded-[22.37%] shadow-[0_1px_3px_rgb(0_0_0/0.35)] ring-1 ring-white/10 transition duration-150 ring-inset group-active:scale-90 group-active:brightness-75">
      <Art />
    </span>
    {showLabel && (
      <span className="text-[11.5px] leading-none font-medium text-white [text-shadow:0_1px_3px_rgb(0_0_0/0.55)]">
        {name}
      </span>
    )}
  </button>
)

export default AppIcon
