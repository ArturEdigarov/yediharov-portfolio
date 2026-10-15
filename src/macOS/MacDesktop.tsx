import { NavBar, Welcome, Dock, Desktop } from "./components"
import { Contact, Finder, ImageFile, Photos, Safari, Terminal, TextFile } from "./components/windows";
import useWindowStore from "./store/window";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable"
import { lazy, Suspense, useEffect, useState } from "react";
import "./MacOs2.css";

// react-pdf is heavy, so it is fetched only when the resume is opened for the first time.
const Resume = lazy(() => import("./components/windows/Resume"));
gsap.registerPlugin(Draggable);
const MacDesktop = ({ onClose }: { onClose: () => void }) => {
  const resumeOpen = useWindowStore((s) => s.windows.resume.isOpen);
  // Once the resume has been opened, keep it mounted so closing and reopening is instant.
  const [resumeRequested, setResumeRequested] = useState(resumeOpen);
  if (resumeOpen && !resumeRequested) setResumeRequested(true);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Если пользователь крутит колесико вверх (ему нужен обратный скролл сайта)
      if (e.deltaY < 0) {
        
        // Здесь можно проверить, находится ли главный контейнер мака в самом верху
        // Например, window.scrollY === 0 или у конкретного блока scrollTop === 0
        const mainContainer = document.getElementById('mac-root-container');
        
        if (!mainContainer || mainContainer.scrollTop <= 0) {
          // Триггерим закрытие мака и возврат к 3D-сцене
          onClose();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [onClose]);
  return (
    <main id="mac-root-container">
      <NavBar />
      <Welcome />
      <Desktop />
      <Dock />

      <Terminal />
      <Safari />
      {resumeRequested && (
        <Suspense fallback={null}>
          <Resume />
        </Suspense>
      )}
      <Finder />
      <Contact />
      <Photos />
      <TextFile />
      <ImageFile />
    </main>
  )
}

export default MacDesktop