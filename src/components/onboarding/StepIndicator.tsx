import { motion } from 'framer-motion';
import { TOTAL_STEPS } from '@/types/onboarding';

interface StepIndicatorProps {
  current: number;
}

const StepIndicator = ({ current }: StepIndicatorProps) => {
  if (current === 0 || current === TOTAL_STEPS - 1) return null;

  const stepCount = TOTAL_STEPS - 2; // exclude welcome & reveal

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: stepCount }, (_, i) => {
          const step = i + 1;
          const isActive = step === current;
          const isDone = step < current;
          return (
            <motion.div
              key={step}
              animate={{
                width: isActive ? 32 : 8,
                backgroundColor: isDone
                  ? 'hsl(263 90% 58%)'
                  : isActive
                  ? 'hsl(263 90% 58%)'
                  : 'rgba(255,255,255,0.1)',
                boxShadow: isActive
                  ? '0 0 12px hsla(263, 90%, 58%, 0.5)'
                  : '0 0 0px transparent',
              }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ height: 8, borderRadius: 4 }}
            />
          );
        })}
      </div>
      <motion.p
        key={current}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[11px] text-onboarding-muted font-medium uppercase tracking-widest"
      >
        {current} of {stepCount}
      </motion.p>
    </div>
  );
};

export default StepIndicator;
