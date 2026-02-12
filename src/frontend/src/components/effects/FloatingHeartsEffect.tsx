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
}

interface FloatingHeartsEffectProps {
  count?: number;
  speed?: number;
}

export default function FloatingHeartsEffect({ count = 20, speed = 1 }: FloatingHeartsEffectProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heartsRef = useRef<HeartParticle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Create initial hearts
    heartsRef.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + Math.random() * 100,
      size: 20 + Math.random() * 30,
      speedY: (1 + Math.random() * 2) * speed,
      speedX: (Math.random() - 0.5) * 2 * speed,
      opacity: 0.3 + Math.random() * 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 4
    }));

    const animate = () => {
      heartsRef.current = heartsRef.current
        .map(heart => ({
          ...heart,
          y: heart.y - heart.speedY,
          x: heart.x + heart.speedX,
          rotation: heart.rotation + heart.rotationSpeed,
          opacity: heart.opacity - 0.003
        }))
        .filter(heart => heart.opacity > 0 && heart.y > -100);

      // Add new hearts occasionally
      if (Math.random() < 0.05 && heartsRef.current.length < count) {
        heartsRef.current.push({
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: window.innerHeight + 50,
          size: 20 + Math.random() * 30,
          speedY: (1 + Math.random() * 2) * speed,
          speedX: (Math.random() - 0.5) * 2 * speed,
          opacity: 0.3 + Math.random() * 0.4,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 4
        });
      }

      if (containerRef.current) {
        containerRef.current.innerHTML = heartsRef.current
          .map(heart => `
            <div style="
              position: absolute;
              left: ${heart.x}px;
              top: ${heart.y}px;
              width: ${heart.size}px;
              height: ${heart.size}px;
              opacity: ${heart.opacity};
              transform: rotate(${heart.rotation}deg);
              pointer-events: none;
              color: rgb(244 63 94);
              fill: rgb(244 63 94);
            ">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </div>
          `)
          .join('');
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [count, speed]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
    />
  );
}
