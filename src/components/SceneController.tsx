import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import useLandingStore, { nextChapter, scrollOffset } from '../store/landing';

// Phone framing. Applies below the layout breakpoint (Tailwind md) and never touches desktop.
const MOBILE = {
  maxWidth: 768,
  // Multiplies the camera distance: above 1 pulls the camera back, so the character looks smaller.
  zoomOut: 1.3,
  // Added to the camera height: positive moves the character down on screen.
  cameraYOffset: 0,
  // World units the character moves sideways during the final fly-in:
  // negative shifts it left, which brings the MacBook (on its right) to the screen centre.
  finaleShiftX: -0.3,
};

const cameraDirection = new THREE.Vector3();

interface SceneControllerProps {
  children: React.ReactNode;
  onOpenDesktop: (isOpen: boolean) => void;
}

export const SceneController = ({ children, onOpenDesktop }: SceneControllerProps) => {
  const scroll = useScroll(); 
  const group = useRef<THREE.Group>(null);
  const isOpenRef = useRef(false);

  useEffect(() => {
    useLandingStore.getState().setScrollElements(scroll.el, scroll.fixed);
  }, [scroll.el, scroll.fixed]);

  useFrame((state) => {
    if (!group.current) return;
    const rawScroll = scroll.offset; // от 0 до 1

    scrollOffset.publish(rawScroll);

    // Report the chapter only when it changes, so React re-renders stay rare.
    const landing = useLandingStore.getState();
    const chapter = nextChapter(rawScroll, landing.chapter);
    if (landing.chapter !== chapter) landing.setChapter(chapter);
    const mappedScroll = THREE.MathUtils.clamp((rawScroll - 0.25) / (1 - 0.25), 0, 1);
    // 1. Движение модели по оси X (твоя текущая логика)
    const clampedScrollForX = THREE.MathUtils.clamp(mappedScroll, 0, 0.65);
    let targetX = 0;
    if (mappedScroll >= 0.999 && !isOpenRef.current) {
      isOpenRef.current = true;
      onOpenDesktop(true); // Открываем
    } else if (mappedScroll < 0.999 && isOpenRef.current) {
      isOpenRef.current = false;
      onOpenDesktop(false); // Закрываем при скролле назад
    }
    if (clampedScrollForX > 0.5) {
      const progress = (clampedScrollForX - 0.5) / 0.4;
      targetX = THREE.MathUtils.lerp(0, 0.95, progress);
    }
    const isMobile = state.size.width < MOBILE.maxWidth;
    // Desktop: the character slides right as the throw begins. Mobile centres it below.
    if (!isMobile) {
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, 0.1);
    }

    // 2. Движение камеры и зум в конце
    let targetCameraZ = 1.8;
    let targetCameraY = 0.3;
    // Если мы доскроллили до финальных 15% (от 0.85 до 1.0) — залетами внутрь экрана
    if (mappedScroll >= 0.85) {
      const zoomProgress = (mappedScroll - 0.85) / 0.15; // от 0 до 1 на этом отрезке
      
      // Координаты камеры прямо перед экраном ноутбука (подгонишь под свою модель)
      // Z делаем очень маленьким (близко к экрану), Y настраиваем по высоте экрана
      targetCameraZ = THREE.MathUtils.lerp(3, 2.25, zoomProgress); 
      targetCameraY = THREE.MathUtils.lerp(0.3, 0.13, zoomProgress);
      // Если хочешь в самом конце триггерить переход на macOS:
      // if (zoomProgress > 0.95) { onZoomComplete?.(); }

    } else {
      // Твоя стандартная логика камеры до финала
      const phase2Progress = mappedScroll >= 0.65 ? 1 : 0;
      if (mappedScroll > 0.1) {
        targetCameraZ = THREE.MathUtils.lerp(2.2, 3, phase2Progress);
        targetCameraY = THREE.MathUtils.lerp(0.3, 0.32, phase2Progress);
      }
    }

    // How far the final fly-in has progressed, 0..1 (same range as the zoom above).
    const flyIn = mappedScroll >= 0.85 ? (mappedScroll - 0.85) / 0.15 : 0;
    if (isMobile) {
      // Pull back for the whole story, then ease to the normal distance for the fly-in.
      targetCameraZ *= THREE.MathUtils.lerp(MOBILE.zoomOut, 1, flyIn);
      targetCameraY += MOBILE.cameraYOffset * (1 - flyIn);
    }

    // Плавно двигаем саму камеру Three.js через lerp
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetCameraZ, 0.1);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCameraY, 0.1);

    if (isMobile) {
      // Place the character on the camera's line of sight, whatever the camera distance is.
      // The inner character group is offset by -0.4 in App, so compensate for it here.
      state.camera.getWorldDirection(cameraDirection);
      const distanceToModelPlane = state.camera.position.z / -cameraDirection.z;
      const centerX = state.camera.position.x + cameraDirection.x * distanceToModelPlane;
      const targetX = centerX + 0.4 + MOBILE.finaleShiftX * flyIn;
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, 0.1);
    }
  });

  return <group ref={group}>{children}</group>;
};