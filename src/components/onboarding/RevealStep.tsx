import { useEffect, useState } from 'react';
import AnimationSlot from './AnimationSlot';
import { LOTTIE_URLS } from './lottieUrls';

interface RevealStepProps {
  onFinish: () => void;
}

const RevealStep = ({ onFinish }: RevealStepProps) => {
  const [phase, setPhase] = useState<'loading' | 'done'>('loading');

  useEffect(() => {
    const timer = setTimeout(() => setPhase('done'), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 text-center">
      {phase === 'loading' ? (
        <>
          <AnimationSlot label="loader-feed-building" src={LOTTIE_URLS.loader} className="w-40 h-40" />
          <h2 className="font-syne text-2xl font-bold text-onboarding-text">
            Building your feed…
          </h2>
        </>
      ) : (
        <>
          <AnimationSlot label="confetti-burst" src={LOTTIE_URLS.confetti} loop={false} className="w-48 h-48" />
          <h2 className="font-syne text-3xl font-bold text-onboarding-text">
            You're all set! 🎉
          </h2>
          <p className="text-onboarding-muted max-w-sm">
            Your personalized sneaker feed is ready. Let's find your next pair.
          </p>
          <button
            onClick={onFinish}
            className="mt-4 rounded-full bg-brand-purple px-10 py-4 font-syne text-lg font-bold text-brand-purple-foreground transition-transform hover:scale-105 active:scale-95"
          >
            Enter HypeFeed
          </button>
        </>
      )}
    </div>
  );
};

export default RevealStep;
