import type { ReactNode } from 'react';
import useDesktopDrag from '../../hooks/useDesktopDrag';

// A draggable card on the desktop, styled like a macOS widget.
const Widget = ({
    id,
    children,
    className = '',
    label,
}: {
    // Stable key under which the widget's position is saved.
    id: string;
    children: ReactNode;
    className?: string;
    label: string;
}) => {
    const { ref } = useDesktopDrag<HTMLDivElement>(id);

    return (
        <section
            ref={ref}
            aria-label={label}
            className={`absolute z-[2] cursor-grab overflow-hidden rounded-[1.4rem] bg-[#2a2a2c]/90 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-xl select-none active:cursor-grabbing ${className}`}
        >
            {children}
        </section>
    );
};

export default Widget;
