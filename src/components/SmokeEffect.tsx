import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export const SmokeEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  const createParticle = useCallback((x: number, y: number): Particle => ({
    x,
    y,
    vx: (Math.random() - 0.5) * 0.3,
    vy: -Math.random() * 0.5 - 0.2,
    radius: Math.random() * 100 + 50,
    opacity: Math.random() * 0.03 + 0.01,
    life: 0,
    maxLife: Math.random() * 300 + 200,
  }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    for (let i = 0; i < 30; i++) {
      particlesRef.current.push(createParticle(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      ));
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      // Add particles at mouse position occasionally
      if (Math.random() > 0.7) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY));
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let frameCount = 0;
    const animate = () => {
      frameCount++;
      // Render every 2nd frame for performance
      if (frameCount % 2 === 0) {
        ctx.fillStyle = 'rgba(1, 1, 1, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particlesRef.current = particlesRef.current.filter(p => {
          p.life++;
          if (p.life > p.maxLife) return false;

          // Mouse interaction - gentle repulsion
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const force = (200 - dist) / 200 * 0.02;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }

          p.x += p.vx;
          p.y += p.vy;
          p.radius += 0.1;

          const lifeRatio = p.life / p.maxLife;
          const currentOpacity = p.opacity * (1 - lifeRatio);

          // Draw smoke puff with multiple circles for depth
          for (let i = 0; i < 3; i++) {
            const gradient = ctx.createRadialGradient(
              p.x + Math.random() * 10,
              p.y + Math.random() * 10,
              0,
              p.x,
              p.y,
              p.radius * (1 + i * 0.3)
            );
            gradient.addColorStop(0, `rgba(40, 35, 30, ${currentOpacity * (1 - i * 0.3)})`);
            gradient.addColorStop(0.5, `rgba(30, 25, 22, ${currentOpacity * 0.5 * (1 - i * 0.3)})`);
            gradient.addColorStop(1, 'rgba(1, 1, 1, 0)');

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * (1 + i * 0.3), 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
          }

          return true;
        });

        // Add new particles occasionally
        if (particlesRef.current.length < 40 && Math.random() > 0.95) {
          particlesRef.current.push(createParticle(
            Math.random() * canvas.width,
            canvas.height + 50
          ));
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[99] pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default SmokeEffect;
