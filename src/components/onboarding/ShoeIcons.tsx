/**
 * Vector shoe icons for each vibe/shopper type.
 * Each icon takes an accent color and renders an animated SVG.
 */
import { motion } from 'framer-motion';

interface ShoeIconProps {
  color: string;
  size?: number;
}

/** Jordan 1 high-top — Hype */
export function HighTopIcon({ color, size = 56 }: ShoeIconProps) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 64 64" fill="none"
      initial={{ rotate: -8, scale: 0.9 }}
      animate={{ rotate: [-8, 0, -8], scale: [0.9, 1, 0.9] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Sole */}
      <path d="M8 48h48c2 0 3-1 3-3v-2H5v2c0 2 1 3 3 3z" fill={color} opacity={0.3} />
      {/* Midsole */}
      <path d="M5 43h54v3H5z" fill={color} opacity={0.5} />
      {/* Upper */}
      <path d="M10 43V24c0-4 3-7 7-7h20c4 0 8 3 9 7l4 12v7H10z" fill={color} opacity={0.85} />
      {/* Collar */}
      <path d="M10 24c0-4 3-7 7-7h6v10H10z" fill="white" opacity={0.2} />
      {/* Swoosh */}
      <path d="M14 36c6-4 16-6 28-3" stroke="white" strokeWidth={2.5} strokeLinecap="round" fill="none" opacity={0.7} />
      {/* Ankle */}
      <path d="M14 17h10v5c0 2-1 3-3 3h-4c-2 0-3-1-3-3z" fill={color} />
      {/* Lace area */}
      <circle cx={25} cy={22} r={1} fill="white" opacity={0.5} />
      <circle cx={25} cy={26} r={1} fill="white" opacity={0.5} />
      <circle cx={25} cy={30} r={1} fill="white" opacity={0.5} />
    </motion.svg>
  );
}

/** Classic runner — Retro */
export function RetroRunnerIcon({ color, size = 56 }: ShoeIconProps) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 64 64" fill="none"
      initial={{ x: -4 }}
      animate={{ x: [-4, 4, -4] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Outsole */}
      <path d="M6 48h52c2 0 3-1 2-3l-2-2H6v5z" fill={color} opacity={0.35} />
      {/* Midsole with wedge */}
      <path d="M6 43h52l-3-5H6z" fill="white" opacity={0.6} />
      {/* Upper */}
      <path d="M8 38h40c3 0 5-2 5-5v-5c0-3-2-6-5-7l-14-4H16c-5 0-8 4-8 8v13z" fill={color} opacity={0.8} />
      {/* Overlay stripe */}
      <path d="M12 32h32" stroke="white" strokeWidth={3} strokeLinecap="round" opacity={0.3} />
      {/* N logo shape */}
      <path d="M18 24l8 12M18 36l8-12" stroke="white" strokeWidth={2} strokeLinecap="round" opacity={0.5} />
      {/* Toe cap */}
      <ellipse cx={12} cy={36} rx={6} ry={5} fill={color} opacity={0.6} />
    </motion.svg>
  );
}

/** Sleek loafer — Luxe */
export function LuxeSlipIcon({ color, size = 56 }: ShoeIconProps) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 64 64" fill="none"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Shadow */}
      <ellipse cx={32} cy={50} rx={24} ry={3} fill={color} opacity={0.15} />
      {/* Sole */}
      <path d="M6 46h52c1 0 2-1 2-2v-1H4v1c0 1 1 2 2 2z" fill={color} opacity={0.5} />
      {/* Upper */}
      <path d="M8 43c0-8 4-14 10-17h28c6 3 10 9 10 17H8z" fill={color} opacity={0.8} />
      {/* Vamp opening */}
      <ellipse cx={32} cy={30} rx={14} ry={4} fill="black" opacity={0.25} />
      {/* Stitch detail */}
      <path d="M16 38c6-2 14-2 32 0" stroke="white" strokeWidth={1} strokeDasharray="3 2" opacity={0.35} />
      {/* Logo dot */}
      <circle cx={32} cy={36} r={2} fill="white" opacity={0.4} />
    </motion.svg>
  );
}

