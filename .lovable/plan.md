

## Particles Following Vector Paths — PlayStation Style

The current particles float randomly with simple oscillations. The PS5-style effect has particles flowing along curved vector paths — like streams of light tracing invisible curves across the screen, creating a sense of directed motion and energy.

### Approach

Replace the random-drift Framer Motion animations with an **SVG-based approach using `<canvas>` or CSS `offset-path`**. Given browser support and performance, we'll use **Canvas 2D** for smooth, high-particle-count rendering:

1. **Replace `Particles.tsx`** with a Canvas-based component using `requestAnimationFrame`
2. **Define 3-4 bezier curve paths** (flowing S-curves, arcs) that span the viewport — similar to the PS5 ribbon/flow aesthetic
3. **Distribute ~60-80 particles** across these paths, each at a random progress offset
4. **Each particle** travels along its assigned curve at varying speeds, with:
   - Subtle size pulsing and opacity fade based on position
   - Glow effect via `shadowBlur`
   - Trail effect by not fully clearing the canvas each frame (slight alpha fade)
5. **Color palette** stays the same brand purples/pinks/cyans
6. Particles loop seamlessly when they reach the end of their path

### Technical Details

- **File changed**: `src/components/onboarding/Particles.tsx` — full rewrite
- **No new dependencies** — pure Canvas 2D API
- **Cubic bezier curves** defined as control point arrays, sampled using `t` parameter
- **Trail effect**: Clear canvas with `rgba(0,0,0,0.05)` overlay each frame instead of full clear
- **Performance**: `requestAnimationFrame` loop with cleanup on unmount

