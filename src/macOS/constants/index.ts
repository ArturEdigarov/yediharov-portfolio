import { archiveProjects, galleryPhotos, liveLinks } from "../../data/extras";
import { profile, stack } from "../../data/profile";
import { projects } from "../../data/projects";
import type { FinderItem, FinderLocation, LocationKey } from "../types";

// What an app launches: a window, optionally pointing Finder at a location.
interface AppTarget {
  window: WindowKey;
  location?: LocationKey;
}

const navLinks: (AppTarget & { id: number; name: string })[] = [
  { id: 1, name: "Projects", window: "finder", location: "work" },
  { id: 3, name: "Contact", window: "contact" },
  { id: 4, name: "Resume", window: "resume" },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

const dockApps: (AppTarget & { id: string; name: string; icon: string; canOpen: boolean })[] = [
  {
    id: "finder",
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
    window: "finder",
    location: "work",
  },
  {
    id: "safari",
    name: "Live", // was "Safari"
    icon: "safari.png",
    canOpen: true,
    window: "safari",
  },
  {
    id: "photos",
    name: "Gallery", // was "Photos"
    icon: "photos.png",
    canOpen: true,
    window: "photos",
  },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.png",
    canOpen: true,
    window: "contact",
  },
  {
    id: "terminal",
    name: "Skills", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
    window: "terminal",
  },
  {
    id: "trash",
    name: "Archive", // was "Trash"
    icon: "trash.png",
    canOpen: true,
    window: "finder",
    location: "trash",
  },
];

// The Skills window: the stack from the CV and the projects, grouped.
const techStack = [
  ...stack.map(({ area, tools }) => ({ category: area, items: tools })),
];

const socials = [
  {
    id: 1,
    text: "GitHub",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/ArturEdigarov",
  },
  {
    id: 2,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/in/artur-yediharov-0b2524372/",
  },
  {
    id: 3,
    text: "Email",
    icon: "/icons/share.svg",
    bg: "#4bcb63",
    link: "mailto:arturedigarov07@gmail.com",
  },
];

// Sidebar of the Photos window. Decorative: it names the projects the pictures come from.
const photosLinks = [
  { id: 1, icon: "/icons/gicon1.svg", title: "Library" },
  ...projects.map((project, index) => ({
    id: index + 2,
    icon: ["/icons/gicon2.svg", "/icons/file.svg", "/icons/gicon4.svg"][index % 3],
    title: project.name,
  })),
];

const gallery = galleryPhotos.map(({ id, src, name, alt }) => ({ id, img: src, name, alt }));

export {
  navLinks,
  navIcons,
  dockApps,
  liveLinks,
  techStack,
  socials,
  photosLinks,
  gallery,
};

const FOLDER_POSITIONS = ["top-10 left-5", "top-52 right-80", "top-10 left-80"];

// Icon slots inside a Finder window: three columns, as many rows as needed.
const FILE_SLOTS = [
  "top-5 left-6",
  "top-5 left-[12rem]",
  "top-5 left-[23rem]",
  "top-[10.5rem] left-6",
  "top-[10.5rem] left-[12rem]",
  "top-[10.5rem] left-[23rem]",
  "top-[20rem] left-6",
  "top-[20rem] left-[12rem]",
  "top-[20rem] left-[23rem]",
];
const slot = (index: number) => FILE_SLOTS[index % FILE_SLOTS.length];

const WORK_LOCATION: FinderLocation = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: projects.map((project, index): FinderItem => {
    // Order of the icons: the story, the links, then the pictures.
    const files: Omit<FinderItem, "id" | "position">[] = [
      {
        name: `${project.name}.txt`,
        icon: "/images/txt.png",
        kind: "file",
        fileType: "txt",
        subtitle: project.summary,
        description: [
          project.problem,
          ...project.contribution,
          ...project.decisions.map((decision) => `${decision.title}: ${decision.text}`),
          project.outcome,
        ],
      },
      ...project.links.map((link) => ({
        name: link.label,
        icon: "/images/safari.png",
        kind: "file" as const,
        fileType: "url" as const,
        href: link.href,
      })),
      ...[project.cover, ...project.gallery.slice(0, 3)].map((image, imageIndex) => ({
        name: `${project.slug}-${imageIndex + 1}.png`,
        // The picture itself is the icon, like a Finder thumbnail.
        icon: image.src,
        kind: "file" as const,
        fileType: "img" as const,
        imageUrl: image.src,
        subtitle: image.caption ?? image.alt,
      })),
    ];

    return {
      id: index + 5,
      name: project.name,
      icon: "/images/folder.png",
      kind: "folder",
      position: FOLDER_POSITIONS[index % FOLDER_POSITIONS.length],
      children: files.map((file, fileIndex) => ({ ...file, id: fileIndex + 1, position: slot(fileIndex) })),
    };
  }),
};

const ABOUT_LOCATION: FinderLocation = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: slot(0),
      subtitle: "The developer behind this desktop",
      image: profile.portrait.src,
      description: profile.about,
    },
    {
      id: 2,
      name: "me.png",
      icon: profile.portrait.small,
      kind: "file",
      fileType: "img",
      position: slot(1),
      imageUrl: profile.portrait.src,
      subtitle: profile.portrait.alt,
    },
  ],
};

const RESUME_LOCATION: FinderLocation = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

const TRASH_LOCATION: FinderLocation = {
  id: 4,
  type: "trash",
  name: "Archive",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    ...archiveProjects.map((project, index): FinderItem => ({
      id: index + 1,
      name: `${project.name}.txt`,
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: slot(index),
      subtitle: `${project.language}, ${project.year}`,
      description: [project.description, project.href.replace(/^https?:\/\//, "")],
    })),
    {
      id: archiveProjects.length + 1,
      name: "github.com",
      icon: "/images/safari.png",
      kind: "file",
      fileType: "url",
      href: profile.github,
      position: slot(archiveProjects.length),
    },
  ],
};

export const locations: Record<LocationKey, FinderLocation> = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

export interface WindowState {
  isOpen: boolean;
  zIndex: number;
  // The file a window was opened with (text and image windows read it).
  data: FinderItem | null;
}

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
} satisfies Record<string, WindowState>;

export type WindowKey = keyof typeof WINDOW_CONFIG;
export type { AppTarget };

export { INITIAL_Z_INDEX, WINDOW_CONFIG };