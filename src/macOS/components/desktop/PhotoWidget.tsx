import type { DesktopPhoto } from '../../../data/desktop';
import Widget from './Widget';

const PhotoWidget = ({ photo }: { photo: DesktopPhoto }) => (
    <Widget label="Photo" className={`p-0 ${photo.className}`}>
        <img src={photo.src} alt={photo.alt} draggable={false} className="size-full object-cover" />
    </Widget>
);

export default PhotoWidget;
