import { projects } from "../../data/projects";

const PLACEHOLDER_IMAGE = "/images/placeholder.svg";

const navLinks: { id: number; name: string; type: WindowKey }[] = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
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

const dockApps: { id: WindowKey; name: string; icon: string; canOpen: boolean }[] = [
  {
    id: "finder",
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Articles", // was "Safari"
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Gallery", // was "Photos"
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Archive", // was "Trash"
    icon: "trash.png",
    canOpen: false,
  },
];

// TODO: replace with real posts or project updates.
const blogPosts = [
  {
    id: 1,
    date: "Jul 7, 2026",
    title: "SOLMIX: ordering interface for an automated cocktail bar",
    image: PLACEHOLDER_IMAGE,
    link: "https://solmix-bar.vercel.app",
  },
  {
    id: 2,
    date: "Mar 27, 2026",
    title: "Garov Social: a React and Appwrite social network",
    image: PLACEHOLDER_IMAGE,
    link: "https://github.com/ArturEdigarov/Garov-Social-App",
  },
  {
    id: 3,
    date: "Sep 9, 2025",
    title: "Money Flow: a personal finance tracker in PHP",
    image: PLACEHOLDER_IMAGE,
    link: "https://github.com/ArturEdigarov/money-flow",
  },
];

const techStack = [
  {
    category: "Frontend",
    items: ["React.js", "TypeScript", "JavaScript"],
  },
  {
    category: "Styling",
    items: ["GSAP", "Tailwind CSS", "CSS"],
  },
  {
    category: "Backend",
    items: ["GOlang", "PHP", "Python"],
  },
  {
    category: "Database",
    items: ["MongoDB", "PostgreSQL", "Appwrite"],
  },
  {
    category: "Dev Tools",
    items: ["Git", "GitHub", "Docker"],
  },
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

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: PLACEHOLDER_IMAGE,
  },
  {
    id: 2,
    img: PLACEHOLDER_IMAGE,
  },
  {
    id: 3,
    img: PLACEHOLDER_IMAGE,
  },
  {
    id: 4,
    img: PLACEHOLDER_IMAGE,
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
};

const FOLDER_POSITIONS = ["top-10 left-5", "top-52 right-80", "top-10 left-80"];
const WINDOW_POSITIONS = ["top-[5vh] left-5", "top-[20vh] left-7", "top-[33vh] left-7"];

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: projects.map((project, index) => ({
    id: index + 5,
    name: project.name,
    icon: "/images/folder.png",
    kind: "folder",
    position: FOLDER_POSITIONS[index % FOLDER_POSITIONS.length],
    windowPosition: WINDOW_POSITIONS[index % WINDOW_POSITIONS.length],
    children: [
      {
        id: 1,
        name: `${project.name}.txt`,
        icon: "/images/txt.png",
        kind: "file",
        fileType: "txt",
        position: "top-5 left-10",
        description: [project.summary, project.problem, project.outcome],
      },
      ...project.links.map((link, linkIndex) => ({
        id: 2 + linkIndex,
        name: link.href.replace(/^https?:\/\//, ""),
        icon: "/images/safari.png",
        kind: "file",
        fileType: "url",
        href: link.href,
        position: "top-10 right-20",
      })),
      {
        id: 10,
        name: `${project.slug}.png`,
        icon: "/images/image.png",
        kind: "file",
        fileType: "img",
        position: "top-52 right-80",
        imageUrl: PLACEHOLDER_IMAGE,
      },
    ],
  })),
};

// TODO: replace placeholder photos with real ones.
const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: PLACEHOLDER_IMAGE,
    },
    {
      id: 2,
      name: "at-work.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-28 right-72",
      imageUrl: PLACEHOLDER_IMAGE,
    },
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "The developer behind this desktop",
      image: PLACEHOLDER_IMAGE,
      description: [
        "Hi, I'm Artur, a fullstack developer based in Hannover.",
        "For the past year and a half I've built commercial products at SOL Webservice & Consulting: admin panels, ordering systems and software that talks to real machines.",
        "I like the moment where an interface meets hardware: a scanned barcode turning into a poured drink is still my favourite demo.",
        "Right now I study part-time and I'm open to working student roles and remote contracts.",
      ],
    },
  ],
};

const RESUME_LOCATION = {
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

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "first-landing.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: PLACEHOLDER_IMAGE,
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

export interface WindowState {
  isOpen: boolean;
  zIndex: number;
  data: unknown;
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
  trash: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
} satisfies Record<string, WindowState>;

export type WindowKey = keyof typeof WINDOW_CONFIG;

export { INITIAL_Z_INDEX, WINDOW_CONFIG };