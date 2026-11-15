// Content for the smaller apps: Live (links), Archive (selected work) and the photo gallery.
// Everything marked `// FACT?` is inferred and needs your confirmation.

import { profile } from "./profile";
import { projectImages, projects, type ProjectImage } from "./projects";

export interface LiveLink {
  id: number;
  // Small line above the title.
  tag: string;
  title: string;
  image: string;
  href: string;
}

const find = (slug: string) => projects.find((project) => project.slug === slug)!;

export const liveLinks: LiveLink[] = [
  {
    id: 1,
    tag: "Live web app",
    title: "SOLMIX: mix a drink on your phone and send it to the machine",
    image: find("solmix").gallery[0].src,
    href: "https://solmix-bar.vercel.app",
  },
  {
    id: 2,
    tag: "Source code, Go and React",
    title: "SOLMIX controller: pumps, recipes and the touch interface",
    image: find("solmix").cover.src,
    href: "https://github.com/ArturEdigarov/SOLMIX-system",
  },
  {
    id: 3,
    tag: "Live web app",
    title: "Garov Social: sign up and try the social network",
    image: find("garov-social").cover.src,
    href: "https://garov-social-app-mvp.vercel.app/sign-in",
  },
  {
    id: 4,
    tag: "GitHub",
    title: "All repositories and the activity behind them",
    image: find("fewobooking").cover.src,
    href: profile.github,
  },
];

export interface ArchiveProject {
  id: number;
  name: string;
  // Short line under the name, e.g. the kind of work and the tools.
  meta: string;
  description: string;
  // Missing for private client work, which has no public page.
  href?: string;
  image?: string;
}

// Selected work beyond the three case studies' own pages. Older practice projects are left out on purpose.
export const archiveProjects: ArchiveProject[] = [
  {
    id: 1,
    name: "Kohlhoff Projekte",
    meta: "Company website, WordPress and Elementor, 2026",
    description:
      "Website for Kohlhoff Projekte, a real estate company that finds, secures and develops sites and properties for commercial and industrial users in Germany and Europe. Built entirely by me, in 2026.",
    href: "https://kohlhoffprojekte.de/",
    image: "/projects/kohlhoff/home.webp",
  },
  {
    id: 2,
    name: "FeWoBooking",
    meta: "Laravel and Filament, solo rebuild of a 2008 system",
    description: find("fewobooking").summary,
    image: find("fewobooking").cover.src,
  },
  {
    id: 3,
    name: "SOLMIX",
    meta: "Go, React and Raspberry Pi, used at a 250 guest event",
    description: find("solmix").summary,
    href: "https://solmix-bar.vercel.app",
    image: find("solmix").cover.src,
  },
  {
    id: 4,
    name: "Garov Social",
    meta: "React, TypeScript and Appwrite",
    description: find("garov-social").summary,
    href: "https://garov-social-app-mvp.vercel.app/sign-in",
    image: find("garov-social").cover.src,
  },
];

export interface GalleryPhoto {
  id: number;
  src: string;
  name: string;
  alt: string;
}

// Four pictures for the macOS Photos window, whose layout is built for exactly four.
export const galleryPhotos: GalleryPhoto[] = [
  { id: 1, src: find("fewobooking").cover.src, name: "FeWoBooking.png", alt: "FeWoBooking dashboard" },
  { id: 2, src: find("solmix").gallery[0].src, name: "SOLMIX machine.png", alt: "The SOLMIX machine at an event" },
  { id: 3, src: find("garov-social").gallery[1].src, name: "Garov on phones.png", alt: "Garov Social on four phones" },
  { id: 4, src: find("solmix").cover.src, name: "SOLMIX interface.png", alt: "SOLMIX touch interface" },
];

export interface LibraryPhoto extends ProjectImage {
  project: string;
}

// Every project picture, for the iOS Library.
export const libraryPhotos: LibraryPhoto[] = projects.flatMap((project) =>
  projectImages(project).map((image) => ({ ...image, project: project.name })),
);
