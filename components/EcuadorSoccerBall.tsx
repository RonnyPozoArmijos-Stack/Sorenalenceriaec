import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface EcuadorSoccerBallProps {}

/**
 * ClassicSoccerBallSVG:
 * High-fidelity 3D vector illustration of a classic, nostalgic black-and-white 32-panel soccer ball. 
 * Features perfect pentagonal geometry, rich radial volume shading, and specular reflections 
 * for an premium, photorealistic look.
 */
export const ClassicSoccerBallSVG: React.FC<{ className?: string; onClick?: (e: React.MouseEvent) => void }> = ({ className = "w-full h-full", onClick }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`${className} cursor-pointer drop-shadow-[0_12px_24px_rgba(0,0,0,0.22)] dark:drop-shadow-[0_16px_32px_rgba(0,0,0,0.5)] select-none hover:brightness-105 active:scale-95 transition-all duration-300`}
      onClick={onClick}
    >
      <defs>
        {/* Soft spherical gradient model for rich 3D realistic volume */}
        <radialGradient id="classicBall3D" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="45%" stopColor="#000000" stopOpacity="0" />
          <stop offset="85%" stopColor="#000000" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
        </radialGradient>

        {/* Glossy highlight flare overlay */}
        <linearGradient id="classicGloss" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>

        {/* Panel depth radial shader for dark panels */}
        <radialGradient id="charcoalPanel" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#2D3748" />
          <stop offset="70%" stopColor="#1A202C" />
          <stop offset="100%" stopColor="#0D1117" />
        </radialGradient>
      </defs>

      {/* 1. Base Ball Sphere (White leather material) */}
      <circle cx="50" cy="50" r="48" fill="#F8FAFC" stroke="#0F172A" strokeWidth="1.5" />

      {/* 2. Center Pentagon (Classic dark leather panel) */}
      <polygon 
        points="50,35 64,45 59,62 41,62 36,45" 
        fill="url(#charcoalPanel)" 
        stroke="#0F172A" 
        strokeWidth="1.5" 
        strokeLinejoin="round" 
      />

      {/* 3. Outward Seam Radials bounding the inner hexagons */}
      <line x1="50" y1="35" x2="50" y2="18" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="64" y1="45" x2="78" y2="41" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="59" y1="62" x2="68" y2="79" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="41" y1="62" x2="32" y2="79" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="36" y1="45" x2="22" y2="41" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />

      {/* 4. Surrounding Pentagons situated at the circular edge */}
      {/* Top Pentagon */}
      <polygon 
        points="50,2 41,10 50,18 59,10" 
        fill="url(#charcoalPanel)" 
        stroke="#0F172A" 
        strokeWidth="1.5" 
        strokeLinejoin="round" 
      />

      {/* Upper-Left Pentagon */}
      <polygon 
        points="18,20 28,26 22,41 9,41 7,27" 
        fill="url(#charcoalPanel)" 
        stroke="#0F172A" 
        strokeWidth="1.5" 
        strokeLinejoin="round" 
      />

      {/* Upper-Right Pentagon */}
      <polygon 
        points="82,20 72,26 78,41 91,41 93,27" 
        fill="url(#charcoalPanel)" 
        stroke="#0F172A" 
        strokeWidth="1.5" 
        strokeLinejoin="round" 
      />

      {/* Bottom-Right Pentagon */}
      <polygon 
        points="78,75 68,79 72,94 85,90 91,78" 
        fill="url(#charcoalPanel)" 
        stroke="#0F172A" 
        strokeWidth="1.5" 
        strokeLinejoin="round" 
      />

      {/* Bottom-Left Pentagon */}
      <polygon 
        points="22,75 32,79 28,94 15,90 9,78" 
        fill="url(#charcoalPanel)" 
        stroke="#0F172A" 
        strokeWidth="1.5" 
        strokeLinejoin="round" 
      />

      {/* 5. Edge Connector Seams to complete additional hexagons */}
      <line x1="41" y1="10" x2="28" y2="26" stroke="#0F172A" strokeWidth="1.5" />
      <line x1="59" y1="10" x2="72" y2="26" stroke="#0F172A" strokeWidth="1.5" />
      <line x1="91" y1="41" x2="91" y2="78" stroke="#0F172A" strokeWidth="1.5" />
      <line x1="9" y1="41" x2="9" y2="78" stroke="#0F172A" strokeWidth="1.5" />
      <line x1="68" y1="79" x2="50" y2="84" stroke="#0F172A" strokeWidth="1.5" />
      <line x1="32" y1="79" x2="50" y2="84" stroke="#0F172A" strokeWidth="1.5" />
      <line x1="50" y1="84" x2="50" y2="98" stroke="#0F172A" strokeWidth="1.5" />

      {/* 6. Professional 3D lighting overlays */}
      <circle cx="50" cy="50" r="48" fill="url(#classicBall3D)" pointerEvents="none" />
      <circle cx="50" cy="50" r="48" fill="url(#classicGloss)" pointerEvents="none" />
    </svg>
  );
};

