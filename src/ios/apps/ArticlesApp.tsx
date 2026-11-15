import { liveLinks } from '../../data/extras'
import { Screen } from '../components/Screen'

// Live: demos and source code, as cards that open in the browser.
const ArticlesApp = () => (
  <Screen title="Live">
    <ul className="space-y-4 px-4">
      {liveLinks.map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-[14px] bg-[var(--ios-cell)] transition-opacity active:opacity-60"
          >
            <img src={link.image} alt="" loading="lazy" draggable={false} className="aspect-[16/9] w-full object-cover" />
            <div className="px-4 pt-3 pb-4">
              <p className="text-[13px] leading-4 text-[var(--ios-label-2)]">{link.tag}</p>
              <p className="mt-1 text-[17px] leading-[22px] font-semibold">{link.title}</p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  </Screen>
)

export default ArticlesApp
