import type { Vibe } from '@/types/onboarding';
import AnimationSlot from './AnimationSlot';

const VIBES: { id: Vibe; label: string; desc: string }[] = [
  { id: 'retro', label: '🕹️ Retro', desc: 'Vintage classics & throwbacks' },
  { id: 'performance', label: '🏃 Performance', desc: 'Built for the court & track' },
  { id: 'hype', label: '🔥 Hype', desc: 'Limited drops & collabs' },
  { id: 'everyday', label: '👟 Everyday', desc: 'Clean, versatile go-tos' },
  { id: 'luxe', label: '💎 Luxe', desc: 'Premium materials & designer' },
  { id: 'outdoor', label: '🏔️ Outdoor', desc: 'Trail-ready & rugged' },
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
      <h2 className="font-syne text-3xl font-bold text-onboarding-text">
        What's your vibe?
      </h2>
      <p className="text-onboarding-muted text-sm">Select the styles that speak to you</p>
      <div className="grid grid-cols-2 gap-3">
        {VIBES.map((vibe) => {
          const active = selected.includes(vibe.id);
          return (
            <button
              key={vibe.id}
              onClick={() => toggle(vibe.id)}
              className={`flex flex-col items-start gap-2 rounded-2xl p-4 text-left transition-all ${
                active
                  ? 'bg-brand-purple/20 ring-2 ring-brand-purple text-onboarding-text'
                  : 'bg-onboarding-surface text-onboarding-text hover:bg-onboarding-surface/80'
              }`}
            >
              <AnimationSlot
                label={`vibe-${vibe.id}-loop`}
                className="h-16 w-full !p-2 !border-onboarding-muted/20"
              />
              <span className="font-syne font-bold text-base">{vibe.label}</span>
              <span className="text-xs text-onboarding-muted">{vibe.desc}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VibeStep;
