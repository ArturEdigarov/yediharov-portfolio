// Content for the macOS desktop widgets.
// TODO: replace the placeholder photos with real ones (put files in public/images).

export interface DesktopPhoto {
  id: string;
  src: string;
  alt: string;
  // Tailwind size and start position of the widget.
  className: string;
  // Keeps the widget in the data but off the desktop. Set `hidden: true` to hide it again.
  hidden?: boolean;
  // CSS object-position, to choose which part of the picture stays in view.
  focus?: string;
}

export const desktopPhotos: DesktopPhoto[] = [
  {
    id: "photo-square",
    src: "/projects/solmix/machine-photo.webp",
    alt: "The SOLMIX cocktail machine running at a real event",
    className: "left-[18.5rem] top-16 size-52",
    // Keeps the machine in frame and the neighbouring brand logo out of it.
    focus: "30% 16%",
  },
  {
    id: "photo-wide",
    src: "/projects/fewobooking/mockup-04-verfuegbarkeit.webp",
    alt: "FeWoBooking availability calendar",
    className: "left-6 top-[18.75rem] h-36 w-60",
  },
  {
    id: "photo-tall",
    src: "/images/artur.webp",
    alt: "Portrait of Artur Yediharov",
    className: "bottom-24 right-6 h-56 w-44",
    focus: "50% 22%",
  },
];

export const availability = {
  status: "Open to work",
  timeZone: "Europe/Berlin",
  place: "Hannover, Germany",
  looking: ["Fullstack developer roles", "Employment or contract, on site or remote"],
  languages: ["English B2", "German B2"],
};
