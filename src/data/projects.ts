// Single source of truth for project case studies.
// Used by the 3D landing page, the macOS Finder and desktop, and the iOS home screen.
//
// Everything marked `// FACT?` is wording I could not verify from the code or the screenshots.
// Confirm or correct those lines before publishing.

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  // Shown under the image in galleries.
  caption?: string;
}

export interface Project {
  slug: string;
  name: string;
  // One line, shown in lists and on cards.
  summary: string;
  kind: "Commercial" | "Personal";
  client?: string;
  year: string;
  role: string;
  stack: string[];
  problem: string;
  contribution: string[];
  outcome: string;
  metrics: ProjectMetric[];
  links: ProjectLink[];
  // Wide hero image: a finished mockup, used as the project's cover.
  cover: ProjectImage;
  // More mockups and screenshots for the case study gallery.
  gallery: ProjectImage[];
  // Tall phone screenshots, shown as a separate strip.
  mobile: ProjectImage[];
  // Accent used for the thumbnail background while images load.
  tint: string;
}

const fewo = "/projects/fewobooking";
const solmix = "/projects/solmix";
const garov = "/projects/garov-social";

export const projects: Project[] = [
  {
    slug: "fewobooking",
    name: "FeWoBooking",
    summary: "Landlord admin for holiday homes, rebuilt from a legacy PHP system on Laravel and Filament.",
    kind: "Commercial",
    client: "SOL Webservice & Consulting",
    year: "2026",
    role: "Fullstack developer", // FACT? confirm your exact share of the work
    stack: ["Laravel 13", "Filament 5", "PHP", "Tailwind CSS 4", "Pest", "GitHub Actions"],
    problem:
      "Landlords ran bookings, prices, guests and contracts on an ageing PHP system that was hard to change and hard to trust. Every new rule risked breaking an old one.",
    // FACT? Check which of these parts were yours, and reword anything that was a team effort.
    contribution: [
      "Migrated the legacy PHP system to Laravel and Filament, keeping its price engine so existing quotes stay the same.",
      "Built the dashboard: revenue by month, booking sources, occupancy and open payments for every property.",
      "Built the booking flow from request to rental contract: confirm, record payments, generate the contract and message the guest.",
      "Added seasons, discounts, vouchers, surcharges and tourist tax, plus an availability calendar across all properties.",
      "Covered the system with 232 Pest tests and a GitHub Actions pipeline, and made it work on phones with a light and a dark theme.",
    ],
    outcome:
      "Landlords manage every property, booking and price in one place, on desktop or phone, and the rebuilt system is covered by an automated test suite.",
    metrics: [
      { value: "232", label: "automated tests" },
      { value: "1", label: "legacy system migrated" },
      { value: "2", label: "themes, light and dark" },
    ],
    links: [],
    cover: {
      src: `${fewo}/mockup-01-hero.webp`,
      alt: "FeWoBooking dashboard with revenue chart, on a laptop and a phone",
    },
    gallery: [
      { src: `${fewo}/mockup-03-buchungsdetails.webp`, alt: "Booking details with the generated rental contract", caption: "From request to rental contract" },
      { src: `${fewo}/mockup-04-verfuegbarkeit.webp`, alt: "Availability calendar for all properties", caption: "Occupancy of every property at a glance" },
      { src: `${fewo}/mockup-06-preise-einstellungen.webp`, alt: "Seasons, discounts, vouchers and property settings", caption: "Seasons, discounts and vouchers" },
      { src: `${fewo}/mockup-02-hell-dunkel.webp`, alt: "The same dashboard in light and dark theme", caption: "Light and dark theme" },
      { src: `${fewo}/03-reservierungen-dark.webp`, alt: "Reservation list with filters and statuses" },
      { src: `${fewo}/07-objektauswahl-dark.webp`, alt: "Property selection with booking counts" },
    ],
    mobile: [
      { src: `${fewo}/20-mobile-dashboard-dark.webp`, alt: "Dashboard on a phone" },
      { src: `${fewo}/21-mobile-reservierungen-dark.webp`, alt: "Reservations on a phone" },
      { src: `${fewo}/22-mobile-buchung-dark.webp`, alt: "A booking on a phone" },
      { src: `${fewo}/23-mobile-objektauswahl-light.webp`, alt: "Property selection on a phone, light theme" },
    ],
    tint: "#0e3a4d",
  },
  {
    slug: "solmix",
    name: "SOLMIX",
    summary: "Software for a real cocktail machine: scan a QR code, pick a recipe, and nine pumps pour the drink.",
    kind: "Commercial",
    client: "SOL Webservice & Consulting",
    year: "2026",
    role: "Fullstack developer", // FACT? confirm
    stack: ["Go", "Wails", "React", "TypeScript", "Raspberry Pi GPIO", "Tailwind CSS", "Docker"],
    problem:
      "A cocktail machine is only useful if guests can operate it without a bartender, and the drink has to come out the same every time, at an event with a queue.",
    contribution: [
      "Wrote the controller in Go: it turns a recipe into pump runtimes from each pump's flow rate and switches nine pumps through the Raspberry Pi GPIO pins.",
      "Built the touch interface in React: a recipe grid, a QR and barcode scanner, a recipe detail view and a live progress dial while the drink pours.",
      "Packaged it as a fullscreen desktop app with Wails, so the machine runs as a kiosk.",
      "Tracked how much liquid is left in every container, and added an admin screen to calibrate and prime each pump.",
      "Built a phone web app where guests mix their own drink with limits of 200 ml per glass and 50 ml of alcohol, and send it to the machine as a barcode.",
    ],
    outcome:
      "The machine ran at a real event: guests scan, choose and get a consistent drink, while the operator only refills the containers.",
    metrics: [
      { value: "9", label: "pumps controlled" },
      { value: "3", label: "steps from QR code to drink" },
      { value: "200 ml", label: "glass limit, 50 ml of alcohol" },
    ],
    links: [
      { label: "Open the web app", href: "https://solmix-bar.vercel.app" },
      { label: "Controller code", href: "https://github.com/ArturEdigarov/SOLMIX-system" },
    ],
    cover: {
      src: `${solmix}/mockup-hero.webp`,
      alt: "SOLMIX touch interface with the cocktail grid, on a laptop and a phone",
    },
    gallery: [
      { src: `${solmix}/mockup-machine.webp`, alt: "The cocktail machine at an event next to its interface", caption: "Software meets hardware, live at an event" },
      { src: `${solmix}/mockup-flow.webp`, alt: "Three steps: scan the QR code, pick a recipe, live mixing", caption: "From QR code to cocktail" },
      { src: `${solmix}/mockup-admin.webp`, alt: "Admin panel to calibrate and prime every pump", caption: "Calibrate and prime every pump" },
      { src: `${solmix}/menu.webp`, alt: "Cocktail menu on the touch screen" },
      { src: `${solmix}/recipe.webp`, alt: "Recipe with the ingredient list" },
      { src: `${solmix}/progress.webp`, alt: "Progress dial while the drink is poured" },
    ],
    mobile: [
      { src: `${solmix}/controller-mobile.webp`, alt: "Phone controller with the pump sliders and totals" },
    ],
    tint: "#2a1457",
  },
  {
    slug: "garov-social",
    name: "Garov Social",
    summary: "A social network with feeds, profiles and image posts, built solo and installable as an app.",
    kind: "Personal",
    year: "2026",
    role: "Solo developer",
    stack: ["React", "TypeScript", "Appwrite", "TanStack Query", "React Hook Form", "Zod", "Tailwind CSS", "PWA"],
    problem:
      "I wanted to know how a real social product holds together: sign-in, image uploads, feeds that never stop loading, and an interface that feels as good on a phone as on a desktop.",
    contribution: [
      "Built sign-up, sessions and protected routes on top of Appwrite.",
      "Built the home feed and an explore page with search, popular posts and an infinite scroll.",
      "Added image posts with drag and drop upload, likes, saved posts and a post detail page.",
      "Added profiles, an all-users page and following, with validated forms using React Hook Form and Zod.",
      "Made it responsive with a bottom tab bar on phones, installable as a PWA, and deployed through Vercel.",
    ],
    outcome:
      "A working full-stack app that I use myself: fast thanks to cached queries, and installable on a phone's home screen.",
    metrics: [
      { value: "8", label: "screens, in desktop and phone layouts" },
      { value: "PWA", label: "installable on a phone" },
    ],
    links: [{ label: "View the source", href: "https://github.com/ArturEdigarov/Garov-Social-App" }],
    cover: {
      src: `${garov}/mockup-hero.webp`,
      alt: "Garov Social home feed and profile on a laptop and two phones",
    },
    gallery: [
      { src: `${garov}/mockup-desktop.webp`, alt: "Explore page and profile on desktop", caption: "Explore and profile" },
      { src: `${garov}/mockup-phones.webp`, alt: "Login, feed, explore and profile on four phones", caption: "Responsive by design" },
      { src: `${garov}/mockup-login.webp`, alt: "Login screen" },
      { src: `${garov}/03-explore-desktop.webp`, alt: "Explore page with popular posts" },
      { src: `${garov}/06-create-post-desktop.webp`, alt: "Create a post with drag and drop upload" },
      { src: `${garov}/07-profile-desktop.webp`, alt: "Profile page with posts and liked posts" },
    ],
    mobile: [
      { src: `${garov}/02-home-feed-mobile.webp`, alt: "Home feed on a phone" },
      { src: `${garov}/03-explore-mobile.webp`, alt: "Explore on a phone" },
      { src: `${garov}/07-profile-mobile.webp`, alt: "Profile on a phone" },
      { src: `${garov}/06-create-post-mobile.webp`, alt: "Create a post on a phone" },
    ],
    tint: "#1d1b4d",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

// Every picture of a project, cover first. Used by galleries and viewers.
export const projectImages = (project: Project): ProjectImage[] => [
  project.cover,
  ...project.gallery,
  ...project.mobile,
];
