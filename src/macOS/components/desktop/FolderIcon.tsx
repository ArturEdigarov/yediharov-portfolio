import useAppLauncher from '../../hooks/useAppLauncher';
import useDesktopDrag from '../../hooks/useDesktopDrag';
import type { FinderItem } from '../../types';

// A project folder lying on the desktop: drag it around, click it to open it in Finder.
const FolderIcon = ({ folder, className }: { folder: FinderItem; className: string }) => {
    const { openProjectFolder } = useAppLauncher();
    const { ref, wasDragged } = useDesktopDrag<HTMLButtonElement>(`folder-${folder.id}`);

    const open = () => {
        if (wasDragged() || !folder.children) return;
        openProjectFolder({ ...folder, children: folder.children });
    };

    return (
        <button
            ref={ref}
            type="button"
            onClick={open}
            aria-label={`Open ${folder.name}`}
            className={`group absolute z-[2] flex w-28 cursor-pointer flex-col items-center gap-1.5 rounded-lg p-2 select-none focus-visible:outline-2 focus-visible:outline-white ${className}`}
        >
            <img
                src={folder.icon}
                alt=""
                draggable={false}
                className="size-16 rounded-md p-1 transition-colors group-hover:bg-white/10"
            />
            <span className="max-w-full rounded-md px-1.5 py-0.5 text-center text-xs leading-tight font-medium text-white transition-colors [text-shadow:0_1px_3px_rgb(0_0_0/0.7)] group-hover:bg-blue-500">
                {folder.name}
            </span>
        </button>
    );
};

export default FolderIcon;
