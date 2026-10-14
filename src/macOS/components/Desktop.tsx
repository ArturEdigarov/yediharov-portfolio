import { desktopPhotos } from '../../data/desktop';
import { locations } from '../constants';
import AvailabilityWidget from './desktop/AvailabilityWidget';
import FolderIcon from './desktop/FolderIcon';
import PhotoWidget from './desktop/PhotoWidget';

// Project folders go in a column at the top right, like icons on a real Mac desktop.
const FOLDER_SLOTS = ['top-14 right-4', 'top-[10.5rem] right-4', 'top-[17.5rem] right-4'];

const projectFolders = locations.work.children.filter((item) => item.kind === 'folder');

const Desktop = () => (
    <div id="desktop" className="max-sm:hidden">
        <AvailabilityWidget />
        {desktopPhotos.map((photo) => (
            <PhotoWidget key={photo.id} photo={photo} />
        ))}
        {projectFolders.map((folder, index) => (
            <FolderIcon key={folder.id} folder={folder} className={FOLDER_SLOTS[index % FOLDER_SLOTS.length]} />
        ))}
    </div>
);

export default Desktop;
