import WindowControls from '../WindowControls';
import WindowWrapper from '../../hoc/WindowWrapper';
import { socials } from '../../constants';
import { profile } from '../../../data/profile';

const Contact = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="contact" />
                <h2>Contact me</h2>
            </div>

            <div className="space-y-5 p-5">
                <img
                    src={profile.portrait.small}
                    alt={profile.portrait.alt}
                    draggable={false}
                    className="size-20 rounded-full object-cover"
                    style={{ objectPosition: profile.portrait.focus }}
                />
                <h3>Let's talk</h3>
                <p>
                    I'm looking for my next role as a developer, and I'm open to employment or contract work,
                    on site or remote. Write to me, and I will reply as soon as I can.
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
