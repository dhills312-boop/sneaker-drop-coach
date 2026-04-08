import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface AnimationSlotProps {
  label: string;
  className?: string;
  src?: string;
  loop?: boolean;
  autoplay?: boolean;
}

const AnimationSlot = ({ label, className = '', src, loop = true, autoplay = true }: AnimationSlotProps) => {
  if (src) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <DotLottieReact
          src={src}
          loop={loop}
          autoplay={autoplay}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-2xl border-2 border-dashed border-onboarding-muted/40 bg-onboarding-surface/50 p-8 ${className}`}
    >
      <span className="text-xs font-mono text-onboarding-muted select-none">
        🎬 {label}
      </span>
    </div>
  );
};

export default AnimationSlot;