/** Dunk low — Grail / Low-profile */
export function DunkLowIcon({ color, size = 56 }: ShoeIconProps) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 64 64" fill="none"
      animate={{ rotate: [0, 3, 0, -3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Sole */}
      <path d="M6 48h52c2 0 3-1 3-3v-2H3v2c0 2 1 3 3 3z" fill={color} opacity={0.4} />
      {/* Midsole */}
      <rect x={3} y={42} width={58} height={3.5} rx={1} fill="white" opacity={0.7} />
      {/* Upper base */}
      <path d="M8 42V30c0-4 3-7 7-7h30c4 0 7 3 8 7l3 12H8z" fill={color} opacity={0.75} />
      {/* Toe box */}
      <path d="M8 42V34c0-3 3-5 6-5h8v13H8z" fill="white" opacity={0.25} />
      {/* Swoosh */}
      <path d="M14 38c8-5 20-6 34-2" stroke="white" strokeWidth={2.8} strokeLinecap="round" fill="none" opacity={0.65} />
      {/* Laces */}
      <path d="M22 25v10" stroke="white" strokeWidth={1.5} opacity={0.4} />
      <path d="M26 24v10" stroke="white" strokeWidth={1.5} opacity={0.4} />
    </motion.svg>
  );
}

/** Air Force 1 — Everyday / Casual */
export function AF1Icon({ color, size = 56 }: ShoeIconProps) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 64 64" fill="none"
      animate={{ scale: [1, 1.04, 1] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Thick sole */}
      <path d="M4 50h56c2 0 3-2 3-4v-2H1v2c0 2 1 4 3 4z" fill={color} opacity={0.4} />
      <rect x={1} y={42} width={62} height={4} rx={1.5} fill="white" opacity={0.75} />
      {/* Upper */}
      <path d="M6 42V30c0-4 3-8 8-8h28c5 0 9 4 10 8l4 12H6z" fill={color} opacity={0.8} />
      {/* Perforated toe */}
      {[0, 1, 2].map(row =>
        [0, 1, 2].map(col => (
          <circle
            key={`${row}-${col}`}
            cx={12 + col * 4} cy={32 + row * 3}
            r={0.8} fill="white" opacity={0.35}
          />
        ))
      )}
      {/* Swoosh */}
      <path d="M16 38c8-4 18-5 30-1" stroke="white" strokeWidth={2.5} strokeLinecap="round" fill="none" opacity={0.6} />
      {/* Ankle strap detail */}
      <rect x={38} y={23} width={8} height={6} rx={2} fill={color} opacity={0.9} />
    </motion.svg>
  );
}

/** Chunky / Foam — Collector */
export function ChunkyIcon({ color, size = 56 }: ShoeIconProps) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 64 64" fill="none"
      animate={{ y: [0, -4, 0], rotate: [0, -2, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Exaggerated sole with pods */}
      <path d="M4 52h56c2 0 3-2 2-4l-4-6H6l-4 6c-1 2 0 4 2 4z" fill={color} opacity={0.5} />
      <circle cx={14} cy={48} r={4} fill={color} opacity={0.35} />
      <circle cx={32} cy={49} r={5} fill={color} opacity={0.3} />
      <circle cx={50} cy={48} r={4} fill={color} opacity={0.35} />
      {/* Upper */}
      <path d="M8 42V28c0-5 4-10 10-10h20c6 0 11 5 12 10l4 14H8z" fill={color} opacity={0.75} />
      {/* Cuts / ports */}
      <ellipse cx={18} cy={30} rx={3} ry={5} fill="black" opacity={0.2} />
      <ellipse cx={36} cy={28} rx={4} ry={6} fill="black" opacity={0.2} />
      {/* Toe */}
      <path d="M8 42c0-6 4-10 10-10h4v10H8z" fill={color} opacity={0.9} />
    </motion.svg>
  );
}

