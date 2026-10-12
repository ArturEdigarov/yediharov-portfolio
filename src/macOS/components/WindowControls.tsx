import useWindowStore from '../store/window';
import type { WindowKey } from '../constants';

const WindowControls = ({ target }: { target: WindowKey }) => {
    const { closeWindow } = useWindowStore();
    return (
    <div id="window-controls">
        <div className='close' onClick={() => closeWindow(target)}/>
        <div className='minimize' />
        <div className='maximize' />
    </div>
  )
}

export default WindowControls;
