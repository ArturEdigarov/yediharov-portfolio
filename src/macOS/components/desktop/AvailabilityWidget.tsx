import { useEffect, useState } from 'react';
import { availability } from '../../../data/desktop';
import useAppLauncher from '../../hooks/useAppLauncher';
import Widget from './Widget';

const formatTime = (timeZone: string) =>
    new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }).format(new Date());

// Live local time, so a recruiter in another country sees when the reader can talk.
const useLocalTime = (timeZone: string) => {
    const [time, setTime] = useState(() => formatTime(timeZone));

    useEffect(() => {
        const id = setInterval(() => setTime(formatTime(timeZone)), 15_000);
        return () => clearInterval(id);
    }, [timeZone]);

    return time;
};

const AvailabilityWidget = () => {
    const { launch } = useAppLauncher();
    const time = useLocalTime(availability.timeZone);

    return (
        <Widget id="availability" label="Availability" className="top-16 left-6 w-64 p-4">
            <div className="flex items-center gap-2">
                <span className="relative flex size-2.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
                </span>
                <p className="text-sm font-semibold">{availability.status}</p>
            </div>

            <ul className="mt-3 space-y-1 text-[0.8125rem] leading-snug text-white/85">
                {availability.looking.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>

            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 border-t border-white/10 pt-3 text-xs">
                <dt className="text-white/50">Languages</dt>
                <dd>{availability.languages.join(', ')}</dd>
                <dt className="text-white/50">Based in</dt>
                <dd>{availability.place}</dd>
                <dt className="text-white/50">Local time</dt>
                <dd className="tabular-nums">{time}</dd>
            </dl>

            <button
                type="button"
                onClick={() => launch({ window: 'contact' })}
                className="mt-3.5 w-full cursor-pointer rounded-lg bg-white/15 py-1.5 text-xs font-semibold transition-colors hover:bg-white/25"
            >
                Get in touch
            </button>
        </Widget>
    );
};

export default AvailabilityWidget;
