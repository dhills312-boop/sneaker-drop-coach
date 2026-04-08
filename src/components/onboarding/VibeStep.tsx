import type { Vibe } from '@/types/onboarding';
import AnimationSlot from './AnimationSlot';
import { LOTTIE_URLS } from './lottieUrls';

const VIBES: { id: Vibe; label: string; desc: string; lottie: string }[] = [
  { id: 'retro', label: '🕹️ Retro', desc: 'Vintage classics & throwbacks', lottie: LOTTIE_URLS.vibeRetro },
  { id: 'performance', label: '🏃 Performance', desc: 'Built for the court & track', lottie: LOTTIE_URLS.vibePerformance },
  { id: 'hype', label: '🔥 Hype', desc: 'Limited drops & collabs', lottie: LOTTIE_URLS.vibeHype },
  { id: 'everyday', label: '👟 Everyday', desc: 'Clean, versatile go-tos', lottie: LOTTIE_URLS.vibeEveryday },
  { id: 'luxe', label: '💎 Luxe', desc: 'Premium materials & designer', lottie: LOTTIE_URLS.vibeLuxe },
  { id: 'outdoor', label: '🏔️ Outdoor', desc: 'Trail-ready & rugged', lottie: LOTTIE_URLS.vibeOutdoor },
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
                src={vibe.lottie}
                className="h-16 w-full"
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
