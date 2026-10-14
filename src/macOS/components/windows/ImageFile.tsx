import WindowControls from '../WindowControls';
import WindowWrapper from '../../hoc/WindowWrapper';
import useWindowStore from '../../store/window';

const ImageFile = () => {
    const data = useWindowStore((s) => s.windows.imgfile.data);
    if (!data) return null;

    const { name, imageUrl } = data;

    return (
        <>
            <div id="window-header">
                <WindowControls target="imgfile" />
                <p>{name}</p>
            </div>

            <div className="preview">
                {imageUrl && <img src={imageUrl} alt={name} />}
            </div>
        </>
    );
};

const ImageFileWindow = WindowWrapper(ImageFile, 'imgfile');

export default ImageFileWindow;
