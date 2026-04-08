import { motion } from 'framer-motion';
import type { Vibe } from '@/types/onboarding';

// Shoe silhouette grid — 3×3 crop from 43374.jpg
// Icons (0-8, L→R, T→B): 0=runner, 1=high-top, 2=loafer, 3=low-profile, 4=AF1, 5=foam runner, 6=runner2, 7=maxed runner, 8=classic3stripe
const shoeIconsImg = new URL('../../assets/images/43374.jpg', import.meta.url).href;

function shoeIconStyle(iconIdx: number): React.CSSProperties {
  const col = iconIdx % 3;
  const row = Math.floor(iconIdx / 3);
  return {
    backgroundImage: `url(${shoeIconsImg})`,
    backgroundSize: '300% 300%',
    backgroundPosition: `${col * 50}% ${row * 50}%`,
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
  };
}

const VIBES: { id: Vibe; label: string; desc: string; shoeIcon: number; accent: string }[] = [
  { id: 'hype',        label: '🔥 Hype',        desc: 'Limited drops & collabs',        shoeIcon: 1, accent: '#F87171' },
  { id: 'retro',       label: '🕹️ Retro',       desc: 'Vintage classics & throwbacks',  shoeIcon: 0, accent: '#FBBF24' },
  { id: 'performance', label: '🏃 Performance',  desc: 'Built for the court & track',    shoeIcon: 7, accent: '#34D399' },
  { id: 'everyday',    label: '👟 Everyday',     desc: 'Clean, versatile go-tos',        shoeIcon: 4, accent: '#60A5FA' },
  { id: 'luxe',        label: '💎 Luxe',         desc: 'Premium materials & designer',   shoeIcon: 2, accent: '#A78BFA' },
  { id: 'outdoor',     label: '🏔️ Outdoor',     desc: 'Trail-ready & rugged',           shoeIcon: 6, accent: '#6EE7B7' },
];

interface VibeStepProps {
  selected: Vibe[];
  onChange: (vibes: Vibe[]) => void;
}

const VibeStep = ({ selected, onChange }: VibeStepProps) => {
  const toggle = (vibe: Vibe) => {
    onChange(
      selected.includes(vibe)
        ? selected.filter((v) => v !== vibe)
        : [...selected, vibe]
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="font-syne text-3xl font-bold text-onboarding-text">
          What's your vibe?
        </h2>
        <p className="text-onboarding-muted text-sm mt-2">Select the styles that speak to you</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {VIBES.map((vibe, i) => {
          const active = selected.includes(vibe.id);
          return (
            <motion.button
              key={vibe.id}
              initial={{ opacity: 0, y: 12, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 240, damping: 22 }}
              onClick={() => toggle(vibe.id)}
              whileHover={{ scale: 1.04, borderColor: vibe.accent + '80' }}
              whileTap={{ scale: 0.95 }}
              style={{
                borderColor: active ? vibe.accent + 'aa' : 'rgba(255,255,255,0.08)',
                borderWidth: active ? 2 : 1,
                borderStyle: 'solid',
              }}
              className={`flex flex-col items-start gap-2 rounded-2xl p-4 text-left transition-colors ${
                active
                  ? 'bg-brand-purple/15 text-onboarding-text'
                  : 'bg-onboarding-surface text-onboarding-text hover:bg-onboarding-surface/80'
              }`}
            >
              {/* Shoe silhouette icon */}
              <motion.div
                animate={{ scale: active ? 1.08 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-full h-14 rounded-lg overflow-hidden"
                style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
              >
                <div style={shoeIconStyle(vibe.shoeIcon)} />
              </motion.div>

              <span className="font-syne font-bold text-base">{vibe.label}</span>
              <span className="text-xs text-onboarding-muted">{vibe.desc}</span>

              {active && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: vibe.accent, color: '#fff' }}
                >
                  ✓
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default VibeStep;
