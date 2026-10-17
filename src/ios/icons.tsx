import { Archive, FileText, Folder, Mail } from 'lucide-react'
import type { ReactNode } from 'react'

// App icon artwork, drawn as vectors so it stays sharp on high-density phone screens.
// Each piece fills the whole icon; the rounded corners are applied by the AppIcon wrapper.

const Fill = ({ className = '', children }: { className?: string; children: ReactNode }) => (
  <div className={`grid size-full place-items-center ${className}`}>{children}</div>
)

export const FilesArt = () => (
  <Fill className="bg-gradient-to-b from-white to-[#e4ebf7]">
    <Folder aria-hidden className="size-[56%]" fill="#1b8cfd" stroke="#1b8cfd" strokeWidth={1.5} />
  </Fill>
)

const PETALS = ['#ff9500', '#ffcc00', '#9be34f', '#34c759', '#32d4ff', '#0a84ff', '#bf5af2', '#ff375f']

export const PhotosArt = () => (
  <svg viewBox="0 0 100 100" aria-hidden className="size-full">
    <rect width="100" height="100" fill="#fff" />
    {PETALS.map((color, index) => (
      <ellipse
        key={color}
        cx="50"
        cy="31"
        rx="13"
        ry="19"
        fill={color}
        opacity="0.92"
        style={{ mixBlendMode: 'multiply' }}
        transform={`rotate(${index * 45} 50 50)`}
      />
    ))}
  </svg>
)

export const ContactsArt = () => (
  <svg viewBox="0 0 100 100" aria-hidden className="size-full">
    <defs>
      <linearGradient id="contacts-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f2f2f7" />
        <stop offset="1" stopColor="#c9c9ce" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" fill="url(#contacts-bg)" />
    <circle cx="46" cy="38" r="15" fill="#8e8e93" />
    <path d="M18 88c0-17 12-28 28-28s28 11 28 28z" fill="#8e8e93" />
    {['#ff3b30', '#ff9500', '#ffcc00', '#34c759', '#0a84ff'].map((color, index) => (
      <rect key={color} x="90" y={14 + index * 15} width="10" height="9" rx="2" fill={color} />
    ))}
  </svg>
)

export const SafariArt = () => (
  <svg viewBox="0 0 100 100" aria-hidden className="size-full">
    <defs>
      <linearGradient id="safari-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#dfe9f7" />
      </linearGradient>
      <linearGradient id="safari-dial" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#5cc2ff" />
        <stop offset="1" stopColor="#0a6cff" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" fill="url(#safari-bg)" />
    <circle cx="50" cy="50" r="36" fill="url(#safari-dial)" />
    <circle cx="50" cy="50" r="33" fill="none" stroke="#fff" strokeWidth="1.4" strokeDasharray="1 3.3" />
    <polygon points="50,50 62,28 72,28" fill="#ff3b30" transform="rotate(10 50 50)" />
    <polygon points="50,50 28,72 38,72" fill="#f2f2f7" transform="rotate(10 50 50)" />
    <circle cx="50" cy="50" r="2.4" fill="#fff" />
  </svg>
)

export const TerminalArt = () => (
  <svg viewBox="0 0 100 100" aria-hidden className="size-full">
    <defs>
      <linearGradient id="terminal-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3a3a3c" />
        <stop offset="1" stopColor="#0b0b0c" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" fill="url(#terminal-bg)" />
    <path d="M26 36l18 14-18 14" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M52 66h22" stroke="#30d158" strokeWidth="7" strokeLinecap="round" />
  </svg>
)

export const ResumeArt = () => (
  <Fill className="bg-gradient-to-b from-[#ffb340] to-[#ff8a00]">
    <FileText aria-hidden className="size-[52%] text-white" strokeWidth={1.8} />
  </Fill>
)

export const ArchiveArt = () => (
  <Fill className="bg-gradient-to-b from-[#a8a8ae] to-[#636366]">
    <Archive aria-hidden className="size-[50%] text-white" strokeWidth={1.8} />
  </Fill>
)

export const MailArt = () => (
  <Fill className="bg-gradient-to-b from-[#5ec1ff] to-[#0a6cff]">
    <Mail aria-hidden className="size-[52%] text-white" strokeWidth={1.8} />
  </Fill>
)

export const GitHubArt = () => (
  <Fill className="bg-gradient-to-b from-[#2c2c2e] to-black">
    <img src="/icons/github.svg" alt="" draggable={false} className="size-[56%]" />
  </Fill>
)

export const LinkedInArt = () => (
  <Fill className="bg-[#0a66c2]">
    <img
      src="/icons/linkedin.svg"
      alt=""
      draggable={false}
      className="size-[50%] brightness-0 invert"
    />
  </Fill>
)
