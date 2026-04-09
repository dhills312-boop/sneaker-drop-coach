import { motion } from 'framer-motion';
import AnimationSlot from './AnimationSlot';
import { Slider } from '@/components/ui/slider';
import analyticsAnim from '@/assets/lottie/Business_Analytics.json';

interface BudgetStepProps {
  budget: [number, number];
  onChange: (budget: [number, number]) => void;
}

const BudgetStep = ({ budget, onChange }: BudgetStepProps) => {
  return (
    <div className="flex flex-col gap-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="font-syne text-3xl font-extrabold gradient-text-purple">
          Set your budget
        </h2>
        <p className="text-onboarding-muted text-sm mt-2">
          We'll only show deals in your range
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.35 }}
      >
        <AnimationSlot label="budget-sneaker-morph" animationData={analyticsAnim} className="h-32 w-full" />
      </motion.div>

      <div className="flex flex-col gap-5 glass-card card-elevated rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <span className="font-syne text-3xl font-extrabold gradient-text-purple">
            ${budget[0]}
          </span>
          <span className="text-onboarding-muted/40 text-lg">—</span>
          <span className="font-syne text-3xl font-extrabold gradient-text-purple">
            ${budget[1]}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-onboarding-muted mb-1.5 block uppercase tracking-wider font-semibold">Min</label>
            <Slider
              value={[budget[0]]}
              min={0}
              max={budget[1] - 10}
              step={10}
              onValueChange={([val]) => onChange([val, budget[1]])}
              className="[&_[role=slider]]:bg-brand-purple [&_[role=slider]]:border-brand-purple [&_[role=slider]]:shadow-[0_0_10px_hsl(263_90%_58%/0.4)] [&_.bg-primary]:bg-brand-purple"
            />
          </div>
          <div>
            <label className="text-xs text-onboarding-muted mb-1.5 block uppercase tracking-wider font-semibold">Max</label>
            <Slider
              value={[budget[1]]}
              min={budget[0] + 10}
              max={1000}
              step={10}
              onValueChange={([val]) => onChange([budget[0], val])}
              className="[&_[role=slider]]:bg-brand-purple [&_[role=slider]]:border-brand-purple [&_[role=slider]]:shadow-[0_0_10px_hsl(263_90%_58%/0.4)] [&_.bg-primary]:bg-brand-purple"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetStep;
