import AnimationSlot from './AnimationSlot';

const SIZES = [
  '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5',
  '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5',
  '12', '13', '14', '15',
];

interface SizeStepProps {
  selected: string[];
  onChange: (sizes: string[]) => void;
}

const SizeStep = ({ selected, onChange }: SizeStepProps) => {
  const toggle = (size: string) => {
    onChange(
      selected.includes(size)
        ? selected.filter((s) => s !== size)
        : [...selected, size]
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <AnimationSlot label="sneaker-morpher" className="h-32 w-full" />
      <h2 className="font-syne text-3xl font-bold text-onboarding-text">
        What's your size?
      </h2>
      <p className="text-onboarding-muted text-sm">Select all that apply (US)</p>
      <div className="grid grid-cols-5 gap-2">
        {SIZES.map((size) => {
          const active = selected.includes(size);
          return (
            <button
              key={size}
              onClick={() => toggle(size)}
              className={`rounded-xl py-3 text-sm font-semibold transition-all ${
                active
                  ? 'bg-brand-purple text-brand-purple-foreground scale-105'
                  : 'bg-onboarding-surface text-onboarding-text hover:bg-onboarding-surface/80'
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeStep;
