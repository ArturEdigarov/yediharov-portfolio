// Personal facts shown on the landing page, in macOS and on the iOS home screen.
// Dates and details come from the CV. Do not add street, phone number or birth date here.

export const profile = {
  name: "Artur Yediharov",
  headline: "Fullstack developer",
  location: "Hannover, Germany",
  email: "arturedigarov07@gmail.com",
  cvUrl: "/files/resume.pdf",
  cvFileName: "Artur_Yediharov_CV.pdf",
  github: "https://github.com/ArturEdigarov",
  linkedin: "https://www.linkedin.com/in/artur-yediharov-0b2524372/",
  portrait: {
    src: "/images/artur.webp",
    // A small version for avatars, so a 24 KB file loads instead of the full portrait.
    small: "/images/artur-small.webp",
    alt: "Portrait of Artur Yediharov",
    // The face sits in the upper part of the tall photo, so crops anchor there.
    focus: "50% 22%",
  },
  // One honest paragraph for the About text file and the contact card.
  about: [
    "I'm Artur, a fullstack developer in Hannover. I build web products end to end, from the interface down to the machines it controls.",
    "Since October 2025 I work at SOL Webservice & Consulting. There I rebuilt a booking system that ran on plain PHP since 2008 on Laravel and Filament, and wrote the Go and React software that runs a cocktail machine on a Raspberry Pi. That machine served an event with 250 guests.",
    "On my own I built Garov, a social network with React, TypeScript and Appwrite. I like the moment where an interface meets something real, like a QR code turning into a poured drink.",
    "I study part-time at the Schiller-Gymnasium in Hameln, and I'm looking for a working student role at 20 hours a week or a remote contract.",
  ],
};

export interface TimelineEntry {
  period: string;
  title: string;
  place: string;
  // Optional: older entries stay short so the chapter fits on one screen.
  detail?: string;
}

export const experience: TimelineEntry[] = [
  {
    period: "Oct 2025 – now",
    title: "Software developer",
    place: "SOL Webservice & Consulting",
    detail: "Rebuilt a 2008 booking system on Laravel and Filament, and wrote the software for a cocktail machine used at a 250 guest event.",
  },
  {
    period: "Aug 2024 – Oct 2025",
    title: "Barkeeper",
    place: "Ciao Napoli & Me Lounge",
    detail: "Rush-hour service: staying calm and working as a team.",
  },
  {
    period: "Sep 2022 – now",
    title: "Bilingual track, maths focus",
    place: "Schiller-Gymnasium Hameln, part-time",
  },
  {
    period: "Sep 2020 – Sep 2021",
    title: "Frontend engineering, 12 months",
    place: "IT STEP Computer Academy",
  },
  {
    period: "Until Jun 2024",
    title: "Abitur equivalent, grade 1.66",
    place: "Lyceum 150, Kharkiv",
  },
];

export const stack = [
  { area: "Frontend", tools: ["React", "TypeScript", "Tailwind CSS", "Three.js", "GSAP"] },
  { area: "Backend", tools: ["Laravel", "PHP", "Go", "Appwrite"] },
  { area: "Quality", tools: ["Pest", "GitHub Actions", "Git", "Docker"] },
];

export const languages = [
  { name: "English", level: "B2" },
  { name: "German", level: "B2" },
  { name: "Russian", level: "native" },
  { name: "Ukrainian", level: "native" },
];
