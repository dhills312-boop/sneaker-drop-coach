/**
 * Vector shoe icons traced from 43374.jpg reference via potrace.
 * Each icon renders a traced SVG path with accent color overlay and Motion animation.
 */
import { motion } from "framer-motion";
import { SHOE_PATHS } from "./shoe-paths";

interface ShoeIconProps {
  color: string;
  size?: number;
}

/** Shared traced-icon wrapper: renders the potrace path with color + animation */
function TracedShoe({
  path,
  color,
  size = 56,
  animProps,
}: ShoeIconProps & {
  path: string;
  animProps: Record<string, unknown>;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 120 100"
      fill="none"
      {...animProps}
    >
      {/* Shadow under shoe */}
      <ellipse cx={60} cy={96} rx={40} ry={4} fill={color} opacity={0.12} />
      {/* Main traced shape */}
      <path d={path} fill={color} fillRule="evenodd" opacity={0.85} />
      {/* Highlight overlay for depth */}
      <path
        d={path}
        fill="url(#shoeHighlight)"
        fillRule="evenodd"
        opacity={0.25}
      />
      <defs>
        <linearGradient
          id="shoeHighlight"
          x1="0"
          y1="0"
          x2="120"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="white" stopOpacity={0.6} />
          <stop offset="100%" stopColor="white" stopOpacity={0} />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

/** Chunky runner — Collector / Foam */
export function ChunkyIcon(props: ShoeIconProps) {
  return (
    <TracedShoe
      {...props}
      path={SHOE_PATHS.CHUNKY_RUNNER}
      animProps={{
        animate: { y: [0, -4, 0], rotate: [0, -2, 0] },
        transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
      }}
    />
  );
}

/** High-top — Hype / Reseller */
export function HighTopIcon(props: ShoeIconProps) {
  return (
    <TracedShoe
      {...props}
      path={SHOE_PATHS.HIGH_TOP}
      animProps={{
        initial: { rotate: -8, scale: 0.9 },
        animate: { rotate: [-8, 0, -8], scale: [0.9, 1, 0.9] },
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      }}
    />
  );
}

/** Wavy runner — Performance */
export function WavyRunnerIcon(props: ShoeIconProps) {
  return (
    <TracedShoe
      {...props}
      path={SHOE_PATHS.WAVY_RUNNER}
      animProps={{
        animate: { x: [-3, 5, -3] },
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      }}
    />
  );
}

/** Retro low — Retro / Hype-buyer */
export function RetroLowIcon(props: ShoeIconProps) {
  return (
    <TracedShoe
      {...props}
      path={SHOE_PATHS.RETRO_LOW}
      animProps={{
        initial: { x: -4 },
        animate: { x: [-4, 4, -4] },
        transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
      }}
    />
  );
}

/** Swoosh low (AF1 / Dunk) — Everyday / Casual */
export function SwooshLowIcon(props: ShoeIconProps) {
  return (
    <TracedShoe
      {...props}
      path={SHOE_PATHS.SWOOSH_LOW}
      animProps={{
        animate: { scale: [1, 1.04, 1] },
        transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
      }}
    />
  );
}

/** Sleek racer — Luxe */
export function SleekRacerIcon(props: ShoeIconProps) {
  return (
    <TracedShoe
      {...props}
      path={SHOE_PATHS.SLEEK_RACER}
      animProps={{
        animate: { y: [0, -3, 0] },
        transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
      }}
    />
  );
}

/** Classic low — Grail / Low-profile */
export function ClassicLowIcon(props: ShoeIconProps) {
  return (
    <TracedShoe
      {...props}
      path={SHOE_PATHS.CLASSIC_LOW}
      animProps={{
        animate: { rotate: [0, 3, 0, -3, 0] },
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      }}
    />
  );
}

/** Trail runner — Outdoor */
export function TrailIcon(props: ShoeIconProps) {
  return (
    <TracedShoe
      {...props}
      path={SHOE_PATHS.TRAIL}
      animProps={{
        animate: { x: [0, 3, 0, -3, 0] },
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      }}
    />
  );
}

/** Three-stripe (Superstar-style) — Classic */
export function ThreeStripeIcon(props: ShoeIconProps) {
  return (
    <TracedShoe
      {...props}
      path={SHOE_PATHS.THREE_STRIPE}
      animProps={{
        animate: { y: [0, -2, 0], x: [-2, 2, -2] },
        transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
      }}
    />
  );
}

/** Map a vibe id to its icon component */
export const VIBE_ICON_MAP: Record<string, React.FC<ShoeIconProps>> = {
  hype: HighTopIcon,
  retro: RetroLowIcon,
  performance: WavyRunnerIcon,
  everyday: SwooshLowIcon,
  luxe: SleekRacerIcon,
  outdoor: TrailIcon,
};

/** Map a shopper type to its icon component (for hypefeed-landing) */
export const SHOPPER_ICON_MAP: Record<string, React.FC<ShoeIconProps>> = {
  reseller: HighTopIcon,
  collector: ChunkyIcon,
  "hype-buyer": RetroLowIcon,
  casual: SwooshLowIcon,
  "grail-hunter": ClassicLowIcon,
};
