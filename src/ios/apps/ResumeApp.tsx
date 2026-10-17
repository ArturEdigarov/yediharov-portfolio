import { Download, ExternalLink } from 'lucide-react'
import { profile } from '../../data/profile'
import { Screen } from '../components/Screen'

// Resume: a document card. The PDF opens in the phone's own viewer, which beats an in-page one.
const ResumeApp = () => (
  <Screen title="Resume">
    <div className="flex flex-col items-center px-8 pt-4">
      <div aria-hidden className="w-[62%] rounded-[6px] bg-white p-4 shadow-[0_6px_24px_rgb(0_0_0/0.28)]">
        <div className="mb-3 h-2 w-2/3 rounded-full bg-[#1c1c1e]" />
        {[100, 88, 94, 70, 100, 82, 90, 60].map((width, index) => (
          <div key={index} className="mb-[7px] h-[5px] rounded-full bg-[#d1d1d6]" style={{ width: `${width}%` }} />
        ))}
        <div className="mt-4 mb-3 h-2 w-1/3 rounded-full bg-[#1c1c1e]" />
        {[96, 80, 100, 66].map((width, index) => (
          <div key={index} className="mb-[7px] h-[5px] rounded-full bg-[#d1d1d6]" style={{ width: `${width}%` }} />
        ))}
      </div>
      <p className="mt-6 text-[17px] font-semibold">{profile.cvFileName}</p>
      <p className="mt-0.5 text-[14px] text-[var(--ios-label-2)]">PDF document</p>
    </div>

    <div className="mt-8 space-y-3 px-4">
      <a
        href={profile.cvUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-[50px] items-center justify-center gap-2 rounded-[14px] bg-[var(--ios-tint)] text-[17px] font-semibold text-white transition-opacity active:opacity-60"
      >
        <ExternalLink aria-hidden className="size-[18px]" strokeWidth={2.4} />
        Open
      </a>
      <a
        href={profile.cvUrl}
        download={profile.cvFileName}
        className="flex h-[50px] items-center justify-center gap-2 rounded-[14px] bg-[var(--ios-cell)] text-[17px] font-semibold text-[var(--ios-tint)] transition-opacity active:opacity-60"
      >
        <Download aria-hidden className="size-[18px]" strokeWidth={2.4} />
        Download
      </a>
    </div>
  </Screen>
)

export default ResumeApp
