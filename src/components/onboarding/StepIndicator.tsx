import { motion } from 'framer-motion';
import { TOTAL_STEPS } from '@/types/onboarding';

interface StepIndicatorProps {
  current: number;
}

const StepIndicator = ({ current }: StepIndicatorProps) => {
  if (current === 0 || current === TOTAL_STEPS - 1) return null;

  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: TOTAL_STEPS - 2 }, (_, i) => {
        const step = i + 1;
        const isActive = step === current;
        const isDone = step < current;
        return (
          <motion.div
            key={step}
            animate={{
              width: isActive ? 28 : 7,
              backgroundColor: isDone
                ? 'rgba(124,58,237,0.55)'
                : isActive
                ? '#7C3AED'
                : 'rgba(255,255,255,0.15)',
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ height: 7, borderRadius: 4 }}
          />
        );
      })}
    </div>
  );
};

export default StepIndicator;
