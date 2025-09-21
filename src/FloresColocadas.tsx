import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue, set } from "firebase/database";
import './RamoFlores.css';

const flowerWithStem = (
  <>
    <img src="/mas-flor.png" alt="cabeza-flor" className="placed-flower-head" />
    <svg className="placed-flower-stem-svg">
      <path d="M 35 60 L 35 200" className="tallo" strokeWidth="4" />
      <g transform="translate(35, 100) rotate(-30)">
        <path className="hoja-flor" d="M0,0 C-10,-10 -5,-25 0,-30 C5,-25 10,-10 0,0 Z" />
      </g>
      <g transform="translate(35, 140) rotate(30)">
        <path className="hoja-flor" d="M0,0 C-10,-10 -5,-25 0,-30 C5,-25 10,-10 0,0 Z" />
      </g>
    </svg>
  </>
);

interface FloresColocadasProps {
  reanimating: boolean;
  dragging: { x: number; y: number } | null;
  flowerWord: { text: string; x: number; y: number } | null;
  setDragging: (pos: { x: number, y: number } | null) => void;
}

export const FloresColocadas: React.FC<FloresColocadasProps> = ({ reanimating, dragging, flowerWord, setDragging }) => {
  const [placedFlowers, setPlacedFlowers] = useState<{ id: number; x: number; y: number; size: number; rotation: number }[]>([]);
  const [nextFlowerId, setNextFlowerId] = useState(0);
  const isInitialLoad = React.useRef(true);
  const [internalDragging, setInternalDragging] = useState<{ x: number; y: number } | null>(null);

  // Limpia las flores colocadas al reiniciar la animación
  useEffect(() => {
    if (reanimating) {
      setPlacedFlowers([]);
      // También limpia la base de datos
      const flowersRef = ref(db, 'flowers');
      set(flowersRef, []);
    }
  }, [reanimating]);

  // Carga las flores desde Firebase al iniciar
  useEffect(() => {
    const flowersRef = ref(db, 'flowers');
    const unsubscribe = onValue(flowersRef, (snapshot) => {
      const data = snapshot.val();
      const flowersArray = data ? (Array.isArray(data) ? data : Object.values(data)).filter(Boolean) : [];
      setPlacedFlowers(flowersArray);
      if (flowersArray.length > 0) {
        const maxId = Math.max(...flowersArray.map(f => f.id || 0));
        setNextFlowerId(maxId + 1);
      }
      isInitialLoad.current = false;
    });

    return () => unsubscribe();
  }, []);

  // Guarda las flores en Firebase cuando cambian
  useEffect(() => {
    if (!isInitialLoad.current && !reanimating) {
      const flowersRef = ref(db, 'flowers');
      set(flowersRef, placedFlowers);
    }
  }, [placedFlowers, reanimating]);

  // Añadir flor al soltar el ramo
  useEffect(() => {
    const handleMouseMove = (moveEvent: MouseEvent) => {
      setDragging({ x: moveEvent.clientX, y: moveEvent.clientY });
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      setInternalDragging(null); // Clear internal dragging state
      setDragging(null); // Inform parent
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      const { clientX, clientY } = upEvent;
      const { innerWidth, innerHeight } = window;

      // Solo añade la flor si se suelta dentro de la pantalla
      if (
        clientX > 0 &&
        clientX < innerWidth &&
        clientY > 0 &&
        clientY < innerHeight
      ) {
        setPlacedFlowers(currentFlowers => [
          ...currentFlowers,
          {
            id: nextFlowerId,
            x: upEvent.pageX,
            y: upEvent.pageY,
            size: 70, // Tamaño inicial
            rotation: Math.random() * 30 - 15 // Rotación inicial aleatoria
          }
        ]);
        setNextFlowerId(id => id + 1);
      }
    };

    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [internalDragging, nextFlowerId, setDragging]);


  const handleTouchOnPlacedFlower = (e: React.TouchEvent, flowerId: number) => {
    e.stopPropagation(); // Evita el scroll de la página al interactuar con la flor

    const flower = placedFlowers.find(f => f.id === flowerId);
    if (!flower) return;

    const handleMove = (moveEvent: TouchEvent) => {
      moveEvent.preventDefault();

      if (moveEvent.touches.length === 2) {
        const t1 = moveEvent.touches[0];
        const t2 = moveEvent.touches[1];
        const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        const angle = Math.atan2(t1.clientY - t2.clientY, t1.clientX - t2.clientX);
        
        const gestureInfo = (e.currentTarget as any).gestureInfo;
        if (!gestureInfo) return;

        const scale = dist / gestureInfo.initialDist;
        const rotationDelta = (angle - gestureInfo.initialAngle) * (180 / Math.PI);

        const newSize = Math.max(20, Math.min(200, gestureInfo.initialSize * scale));
        const newRotation = gestureInfo.initialRotation + rotationDelta;

        setPlacedFlowers(current => current.map(f => f.id === flowerId ? { ...f, size: newSize, rotation: newRotation } : f));

      } else if (moveEvent.touches.length === 1) {
        const touch = moveEvent.touches[0];
        const dragInfo = (e.currentTarget as any).dragInfo;
        if (!dragInfo) return;

        setPlacedFlowers(current => current.map(f => f.id === flowerId ? { ...f, x: touch.pageX - dragInfo.offsetX, y: touch.pageY - dragInfo.offsetY } : f));
      }
    };

    const handleEnd = (endEvent: TouchEvent) => {
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
      if (endEvent.touches.length === 0 && (e.currentTarget as any).dragInfo) {
        const finalTouch = endEvent.changedTouches[0];
        if (finalTouch.clientX < 0 || finalTouch.clientX > window.innerWidth || finalTouch.clientY < 0 || finalTouch.clientY > window.innerHeight) {
          setPlacedFlowers(current => current.filter(f => f.id !== flowerId));
        }
      }
    };

    if (e.touches.length === 2) {
      const t1 = e.touches[0]; const t2 = e.touches[1];
      (e.currentTarget as any).gestureInfo = { initialDist: Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY), initialAngle: Math.atan2(t1.clientY - t2.clientY, t1.clientX - t2.clientX), initialSize: flower.size, initialRotation: flower.rotation };
    } else if (e.touches.length === 1) {
      (e.currentTarget as any).dragInfo = { offsetX: e.touches[0].pageX - flower.x, offsetY: e.touches[0].pageY - flower.y };
    }

    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);
  };

  useEffect(() => {
    if (dragging) {
      setInternalDragging(dragging);
    }
  }, [dragging]);

  const handleMouseDownOnPlacedFlower = (e: React.MouseEvent, flowerId: number) => {
    e.preventDefault();
    e.stopPropagation();

    const flowerToMove = placedFlowers.find(f => f.id === flowerId);
    if (!flowerToMove) return;

    const offsetX = e.pageX - flowerToMove.x;
    const offsetY = e.pageY - flowerToMove.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      setPlacedFlowers(currentFlowers =>
        currentFlowers.map(f =>
          f.id === flowerId ? { ...f, x: moveEvent.pageX - offsetX, y: moveEvent.pageY - offsetY } : f
        )
      );
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      const { clientX, clientY } = upEvent;
      const { innerWidth, innerHeight } = window;

      if (clientX < 0 || clientX > innerWidth || clientY < 0 || clientY > innerHeight) {
        setPlacedFlowers(currentFlowers => currentFlowers.filter(f => f.id !== flowerId));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleWheelOnPlacedFlower = (e: React.WheelEvent, flowerId: number) => {
    e.preventDefault();
    e.stopPropagation();

    setPlacedFlowers(currentFlowers =>
      currentFlowers.map(f => {
        if (f.id === flowerId) {
          if (e.shiftKey) {
            const newRotation = f.rotation - e.deltaY * 0.2;
            return { ...f, rotation: newRotation };
          } else {
            const newSize = f.size - e.deltaY * 0.1;
            const clampedSize = Math.max(20, Math.min(200, newSize));
            return { ...f, size: clampedSize };
          }
        }
        return f;
      })
    );
  };

  return (
    <>
      {placedFlowers.map(flower => (
        <div
          key={flower.id}
          className="placed-flower"
          style={{
            left: flower.x,
            top: flower.y,
            width: flower.size,
            transform: `translate(-50%, -50%) rotate(${flower.rotation}deg)`
          }}
          onMouseDown={(e) => handleMouseDownOnPlacedFlower(e, flower.id)}
          onTouchStart={(e) => handleTouchOnPlacedFlower(e, flower.id)}
          onWheel={(e) => handleWheelOnPlacedFlower(e, flower.id)}
        >
          {flowerWithStem}
        </div>
      ))}
      {internalDragging && (
        <div
          className="dragging-flower"
          style={{ left: internalDragging.x, top: internalDragging.y, position: 'fixed' }}
        >
          {flowerWithStem}
        </div>
      )}
      {/* Palabra flotante al hacer clic en una flor del ramo */}
      {flowerWord && (
        <div 
          className="palabra-flor-flotante"
          style={{ left: flowerWord.x, top: flowerWord.y }}
        >
          {flowerWord.text}
        </div>
      )}
    </>
  );
};