import { useEffect, useRef } from 'react';

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

export default function HeartExplosionEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HeartParticle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Create explosion particles
    const particleCount = 50;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const colors = [
      'rgb(244, 63, 94)',   // rose-500
      'rgb(251, 113, 133)', // rose-400
      'rgb(236, 72, 153)',  // pink-500
      'rgb(249, 168, 212)', // pink-300
      'rgb(252, 165, 165)', // red-300
    ];

    particlesRef.current = Array.from({ length: particleCount }, (_, i) => {
      const angle = (i / particleCount) * Math.PI * 2;
      const velocity = 5 + Math.random() * 10;
      
      return {
        id: i,
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: 20 + Math.random() * 30,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    });

    const animate = () => {
      particlesRef.current = particlesRef.current.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        vy: particle.vy + 0.5, // gravity
        rotation: particle.rotation + particle.rotationSpeed,
        opacity: Math.max(0, particle.opacity - 0.015)
      }));

      if (containerRef.current) {
        containerRef.current.innerHTML = particlesRef.current
          .filter(p => p.opacity > 0)
          .map(particle => `
            <div style="
              position: absolute;
              left: ${particle.x}px;
              top: ${particle.y}px;
              width: ${particle.size}px;
              height: ${particle.size}px;
              opacity: ${particle.opacity};
              transform: translate(-50%, -50%) rotate(${particle.rotation}deg);
              pointer-events: none;
              color: ${particle.color};
              fill: ${particle.color};
            ">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </div>
          `)
          .join('');
      }

      if (particlesRef.current.some(p => p.opacity > 0)) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
    />
  );
}
