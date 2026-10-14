import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

// Desktop items stay below the app windows, whose z-index starts at 1000.
const BASE_Z_INDEX = 2;
const MAX_Z_INDEX = 900;
let topZIndex = BASE_Z_INDEX;

// Positions are saved as offsets from each item's default spot (set by its CSS classes).
// Bump the version if the default spots are rearranged, so old offsets are not reused.
const STORAGE_KEY = "desktop-layout-v1";

type Offset = { x: number; y: number };
type Layout = Record<string, Offset>;

const isOffset = (value: unknown): value is Offset =>
    typeof value === "object" &&
    value !== null &&
    Number.isFinite((value as Offset).x) &&
    Number.isFinite((value as Offset).y);

const readLayout = (): Layout => {
    try {
        const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
        if (typeof parsed !== "object" || parsed === null) return {};
        return Object.fromEntries(Object.entries(parsed).filter(([, value]) => isOffset(value)));
    } catch {
        return {};
    }
};

const saveOffset = (id: string, offset: Offset) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readLayout(), [id]: offset }));
    } catch {
        // Storage can be blocked (private mode); the layout then lasts for this visit only.
    }
};

// Makes an element draggable inside the desktop, remembers where it was left,
// and tells a click from a drag. After a drag the browser still sends a click;
// `wasDragged` lets handlers ignore it.
const useDesktopDrag = <T extends HTMLElement>(id: string) => {
    const ref = useRef<T>(null);
    const moved = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const saved = readLayout()[id];
        if (saved) gsap.set(el, { x: saved.x, y: saved.y });

        const [instance] = Draggable.create(el, {
            bounds: "#mac-root-container",
            zIndexBoost: false,
            dragClickables: true,
            onPress: () => {
                moved.current = false;
                topZIndex = Math.min(topZIndex + 1, MAX_Z_INDEX);
                el.style.zIndex = String(topZIndex);
            },
            onDragStart: () => {
                moved.current = true;
            },
            onDragEnd: () => {
                saveOffset(id, {
                    x: Number(gsap.getProperty(el, "x")),
                    y: Number(gsap.getProperty(el, "y")),
                });
            },
        });

        // A saved spot can fall outside a smaller screen: pull it back inside.
        const keepInside = () => instance.applyBounds("#mac-root-container");
        keepInside();
        window.addEventListener("resize", keepInside);

        return () => {
            window.removeEventListener("resize", keepInside);
            instance.kill();
        };
    }, [id]);

    // True once for the click that follows a drag.
    const wasDragged = () => {
        const result = moved.current;
        moved.current = false;
        return result;
    };

    return { ref, wasDragged };
};

export default useDesktopDrag;
