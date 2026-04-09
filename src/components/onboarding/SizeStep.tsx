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
        <h2 className="font-syne text-3xl font-extrabold gradient-text-purple">
          What's your size?
        </h2>
        <p className="text-onboarding-muted text-sm mt-2">Select all that apply (US)</p>
      </motion.div>

      <div className="grid grid-cols-5 gap-2.5">
        {SIZES.map((size, i) => {
          const active = selected.includes(size);
          return (
            <motion.button
              key={size}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.025, type: 'spring', stiffness: 300, damping: 22 }}
              onClick={() => toggle(size)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.85 }}
              className={`rounded-xl py-3 text-sm font-bold transition-all duration-200 ${
                active
                  ? 'glass-card-active text-onboarding-text glow-purple-sm'
                  : 'glass-card text-onboarding-muted hover:text-onboarding-text'
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
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="glass-card rounded-xl px-4 py-3 text-sm font-medium">
              <span className="gradient-text-purple font-bold">{selected.length}</span>
              <span className="text-onboarding-muted ml-1.5">
                size{selected.length !== 1 ? 's' : ''} selected — we'll track all of them
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SizeStep;
