import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface EcuadorSoccerBallProps {}

/**
 * WorldCupSoccerBallSVG:
 * 3D-effect modern soccer ball matching the exact visual provided in the image:
 * - Beautiful white leather panel base.
 * - Dynamic, sweeping, curvy ribbons in intense red, green, and blue.
 * - Intricate textured internal lines (flame lines inside red, leaf/vein strokes inside green).
 * - Immersive 3D realistic spherical shading & glossy highlights overlay.
 */
export const WorldCupSoccerBallSVG: React.FC<{ className?: string; onClick?: (e: React.MouseEvent) => void }> = ({ className = "w-full h-full", onClick }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`${className} cursor-pointer drop-shadow-[0_12px_24px_rgba(0,0,0,0.22)] dark:drop-shadow-[0_16px_32px_rgba(0,0,0,0.5)] select-none hover:brightness-105 active:scale-95 transition-all duration-300`}
      onClick={onClick}
    >
      <defs>
        {/* Soft spherical gradient model for premium photorealism */}
        <radialGradient id="ball3DLight" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#000000" stopOpacity="0" />
          <stop offset="85%" stopColor="#000000" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
        </radialGradient>

        <linearGradient id="sphericalGloss" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
          <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>

        {/* Precise gradients mimicking the image */}
        <linearGradient id="imageRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E53E3E" />
          <stop offset="60%" stopColor="#C53030" />
          <stop offset="100%" stopColor="#7B1D1D" />
        </linearGradient>

        <linearGradient id="imageGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38A169" />
          <stop offset="50%" stopColor="#2F855A" />
          <stop offset="100%" stopColor="#22543D" />
        </linearGradient>

        <linearGradient id="imageBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3182CE" />
          <stop offset="70%" stopColor="#2B6CB0" />
          <stop offset="100%" stopColor="#1A365D" />
        </linearGradient>

        <linearGradient id="imageYellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ECC94B" />
          <stop offset="100%" stopColor="#D69E2E" />
        </linearGradient>
      </defs>

      {/* 1. Base White Sphere Panel */}
      <circle cx="50" cy="50" r="48" fill="#FBFBFD" stroke="#1A202C" strokeWidth="1.2" />

      {/* 2. Elegant soccer panels panel-lines matching the image curved structure */}
      <path d="M 15 35 C 25 40, 35 40, 50 2" fill="none" stroke="#E2E8F0" strokeWidth="1" />
      <path d="M 50 2 C 65 40, 75 40, 85 35" fill="none" stroke="#E2E8F0" strokeWidth="1" />
      <path d="M 85 35 C 80 50, 80 60, 85 65" fill="none" stroke="#E2E8F0" strokeWidth="1" />
      <path d="M 85 65 C 75 75, 60 85, 50 98" fill="none" stroke="#E2E8F0" strokeWidth="1" />
      <path d="M 50 98 C 40 85, 25 75, 15 65" fill="none" stroke="#E2E8F0" strokeWidth="1" />
      <path d="M 15 65 C 20 60, 20 50, 15 35" fill="none" stroke="#E2E8F0" strokeWidth="1" />

      {/* 3. UPPER LEFT RED FLAME LOOP RIBBON (Matches Brazil/Brazuca graphics) */}
      <g>
        {/* Soft yellow-orange glow underlay */}
        <path 
          d="M 22 25 C 27 12, 45 10, 55 20 C 59 26, 57 35, 45 42 C 34 46, 22 41, 20 31 Z" 
          fill="url(#imageYellowGrad)" 
          opacity="0.9" 
        />
        {/* Main deep red swirl ribbon */}
        <path 
          d="M 24 26 C 28 15, 43 13, 53 22 C 56 26, 54 33, 43 39 C 33 43, 23 38, 21 30 Z" 
          fill="url(#imageRedGrad)" 
          stroke="#1A202C" 
          strokeWidth="0.8" 
        />
        {/* Intricate flame-like gold and white internal stroke engravings */}
        <path d="M 28 26 C 30 18, 41 17, 47 23 C 49 26, 47 30, 38 34" fill="none" stroke="#FFA3B1" strokeWidth="0.8" />
        <path d="M 31 27 C 32 21, 38 20, 42 24 C 43 26, 41 29, 35 31" fill="none" stroke="#FFD100" strokeWidth="0.8" />
        <path d="M 34 27 C 35 24, 38 23, 40 26" fill="none" stroke="#FFFFFF" strokeWidth="0.6" strokeLinecap="round" />
      </g>

      {/* 4. UPPER RIGHT GREEN SWIPE RIBBON */}
      <g>
        {/* Yellow-gold backing border ribbon */}
        <path 
          d="M 52 20 C 56 12, 73 10, 79 24 C 82 32, 77 43, 67 47 C 56 51, 46 41, 49 31 C 49 27, 50 23, 52 20 Z" 
          fill="url(#imageYellowGrad)" 
          opacity="0.9" 
        />
        {/* Bright green core ribbon */}
        <path 
          d="M 51 22 C 54 15, 71 13, 77 25 C 79 31, 75 41, 66 45 C 55 49, 46 40, 49 31 Z" 
          fill="url(#imageGreenGrad)" 
          stroke="#1A202C" 
          strokeWidth="0.8" 
        />
        {/* Wavy/feather/leaf stroke textures matching the image */}
        <path d="M 54 23 Q 64 19 71 26 T 60 39" fill="none" stroke="#A7F3D0" strokeWidth="0.75" />
        <path d="M 56 25 Q 62 22 66 27 T 59 36" fill="none" stroke="#68D391" strokeWidth="0.7" />
        <path d="M 58 27 Q 61 25 63 28 T 59 33" fill="none" stroke="#FFFFFF" strokeWidth="0.6" strokeLinecap="round" />
      </g>

      {/* 5. BOTTOM SWEEP GREEN RIBBON */}
      <g>
        {/* Yellow edge styling */}
        <path 
          d="M 45 70 C 53 68, 67 81, 61 90 C 56 96, 43 94, 37 87 C 34 82, 37 74, 45 70 Z" 
          fill="url(#imageYellowGrad)" 
          opacity="0.8"
        />
        {/* Dynamic bright green core */}
        <path 
          d="M 45 71 C 52 69, 65 81, 60 89 C 55 94, 43 93, 38 86 C 35 81, 38 74, 45 71 Z" 
          fill="url(#imageGreenGrad)" 
          stroke="#1A202C" 
          strokeWidth="0.8" 
        />
        {/* Fine dark green wavy lines inside bottom loop */}
        <path d="M 45 74 C 50 72, 59 81, 55 86" fill="none" stroke="#1C5335" strokeWidth="0.7" />
        <path d="M 42 77 C 46 76, 53 84, 50 87" fill="none" stroke="#34D399" strokeWidth="0.7" />
      </g>

      {/* 6. BOTTOM-LEFT AQUATIC BLUE SWIRL */}
      <g>
        {/* Red accent backer border */}
        <path 
          d="M 23 48 C 33 50, 43 63, 39 76 C 36 86, 22 88, 16 76 M 16 76" 
          fill="#E53E3E" 
          opacity="0.5" 
        />
        {/* Main Blue Swath */}
        <path 
          d="M 24 50 C 32 52, 41 63, 37 74 C 34 83, 22 85, 17 74" 
          fill="url(#imageBlueGrad)" 
          stroke="#1A202C" 
          strokeWidth="0.8" 
        />
        {/* Precise internal curvy wave line textures */}
        <path d="M 26 54 C 31 56, 36 64, 33 71" fill="none" stroke="#90CDF4" strokeWidth="0.7" />
        <path d="M 27 58 C 30 60, 33 65, 31 69" fill="none" stroke="#FEB2B2" strokeWidth="0.7" />
      </g>

      {/* 7. Realistic 3D Shading Overlay Layers */}
      {/* Radial shade simulating spherical relief contour */}
      <circle cx="50" cy="50" r="48" fill="url(#ball3DLight)" pointerEvents="none" />
      {/* Specular premium white spotlight shine on top-left of the sphere */}
      <circle cx="50" cy="50" r="48" fill="url(#sphericalGloss)" pointerEvents="none" />
    </svg>
  );
};

