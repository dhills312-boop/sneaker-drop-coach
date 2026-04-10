

## Refined Particle Dynamics — Float, Then Follow

### Problems with Current Implementation
1. **Visible paths**: All particles sit exactly on the bezier curves, making the paths obvious
2. **No floating behavior**: Particles lock to paths immediately — no organic drift
3. **Trails make paths more visible**: The semi-transparent clear (`rgba(0,0,0,0.06)`) leaves visible streaks along the curves
4. **Not enough particles**: 70 feels sparse for a premium ambient effect

### New Behavior Model

Each particle has two modes that cycle on intervals:

- **Drift mode** (default): Particle floats randomly with gentle Brownian motion — small velocity with slight wandering. Looks like ambient dust/stars.
- **Follow mode** (triggered on a timer): Particle begins lerping toward its assigned bezier path position. It doesn't snap — it eases toward the path over ~2-3 seconds, then holds briefly before releasing back to drift.

Each particle has its own independent timer offset so they don't all snap to paths simultaneously.

### Technical Changes — Single File

**`src/components/onboarding/Particles.tsx`** — full rewrite

**Particle state** gains new fields:
- `x, y` — actual screen position (starts random)
- `vx, vy` — drift velocity (small random values, with gentle noise steering)
- `mode` — `'drift'` or `'follow'`
- `modeTimer` — countdown until next mode switch
- `followStrength` — 0→1 easing when entering follow mode, 1→0 when leaving
- `t` — progress along assigned bezier (advances slowly always)

**Per-frame logic**:
1. Update `modeTimer`; when it hits zero, toggle mode and reset timer (drift: 3-6s, follow: 2-4s)
2. Compute bezier target position from `t`
3. In drift mode: apply random walk to `vx/vy`, update `x/y`, ease `followStrength` toward 0
4. In follow mode: ease `followStrength` toward 1, lerp `x/y` toward bezier target
5. Always: `actualPos = lerp(driftPos, bezierPos, followStrength)`

**Rendering changes**:
- **Full clear each frame** (no trails) — `clearRect` instead of semi-transparent overlay
- **More particles**: bump to ~120
- **Smaller glow**: reduce `shadowBlur` to `size * 2` so dots feel like floating dust, not streaking lights
- Keep size pulsing and edge fade

This creates particles that appear to float randomly, then periodically and organically coalesce along invisible curves before dispersing again.

