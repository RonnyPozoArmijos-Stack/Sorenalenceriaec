import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { Product } from '../types';
import { Eye, RotateCcw, Box, Sparkles, Sliders } from 'lucide-react';

interface ThreeProductBoxProps {
  product: Product;
  isDark?: boolean;
  onAddToCart?: () => void;
  height?: number;
}

export const ThreeProductBox: React.FC<ThreeProductBoxProps> = ({ 
  product, 
  isDark = true,
  onAddToCart,
  height = 360
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeSide, setActiveSide] = useState<'FRONT' | 'BACK' | 'SIDE'>('FRONT');
  const [opening, setOpening] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const boxGroupRef = useRef<THREE.Group | null>(null);
  const boxLidRef = useRef<THREE.Mesh | null>(null);
  const baseMeshRef = useRef<THREE.Mesh | null>(null);
  const ribbonMeshRef = useRef<THREE.Mesh | null>(null);
  
  // Custom textures to update once images load
  const frontTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const backTextureRef = useRef<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // CAMERA
    const width = containerRef.current.clientWidth;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(isDark ? 0x222222 : 0xefefef, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0xd4a5a5, 1.2); // Warm rose-gold
    fillLight.position.set(-5, -2, 2);
    scene.add(fillLight);

    // Spotlight for premium reflections
    const spotLight = new THREE.SpotLight(0xffffff, 4, 15, Math.PI / 4, 0.5, 1);
    spotLight.position.set(0, 4, 4);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // CREATE DYNAMIC LABELS VIA DYNAMIC CANVAS
    const canvasWidth = 512;
    const canvasHeight = 680;

    const frontCanvas = document.createElement('canvas');
    frontCanvas.width = canvasWidth;
    frontCanvas.height = canvasHeight;
    const frontCtx = frontCanvas.getContext('2d')!;

    const backCanvas = document.createElement('canvas');
    backCanvas.width = canvasWidth;
    backCanvas.height = canvasHeight;
    const backCtx = backCanvas.getContext('2d')!;

    // Initial labels drawing
    const drawPlaceholder = () => {
      // FRONT TEMPLATE
      frontCtx.fillStyle = isDark ? '#1C1C1E' : '#FAF8F5';
      frontCtx.fillRect(0, 0, canvasWidth, canvasHeight);
      
      // Luxury borders
      frontCtx.strokeStyle = '#D4A5A5';
      frontCtx.lineWidth = 14;
      frontCtx.strokeRect(10, 10, canvasWidth - 20, canvasHeight - 20);
      
      frontCtx.lineWidth = 2;
      frontCtx.strokeRect(22, 22, canvasWidth - 44, canvasHeight - 44);

      // Branding
      frontCtx.fillStyle = '#D4A5A5';
      frontCtx.font = 'bold 32px Georgia';
      frontCtx.textAlign = 'center';
      frontCtx.fillText('S O R E N A', canvasWidth / 2, 75);
      
      frontCtx.font = 'italic 11px sans-serif';
      frontCtx.fillStyle = isDark ? '#A9A9A9' : '#555555';
      frontCtx.fillText('EDICIÓN BOUTIQUE EXCLUSIVA', canvasWidth / 2, 100);

      // Shimmer loading card
      frontCtx.fillStyle = isDark ? '#121214' : '#F4ECE8';
      frontCtx.fillRect(40, 120, canvasWidth - 80, 360);

      frontCtx.fillStyle = '#D4A5A5';
      frontCtx.font = 'italic 14px Georgia';
      frontCtx.fillText('Decorando empaque...', canvasWidth / 2, 300);

      // Gold satin ribbon strip on texture
      frontCtx.fillStyle = 'rgba(212, 165, 165, 0.9)';
      frontCtx.fillRect(0, canvasHeight - 140, canvasWidth, 36);
      frontCtx.fillStyle = '#B58585';
      frontCtx.fillRect(0, canvasHeight - 140, canvasWidth, 3);
      frontCtx.fillRect(0, canvasHeight - 107, canvasWidth, 3);

      // Name of product
      frontCtx.fillStyle = isDark ? '#FAF8F5' : '#2D2A28';
      frontCtx.font = 'italic bold 28px Georgia';
      frontCtx.fillText(product.title.toUpperCase(), canvasWidth / 2, canvasHeight - 150);

      // Footer
      frontCtx.fillStyle = '#B58585';
      frontCtx.font = '9px sans-serif';
      frontCtx.fillText('LENCERÍA FINA • CONFECCIÓN PREFERENTE', canvasWidth / 2, canvasHeight - 75);

      if (frontTextureRef.current) frontTextureRef.current.needsUpdate = true;

      // BACK TEMPLATE
      backCtx.fillStyle = isDark ? '#1C1C1E' : '#FAF8F5';
      backCtx.fillRect(0, 0, canvasWidth, canvasHeight);
      
      backCtx.strokeStyle = '#D4A5A5';
      backCtx.lineWidth = 14;
      backCtx.strokeRect(10, 10, canvasWidth - 20, canvasHeight - 20);

      backCtx.fillStyle = '#D4A5A5';
      backCtx.font = 'bold 24px Georgia';
      backCtx.fillText('S O R E N A', canvasWidth / 2, 80);

      backCtx.strokeStyle = '#D4A5A5';
      backCtx.lineWidth = 2;
      backCtx.strokeRect(canvasWidth / 2 - 80, 105, 160, 32);
      backCtx.font = 'bold 10px sans-serif';
      backCtx.fillText('BOUTIQUE SELECTION', canvasWidth / 2, 125);

      // Product Details text
      backCtx.fillStyle = isDark ? '#FAF8F5' : '#2D2A28';
      backCtx.font = '13px sans-serif';
      backCtx.textAlign = 'left';

      const startY = 180;
      backCtx.fillText(`ARTÍCULO: Conjunto Íntimo Femenino`, 50, startY);
      backCtx.fillText(`MODELO: Colección ${product.title}`, 50, startY + 30);
      backCtx.fillText(`FABRICANTE: Sorena Lencería Inc.`, 50, startY + 60);
      backCtx.fillText(`TALLA CERTIFICADA: ${product.availableSizes?.join(', ') || 'Única'}`, 50, startY + 90);
      backCtx.fillText(`PRECIO: $${product.price.toFixed(2)} USD`, 50, startY + 120);
      backCtx.fillText(`CÓDIGO DE BARRAS: SR-${product.title.toUpperCase().slice(0, 3)}-${product.id}`, 50, startY + 150);

      backCtx.font = 'italic 11px sans-serif';
      backCtx.fillText(`Materiales: 90% Encaje de Poliamida, 10% Lycra`, 50, startY + 200);
      backCtx.fillText(`Instrucciones: Lavar a mano, secar a la sombra.`, 50, startY + 220);

      // Barcode
      const barcodeY = canvasHeight - 160;
      backCtx.fillStyle = isDark ? '#FAF8F5' : '#121214';
      
      const barcodeX = 50;
      let currentX = barcodeX;
      
      for (let i = 0; i < 50; i++) {
        const barW = (i % 5 === 0) ? 5 : (i % 3 === 0) ? 2 : 1;
        const spacing = (i % 4 === 0) ? 3 : 2;
        backCtx.fillRect(currentX, barcodeY, barW, 55);
        currentX += barW + spacing;
        if (currentX > canvasWidth - 50) break;
      }

      backCtx.font = '10px Courier New';
      backCtx.textAlign = 'center';
      backCtx.fillText(`(593) 177833 - ${product.id} ${product.title.toUpperCase().slice(0, 3)}`, canvasWidth / 2, barcodeY + 75);

      backCtx.fillStyle = '#B58585';
      backCtx.font = 'bold 9px sans-serif';
      backCtx.fillText('HECHO CON AMOR EN ECUADOR', canvasWidth / 2, canvasHeight - 50);

      if (backTextureRef.current) backTextureRef.current.needsUpdate = true;
    };

    drawPlaceholder();

    // Create textures
    const frontTexture = new THREE.CanvasTexture(frontCanvas);
    const backTexture = new THREE.CanvasTexture(backCanvas);
    frontTextureRef.current = frontTexture;
    backTextureRef.current = backTexture;

    // Load actual product image onto the Canvas
    const imgObj = new Image();
    imgObj.crossOrigin = "Anonymous";
    imgObj.src = product.img;
    imgObj.onload = () => {
      setImageLoaded(true);
      // Redraw front canvas with loaded image
      frontCtx.fillStyle = isDark ? '#1C1C1E' : '#FAF8F5';
      frontCtx.fillRect(0, 0, canvasWidth, canvasHeight);
      
      // Border Gold Outline
      frontCtx.strokeStyle = '#D4A5A5';
      frontCtx.lineWidth = 14;
      frontCtx.strokeRect(10, 10, canvasWidth - 20, canvasHeight - 20);
      
      frontCtx.lineWidth = 2;
      frontCtx.strokeRect(22, 22, canvasWidth - 44, canvasHeight - 44);

      // Branding
      frontCtx.fillStyle = '#D4A5A5';
      frontCtx.font = 'bold 32px Georgia';
      frontCtx.textAlign = 'center';
      frontCtx.fillText('S O R E N A', canvasWidth / 2, 75);
      
      frontCtx.font = 'italic 11px sans-serif';
      frontCtx.fillStyle = isDark ? '#A9A9A9' : '#555555';
      frontCtx.fillText('EDICIÓN BOUTIQUE EXCLUSIVA', canvasWidth / 2, 100);

      // Draw loaded image!
      const imgX = 42;
      const imgY = 120;
      const imgW = canvasWidth - 84;
      const imgH = 340;
      
      try {
        // Draw image clipped inside a luxury rounded card
        frontCtx.save();
        frontCtx.beginPath();
        frontCtx.roundRect(imgX, imgY, imgW, imgH, [4]);
        frontCtx.clip();
        frontCtx.drawImage(imgObj, imgX, imgY, imgW, imgH);
        
        // Highlight layer to give a physical photo contrast
        frontCtx.strokeStyle = 'rgba(255,255,255,0.15)';
        frontCtx.lineWidth = 2;
        frontCtx.strokeRect(imgX, imgY, imgW, imgH);
        
        frontCtx.restore();
      } catch (err) {
        console.error("Texture loading failed: ", err);
      }

      // Elegant Ribbon printed on the bottom
      frontCtx.fillStyle = 'rgba(212, 165, 165, 0.95)';
      frontCtx.fillRect(0, canvasHeight - 150, canvasWidth, 38);
      
      frontCtx.fillStyle = '#B58585';
      frontCtx.fillRect(0, canvasHeight - 150, canvasWidth, 3);
      frontCtx.fillRect(0, canvasHeight - 112, canvasWidth, 3);

      // Name of product
      frontCtx.fillStyle = isDark ? '#FAF8F5' : '#2D2A28';
      frontCtx.font = 'italic bold 28px Georgia';
      frontCtx.fillText(product.title.toUpperCase(), canvasWidth / 2, canvasHeight - 165);

      // Subtitle
      frontCtx.fillStyle = '#B58585';
      frontCtx.font = '9px sans-serif';
      frontCtx.fillText('EMPAQUE DE BOUTIQUE • FINO ARTE ANALÓGICO', canvasWidth / 2, canvasHeight - 80);

      frontTexture.needsUpdate = true;
    };

    // 3D MODEL ASSEMBLY (Boutique Box & Lid)
    const boxGroup = new THREE.Group();
    boxGroupRef.current = boxGroup;
    scene.add(boxGroup);

    // Box Dimensions
    const sizeX = 2.4;
    const sizeY = 3.2;
    const sizeZ = 0.55;

    // Materials of the main Box Lid and Base
    // Left, Right, Top, Bottom, Front, Back
    const boxSidesMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x121214 : 0xede4df,
      roughness: 0.5,
      metalness: 0.1,
      bumpScale: 0.05
    });

    const goldTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4a5a5,
      roughness: 0.2,
      metalness: 0.8
    });

    const frontCoverMaterial = new THREE.MeshStandardMaterial({
      map: frontTexture,
      roughness: 0.3,
      metalness: 0.05
    });

    const backCoverMaterial = new THREE.MeshStandardMaterial({
      map: backTexture,
      roughness: 0.4,
      metalness: 0.05
    });

    const lidMaterials = [
      boxSidesMaterial, // Left
      boxSidesMaterial, // Right
      boxSidesMaterial, // Top
      boxSidesMaterial, // Bottom
      frontCoverMaterial, // Front
      backCoverMaterial  // Back
    ];

    // Create Lid (the elegant cover that can be slid with GSAP)
    const lidGeometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);
    const boxLid = new THREE.Mesh(lidGeometry, lidMaterials);
    boxLid.castShadow = true;
    boxLid.receiveShadow = true;
    boxLidRef.current = boxLid;
    boxGroup.add(boxLid);

    // Create Base of box (inner velvet compartment)
    const baseGeometry = new THREE.BoxGeometry(sizeX - 0.04, sizeY - 0.04, sizeZ - 0.06);
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x221315, // deep wine red/velvet
      roughness: 0.8,
      metalness: 0.1
    });
    const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
    baseMesh.position.z = -0.05;
    baseMeshRef.current = baseMesh;
    boxGroup.add(baseMesh);

    // Gorgeous metallic bow / golden ribbon node on top
    const ribbonGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.05, 16);
    const ribbonSeal = new THREE.Mesh(ribbonGeometry, goldTrimMaterial);
    ribbonSeal.position.set(0, -sizeY / 2 + 0.9, sizeZ / 2 + 0.03);
    ribbonSeal.rotation.x = Math.PI / 2;
    boxLid.add(ribbonSeal);

    // Initial position & gentle resting rotation
    boxGroup.rotation.y = 0;
    boxGroup.rotation.x = 0;

    // INTERACTION AND DRAGGING PHYSICS
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let dragVelocityX = 0.005;
    let dragVelocityY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !boxGroup) return;

      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      boxGroup.rotation.y += deltaX * 0.01;
      boxGroup.rotation.x += deltaY * 0.01;

      // Bound X rotation to prevent complete flip upside down
      boxGroup.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, boxGroup.rotation.x));

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;

      // Calculate simple velocity
      dragVelocityX = deltaX * 0.005;
      dragVelocityY = deltaY * 0.005;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    // Touch interaction for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !boxGroup || e.touches.length !== 1) return;

      const deltaX = e.touches[0].clientX - previousMouseX;
      const deltaY = e.touches[0].clientY - previousMouseY;

      boxGroup.rotation.y += deltaX * 0.01;
      boxGroup.rotation.x += deltaY * 0.01;

      boxGroup.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, boxGroup.rotation.x));

      previousMouseX = e.touches[0].clientX;
      previousMouseY = e.touches[0].clientY;

      dragVelocityX = deltaX * 0.005;
      dragVelocityY = deltaY * 0.005;
    };

    const canvasElement = canvasRef.current;
    canvasElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvasElement.addEventListener('touchstart', handleTouchStart);
    canvasElement.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    // INTERACTION DETECTION
    const checkActiveSide = () => {
      if (!boxGroup) return;
      const angle = boxGroup.rotation.y % (Math.PI * 2);
      const absAngle = Math.abs(angle);
      
      if (absAngle < Math.PI / 4 || absAngle > 1.75 * Math.PI) {
        setActiveSide('FRONT');
      } else if (absAngle > 0.75 * Math.PI && absAngle < 1.25 * Math.PI) {
        setActiveSide('BACK');
      } else {
        setActiveSide('SIDE');
      }
    };

    // ANIMATION LOOP
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (boxGroup) {
        // Continuous soft spin when not interacting
        if (!isDragging) {
          boxGroup.rotation.y += dragVelocityX;
          boxGroup.rotation.x += dragVelocityY;

          // Apply friction
          dragVelocityX *= 0.95;
          dragVelocityY *= 0.95;

          // Standard slow resting rotation
          if (Math.abs(dragVelocityX) < 0.001) {
            boxGroup.rotation.y += 0.004;
          }
        }
        
        checkActiveSide();
      }

      renderer.render(scene, camera);
    };
    
    animate();

    // RESIZE LISTENER
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, height);
    };
    window.addEventListener('resize', handleResize);

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      
      canvasElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvasElement.removeEventListener('touchstart', handleTouchStart);
      canvasElement.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);

      // Memory dispose
      lidGeometry.dispose();
      baseGeometry.dispose();
      ribbonGeometry.dispose();
      boxSidesMaterial.dispose();
      goldTrimMaterial.dispose();
      frontCoverMaterial.dispose();
      backCoverMaterial.dispose();
      baseMaterial.dispose();
      frontTexture.dispose();
      backTexture.dispose();
      renderer.dispose();
    };
  }, [product, isDark, height]);

  // ANIMATE SHOWCASE INTERACTIONS VIA GSAP
  const resetRotation = () => {
    if (!boxGroupRef.current) return;
    gsap.to(boxGroupRef.current.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1.2,
      ease: 'power3.out'
    });
  };

  const showFront = () => {
    if (!boxGroupRef.current) return;
    gsap.to(boxGroupRef.current.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1,
      ease: 'power2.out'
    });
  };

  const showBack = () => {
    if (!boxGroupRef.current) return;
    gsap.to(boxGroupRef.current.rotation, {
      x: 0,
      y: Math.PI,
      z: 0,
      duration: 1,
      ease: 'power2.out'
    });
  };

  const toggleOpenBox = () => {
    if (!boxLidRef.current) return;
    
    if (!opening) {
      // Slide open Lid
      gsap.to(boxLidRef.current.position, {
        x: -1.5,
        y: 0.8,
        z: 0.5,
        duration: 1,
        ease: 'power2.out'
      });
      // Angle the Lid nicely
      gsap.to(boxLidRef.current.rotation, {
        z: 0.45,
        y: -0.2,
        duration: 1,
        ease: 'power2.out'
      });
      setOpening(true);
    } else {
      // Return Lid
      gsap.to(boxLidRef.current.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: 'power2.out'
      });
      gsap.to(boxLidRef.current.rotation, {
        z: 0,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      });
      setOpening(false);
    }
  };

  return (
    <div className="flex flex-col relative w-full h-full select-none" ref={containerRef}>
      {/* 3D WebGL Canvas */}
      <div 
        className="w-full relative overflow-hidden rounded-xl border border-gray-100 dark:border-white/5 bg-gradient-to-tr from-ivory-light to-champagne-dust dark:from-luxury-gray/30 dark:to-rich-black/20"
        style={{ height: `${height}px` }}
      >
        <canvas 
          ref={canvasRef} 
          className="w-full h-full block cursor-grab active:cursor-grabbing outline-none"
        />

        {/* 3D Feature Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1">
            <Sparkles className="w-3 h-3 text-rose-gold animate-pulse" />
            <span className="text-[8px] font-bold tracking-widest text-[#EADA7A] uppercase">Render 3D WebGL</span>
          </div>
          {product.tag && (
            <span className="text-[8px] font-bold tracking-wider px-3 py-1 rounded-full bg-rose-gold/90 text-white uppercase self-start shadow-md">
              {product.tag}
            </span>
          )}
        </div>

        {/* Interactive Indicator on Canvas */}
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 text-[8px] tracking-[0.2em] font-mono text-white/70 px-3 py-1.5 rounded-sm flex items-center gap-1.5 pointer-events-none">
          <Sliders className="w-2.5 h-2.5" />
          ARRASTRA PARA ROTAR CAJA 360°
        </div>

        {/* Dynamic Scan Tag Indicator */}
        <div className="absolute top-4 right-4 bg-rose-gold/80 hover:bg-rose-gold/90 border border-white/10 text-white font-bold text-[8px] tracking-widest px-3 py-1.5 rounded-sm cursor-pointer transition-all uppercase flex items-center gap-1.5" onClick={showBack}>
          <Box className="w-3 h-3" /> VER CÓDIGO BARRAS
        </div>
      </div>

      {/* Control Actions beneath the interactive 3D box */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 px-2">
        <div className="flex items-center gap-2">
          <button
            onClick={showFront}
            className={`px-3 py-2 rounded-full text-[9px] font-bold font-mono tracking-wider border transition-all ${
              activeSide === 'FRONT'
                ? 'bg-rose-gold text-white border-rose-gold shadow-md'
                : 'text-gray-400 border-gray-200 dark:border-white/10 hover:border-rose-gold'
            }`}
          >
            FRENTE
          </button>
          <button
            onClick={showBack}
            className={`px-3 py-2 rounded-full text-[9px] font-bold font-mono tracking-wider border transition-all ${
              activeSide === 'BACK'
                ? 'bg-rose-gold text-white border-rose-gold shadow-md'
                : 'text-gray-400 border-gray-200 dark:border-white/10 hover:border-rose-gold'
            }`}
          >
            REVERSO LÁBEL
          </button>
          
          <button
            onClick={resetRotation}
            title="Resetear ángulo"
            className="p-2 rounded-full border border-gray-200 dark:border-white/10 text-gray-400 hover:text-rose-gold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Open packaging simulation block */}
          <button
            onClick={toggleOpenBox}
            className={`flex items-center gap-2 px-4 py-2 border rounded-full text-[9px] font-bold uppercase tracking-wider transition-all ${
              opening
                ? 'bg-warm-charcoal dark:bg-soft-white text-white dark:text-black border-transparent shadow'
                : 'border-rose-gold/40 text-rose-gold hover:bg-rose-gold hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            {opening ? 'Cerrar Empaque' : 'Abrir Empaque 3D'}
          </button>

          {onAddToCart && product.inStock && (
            <button
              onClick={onAddToCart}
              className="bg-rose-gold hover:bg-rose-gold-dark text-white text-[9px] font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all"
            >
              Comprar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThreeProductBox;
