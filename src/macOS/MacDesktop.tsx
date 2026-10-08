import { NavBar, Welcome, Dock } from "./components"
import { Resume, Safari, Terminal } from "./components/windows";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable"
import { useEffect } from "react";
gsap.registerPlugin(Draggable);
const MacDesktop = ({ onClose }: { onClose: () => void }) => {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      console.log("Wheel event detected:", e.deltaY);
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
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
    </main>
  )
}

export default MacDesktop