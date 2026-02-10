import { useEffect, useRef } from 'react';

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle';
  size: number;
}

export default function ConfettiEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<ConfettiParticle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const particleCount = 100;
    const colors = [
      'rgb(244, 63, 94)',
      'rgb(251, 113, 133)',
      'rgb(236, 72, 153)',
      'rgb(249, 168, 212)',
      'rgb(252, 165, 165)',
      'rgb(254, 205, 211)',
      'rgb(255, 228, 230)',
    ];
    const shapes: Array<'circle' | 'square' | 'triangle'> = ['circle', 'square', 'triangle'];

    particlesRef.current = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -20,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      size: 8 + Math.random() * 8
    }));

    const animate = () => {
      particlesRef.current = particlesRef.current.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        vy: particle.vy + 0.1, // gravity
        rotation: particle.rotation + particle.rotationSpeed
      }));

      if (containerRef.current) {
        containerRef.current.innerHTML = particlesRef.current
          .filter(p => p.y < window.innerHeight + 50)
          .map(particle => {
            let shapeHtml = '';
            if (particle.shape === 'circle') {
              shapeHtml = `<div style="width: 100%; height: 100%; border-radius: 50%; background: ${particle.color};"></div>`;
            } else if (particle.shape === 'square') {
              shapeHtml = `<div style="width: 100%; height: 100%; background: ${particle.color};"></div>`;
            } else {
              shapeHtml = `<div style="width: 0; height: 0; border-left: ${particle.size/2}px solid transparent; border-right: ${particle.size/2}px solid transparent; border-bottom: ${particle.size}px solid ${particle.color};"></div>`;
            }
            
            return `
              <div style="
                position: absolute;
                left: ${particle.x}px;
                top: ${particle.y}px;
                width: ${particle.size}px;
                height: ${particle.size}px;
                transform: translate(-50%, -50%) rotate(${particle.rotation}deg);
                pointer-events: none;
              ">
                ${shapeHtml}
              </div>
            `;
          })
          .join('');
      }

      if (particlesRef.current.some(p => p.y < window.innerHeight + 50)) {
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
