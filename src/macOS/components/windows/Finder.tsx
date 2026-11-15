import { ChevronLeft, Search } from 'lucide-react';
import WindowControls from '../WindowControls';
import WindowWrapper from '../../hoc/WindowWrapper';
import { locations } from '../../constants';
import useLocationStore, { selectRootLocationId } from '../../store/location';
import useWindowStore from '../../store/window';
import type { FinderItem } from '../../types';

const Finder = () => {
    const openWindow = useWindowStore((s) => s.openWindow);
    const activeLocation = useLocationStore((s) => s.activeLocation);
    const rootLocationId = useLocationStore(selectRootLocationId);
    const canGoBack = useLocationStore((s) => s.trail.length > 0);
    const { goTo, enter, back } = useLocationStore.getState();

    const openItem = (item: FinderItem) => {
        if (item.fileType === 'pdf') return openWindow('resume');
        if (item.kind === 'folder' && item.children) return enter({ ...item, children: item.children });
        if (item.fileType === 'url' || item.fileType === 'fig') {
            if (item.href) window.open(item.href, '_blank', 'noopener,noreferrer');
            return;
        }
        if (item.fileType === 'txt') return openWindow('txtfile', item);
        if (item.fileType === 'img') return openWindow('imgfile', item);
    };

    return (
        <>
            <div id="window-header">
                <WindowControls target="finder" />
                <button
                    type="button"
                    onClick={back}
                    disabled={!canGoBack}
                    aria-label="Back"
                    className="ml-3 rounded p-1 text-gray-500 enabled:cursor-pointer enabled:hover:bg-gray-200 disabled:opacity-30"
                >
                    <ChevronLeft className="size-4" />
                </button>
                <h2 className="flex-1 text-center text-sm font-bold">{activeLocation.name}</h2>
                <Search className="icon" />
            </div>

            <div className="flex h-full min-h-[31rem] bg-white">
                <div className="sidebar">
                    <div>
                        <h3>Favorites</h3>
                        <ul>
                            {Object.values(locations).map((item) => (
                                <li
                                    key={item.id}
                                    className={item.id === rootLocationId ? 'active' : 'not-active'}
                                >
                                    <button
                                        type="button"
                                        onClick={() => goTo(item)}
                                        className="flex w-full cursor-pointer items-center gap-2 text-left"
                                    >
                                        <img src={item.icon} alt="" className="w-4" />
                                        <p className="truncate text-sm font-medium">{item.name}</p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <ul className="content">
                    {activeLocation.children.map((item) => (
                        <li key={item.id} className={item.position}>
                            <button
                                type="button"
                                onClick={() => openItem(item)}
                                className="group flex cursor-pointer flex-col items-center gap-3 rounded-md p-1 focus-visible:outline-2"
                            >
                                {item.fileType === 'img' ? (
                                    // The picture itself, as a thumbnail with a soft frame.
                                    <img
                                        src={item.icon}
                                        alt=""
                                        loading="lazy"
                                        draggable={false}
                                        className="!h-[4.25rem] !w-28 rounded-md !object-cover !object-[50%_22%] shadow-md ring-1 ring-black/10"
                                    />
                                ) : (
                                    <img src={item.icon} alt="" />
                                )}
                                <p>{item.name}</p>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

const FinderWindow = WindowWrapper(Finder, 'finder');

export default FinderWindow;
