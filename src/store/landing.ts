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

// Small dead zone around each boundary, so a trackpad wobble
// right on the edge does not flip chapters back and forth.
const CHAPTER_HYSTERESIS = 0.015;

export const nextChapter = (offset: number, current: ChapterIndex): ChapterIndex => {
  const candidate = chapterFromOffset(offset);
  if (candidate > current) {
    return offset >= CHAPTERS[candidate].start + CHAPTER_HYSTERESIS ? candidate : current;
  }
  if (candidate < current) {
    return offset < CHAPTERS[current].start - CHAPTER_HYSTERESIS ? candidate : current;
  }
  return current;
};

// How far the reader is through a chapter, 0..1.
export const chapterProgress = (offset: number, index: number) => {
  const start = CHAPTERS[index].start;
  const end = index + 1 < CHAPTERS.length ? CHAPTERS[index + 1].start : 1;
  return Math.min(1, Math.max(0, (offset - start) / (end - start)));
};

// Per-frame scroll offset lives outside React state on purpose:
// subscribers update the DOM directly instead of re-rendering 60 times a second.
type OffsetListener = (offset: number) => void;
const offsetListeners = new Set<OffsetListener>();
let latestOffset = 0;

export const scrollOffset = {
  publish(offset: number) {
    if (Math.abs(offset - latestOffset) < 0.0001) return;
    latestOffset = offset;
    offsetListeners.forEach((listener) => listener(offset));
  },
  subscribe(listener: OffsetListener) {
    offsetListeners.add(listener);
    listener(latestOffset);
    return () => {
      offsetListeners.delete(listener);
    };
  },
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