/** Trail runner — Outdoor */
export function TrailIcon({ color, size = 56 }: ShoeIconProps) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 64 64" fill="none"
      animate={{ x: [0, 3, 0, -3, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Aggressive lug sole */}
      <path d="M6 50h52v-2l-3-2H9l-3 2v2z" fill={color} opacity={0.4} />
      {[8, 16, 24, 32, 40, 48].map(x => (
        <rect key={x} x={x} y={47} width={3} height={4} rx={0.5} fill={color} opacity={0.5} />
      ))}
      {/* Midsole with rocker */}
      <path d="M6 46c2-3 8-4 14-4h24c6 0 12 1 14 4H6z" fill={color} opacity={0.3} />
      {/* Upper */}
      <path d="M10 42V28c0-4 3-8 8-8h22c5 0 8 4 9 8l3 14H10z" fill={color} opacity={0.8} />
      {/* Overlays */}
      <path d="M14 38l12-8" stroke="white" strokeWidth={2} strokeLinecap="round" opacity={0.4} />
      <path d="M20 40l14-10" stroke="white" strokeWidth={2} strokeLinecap="round" opacity={0.3} />
      {/* Speed lace */}
      <circle cx={28} cy={24} r={1.5} fill={color} opacity={0.9} />
      <path d="M28 24v12" stroke="white" strokeWidth={1} opacity={0.35} />
      {/* Toe guard */}
      <path d="M10 42c0-4 2-6 6-6h4v6H10z" fill={color} opacity={0.95} />
    </motion.svg>
  );
}

/** Performance runner — visible air unit */
export function PerformanceIcon({ color, size = 56 }: ShoeIconProps) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 64 64" fill="none"
      animate={{ x: [-3, 5, -3] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Sole */}
      <path d="M6 50h52c2 0 3-1 2-3l-2-2H8l-2 2c-1 2 0 3 2 3z" fill={color} opacity={0.3} />
      {/* Air bubble */}
      <ellipse cx={44} cy={44} rx={8} ry={4} fill="none" stroke={color} strokeWidth={2} opacity={0.6} />
      <ellipse cx={44} cy={44} rx={5} ry={2.5} fill={color} opacity={0.15} />
      {/* Midsole */}
      <path d="M6 45h52l-2-4H8z" fill="white" opacity={0.5} />
      {/* Upper — streamlined */}
      <path d="M10 41V28c0-5 3-9 8-9h24c4 0 7 3 8 7l4 15H10z" fill={color} opacity={0.8} />
      {/* Flyknit texture lines */}
      {[24, 28, 32, 36, 40].map(x => (
        <line key={x} x1={x} y1={20} x2={x - 4} y2={40} stroke="white" strokeWidth={0.7} opacity={0.2} />
      ))}
      {/* Swoosh */}
      <path d="M14 36c8-4 20-5 32-1" stroke="white" strokeWidth={2} strokeLinecap="round" fill="none" opacity={0.6} />
      {/* Heel tab */}
      <rect x={48} y={22} width={4} height={8} rx={1.5} fill={color} />
    </motion.svg>
  );
}

/** Map a vibe id to its icon component */
export const VIBE_ICON_MAP: Record<string, React.FC<ShoeIconProps>> = {
  hype: HighTopIcon,
  retro: RetroRunnerIcon,
  performance: PerformanceIcon,
  everyday: AF1Icon,
  luxe: LuxeSlipIcon,
  outdoor: TrailIcon,
};

/** Map a shopper type to its icon component (for hypefeed-landing) */
export const SHOPPER_ICON_MAP: Record<string, React.FC<ShoeIconProps>> = {
  reseller: HighTopIcon,
  collector: ChunkyIcon,
  'hype-buyer': RetroRunnerIcon,
  casual: AF1Icon,
  'grail-hunter': DunkLowIcon,
};
