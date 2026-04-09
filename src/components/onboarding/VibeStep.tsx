import { motion } from 'framer-motion';
import type { Vibe } from '@/types/onboarding';
import { VIBE_ICON_MAP } from './ShoeIcons';

const VIBES: { id: Vibe; label: string; desc: string; accent: string; gradient: string }[] = [
  { id: 'hype',        label: '🔥 Hype',        desc: 'Limited drops & collabs',        accent: '#F87171', gradient: 'from-red-500/20 to-orange-500/10' },
  { id: 'retro',       label: '🕹️ Retro',       desc: 'Vintage classics & throwbacks',  accent: '#FBBF24', gradient: 'from-amber-500/20 to-yellow-500/10' },
  { id: 'performance', label: '🏃 Performance',  desc: 'Built for the court & track',    accent: '#34D399', gradient: 'from-emerald-500/20 to-green-500/10' },
  { id: 'everyday',    label: '👟 Everyday',     desc: 'Clean, versatile go-tos',        accent: '#60A5FA', gradient: 'from-blue-500/20 to-sky-500/10' },
  { id: 'luxe',        label: '💎 Luxe',         desc: 'Premium materials & designer',   accent: '#A78BFA', gradient: 'from-violet-500/20 to-purple-500/10' },
  { id: 'outdoor',     label: '🏔️ Outdoor',     desc: 'Trail-ready & rugged',           accent: '#6EE7B7', gradient: 'from-teal-500/20 to-emerald-500/10' },
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
        <h2 className="font-syne text-3xl font-extrabold gradient-text-purple">
          What's your vibe?
        </h2>
        <p className="text-onboarding-muted text-sm mt-2">Select the styles that speak to you</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {VIBES.map((vibe, i) => {
          const active = selected.includes(vibe.id);
          const Icon = VIBE_ICON_MAP[vibe.id];
          return (
            <motion.button
              key={vibe.id}
              initial={{ opacity: 0, y: 14, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 240, damping: 22 }}
              onClick={() => toggle(vibe.id)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex flex-col items-center gap-2 rounded-2xl p-4 transition-all duration-200 overflow-hidden ${
                active
                  ? `bg-gradient-to-br ${vibe.gradient} text-onboarding-text`
                  : 'glass-card text-onboarding-text hover:bg-onboarding-surface-hover'
              }`}
              style={{
                borderColor: active ? vibe.accent + '66' : 'hsl(260 20% 22% / 0.5)',
                borderWidth: active ? 1.5 : 1,
                borderStyle: 'solid',
                boxShadow: active ? `0 0 20px ${vibe.accent}22, inset 0 1px 0 ${vibe.accent}15` : 'none',
              }}
            >
              <div className="w-full h-14 flex items-center justify-center">
                {Icon && <Icon color={active ? vibe.accent : 'rgba(255,255,255,0.35)'} size={52} />}
              </div>

              <span className="font-syne font-bold text-base">{vibe.label}</span>
              <span className="text-xs text-onboarding-muted">{vibe.desc}</span>

              {active && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
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
