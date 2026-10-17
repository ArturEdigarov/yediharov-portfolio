import { useEffect, useState } from "react";

// Hours, minutes and seconds in a given time zone (24 hour clock).
export const timeParts = (timeZone: string | undefined, date: Date) => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const read = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? 0);
  return { h: read("hour"), m: read("minute"), s: read("second") };
};

// The status bar time: the visitor's own clock, without AM/PM, like iOS.
export const statusBarTime = (date: Date) =>
  new Intl.DateTimeFormat([], { hour: "numeric", minute: "2-digit" })
    .formatToParts(date)
    .filter((part) => part.type !== "dayPeriod" && part.value.trim() !== "")
    .map((part) => part.value)
    .join("");

// Re-renders on an interval so clocks stay live.
export const useNow = (everyMs: number) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), everyMs);
    return () => clearInterval(id);
  }, [everyMs]);

  return now;
};
