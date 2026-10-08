import dayjs from 'dayjs';

import { navLinks, navIcons } from '../constants/index.ts';
import useWindowStore from '../store/window';


type NavItem = {
  id: number;
  name: string;
  type: string;
}
type Icon = {
  id: number; 
  img: string;
}

const NavBar = () => {
    const { openWindow } = useWindowStore();

  return (
    <nav>
        <div>   
            <img src="/images/logo.svg" alt="logo" />
            <p className='font-bold'> Artur Yediharov`s Portfolio</p>
        

            <ul>
                {navLinks.map((item: NavItem) => (
                        <li key={item.id} onClick={() => openWindow(item.type)}>
                            <p>{item.name}</p>
                        </li>
                    ))}
            </ul>
        </div>

        <div>
            <ul>
                {navIcons.map((icon: Icon) =>  (
                    <li key={icon.id}>
                        <img src={icon.img} alt={`icon-${icon.id}`} className='icon-hover' />
                    </li>
                ))}
            </ul>

            <time>{dayjs().format("ddd MMM D h:mm A")}</time>
        </div>
    </nav>
  )
}

export default NavBar 