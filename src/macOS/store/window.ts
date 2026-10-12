import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG, type WindowKey, type WindowState } from "../constants";

interface WindowStore {
    windows: Record<WindowKey, WindowState>;
    nextZIndex: number;
    openWindow: (windowKey: WindowKey, data?: unknown) => void;
    closeWindow: (windowKey: WindowKey) => void;
    focusWindow: (windowKey: WindowKey) => void;
}

const useWindowStore = create<WindowStore>()(
    immer((set) => ({
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,

        openWindow: (windowKey, data = null) => set((state) => {
            const win = state.windows[windowKey];
            win.isOpen = true;
            win.zIndex = state.nextZIndex;
            win.data = data ?? win.data;
            state.nextZIndex++;
        }),

        closeWindow: (windowKey) => set((state) => {
            const win = state.windows[windowKey];
            win.isOpen = false;
            win.zIndex = INITIAL_Z_INDEX;
            win.data = null;
        }),

        focusWindow: (windowKey) => set((state) => {
            const win = state.windows[windowKey];
            win.zIndex = state.nextZIndex++;
        }),
    })),
);

export default useWindowStore;
