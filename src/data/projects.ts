// Single source of truth for project case studies.
// Used by the 3D landing page and by the macOS Finder.
// TODO: replace placeholder copy and metrics with real project facts.

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  name: string;
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
  screenshots: string[];
}

export const projects: Project[] = [
  {
    slug: "solmix",
    name: "SOLMIX",
    summary: "Ordering and control software for an automated cocktail machine.",
    kind: "Commercial",
    client: "SOL Webservice & Consulting",
    year: "2025",
    role: "Fullstack developer",
    stack: ["React", "TypeScript", "Go", "PostgreSQL", "Barcode scanners"],
    problem:
      "Bar staff mixed every drink by hand, so queues grew at peak hours and recipes drifted from bartender to bartender.",
    contribution: [
      "Built the guest ordering flow: pick a drink, pay, receive a barcode ticket.",
      "Wrote the Go service that turns a scanned ticket into pump commands for the machine.",
      "Designed the admin panel for recipes, stock levels and machine status.",
    ],
    outcome:
      "Guests order from their phone and the machine pours a consistent drink in under a minute.",
    metrics: [
      { value: "45 s", label: "average time per drink" },
      { value: "3", label: "machines in production" },
      { value: "12k", label: "orders processed" },
    ],
    links: [{ label: "Open live site", href: "https://solmix-bar.vercel.app" }],
    screenshots: ["Ordering screen", "Admin panel", "Machine status"],
  },
  {
    slug: "rental-admin",
    name: "Rental admin panel",
    summary: "Back office for a company that manages holiday rentals.",
    kind: "Commercial",
    client: "SOL Webservice & Consulting",
    year: "2025",
    role: "Frontend developer",
    stack: ["React", "TypeScript", "PHP", "Laravel", "MySQL"],
    problem:
      "Bookings, cleaning schedules and owner payouts lived in separate spreadsheets that the team reconciled by hand every week.",
    contribution: [
      "Built the booking calendar with drag-to-reschedule and conflict warnings.",
      "Created reusable table and form components used across 20+ admin screens.",
      "Connected the frontend to the Laravel REST API with typed request helpers.",
    ],
    outcome:
      "The team plans every property in one place, and the weekly reconciliation is gone.",
    metrics: [
      { value: "20+", label: "admin screens" },
      { value: "150", label: "properties managed" },
      { value: "6 h", label: "saved per week" },
    ],
    links: [],
    screenshots: ["Booking calendar", "Property page", "Payout report"],
  },
  {
    slug: "garov-social",
    name: "Garov Social",
    summary: "A social network for sharing photo posts, installable as an app.",
    kind: "Personal",
    year: "2026",
    role: "Solo developer",
    stack: ["React", "TypeScript", "Appwrite", "TanStack Query", "PWA"],
    problem:
      "I wanted to understand how a real social product handles auth, media uploads and feeds that never stop loading.",
    contribution: [
      "Implemented sign-up, sessions and protected routes on top of Appwrite.",
      "Built post creation with image upload, likes, saves and follows.",
      "Added an infinite feed with cached queries and optimistic updates.",
    ],
    outcome:
      "A working app that installs on a phone and feels instant thanks to caching.",
    metrics: [
      { value: "95", label: "Lighthouse performance" },
      { value: "PWA", label: "installable on mobile" },
    ],
    links: [
      { label: "View source", href: "https://github.com/ArturEdigarov/Garov-Social-App" },
    ],
    screenshots: ["Feed", "Profile", "Create post"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
