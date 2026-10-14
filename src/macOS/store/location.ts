import { create } from "zustand";
import { locations } from "../constants";
import type { FinderFolder } from "../types";

interface LocationStore {
    // The folder Finder is showing right now.
    activeLocation: FinderFolder;
    // Folders we came from, oldest first; the first one is the sidebar location.
    trail: FinderFolder[];
    // Jump to a sidebar location and forget where we were.
    goTo: (location: FinderFolder) => void;
    // Open a folder inside the current one.
    enter: (folder: FinderFolder) => void;
    back: () => void;
}

const useLocationStore = create<LocationStore>()((set) => ({
    activeLocation: locations.work,
    trail: [],

    goTo: (location) => set({ activeLocation: location, trail: [] }),
    enter: (folder) => set((state) => ({
        activeLocation: folder,
        trail: [...state.trail, state.activeLocation],
    })),
    back: () => set((state) => {
        const previous = state.trail[state.trail.length - 1];
        if (!previous) return state;
        return { activeLocation: previous, trail: state.trail.slice(0, -1) };
    }),
}));

// The sidebar location the reader is under, even when they are inside a project folder.
export const selectRootLocationId = (state: LocationStore) =>
    (state.trail[0] ?? state.activeLocation).id;

export default useLocationStore;
