import { motion, AnimatePresence } from 'framer-motion';

const BRANDS = [
  { id: 'nike',        label: 'Nike',        emoji: '✓' },
  { id: 'adidas',      label: 'Adidas',      emoji: '✓' },
  { id: 'new-balance', label: 'New Balance',  emoji: '✓' },
  { id: 'jordan',      label: 'Jordan',      emoji: '✓' },
  { id: 'yeezy',       label: 'Yeezy',       emoji: '✓' },
  { id: 'asics',       label: 'ASICS',       emoji: '✓' },
  { id: 'puma',        label: 'Puma',        emoji: '✓' },
  { id: 'reebok',      label: 'Reebok',      emoji: '✓' },
  { id: 'converse',    label: 'Converse',    emoji: '✓' },
  { id: 'vans',        label: 'Vans',        emoji: '✓' },
  { id: 'salomon',     label: 'Salomon',     emoji: '✓' },
  { id: 'on',          label: 'On',          emoji: '✓' },
];

interface BrandStepProps {
  selected: string[];
  onChange: (brands: string[]) => void;
}

const BrandStep = ({ selected, onChange }: BrandStepProps) => {
  const toggle = (id: string) => {
    onChange(
      selected.includes(id)
        ? selected.filter((b) => b !== id)
        : [...selected, id]
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
          Pick your brands
        </h2>
        <p className="text-onboarding-muted text-sm mt-2">Tap all the brands you're into</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-3">
        {BRANDS.map((brand, i) => {
          const active = selected.includes(brand.id);
          return (
            <motion.button
              key={brand.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.035, type: 'spring', stiffness: 260, damping: 22 }}
              onClick={() => toggle(brand.id)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              className={`relative flex flex-col items-center gap-1.5 rounded-2xl py-5 px-2 font-semibold transition-all duration-200 ${
                active
                  ? 'glass-card-active text-onboarding-text glow-purple-sm'
                  : 'glass-card text-onboarding-muted hover:text-onboarding-text'
              }`}
            >
              <span className="text-base">{brand.label}</span>
              <AnimatePresence>
                {active && (
                  <motion.span
                    key="check"
                    initial={{ opacity: 0, scale: 0, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-brand-purple-foreground"
                    style={{ background: 'linear-gradient(135deg, hsl(263 90% 58%), hsl(340 95% 60%))' }}
                  >
                    ✓
                  </motion.span>
                )}
              </AnimatePresence>
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
            <div className="glass-card rounded-xl px-4 py-3 text-sm font-medium">
              <span className="text-onboarding-muted">
                Nice — tracking <span className="gradient-text-purple font-bold">{selected.length * 50}+</span> drops in your sizes
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BrandStep;
