import WindowControls from '../WindowControls';
import WindowWrapper from '../../hoc/WindowWrapper';
import useWindowStore from '../../store/window';

const TextFile = () => {
    const data = useWindowStore((s) => s.windows.txtfile.data);
    if (!data) return null;

    const { name, image, subtitle, description } = data;

    return (
        <>
            <div id="window-header">
                <WindowControls target="txtfile" />
                <h2>{name}</h2>
            </div>

            <div className="space-y-6 bg-white p-5">
                {image && <img src={image} alt={name} className="h-auto w-full rounded" />}
                {subtitle && <h3 className="text-lg font-semibold">{subtitle}</h3>}
                {description && description.length > 0 && (
                    <div className="space-y-3 text-base leading-relaxed text-gray-800">
                        {description.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

const TextFileWindow = WindowWrapper(TextFile, 'txtfile');

export default TextFileWindow;
