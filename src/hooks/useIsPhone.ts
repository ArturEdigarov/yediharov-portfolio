import { useSyncExternalStore } from "react";

// Phones get the iOS home screen instead of the macOS desktop. Below Tailwind's sm breakpoint,
// or a phone held sideways (coarse pointer and very short), which is too cramped for windows.
const PHONE_QUERY = "(max-width: 639px), (pointer: coarse) and (max-height: 500px)";

const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(PHONE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

const useIsPhone = () =>
  useSyncExternalStore(
    subscribe,
    () => window.matchMedia(PHONE_QUERY).matches,
    () => false,
  );

export default useIsPhone;
