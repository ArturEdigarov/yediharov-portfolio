import { blogPosts } from '../../macOS/constants'
import { Screen } from '../components/Screen'

// Articles, as a reading list of cards that open in the browser.
const ArticlesApp = () => (
  <Screen title="Articles">
    <ul className="space-y-4 px-4">
      {blogPosts.map((post) => (
        <li key={post.id}>
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-[14px] bg-[var(--ios-cell)] transition-opacity active:opacity-60"
          >
            <img src={post.image} alt="" draggable={false} className="aspect-[16/9] w-full object-cover" />
            <div className="px-4 pt-3 pb-4">
              <p className="text-[13px] leading-4 text-[var(--ios-label-2)]">{post.date}</p>
              <p className="mt-1 text-[17px] leading-[22px] font-semibold">{post.title}</p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  </Screen>
)

export default ArticlesApp
