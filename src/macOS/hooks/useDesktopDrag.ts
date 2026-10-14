import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

// Desktop items stay below the app windows, whose z-index starts at 1000.
const BASE_Z_INDEX = 2;
const MAX_Z_INDEX = 900;
let topZIndex = BASE_Z_INDEX;

// Makes an element draggable inside the desktop and tells a click from a drag.
// After a drag the browser still sends a click; `wasDragged` lets handlers ignore it.
const useDesktopDrag = <T extends HTMLElement>() => {
    const ref = useRef<T>(null);
    const moved = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

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
        });

        return () => {
            instance.kill();
        };
    }, []);

    // True once for the click that follows a drag.
    const wasDragged = () => {
        const result = moved.current;
        moved.current = false;
        return result;
    };

    return { ref, wasDragged };
};

export default useDesktopDrag;
