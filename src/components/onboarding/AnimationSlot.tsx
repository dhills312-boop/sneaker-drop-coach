interface AnimationSlotProps {
  label: string;
  className?: string;
}

const AnimationSlot = ({ label, className = '' }: AnimationSlotProps) => (
  <div
    className={`flex items-center justify-center rounded-2xl border-2 border-dashed border-onboarding-muted/40 bg-onboarding-surface/50 p-8 ${className}`}
  >
    <span className="text-xs font-mono text-onboarding-muted select-none">
      🎬 {label}
    </span>
  </div>
);

export default AnimationSlot;
