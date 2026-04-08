import Lottie from 'lottie-react';

interface AnimationSlotProps {
  label: string;
  className?: string;
  animationData?: unknown;
  loop?: boolean;
}

const AnimationSlot = ({ label, className = '', animationData, loop = true }: AnimationSlotProps) => {
  if (animationData) {
    return (
      <div className={className}>
        <Lottie animationData={animationData} loop={loop} autoplay className="w-full h-full" />
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
