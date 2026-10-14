// Content for the macOS desktop widgets.
// TODO: replace the placeholder photos with real ones (put files in public/images).

export interface DesktopPhoto {
  id: string;
  src: string;
  alt: string;
  // Tailwind size and start position of the widget.
  className: string;
}

export const desktopPhotos: DesktopPhoto[] = [
  {
    id: "photo-square",
    src: "/images/placeholder.svg",
    alt: "Photo placeholder, square",
    className: "left-6 top-[19rem] size-52",
  },
  {
    id: "photo-wide",
    src: "/images/placeholder.svg",
    alt: "Photo placeholder, wide",
    className: "left-6 top-[33.5rem] h-36 w-60",
  },
  {
    id: "photo-tall",
    src: "/images/placeholder.svg",
    alt: "Photo placeholder, tall",
    className: "bottom-24 right-6 h-56 w-44",
  },
];

export const availability = {
  status: "Open to work",
  timeZone: "Europe/Berlin",
  place: "Hannover, Germany",
  looking: ["Working student, 20 h per week", "Remote contracts"],
  languages: ["English B2", "German B2"],
};
