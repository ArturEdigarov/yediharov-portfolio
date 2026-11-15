import WindowControls from '../WindowControls';
import WindowWrapper from '../../hoc/WindowWrapper';
import { socials } from '../../constants';
import { profile } from '../../../data/profile';

// TODO: swap the initials for a real portrait when there is one.
const initials = profile.name
    .split(' ')
    .map((part) => part[0])
    .join('');

const Contact = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="contact" />
                <h2>Contact me</h2>
            </div>

            <div className="space-y-5 p-5">
                <div
                    aria-hidden
                    className="grid size-20 place-items-center rounded-full bg-gradient-to-b from-gray-400 to-gray-600 text-3xl font-medium text-white"
                >
                    {initials}
                </div>
                <h3>Let's talk</h3>
                <p>
                    I'm open to working student roles at 20 hours a week and to remote contracts.
                    Write to me, and I will reply as soon as I can.
                </p>
                <a href={`mailto:${profile.email}`} className="block font-medium underline underline-offset-4">
                    {profile.email}
                </a>

                <ul>
                    {socials.map(({ id, bg, link, icon, text }) => (
                        <li key={id} style={{ backgroundColor: bg }}>
                            <a href={link} target="_blank" rel="noopener noreferrer" title={text}>
                                <img src={icon} alt="" className="size-5" />
                                <p>{text}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

const ContactWindow = WindowWrapper(Contact, 'contact');

export default ContactWindow;
