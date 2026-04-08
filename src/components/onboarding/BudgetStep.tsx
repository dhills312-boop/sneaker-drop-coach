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
      <h2 className="font-syne text-3xl font-bold text-onboarding-text">
        Set your budget
      </h2>
      <p className="text-onboarding-muted text-sm">
        We'll only show deals in your range
      </p>

      <AnimationSlot label="budget-sneaker-morph" animationData={analyticsAnim} className="h-32 w-full" />

      <div className="flex flex-col gap-4 rounded-2xl bg-onboarding-surface p-6">
        <div className="flex items-center justify-between">
          <span className="font-syne text-2xl font-bold text-onboarding-text">
            ${budget[0]}
          </span>
          <span className="text-onboarding-muted">—</span>
          <span className="font-syne text-2xl font-bold text-onboarding-text">
            ${budget[1]}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-onboarding-muted mb-1 block">Min</label>
            <Slider
              value={[budget[0]]}
              min={0}
              max={budget[1] - 10}
              step={10}
              onValueChange={([val]) => onChange([val, budget[1]])}
              className="[&_[role=slider]]:bg-brand-purple [&_[role=slider]]:border-brand-purple [&_.bg-primary]:bg-brand-purple"
            />
          </div>
          <div>
            <label className="text-xs text-onboarding-muted mb-1 block">Max</label>
            <Slider
              value={[budget[1]]}
              min={budget[0] + 10}
              max={1000}
              step={10}
              onValueChange={([val]) => onChange([budget[0], val])}
              className="[&_[role=slider]]:bg-brand-purple [&_[role=slider]]:border-brand-purple [&_.bg-primary]:bg-brand-purple"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetStep;
