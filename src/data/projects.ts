// Single source of truth for project case studies.
// Used by the 3D landing page, the macOS Finder and desktop, and the iOS home screen.
//
// Everything marked `// FACT?` is wording I could not verify from the code or the screenshots.
// Confirm or correct those lines before publishing.

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectDecision {
  title: string;
  text: string;
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
  // The choices that shaped the project and why. Shown as "Key decisions".
  decisions: ProjectDecision[];
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
    summary: "I rebuilt a booking system for holiday homes, written in plain PHP in 2008, from scratch on Laravel and Filament.",
    kind: "Commercial",
    client: "SOL Webservice & Consulting",
    year: "2026",
    role: "Fullstack developer, solo",
    stack: ["Laravel 13", "Filament 5", "PHP 8.3", "Tailwind CSS 4", "Pest", "GitHub Actions"],
    problem:
      "The booking system had run since 2008 on plain PHP, with no framework behind it. It still handled the bookings, prices and rental contracts of real landlords, but every change was risky and the admin looked and worked like it was built in 2008.",
    contribution: [
      "Rewrote the whole system from scratch on Laravel 13 and Filament 5: properties, guests, bookings, seasons, discounts, vouchers, surcharges and tourist tax.",
      "Ported the price engine of the old system, so the rules landlords rely on carried over into the new code.",
      "Built the booking flow from request to rental contract: confirm, record payments in instalments, generate the contract and message the guest with attachments.",
      "Built one dashboard for all properties: revenue by month, booking sources, occupancy and open payments, plus an availability calendar across every house.",
      "Wrote 232 automated tests with Pest and a GitHub Actions pipeline, so a change to prices or bookings is checked before it ships.",
      "Made it responsive for phones and added a light and a dark theme.",
    ],
    // FACT? The reasons below are my reading of the choices. Correct them in your own words.
    decisions: [
      {
        title: "Rewrite, not patch",
        text: "An 18-year-old codebase with a 41-table database was no longer a safe place to add features. A new codebase on a framework with conventions made every later change cheaper.",
      },
      {
        title: "Filament for the admin",
        text: "An admin is mostly tables, forms and filters, and Filament provides them. My time went into the booking and price rules, which are the part of the product nobody else has.",
      },
      {
        title: "Port the price engine, then test it",
        text: "Prices are what a landlord can least afford to get wrong, so I ported the existing engine instead of redesigning it, and covered it with 232 Pest tests.",
      },
      {
        title: "Many properties, one view",
        text: "Landlords rarely have a single house, so the dashboard and the availability calendar work across all of them at once.",
      },
      {
        title: "Phone and dark mode from the start",
        text: "Landlords answer requests on the go, so every screen works on a phone, in a light and in a dark theme.",
      },
    ],
    outcome:
      "Landlords manage every property, booking and price in one modern admin, on desktop or phone, and the system that ran on 2008 code is now covered by an automated test suite.",
    metrics: [
      { value: "2008", label: "the year of the PHP system I replaced" },
      { value: "232", label: "automated tests" },
      { value: "100%", label: "rebuilt from scratch, solo" },
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
    summary: "Software for a real cocktail machine: scan a QR code, pick a recipe, and nine pumps pour it. Used at an event with 250 guests.",
    kind: "Commercial",
    client: "SOL Webservice & Consulting",
    year: "2026",
    role: "Software developer, solo",
    stack: ["Go", "Wails", "React", "TypeScript", "Raspberry Pi GPIO", "Tailwind CSS", "Docker"],
    problem:
      "A cocktail machine is only useful if guests can operate it without a bartender, and the drink has to come out the same every time, even with a queue at an event.",
    contribution: [
      "Wrote all the software: the Go controller, the touch interface and the phone app.",
      "In Go, the controller turns a recipe into pump runtimes from each pump's flow rate and switches nine pumps through the Raspberry Pi GPIO pins.",
      "Built the touch interface in React: a recipe grid, a QR and barcode scanner, a recipe view and a live progress dial while the drink pours.",
      "Packaged it as a fullscreen desktop app with Wails, so the machine runs as a kiosk.",
      "Tracked how much liquid is left in every container, and built an admin screen to calibrate and prime each pump.",
      "Built a phone web app where guests mix their own drink, within 200 ml per glass and 50 ml of alcohol, and send it to the machine as a barcode.",
    ],
    decisions: [
      {
        title: "A barcode between the phone and the machine",
        text: "The phone encodes all nine pump values into a CODE128 barcode, and the machine reads it with a USB scanner that types like a keyboard. No Wi-Fi, no pairing and no server sit between the guest and the pumps.",
      },
      {
        title: "Limits in the software",
        text: "The sliders lock at 200 ml per glass and 50 ml of alcohol, so nobody can order an unsafe drink, whatever they do on the screen.",
      },
      {
        title: "Go on the Pi, React for the screen",
        text: "Go handles the timing and the GPIO pins, where reliability matters. React and Wails give a touch interface that boots into one fullscreen app.",
      },
      {
        title: "Dose by time, from flow rate",
        text: "Each pump has a measured flow rate, so a recipe in millilitres becomes a runtime in milliseconds. The same drink comes out the same every time.",
      },
      {
        title: "Built to be operated by a stranger",
        text: "Container levels are tracked, and every pump can be calibrated and primed from an admin screen, so the person at the event only has to refill.",
      },
    ],
    outcome:
      "The software was built for clients, tested on a working machine assembled for that purpose, and then ran at an event with 250 guests.",
    metrics: [
      { value: "250", label: "guests at the event" },
      { value: "9", label: "pumps controlled" },
      { value: "3", label: "steps from QR code to drink" },
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
      "Built the home feed and an explore page with debounced search, popular posts and infinite scroll.",
      "Added image posts with drag and drop upload, likes, saved posts and a post detail page.",
      "Added profiles, an all-users page and following, with validated forms using React Hook Form and Zod.",
      "Made it responsive with a bottom tab bar on phones, installable as a PWA, and deployed through Vercel.",
    ],
    decisions: [
      {
        title: "Appwrite instead of my own backend",
        text: "Authentication, the database and file storage came from Appwrite, so I could spend the time on the interface and on how it feels.",
      },
      {
        title: "TanStack Query for the data",
        text: "Cached queries keep the feed and the profile instant, and the infinite scroll loads only what the reader is about to see.",
      },
      {
        title: "Validation before the network",
        text: "Forms are checked with Zod and React Hook Form first, so mistakes are caught on the screen, not after a round trip.",
      },
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
