import { motion, AnimatePresence } from 'framer-motion';

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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="font-syne text-3xl font-bold text-onboarding-text">
          What's your size?
        </h2>
        <p className="text-onboarding-muted text-sm mt-2">Select all that apply (US)</p>
      </motion.div>

      <div className="grid grid-cols-5 gap-2">
        {SIZES.map((size, i) => {
          const active = selected.includes(size);
          return (
            <motion.button
              key={size}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03, type: 'spring', stiffness: 280, damping: 22 }}
              onClick={() => toggle(size)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.88 }}
              className={`rounded-xl py-3 text-sm font-semibold transition-colors ${
                active
                  ? 'bg-brand-purple text-brand-purple-foreground'
                  : 'bg-onboarding-surface text-onboarding-text hover:bg-onboarding-surface/80'
              }`}
            >
              {size}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="rounded-xl bg-brand-purple/10 border border-brand-purple/25 px-4 py-3 text-sm text-brand-purple font-medium">
              {selected.length} size{selected.length !== 1 ? 's' : ''} selected — we'll track all of them.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SizeStep;
