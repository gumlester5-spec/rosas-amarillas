// RamoRosas.tsx
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { ref, onValue, set } from "firebase/database";
import './RamoFlores.css';

const RamoFlores = () => {
  const [poemaVisible, setPoemaVisible] = useState<number | null>(null);
  const [placedFlowers, setPlacedFlowers] = useState<{ id: number; x: number; y: number; size: number; rotation: number }[]>([]);
  const [dragging, setDragging] = useState<{ x: number; y: number } | null>(null);
  const [nextFlowerId, setNextFlowerId] = useState(0);
  const [displayedPoem, setDisplayedPoem] = useState('');
  const [poemAnimationStarted, setPoemAnimationStarted] = useState(false);
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [flowerWord, setFlowerWord] = useState<{ text: string; x: number; y: number } | null>(null);
  const [displayedModalPoem, setDisplayedModalPoem] = useState('');

  const isInitialLoad = React.useRef(true);

  
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
    if (!isInitialLoad.current) {
      const flowersRef = ref(db, 'flowers');
      set(flowersRef, placedFlowers);
    }
  }, [placedFlowers]);

  const fullPoem = `Mi amor, mi vida, mi lucero,<br />
como estas flores que ves nacer,<br />
así florece lo que te quiero,<br />
un sentimiento que no hace más que crecer.
<br /><br />
Tus ojos, dos soles que me iluminan,<br />
tu risa, la melodía más pura y bella,<br />
en cada pétalo amarillo que germina,<br />
veo el reflejo de tu alma, mi estrella.
<br /><br />
Te amo, mi amolshita hermosa,<br />
más de lo que las palabras pueden decir,<br />
eres mi presente, mi futuro, mi rosa,<br />
la única razón de mi sonreír.`;

  // Animación de escritura del poema
  useEffect(() => {
    const poemTimer = setTimeout(() => setPoemAnimationStarted(true), 5000);
    return () => clearTimeout(poemTimer);
  }, []);

  useEffect(() => {
    if (poemAnimationStarted) {
      let i = 0;
      const poemTextForTyping = fullPoem.replace(/<br \/>/g, '\n');
      setDisplayedPoem('');
      const typingInterval = setInterval(() => {
        if (i < poemTextForTyping.length) {
          setDisplayedPoem(prev => prev + poemTextForTyping.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50);
      return () => clearInterval(typingInterval);
    }
  }, [poemAnimationStarted]);

  // Contador de tiempo juntos
  useEffect(() => {
    // !! IMPORTANTE: Cambia esta fecha por la fecha en que comenzaron su relación
    const startDate = new Date('2025-04-14T21:20:20');
    const interval = setInterval(() => {
      const now = new Date();
      const difference = now.getTime() - startDate.getTime();
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      setTimeTogether({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const poemas = [
    `Mi vida, si hoy no puedo
    llevarte una flor en la mano,
    te mando este verso sincero,
    que nació de mi corazón temprano.
    Perdóname por no estar cerquita,
    pero mi amor vuela hasta ti,
    eres la flor más bonita,
    la que me hace tan feliz. 💗`,
    `No tengo rosas reales,
    pero tengo palabras de amor.
    No tengo un ramo en mis manos,
    pero mi corazón es tu flor.
    Te amo más que al aire que respiro,
    más que al cielo azul que nos mira,
    mi niña, mi luz, mi suspiro,
    mi razón para sonreír en la vida. 💞`,
    `Aunque no sientas pétalos en tus dedos,
    siente mis besitos llegar en secreto.
    Aunque no escuches flores caer,
    escucha mi voz diciendo “te volvería a escoger”.
    Mi amor, perdóname por la distancia,
    pero recibe este regalo de esperanza:
    que pronto, muy pronto,
    mis manos te darán la flor que hoy te nombro. 🌸`,
    `Tú eres más que una flor,
    eres el jardín entero.
    Eres el color en mi día,
    el perfume en mi sendero.
    Hoy no te llevo una rosa,
    pero te llevo mi corazón.
    Eres la razón más hermosa
    de cada latido y canción. 💛`,
    `Perdóname, vida mía,
    por no traerte una flor física,
    pero déjame darte poesía,
    de la más pura y mágica.
    Tú eres mi primavera eterna,
    mi niña bonita, mi luna tierna.
    Si pudiera elegir mil veces,
    mil veces por ti volvería a hacer esto. 💗`,
    `Si este mensaje tuviera perfume,
    olería a rosas recién cortadas.
    Si tuviera colores,
    serían los de la alborada.
    Mi amor, te amo como nunca imaginé,
    eres mi sueño, mi fe, mi querer.
    Perdona mis manos vacías hoy,
    pues en mi alma te llevo,
    y ahí flores nunca faltan para ti. 💕`
  ];

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

  // Animación de escritura para los poemas del modal
  useEffect(() => {
    if (poemaVisible !== null) {
      const poemToType = poemas[poemaVisible];
      setDisplayedModalPoem(''); // Reinicia el texto al abrir un nuevo poema

      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < poemToType.length) {
          setDisplayedModalPoem(prev => poemToType.substring(0, prev.length + 1));
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, 30); // Velocidad de escritura un poco más rápida para los modales

      return () => clearInterval(typingInterval);
    }
  }, [poemaVisible]);

  const handleFlorClick = (index: number) => {
    setPoemaVisible(index);
  };

  const handleMouseDownOnBouquet = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging({ x: e.clientX, y: e.clientY });

    const handleMouseMove = (moveEvent: MouseEvent) => {
      setDragging({ x: moveEvent.clientX, y: moveEvent.clientY });
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      setDragging(null);
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

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const flowerWords = [
    "Preciosa", "Inteligente", "Divertida", "Cariñosa", "Única",
    "Mi Sol", "Especial", "Mi Amor", "Increíble", "Perfecta", "Mi Vida"
  ];

  const handleFlowerClickInBouquet = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const word = flowerWords[index % flowerWords.length];
    setFlowerWord({ text: word, x: e.clientX, y: e.clientY });
    setTimeout(() => {
      setFlowerWord(null);
    }, 1500);
  };

  const handleTouchOnPlacedFlower = (e: React.TouchEvent, flowerId: number) => {
    e.stopPropagation(); // Evita el scroll de la página al interactuar con la flor

    const flower = placedFlowers.find(f => f.id === flowerId);
    if (!flower) return;

    const handleMove = (moveEvent: TouchEvent) => {
      // Prevenir el comportamiento táctil predeterminado del navegador (como hacer zoom en la página)
      moveEvent.preventDefault();

      if (moveEvent.touches.length === 2) {
        // Gesto de dos dedos: escalar y rotar
        const t1 = moveEvent.touches[0];
        const t2 = moveEvent.touches[1];
        const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        const angle = Math.atan2(t1.clientY - t2.clientY, t1.clientX - t2.clientX);
        
        // Aquí necesitamos el estado inicial del gesto, que guardaremos en el evento del elemento
        const gestureInfo = (e.currentTarget as any).gestureInfo;
        if (!gestureInfo) return;

        const scale = dist / gestureInfo.initialDist;
        const rotationDelta = (angle - gestureInfo.initialAngle) * (180 / Math.PI);

        const newSize = Math.max(20, Math.min(200, gestureInfo.initialSize * scale));
        const newRotation = gestureInfo.initialRotation + rotationDelta;

        setPlacedFlowers(current => current.map(f => f.id === flowerId ? { ...f, size: newSize, rotation: newRotation } : f));

      } else if (moveEvent.touches.length === 1) {
        // Gesto de un dedo: arrastrar
        const touch = moveEvent.touches[0];
        const dragInfo = (e.currentTarget as any).dragInfo;
        if (!dragInfo) return;

        setPlacedFlowers(current => current.map(f => f.id === flowerId ? { ...f, x: touch.pageX - dragInfo.offsetX, y: touch.pageY - dragInfo.offsetY } : f));
      }
    };

    const handleEnd = (endEvent: TouchEvent) => {
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
      // Lógica para eliminar si se arrastra fuera de la pantalla
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

      // Si se suelta fuera de la pantalla, elimina la flor
      if (
        clientX < 0 ||
        clientX > innerWidth ||
        clientY < 0 ||
        clientY > innerHeight
      ) {
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
          if (e.shiftKey) { // Rotar con Shift + Scroll
            const newRotation = f.rotation - e.deltaY * 0.2;
            return { ...f, rotation: newRotation };
          } else { // Redimensionar con Scroll
            const newSize = f.size - e.deltaY * 0.1;
            const clampedSize = Math.max(20, Math.min(200, newSize)); // Limita el tamaño entre 20px y 200px
            return { ...f, size: clampedSize };
          }
        }
        return f;
      })
    );
  };


  const fotos = [
    { src: "/foto 1.jpg", alt: "Recuerdo 1", caption: "Tu belleza no tiene comparación." },
    { src: "/foto 2.jpg", alt: "Recuerdo 2", caption: "La flor más hermosa eres tú." },
    { src: "/foto 3.jpg", alt: "Recuerdo 3", caption: "Cada rasgo tuyo es perfecto." },
    { src: "/foto 4.jpg", alt: "Recuerdo 4", caption: "Tu mirada me deja sin aliento." },
    { src: "/foto 5.jpg", alt: "Recuerdo 5", caption: "Eres la definición de hermosura." },
    { src: "/foto 6.jpg", alt: "Recuerdo 6", caption: "Simplemente, la más bonita." }
  ];

  return (
    <div className="ramo-container">
      <div className="fondo-animado">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="item-caida"></div>
        ))}
      </div>
      <div className="ramo-y-frases-container">
        <svg className="ramo-svg" viewBox="0 0 500 500" onMouseDown={handleMouseDownOnBouquet} >
          <g className="ramo" transform="translate(250, 380)">

          {/* Envoltorio */}
          <g className="envoltorio">
            <path d="M -120 0 
                     C -160 -40, -160 -80, -120 -100
                     C -80 -120, 80 -120, 120 -100
                     C 160 -80, 160 -40, 120 0
                     Z" 
                  fill="#fbe9e7" stroke="#ffccbc" strokeWidth="3" />
          </g>

          {/* Lazo */}
          <g className="lazo" transform="translate(0, -70)">
            <path d="M -50 -10 
                     C -70 -40, -40 -60, 0 -50
                     C 40 -60, 70 -40, 50 -10
                     C 70 0, 40 20, 0 30
                     C -40 20, -70 0, -50 -10
                     Z" 
                  fill="#ff7043" />
          </g>

          {/* Hojas de relleno (se dibujan primero para quedar detrás) */}
          <g className="hoja" transform="translate(-80, -220) rotate(-30)">
            <path d="M0,0 C20,-40 40,-60 60,-100 C40,-60 20,-40 0,0 Z" fill="#a5d6a7" />
          </g>
          <g className="hoja" transform="translate(80, -220) rotate(30)">
            <path d="M0,0 C-20,-40 -40,-60 -60,-100 C-40,-60 -20,-40 0,0 Z" fill="#a5d6a7" />
          </g>

          {/* Capa trasera de flores */}
          <g className="flor" transform="translate(-90, -230) rotate(-35)" onClick={(e) => handleFlowerClickInBouquet(e, 0)}>
            <path className="tallo" d="M0,0 L50,160" />
            <g transform="translate(20, 80) rotate(15)">
              <path className="hoja-flor" d="M0,0 C-10,-10 -5,-25 0,-30 C5,-25 10,-10 0,0 Z" />
            </g>
            <g transform="translate(35, 120) rotate(-15)">
              <path className="hoja-flor" d="M0,0 C-10,-10 -5,-25 0,-30 C5,-25 10,-10 0,0 Z" />
            </g>
            {Array.from({ length: 12 }).map((_, j) => (
              <path key={j} className="petalo" d="M0,0 C-25,-60 25,-60 0,0 Z" transform={`rotate(${j * 30})`} fill={j % 2 === 0 ? "#ffeb3b" : "#fbc02d"} />
            ))}
            <circle cx="0" cy="0" r="18" fill="#4e342e" />
          </g>
          <g className="flor" transform="translate(90, -230) rotate(35)" onClick={(e) => handleFlowerClickInBouquet(e, 1)}>
            <path className="tallo" d="M0,0 L-50,160" />
            <g transform="translate(-20, 80) rotate(-15)">
              <path className="hoja-flor" d="M0,0 C-10,-10 -5,-25 0,-30 C5,-25 10,-10 0,0 Z" />
            </g>
            <g transform="translate(-35, 120) rotate(15)">
              <path className="hoja-flor" d="M0,0 C-10,-10 -5,-25 0,-30 C5,-25 10,-10 0,0 Z" />
            </g>
            {Array.from({ length: 12 }).map((_, j) => (
              <path key={j} className="petalo" d="M0,0 C-25,-60 25,-60 0,0 Z" transform={`rotate(${j * 30})`} fill={j % 2 === 0 ? "#ffeb3b" : "#fbc02d"} />
            ))}
            <circle cx="0" cy="0" r="18" fill="#4e342e" />
          </g>

          <g className="flor" transform="translate(-60, -250) rotate(-15)" onClick={(e) => handleFlowerClickInBouquet(e, 2)}>
            <path className="tallo" d="M0,0 L40,180" />
            <g transform="translate(15, 90) rotate(20)">
              <path className="hoja-flor" d="M0,0 C-10,-10 -5,-25 0,-30 C5,-25 10,-10 0,0 Z" />
            </g>
            <g transform="translate(30, 130) rotate(-20)">
              <path className="hoja-flor" d="M0,0 C-10,-10 -5,-25 0,-30 C5,-25 10,-10 0,0 Z" />
            </g>
            {Array.from({ length: 12 }).map((_, j) => (
              <path key={j} className="petalo" d="M0,0 C-30,-70 30,-70 0,0 Z" transform={`rotate(${j * 30})`} fill={j % 2 === 0 ? "#ffeb3b" : "#fbc02d"} />
            ))}
            <circle cx="0" cy="0" r="20" fill="#4e342e" />
          </g>
          <g className="flor" transform="translate(60, -250) rotate(15)" onClick={(e) => handleFlowerClickInBouquet(e, 3)}>
            <path className="tallo" d="M0,0 L-40,180" />
            <g transform="translate(-15, 90) rotate(-20)">
              <path className="hoja-flor" d="M0,0 C-10,-10 -5,-25 0,-30 C5,-25 10,-10 0,0 Z" />
            </g>
            <g transform="translate(-30, 130) rotate(20)">
              <path className="hoja-flor" d="M0,0 C-10,-10 -5,-25 0,-30 C5,-25 10,-10 0,0 Z" />
            </g>
            {Array.from({ length: 12 }).map((_, j) => (
              <path key={j} className="petalo" d="M0,0 C-30,-70 30,-70 0,0 Z" transform={`rotate(${j * 30})`} fill={j % 2 === 0 ? "#ffeb3b" : "#fbc02d"} />
            ))}
            <circle cx="0" cy="0" r="20" fill="#4e342e" />
          </g>

          {/* Capa intermedia */}
          <g className="flor" transform="translate(-100, -180) rotate(-25)" onClick={(e) => handleFlowerClickInBouquet(e, 4)}>
            <path className="tallo" d="M0,0 L70,150" />
            <g transform="translate(30, 80) rotate(25)">
              <path className="hoja-flor" d="M0,0 C-10,-10 -5,-25 0,-30 C5,-25 10,-10 0,0 Z" />
            </g>
            <g transform="translate(50, 110) rotate(-25)">
              <path className="hoja-flor" d="M0,0 C-10,-10 -5,-25 0,-30 C5,-25 10,-10 0,0 Z" />
            </g>
            {Array.from({ length: 12 }).map((_, j) => (
              <path key={j} className="petalo" d="M0,0 C-36,-80 36,-80 0,0 Z" transform={`rotate(${j * 30})`} fill={j % 2 === 0 ? "#ffeb3b" : "#fbc02d"} />
            ))}
            <circle cx="0" cy="0" r="25" fill="#4e342e" />
          </g>
          <g className="flor" transform="translate(100, -180) rotate(25)" onClick={(e) => handleFlowerClickInBouquet(e, 5)}>
            <path className="tallo" d="M0,0 L-70,150" />
            <g transform="translate(-30, 80) rotate(-25)">
              <path className="hoja-flor" d="M0,0 C-10,-10 -5,-25 0,-30 C5,-25 10,-10 0,0 Z" />
            </g>
            <g transform="translate(-50, 110) rotate(25)">
              <path className="hoja-flor" d="M0,0 C-10,-10 -5,-25 0,-30 C5,-25 10,-10 0,0 Z" />
            </g>
            {Array.from({ length: 12 }).map((_, j) => (
              <path key={j} className="petalo" d="M0,0 C-36,-80 36,-80 0,0 Z" transform={`rotate(${j * 30})`} fill={j % 2 === 0 ? "#ffeb3b" : "#fbc02d"} />
            ))}
            <circle cx="0" cy="0" r="25" fill="#4e342e" />
          </g>

          {/* Flor central (principal) */}
          <g className="flor" transform="translate(0, -280)" onClick={(e) => handleFlowerClickInBouquet(e, 6)}>
            <path className="tallo" d="M0,0 L0,220" />
            <g transform="translate(0, 100) rotate(30)">
              <path className="hoja-flor" d="M0,0 C-10,-10 -5,-25 0,-30 C5,-25 10,-10 0,0 Z" />
            </g>
            <g transform="translate(0, 150) rotate(-30)">
              <path className="hoja-flor" d="M0,0 C-10,-10 -5,-25 0,-30 C5,-25 10,-10 0,0 Z" />
            </g>
            {Array.from({ length: 12 }).map((_, j) => (
              <path key={j} className="petalo" d="M0,0 C-40,-90 40,-90 0,0 Z" transform={`rotate(${j * 30})`} fill={j % 2 === 0 ? "#ffeb3b" : "#fbc02d"} />
            ))}
            <circle cx="0" cy="0" r="28" fill="#4e342e" />
          </g>

          {/* Capa frontal */}
          <g className="flor" transform="translate(-50, -150) rotate(-10)" onClick={(e) => handleFlowerClickInBouquet(e, 7)}>
            <path className="tallo" d="M0,0 L30,100" />
            <g transform="translate(10, 50) rotate(30)">
              <path className="hoja-flor" d="M0,0 C-10,-10 -5,-25 0,-30 C5,-25 10,-10 0,0 Z" />
            </g>
            <g transform="translate(20, 80) rotate(-30)">
              <path className="hoja-flor" d="M0,0 C-10,-10 -5,-25 0,-30 C5,-25 10,-10 0,0 Z" />
            </g>
            {Array.from({ length: 12 }).map((_, j) => (
              <path key={j} className="petalo" d="M0,0 C-36,-80 36,-80 0,0 Z" transform={`rotate(${j * 30})`} fill={j % 2 === 0 ? "#ffeb3b" : "#fbc02d"} />
            ))}
            <circle cx="0" cy="0" r="25" fill="#4e342e" />
          </g>
          <g className="flor" transform="translate(50, -150) rotate(10)" onClick={(e) => handleFlowerClickInBouquet(e, 8)}>
            <path className="tallo" d="M0,0 L-30,100" />
            <g transform="translate(-10, 50) rotate(-30)">
              <path className="hoja-flor" d="M0,0 C-10,-10 -5,-25 0,-30 C5,-25 10,-10 0,0 Z" />
            </g>
            <g transform="translate(-20, 80) rotate(30)">
              <path className="hoja-flor" d="M0,0 C-10,-10 -5,-25 0,-30 C5,-25 10,-10 0,0 Z" />
            </g>
            {Array.from({ length: 12 }).map((_, j) => (
              <path key={j} className="petalo" d="M0,0 C-36,-80 36,-80 0,0 Z" transform={`rotate(${j * 30})`} fill={j % 2 === 0 ? "#ffeb3b" : "#fbc02d"} />
            ))}
            <circle cx="0" cy="0" r="25" fill="#4e342e" />
          </g>
          <g className="flor" transform="translate(-120, -130) rotate(-40)" onClick={(e) => handleFlowerClickInBouquet(e, 9)}>
            <path className="tallo" d="M0,0 L80,110" />
            <g transform="translate(30, 50) rotate(30)">
              <path className="hoja-flor" d="M0,0 C-10,-10 -5,-25 0,-30 C5,-25 10,-10 0,0 Z" />
            </g>
            <g transform="translate(50, 80) rotate(-30)">
              <path className="hoja-flor" d="M0,0 C-10,-10 -5,-25 0,-30 C5,-25 10,-10 0,0 Z" />
            </g>
            {Array.from({ length: 12 }).map((_, j) => (
              <path key={j} className="petalo" d="M0,0 C-30,-70 30,-70 0,0 Z" transform={`rotate(${j * 30})`} fill={j % 2 === 0 ? "#ffeb3b" : "#fbc02d"} />
            ))}
            <circle cx="0" cy="0" r="22" fill="#4e342e" />
          </g>
          <g className="flor" transform="translate(120, -130) rotate(40)" onClick={(e) => handleFlowerClickInBouquet(e, 10)}>
            <path className="tallo" d="M0,0 L-80,110" />
            <g transform="translate(-30, 50) rotate(-30)">
              <path className="hoja-flor" d="M0,0 C-10,-10 -5,-25 0,-30 C5,-25 10,-10 0,0 Z" />
            </g>
            <g transform="translate(-50, 80) rotate(30)">
              <path className="hoja-flor" d="M0,0 C-10,-10 -5,-25 0,-30 C5,-25 10,-10 0,0 Z" />
            </g>
            {Array.from({ length: 12 }).map((_, j) => (
              <path key={j} className="petalo" d="M0,0 C-30,-70 30,-70 0,0 Z" transform={`rotate(${j * 30})`} fill={j % 2 === 0 ? "#ffeb3b" : "#fbc02d"} />
            ))}
            <circle cx="0" cy="0" r="22" fill="#4e342e" />
          </g>
        </g>
      </svg>
        <div id="corazon1" className="frase-corazon"><p>🌷 Si pudiera regalarte flores reales, te daría un jardín entero, pero como estoy lejitos, te mando mil besitos y este ramito virtual.</p></div>
        <div id="corazon2" className="frase-corazon"><p>🌹 Hoy es 21 de septiembre y mi corazón florece por ti, aunque no pueda abrazarte, te abrazo con estas palabras.</p></div>
        <div id="corazon3" className="frase-corazon"><p>🌼 Mi amor, tú eres mi flor favorita, mi estación favorita, mi razón favorita.</p></div>
        <div id="corazon4" className="frase-corazon"><p>🌸 No hay flor que compita contigo, porque ninguna es tan bonita como tú.</p></div>
        <div id="corazon5" className="frase-corazon"><p>🌻 Cada flor de este día tiene tu nombre, porque tú eres mi primavera eterna.</p></div>
        <div id="corazon6" className="frase-corazon"><p>💐 Aunque no pueda estar contigo, este mensajito lleva el aroma de mi amor, para que te sientas consentida.</p></div>
      </div>
      <div className="poema-container">
        <h2>para mi amolshita hermosa valeria</h2>
        <p className="poema-texto">
          {displayedPoem.split('\n').map((line, i) => (
            <React.Fragment key={i}>{line}<br /></React.Fragment>
          ))}
          {poemAnimationStarted && <span className="cursor-parpadeante">|</span>}
        </p>
      </div>
      <div className="contador-container">
        <h3>Nuestro Tiempo Juntos</h3>
        <div className="tiempo">
            <div><span>{timeTogether.days}</span> Días</div>
            <div><span>{timeTogether.hours}</span> Horas</div>
            <div><span>{timeTogether.minutes}</span> Minutos</div>
            <div><span>{timeTogether.seconds}</span> Segundos</div>
        </div>
      </div>
      <div className="fotos-container">
        <h3>Como Eres de Hermosa</h3>
        <div className="foto-grid">
          {fotos.map((foto, index) => (
            <div className="foto" key={index}>
              <img src={foto.src} alt={foto.alt} />
              <img 
                src="/mas-flor.png" 
                alt="flor" 
                className="overlay-flor"
                onClick={() => handleFlorClick(index)}
              />
              <p>{foto.caption}</p>
            </div>
          ))}
        </div>
      </div>
      {poemaVisible !== null && (
        <div className="poema-modal-overlay" onClick={() => setPoemaVisible(null)}>
          <div className="poema-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="poema-modal-close" onClick={() => setPoemaVisible(null)}>&times;</button>
            <p>
              {displayedModalPoem.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}
              {poemaVisible !== null && displayedModalPoem.length < poemas[poemaVisible].length && (
                <span className="cursor-parpadeante">|</span>
              )}
            </p>
          </div>
        </div>
      )}
      {/* Renderizar flores colocadas */}
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
      {/* Renderizar flor que se está arrastrando */}
      {dragging && (
        <div
          className="dragging-flower"
          style={{ left: dragging.x, top: dragging.y, position: 'fixed' }}
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
    </div>
  );
};

export default RamoFlores;