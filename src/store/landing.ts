import { create } from "zustand";

export const CHAPTERS = [
  { id: "intro", label: "Intro", offset: 0 },
  { id: "work", label: "Work", offset: 1 / 3 },
  { id: "experience", label: "Experience", offset: 2 / 3 },
  { id: "desktop", label: "Desktop", offset: 1 },
] as const;

export type ChapterIndex = 0 | 1 | 2 | 3;

interface LandingStore {
  chapter: ChapterIndex;
  scrollEl: HTMLElement | null;
  openProjectSlug: string | null;
  setChapter: (chapter: ChapterIndex) => void;
  setScrollEl: (el: HTMLElement) => void;
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
  openProjectSlug: null,

  setChapter: (chapter) => set({ chapter }),
  setScrollEl: (scrollEl) => set({ scrollEl }),

  goToChapter: (chapter) => {
    const el = get().scrollEl;
    if (!el) return;
    el.scrollTo({
      top: (el.scrollHeight - el.clientHeight) * CHAPTERS[chapter].offset,
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
