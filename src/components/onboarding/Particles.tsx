import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface CubicBezier {
  p0: Point;
  p1: Point;
  p2: Point;
  p3: Point;
}

interface Particle {
  path: number;
  t: number;
  speed: number;
  size: number;
  baseSize: number;
  color: string;
  opacity: number;
  pulseOffset: number;
}

// Sample a cubic bezier at parameter t
function sampleBezier(curve: CubicBezier, t: number): Point {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;
  return {
    x: mt3 * curve.p0.x + 3 * mt2 * t * curve.p1.x + 3 * mt * t2 * curve.p2.x + t3 * curve.p3.x,
    y: mt3 * curve.p0.y + 3 * mt2 * t * curve.p1.y + 3 * mt * t2 * curve.p2.y + t3 * curve.p3.y,
  };
}

const COLORS = [
  '263, 90%, 58%',
  '340, 95%, 60%',
  '263, 100%, 68%',
  '185, 90%, 55%',
  '280, 80%, 65%',
];

const PARTICLE_COUNT = 70;

// Define paths as ratios of viewport (0-1)
function buildPaths(w: number, h: number): CubicBezier[] {
  return [
    // Sweeping S-curve top-left to bottom-right
    { p0: { x: -0.05 * w, y: 0.2 * h }, p1: { x: 0.3 * w, y: -0.1 * h }, p2: { x: 0.7 * w, y: 1.1 * h }, p3: { x: 1.05 * w, y: 0.7 * h } },
    // Reverse S from right to left, lower
    { p0: { x: 1.1 * w, y: 0.3 * h }, p1: { x: 0.6 * w, y: 0.9 * h }, p2: { x: 0.4 * w, y: 0.1 * h }, p3: { x: -0.1 * w, y: 0.6 * h } },
    // Arc across top
    { p0: { x: 0.1 * w, y: -0.05 * h }, p1: { x: 0.35 * w, y: 0.4 * h }, p2: { x: 0.65 * w, y: 0.4 * h }, p3: { x: 0.9 * w, y: -0.05 * h } },
    // Low sweep
    { p0: { x: -0.1 * w, y: 0.85 * h }, p1: { x: 0.25 * w, y: 0.5 * h }, p2: { x: 0.75 * w, y: 0.5 * h }, p3: { x: 1.1 * w, y: 0.9 * h } },
  ];
}

function createParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    path: i % 4,
    t: Math.random(),
    speed: 0.0003 + Math.random() * 0.0008,
    baseSize: 1 + Math.random() * 2.5,
    size: 0,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    opacity: 0.15 + Math.random() * 0.45,
    pulseOffset: Math.random() * Math.PI * 2,
  }));
}

const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles = createParticles();
    let paths: CubicBezier[] = [];
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paths = buildPaths(window.innerWidth, window.innerHeight);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      // Trail effect: semi-transparent overlay instead of full clear
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      time += 0.016;

      for (const p of particles) {
        p.t += p.speed;
        if (p.t > 1) p.t -= 1;

        const pos = sampleBezier(paths[p.path], p.t);
        const pulse = Math.sin(time * 2 + p.pulseOffset) * 0.4 + 1;
        p.size = p.baseSize * pulse;

        // Fade at endpoints
        const edgeFade = Math.min(p.t * 5, (1 - p.t) * 5, 1);
        const alpha = p.opacity * edgeFade;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.color}, ${alpha})`;
        ctx.shadowColor = `hsla(${p.color}, ${alpha * 0.8})`;
        ctx.shadowBlur = p.size * 4;
        ctx.fill();
      }

      // Reset shadow for next frame's overlay
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
};

export default Particles;
