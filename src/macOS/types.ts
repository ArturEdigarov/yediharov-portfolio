export type LocationKey = "work" | "about" | "resume" | "trash";

export type FileType = "txt" | "img" | "url" | "fig" | "pdf";

// One icon inside a Finder window: a folder (has children) or a file.
export interface FinderItem {
  id: number;
  name: string;
  icon: string;
  kind: "folder" | "file";
  fileType?: FileType;
  // Tailwind classes that place the icon inside the Finder window.
  position?: string;
  href?: string;
  imageUrl?: string;
  subtitle?: string;
  image?: string;
  description?: string[];
  children?: FinderItem[];
}

// Anything Finder can show the contents of.
export interface FinderFolder {
  id: number;
  name: string;
  icon: string;
  children: FinderItem[];
}

// A top-level entry in the Finder sidebar.
export interface FinderLocation extends FinderFolder {
  type: LocationKey;
  kind: "folder";
}
