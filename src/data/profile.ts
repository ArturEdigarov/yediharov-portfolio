// Personal facts shown on the landing page.
// TODO: confirm dates for education and the IT STEP program.

export const profile = {
  name: "Artur Yediharov",
  location: "Hannover, Germany",
  email: "arturedigarov07@gmail.com",
  cvUrl: "/files/resume.pdf",
  cvFileName: "Artur_Yediharov_CV.pdf",
  github: "https://github.com/ArturEdigarov",
  linkedin: "https://www.linkedin.com/in/artur-yediharov-0b2524372/",
};

export interface TimelineEntry {
  period: string;
  title: string;
  place: string;
  detail: string;
}

export const experience: TimelineEntry[] = [
  {
    period: "2025 – now",
    title: "Software developer",
    place: "SOL Webservice & Consulting",
    detail: "Admin panels, ordering systems and software that controls real machines.",
  },
  {
    period: "2023 – now",
    title: "Bilingual track, maths focus",
    place: "Schiller-Gymnasium Hameln",
    detail: "Studying part-time in German and English.",
  },
  {
    period: "2023 – 2024",
    title: "Frontend engineering program",
    place: "IT STEP Computer Academy",
    detail: "JavaScript, React and interface fundamentals.",
  },
  {
    period: "2019 – 2023",
    title: "Abitur equivalent, final grade 1.66",
    place: "Lyceum 150",
    detail: "Maths and computer science.",
  },
];

export const stack = [
  { area: "Frontend", tools: ["React", "TypeScript", "Tailwind", "Three.js", "GSAP"] },
  { area: "Backend", tools: ["Go", "PHP", "Laravel", "Node.js"] },
  { area: "Data", tools: ["PostgreSQL", "MySQL", "Appwrite"] },
];