export const EcuadorSoccerBall: React.FC<EcuadorSoccerBallProps> = () => {
  const [clickMessage, setClickMessage] = useState<{ id: number; x: number; y: number } | null>(null);
  const [hasFinishedPass, setHasFinishedPass] = useState(false);

  useEffect(() => {
    // Staggered roll: ball 1 starts at 0s, ball 2 starts at 3s and crosses in 15s.
    // Total crossing timeline is 18 seconds. At 18.5 seconds we remove elements to keep DOM clean.
    const timer = setTimeout(() => {
      setHasFinishedPass(true);
    }, 18500);

    return () => clearTimeout(timer);
  }, []);

  const handleBallClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || (rect.left + rect.width / 2);
    const y = e.clientY || (rect.top - 20);

    setClickMessage({ id: Date.now(), x, y });

    // Premium high-density Ecuador tri-color festive celebration burst
    try {
      // Yellow, Blue, Red and pure white stars
      confetti({
        particleCount: 75,
        spread: 70,
        colors: ['#FFD100', '#003087', '#C8102E', '#FFFFFF'],
        origin: { 
          x: x / window.innerWidth, 
          y: y / window.innerHeight 
        },
        gravity: 0.85,
        scalar: 0.95,
        ticks: 200
      });

      // Quick delayed second golden sparks burst for extra satisfaction
      setTimeout(() => {
        confetti({
          particleCount: 40,
          spread: 90,
          colors: ['#FFD700', '#F4C430', '#FFFFFF'],
          origin: { 
            x: x / window.innerWidth, 
            y: (y - 30) / window.innerHeight 
          },
          gravity: 0.8,
          scalar: 0.75,
          ticks: 150
        });
      }, 150);
    } catch (err) {
      console.warn("Festejo confetti failed softly:", err);
    }

    // Automatically dismiss bubble after 2.5 seconds
    setTimeout(() => {
      setClickMessage(prev => prev && prev.x === x ? null : prev);
    }, 2500);
  };

  // If the slow start-up transition has finished, unmount the controller
  if (hasFinishedPass) {
    return null;
  }

  return (
    <>
      {/* 
        Slow Start-up Roll Transition:
        Renders TWO distinct balls crossing sequentially at the bottom-percent of the screen 
        for an incredibly engaging startup experience that showcases the premium black and white design!
      */}
      
      {/* FIRST SOCCER BALL: Crosses from 0s to 15s */}
      <div className="fixed bottom-[22%] left-0 right-0 h-24 pointer-events-none z-[8000] select-none overflow-visible">
        <motion.div
          initial={{ 
            x: '-140px',
            opacity: 0.95
          }}
          animate={{ 
            x: 'calc(100vw + 140px)'
          }}
          transition={{ 
            duration: 15, 
            ease: "easeInOut",
            delay: 0
          }}
          className="w-16 h-16 sm:w-20 sm:h-20 pointer-events-auto"
        >
          {/* Continuous rolling rotation */}
          <motion.div
            animate={{ rotate: 1080 }}
            transition={{ duration: 15, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <ClassicSoccerBallSVG onClick={handleBallClick} />
          </motion.div>
        </motion.div>
      </div>

      {/* SECOND SOCCER BALL: Crosses slightly offset (starts at 3s, rolls slightly lower) */}
      <div className="fixed bottom-[18%] left-0 right-0 h-24 pointer-events-none z-[8000] select-none overflow-visible">
        <motion.div
          initial={{ 
            x: '-140px',
            opacity: 0.95
          }}
          animate={{ 
            x: 'calc(100vw + 140px)'
          }}
          transition={{ 
            duration: 15, 
            ease: "easeInOut",
            delay: 3.2
          }}
          className="w-14 h-14 sm:w-18 sm:h-18 pointer-events-auto"
        >
          {/* Continuous rolling rotation */}
          <motion.div
            animate={{ rotate: 1080 }}
            transition={{ duration: 15, ease: "easeInOut", delay: 3.2 }}
            className="w-full h-full"
          >
            <ClassicSoccerBallSVG onClick={handleBallClick} />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating high-contrast notification bubble */}
      <AnimatePresence>
        {clickMessage && (
          <motion.div
            key={clickMessage.id}
            initial={{ scale: 0, opacity: 0, y: 0 }}
            animate={{ scale: 1.15, opacity: 1, y: -55 }}
            exit={{ scale: 0.7, opacity: 0, y: -90 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ 
              position: 'fixed', 
              left: clickMessage.x - 75, 
              top: clickMessage.y - 12,
              zIndex: 9999
            }}
            className="bg-[#FFD100] text-black dark:bg-[#070B12]/95 dark:text-white px-4 py-2 rounded-xl shadow-[0_12px_32px_rgba(255,217,0,0.3)] border-2 border-[#003087] dark:border-[#FFD100] text-xs font-mono font-bold flex items-center gap-1.5 select-none pointer-events-none"
          >
            <span>⚽</span>
            <span>¡VAMOS ECUADOR!</span>
            <span>🇪🇨</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
