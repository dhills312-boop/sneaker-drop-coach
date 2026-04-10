import { useEffect, useRef } from 'react';

interface Point { x: number; y: number; }
interface CubicBezier { p0: Point; p1: Point; p2: Point; p3: Point; }

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  path: number;
  t: number;
  tSpeed: number;
  mode: 'drift' | 'follow';
  modeTimer: number;
  followStrength: number;
  size: number;
  baseSize: number;
  color: string;
  opacity: number;
  pulseOffset: number;
}

function sampleBezier(c: CubicBezier, t: number): Point {
  const mt = 1 - t, mt2 = mt * mt, mt3 = mt2 * mt;
  const t2 = t * t, t3 = t2 * t;
  return {
    x: mt3*c.p0.x + 3*mt2*t*c.p1.x + 3*mt*t2*c.p2.x + t3*c.p3.x,
    y: mt3*c.p0.y + 3*mt2*t*c.p1.y + 3*mt*t2*c.p2.y + t3*c.p3.y,
  };
}

const COLORS = [
  '263, 90%, 58%',
  '340, 95%, 60%',
  '263, 100%, 68%',
  '185, 90%, 55%',
  '280, 80%, 65%',
];

const PARTICLE_COUNT = 120;

function buildPaths(w: number, h: number): CubicBezier[] {
  return [
    { p0: { x: -0.05*w, y: 0.2*h }, p1: { x: 0.3*w, y: -0.1*h }, p2: { x: 0.7*w, y: 1.1*h }, p3: { x: 1.05*w, y: 0.7*h } },
    { p0: { x: 1.1*w, y: 0.3*h }, p1: { x: 0.6*w, y: 0.9*h }, p2: { x: 0.4*w, y: 0.1*h }, p3: { x: -0.1*w, y: 0.6*h } },
    { p0: { x: 0.1*w, y: -0.05*h }, p1: { x: 0.35*w, y: 0.4*h }, p2: { x: 0.65*w, y: 0.4*h }, p3: { x: 0.9*w, y: -0.05*h } },
    { p0: { x: -0.1*w, y: 0.85*h }, p1: { x: 0.25*w, y: 0.5*h }, p2: { x: 0.75*w, y: 0.5*h }, p3: { x: 1.1*w, y: 0.9*h } },
  ];
}

function randRange(min: number, max: number) { return min + Math.random() * (max - min); }

function createParticles(w: number, h: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: randRange(-0.3, 0.3),
    vy: randRange(-0.3, 0.3),
    path: i % 4,
    t: Math.random(),
    tSpeed: 0.0002 + Math.random() * 0.0005,
    mode: 'drift' as const,
    modeTimer: randRange(3, 7),
    followStrength: 0,
    baseSize: 1 + Math.random() * 2,
    size: 0,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    opacity: 0.15 + Math.random() * 0.4,
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
    let paths: CubicBezier[] = [];
    let particles: Particle[] = [];
    let time = 0;
    let w = 0, h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paths = buildPaths(w, h);
      if (particles.length === 0) particles = createParticles(w, h);
    };

    resize();
    window.addEventListener('resize', resize);

    const dt = 1 / 60;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += dt;

      for (const p of particles) {
        // Advance bezier t always
        p.t += p.tSpeed;
        if (p.t > 1) p.t -= 1;

        // Mode timer
        p.modeTimer -= dt;
        if (p.modeTimer <= 0) {
          if (p.mode === 'drift') {
            p.mode = 'follow';
            p.modeTimer = randRange(2, 4);
          } else {
            p.mode = 'drift';
            p.modeTimer = randRange(3, 6);
          }
        }

        // Ease followStrength
        const easeSpeed = 0.8 * dt;
        if (p.mode === 'follow') {
          p.followStrength = Math.min(1, p.followStrength + easeSpeed);
        } else {
          p.followStrength = Math.max(0, p.followStrength - easeSpeed);
        }

        // Drift: Brownian motion
        p.vx += randRange(-0.15, 0.15);
        p.vy += randRange(-0.15, 0.15);
        // Damping
        p.vx *= 0.97;
        p.vy *= 0.97;
        // Clamp drift velocity
        const maxV = 1.2;
        p.vx = Math.max(-maxV, Math.min(maxV, p.vx));
        p.vy = Math.max(-maxV, Math.min(maxV, p.vy));

        const driftX = p.x + p.vx;
        const driftY = p.y + p.vy;

        // Bezier target
        const target = sampleBezier(paths[p.path], p.t);

        // Lerp between drift position and bezier target
        const s = p.followStrength;
        p.x = driftX * (1 - s) + target.x * s;
        p.y = driftY * (1 - s) + target.y * s;

        // Wrap around screen edges (with margin)
        const margin = 50;
        if (p.x < -margin) p.x = w + margin;
        if (p.x > w + margin) p.x = -margin;
        if (p.y < -margin) p.y = h + margin;
        if (p.y > h + margin) p.y = -margin;

        // Pulse size
        const pulse = Math.sin(time * 2 + p.pulseOffset) * 0.3 + 1;
        p.size = p.baseSize * pulse;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.color}, ${p.opacity})`;
        ctx.shadowColor = `hsla(${p.color}, ${p.opacity * 0.6})`;
        ctx.shadowBlur = p.size * 2;
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
};

export default Particles;
