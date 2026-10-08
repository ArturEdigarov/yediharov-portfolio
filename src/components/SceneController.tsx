import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface SceneControllerProps {
  children: React.ReactNode;
  onOpenDesktop: (isOpen: boolean) => void;
}

export const SceneController = ({ children, onOpenDesktop }: SceneControllerProps) => {
  const scroll = useScroll(); 
  const group = useRef<THREE.Group>(null);
  const isOpenRef = useRef(false);

  useFrame((state) => {
    if (!group.current) return;
    const rawScroll = scroll.offset; // от 0 до 1
    const mappedScroll = THREE.MathUtils.clamp((rawScroll - 0.25) / (1 - 0.25), 0, 1);
    console.log('Mapped Scroll:', mappedScroll);
    // 1. Движение модели по оси X (твоя текущая логика)
    const clampedScrollForX = THREE.MathUtils.clamp(mappedScroll, 0, 0.65);
    let targetX = 0;
    if (mappedScroll >= 1 && !isOpenRef.current) {
      isOpenRef.current = true;
      onOpenDesktop(true); // Открываем
    } else if (mappedScroll < 1 && isOpenRef.current) {
      isOpenRef.current = false;
      onOpenDesktop(false); // Закрываем при скролле назад
    }
    if (clampedScrollForX > 0.5) {
      const progress = (clampedScrollForX - 0.5) / 0.4;
      targetX = THREE.MathUtils.lerp(0, 0.95, progress);
    }
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, 0.1);

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

    // Плавно двигаем саму камеру Three.js через lerp
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetCameraZ, 0.1);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCameraY, 0.1);
    
    state.camera.updateProjectionMatrix();
  });

  return <group ref={group}>{children}</group>;
};