export const EcuadorSoccerBall: React.FC<EcuadorSoccerBallProps> = () => {
  const [clickMessage, setClickMessage] = useState<{ id: number; x: number; y: number } | null>(null);
  const [hasFinishedPass, setHasFinishedPass] = useState(false);

  useEffect(() => {
    // A single, slow roll pass across page load
    // The ball starts offscreen-left (-150px) and transits slowly over 14 seconds to offscreen-right (100vw + 150px)
    // After 14.5 seconds, we clear it out so it never renders again in this session, leaving the brand elements pristine!
    const timer = setTimeout(() => {
      setHasFinishedPass(true);
    }, 14500);

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
        particleCount: 65,
        spread: 65,
        colors: ['#FFD100', '#003087', '#C8102E', '#FFFFFF'],
        origin: { 
          x: x / window.innerWidth, 
          y: y / window.innerHeight 
        },
        gravity: 0.9,
        scalar: 0.9,
        ticks: 200
      });

      // Quick delayed second golden sparks burst for extra satisfaction
      setTimeout(() => {
        confetti({
          particleCount: 35,
          spread: 85,
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

  // If the slow start-up transition is already finished, completely unmount it from the DOM
  if (hasFinishedPass) {
    return null;
  }

  return (
    <>
      {/* 
        Slow Start-up Roll Transition (Option B refined):
        Appears at bottom 25% of the viewport (safe zone for both mobile and desktop), 
        rolls from offscreen-left to offscreen-right slowly over 14 seconds with multiple rotations.
      */}
      <div className="fixed bottom-[20%] left-0 right-0 h-28 pointer-events-none z-[8000] select-none overflow-visible">
        <motion.div
          initial={{ 
            x: '-140px',
            opacity: 0.95
          }}
          animate={{ 
            x: 'calc(100vw + 140px)'
          }}
          transition={{ 
            duration: 14, 
            ease: "easeInOut" 
          }}
          className="w-16 h-16 sm:w-20 sm:h-20 pointer-events-auto"
        >
          {/* Continuous rotation to look very physical & roll-like */}
          <motion.div
            animate={{ rotate: 1080 }}
            transition={{ duration: 14, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <WorldCupSoccerBallSVG onClick={handleBallClick} />
          </motion.div>
        </motion.div>
      </div>

      {/* Celebration floating label precise coordination feedback */}
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
