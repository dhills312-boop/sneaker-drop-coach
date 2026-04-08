import { TOTAL_STEPS } from '@/types/onboarding';

interface StepIndicatorProps {
  current: number;
}

const StepIndicator = ({ current }: StepIndicatorProps) => {
  // Don't show on welcome (0) or reveal (6)
  if (current === 0 || current === TOTAL_STEPS - 1) return null;

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: TOTAL_STEPS - 2 }, (_, i) => {
        const step = i + 1;
        const isActive = step === current;
        const isDone = step < current;
        return (
          <div
            key={step}
            className={`h-2 rounded-full transition-all duration-300 ${
              isActive
                ? 'w-8 bg-brand-purple'
                : isDone
                  ? 'w-2 bg-brand-purple/60'
                  : 'w-2 bg-onboarding-muted/30'
            }`}
          />
        );
      })}
    </div>
  );
};

export default StepIndicator;
