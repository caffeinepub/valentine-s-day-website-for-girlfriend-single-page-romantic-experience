import { useEffect, useRef } from 'react';

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  element: HTMLDivElement;
}

interface FloatingHeartsEffectProps {
  count?: number;
  speed?: number;
  mode?: 'ambient' | 'burst';
  origin?: { x: number; y: number } | null;
}

export default function FloatingHeartsEffect({ 
  count = 20, 
  speed = 1, 
  mode = 'ambient',
  origin = null
}: FloatingHeartsEffectProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heartsRef = useRef<HeartParticle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!containerRef.current) return;

    const isBurstMode = mode === 'burst';
    const particleCount = isBurstMode ? 50 : count;
    const particleSpeed = isBurstMode ? 2.5 : speed;

    // Create heart element
    const createHeartElement = (heart: Omit<HeartParticle, 'element'>): HeartParticle => {
      const div = document.createElement('div');
      div.className = 'heart-particle';
      div.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        </svg>
      `;
      containerRef.current?.appendChild(div);
      return { ...heart, element: div };
    };

    // Initialize hearts
    heartsRef.current = Array.from({ length: particleCount }, (_, i) => {
      let x, y, speedY, speedX;

      if (isBurstMode && origin) {
        // Burst from button position
        const angle = (Math.random() * 120 - 60) * (Math.PI / 180); // -60 to +60 degrees (upward cone)
        const velocity = 3 + Math.random() * 4;
        x = origin.x;
        y = origin.y;
        speedX = Math.sin(angle) * velocity * particleSpeed;
        speedY = Math.cos(angle) * velocity * particleSpeed + 2; // Extra upward bias
      } else {
        // Ambient mode - start from bottom
        x = Math.random() * window.innerWidth;
        y = window.innerHeight + Math.random() * 100;
        speedY = (1 + Math.random() * 2) * particleSpeed;
        speedX = (Math.random() - 0.5) * 2 * particleSpeed;
      }

      return createHeartElement({
        id: i,
        x,
        y,
        size: isBurstMode ? 15 + Math.random() * 25 : 20 + Math.random() * 30,
        speedY,
        speedX,
        opacity: isBurstMode ? 0.7 + Math.random() * 0.3 : 0.3 + Math.random() * 0.4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4
      });
    });

    const animate = () => {
      heartsRef.current = heartsRef.current
        .map(heart => {
          const newHeart = {
            ...heart,
            y: heart.y - heart.speedY,
            x: heart.x + heart.speedX,
            rotation: heart.rotation + heart.rotationSpeed,
            opacity: heart.opacity - (isBurstMode ? 0.006 : 0.003)
          };

          // Update DOM element with GPU-accelerated transforms
          heart.element.style.cssText = `
            position: absolute;
            left: 0;
            top: 0;
            width: ${heart.size}px;
            height: ${heart.size}px;
            opacity: ${newHeart.opacity};
            pointer-events: none;
            color: rgb(244 63 94);
            fill: rgb(244 63 94);
            will-change: transform;
            transform: translate3d(${newHeart.x}px, ${newHeart.y}px, 0) rotate(${newHeart.rotation}deg);
          `;

          return newHeart;
        })
        .filter(heart => {
          if (heart.opacity <= 0 || heart.y < -100) {
            // Remove from DOM
            heart.element.remove();
            return false;
          }
          return true;
        });

      // Add new hearts in ambient mode
      if (!isBurstMode && Math.random() < 0.05 && heartsRef.current.length < count) {
        heartsRef.current.push(createHeartElement({
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: window.innerHeight + 50,
          size: 20 + Math.random() * 30,
          speedY: (1 + Math.random() * 2) * particleSpeed,
          speedX: (Math.random() - 0.5) * 2 * particleSpeed,
          opacity: 0.3 + Math.random() * 0.4,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 4
        }));
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Clean up all heart elements
      heartsRef.current.forEach(heart => heart.element.remove());
      heartsRef.current = [];
    };
  }, [count, speed, mode, origin]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
    />
  );
}
