import { Briefcase, Code, FileDown, Mail } from 'lucide-react'
import type { ComponentType } from 'react'
import { availability } from '../../data/desktop'
import { languages, profile } from '../../data/profile'
import { Group, Row } from '../components/Screen'

const Action = ({
  Icon,
  label,
  href,
  download,
}: {
  Icon: ComponentType<{ className?: string; strokeWidth?: number }>
  label: string
  href: string
  download?: string
}) => (
  <a
    href={href}
    download={download}
    target={download ? undefined : '_blank'}
    rel="noopener noreferrer"
    className="flex flex-col items-center gap-1.5 rounded-[12px] bg-[var(--ios-cell)] py-2.5 text-[11px] leading-none font-medium text-[var(--ios-tint)] transition-opacity active:opacity-50"
  >
    <Icon aria-hidden className="size-6" strokeWidth={1.9} />
    {label}
  </a>
)

// A contact card, the way iOS shows a person: portrait, name, quick actions, details.
const ContactApp = () => (
  <div className="no-scrollbar absolute inset-0 overflow-y-auto overscroll-contain bg-[var(--ios-grouped-bg)] pt-[64px] pb-[50px]">
    <div className="flex flex-col items-center px-5">
      <img
        src={profile.portrait.small}
        alt={profile.portrait.alt}
        draggable={false}
        className="size-[100px] rounded-full object-cover shadow-[0_2px_10px_rgb(0_0_0/0.25)]"
        style={{ objectPosition: profile.portrait.focus }}
      />
      <h1 className="mt-3.5 text-[28px] leading-8 font-semibold tracking-[-0.02em]">{profile.name}</h1>
      <p className="mt-0.5 text-[15px] text-[var(--ios-label-2)]">Fullstack developer, {availability.place}</p>
    </div>

    <div className="mt-5 grid grid-cols-4 gap-2 px-4">
      <Action Icon={Mail} label="Email" href={`mailto:${profile.email}`} />
      <Action Icon={Briefcase} label="LinkedIn" href={profile.linkedin} />
      <Action Icon={Code} label="GitHub" href={profile.github} />
      <Action Icon={FileDown} label="Resume" href={profile.cvUrl} download={profile.cvFileName} />
    </div>

    <Group className="mt-5">
      <Row href={`mailto:${profile.email}`} className="flex-col items-start gap-0.5">
        <span className="text-[13px] leading-4 text-[var(--ios-label-2)]">email</span>
        <span className="text-[17px] leading-[22px] break-all text-[var(--ios-tint)]">{profile.email}</span>
      </Row>
      <Row className="flex-col items-start gap-0.5">
        <span className="text-[13px] leading-4 text-[var(--ios-label-2)]">location</span>
        <span className="text-[17px] leading-[22px]">{availability.place}</span>
      </Row>
      <Row className="flex-col items-start gap-0.5">
        <span className="text-[13px] leading-4 text-[var(--ios-label-2)]">available for</span>
        <span className="text-[17px] leading-[22px]">{availability.looking.join(', ')}</span>
      </Row>
      <Row className="flex-col items-start gap-0.5">
        <span className="text-[13px] leading-4 text-[var(--ios-label-2)]">languages</span>
        <span className="text-[17px] leading-[22px]">
          {languages.map((language) => `${language.name} ${language.level}`).join(', ')}
        </span>
      </Row>
    </Group>
  </div>
)

export default ContactApp
