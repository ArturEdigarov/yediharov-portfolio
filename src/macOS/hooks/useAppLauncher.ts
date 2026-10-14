import { locations, type AppTarget } from "../constants";
import useLocationStore, { selectRootLocationId } from "../store/location";
import useWindowStore from "../store/window";
import type { FinderFolder } from "../types";

// One way to start an app, used by the dock and the menu bar,
// so both behave the same and Finder always lands on the right folder.
const useAppLauncher = () => {
    const launch = (target: AppTarget) => {
        if (target.location) useLocationStore.getState().goTo(locations[target.location]);
        useWindowStore.getState().openWindow(target.window);
    };

    // Open Finder inside one project folder, with Work as the place "back" returns to.
    const openProjectFolder = (folder: FinderFolder) => {
        const { goTo, enter } = useLocationStore.getState();
        goTo(locations.work);
        enter(folder);
        useWindowStore.getState().openWindow("finder");
    };

    // A dock click: close the app if it is already showing, otherwise open it.
    const toggle = (target: AppTarget) => {
        const isOpen = useWindowStore.getState().windows[target.window].isOpen;
        const showsSameLocation =
            !target.location ||
            selectRootLocationId(useLocationStore.getState()) === locations[target.location].id;

        if (isOpen && showsSameLocation) {
            useWindowStore.getState().closeWindow(target.window);
        } else {
            launch(target);
        }
    };

    return { launch, toggle, openProjectFolder };
};

export default useAppLauncher;
