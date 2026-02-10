import { useEffect, useRef } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

export default function SparklesEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    // Create sparkles
    const sparkleCount = 30;
    sparklesRef.current = Array.from({ length: sparkleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      opacity: 0,
      duration: 2000 + Math.random() * 2000,
      delay: Math.random() * 3000
    }));

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;

      if (containerRef.current) {
        containerRef.current.innerHTML = sparklesRef.current
          .map(sparkle => {
            const progress = ((elapsed - sparkle.delay) % sparkle.duration) / sparkle.duration;
            const opacity = progress < 0 ? 0 : Math.sin(progress * Math.PI) * 0.6;
            
            return `
              <div style="
                position: absolute;
                left: ${sparkle.x}%;
                top: ${sparkle.y}%;
                width: ${sparkle.size}px;
                height: ${sparkle.size}px;
                opacity: ${opacity};
                pointer-events: none;
                background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,192,203,0.8) 50%, transparent 100%);
                border-radius: 50%;
                box-shadow: 0 0 ${sparkle.size * 2}px rgba(255,192,203,0.5);
              "></div>
            `;
          })
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
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-40"
      aria-hidden="true"
    />
  );
}
