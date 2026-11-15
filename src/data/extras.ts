// Content for the smaller apps: Live (links), Archive (older projects) and the photo gallery.
// Everything marked `// FACT?` is inferred from repository names and languages. Confirm it.

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
    tag: "Source code, React and TypeScript",
    title: "Garov Social: a social network with Appwrite",
    image: find("garov-social").cover.src,
    href: "https://github.com/ArturEdigarov/Garov-Social-App",
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
  year: string;
  language: string;
  description: string;
  href: string;
}

const repo = (name: string) => `https://github.com/ArturEdigarov/${name}`;

// Earlier projects, from before the commercial work. Newest first.
export const archiveProjects: ArchiveProject[] = [
  {
    id: 1,
    name: "Money Flow",
    year: "2025",
    language: "PHP",
    description:
      "A tool for personal finances: income and expenses with categories, a transaction history and clear charts. Every user sees only their own data, and it installs as a PWA.",
    href: repo("money-flow"),
  },
  {
    id: 2,
    name: "To-do list",
    year: "2025",
    language: "PHP",
    description: "A to-do list in PHP, an early practice project.", // FACT?
    href: repo("To-do-list"),
  },
  {
    id: 3,
    name: "Gaming platform",
    year: "2025",
    language: "PHP",
    description: "A gaming platform in PHP, an early practice project.", // FACT?
    href: repo("gaming-platform"),
  },
  {
    id: 4,
    name: "Smooth scroll",
    year: "2025",
    language: "HTML and CSS",
    description: "An experiment with smooth scrolling, my first step toward scroll-driven pages like this one.", // FACT?
    href: repo("Smooth-scroll-"),
  },
  {
    id: 5,
    name: "Burger landing",
    year: "2025",
    language: "HTML and CSS",
    description: "A landing page for a burger place, built to practise layout.", // FACT?
    href: repo("Burger-Landing"),
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
