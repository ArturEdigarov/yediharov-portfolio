import WindowControls from '../WindowControls';
import WindowWrapper from '../../hoc/WindowWrapper';
import { socials } from '../../constants';
import { profile } from '../../../data/profile';

// TODO: replace the placeholder portrait with a real photo.
const PORTRAIT = '/images/placeholder.svg';

const Contact = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="contact" />
                <h2>Contact me</h2>
            </div>

            <div className="space-y-5 p-5">
                <img src={PORTRAIT} alt="Portrait of Artur" className="size-20 rounded-full object-cover" />
                <h3>Let's talk</h3>
                <p>
                    I'm open to working student roles at 20 hours a week and to remote contracts.
                    Write to me and I will answer within a day.
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
