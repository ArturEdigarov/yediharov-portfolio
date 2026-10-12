import { create } from "zustand";

// start: scroll offset (0..1) where the chapter takes over.
// anchor: where navigation lands, a little inside the chapter.
// The last 20% belongs to the throw, so it carries no text.
export const CHAPTERS = [
  { id: "intro", label: "Intro", start: 0, anchor: 0 },
  { id: "work", label: "Work", start: 0.25, anchor: 0.33 },
  { id: "experience", label: "Experience", start: 0.5, anchor: 0.62 },
  { id: "desktop", label: "Desktop", start: 0.8, anchor: 1 },
] as const;

export type ChapterIndex = 0 | 1 | 2 | 3;

export const chapterFromOffset = (offset: number): ChapterIndex => {
  for (let i = CHAPTERS.length - 1; i > 0; i--) {
    if (offset >= CHAPTERS[i].start) return i as ChapterIndex;
  }
  return 0;
};

interface LandingStore {
  chapter: ChapterIndex;
  scrollEl: HTMLElement | null;
  // drei's sticky layer inside the scroll container: content here stays put while scrolling.
  fixedEl: HTMLElement | null;
  openProjectSlug: string | null;
  setChapter: (chapter: ChapterIndex) => void;
  setScrollElements: (scrollEl: HTMLElement, fixedEl: HTMLElement) => void;
  goToChapter: (chapter: ChapterIndex) => void;
  openProject: (slug: string) => void;
  closeProject: () => void;
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const PROJECT_HASH_PREFIX = "#work/";

export const projectSlugFromHash = (hash: string) =>
  hash.startsWith(PROJECT_HASH_PREFIX) ? hash.slice(PROJECT_HASH_PREFIX.length) : null;

const useLandingStore = create<LandingStore>()((set, get) => ({
  chapter: 0,
  scrollEl: null,
  fixedEl: null,
  openProjectSlug: null,

  setChapter: (chapter) => set({ chapter }),
  setScrollElements: (scrollEl, fixedEl) => set({ scrollEl, fixedEl }),

  goToChapter: (chapter) => {
    const el = get().scrollEl;
    if (!el) return;
    el.scrollTo({
      top: (el.scrollHeight - el.clientHeight) * CHAPTERS[chapter].anchor,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  },

  // The open case study is mirrored in the URL so a link can be shared.
  openProject: (slug) => {
    history.replaceState(null, "", `${PROJECT_HASH_PREFIX}${slug}`);
    set({ openProjectSlug: slug });
  },
  closeProject: () => {
    history.replaceState(null, "", window.location.pathname + window.location.search);
    set({ openProjectSlug: null });
  },
}));

export default useLandingStore;
