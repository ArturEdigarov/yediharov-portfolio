import { NavBar, Welcome, Dock, Desktop } from "./components"
import { Contact, Finder, ImageFile, Photos, Resume, Safari, Terminal, TextFile } from "./components/windows";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable"
import { useEffect } from "react";
gsap.registerPlugin(Draggable);
const MacDesktop = ({ onClose }: { onClose: () => void }) => {
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
      <Resume />
      <Finder />
      <Contact />
      <Photos />
      <TextFile />
      <ImageFile />
    </main>
  )
}

export default MacDesktop