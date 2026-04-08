import { motion, AnimatePresence } from 'framer-motion';

const BRANDS = [
  { id: 'nike',        label: 'Nike' },
  { id: 'adidas',      label: 'Adidas' },
  { id: 'new-balance', label: 'New Balance' },
  { id: 'jordan',      label: 'Jordan' },
  { id: 'yeezy',       label: 'Yeezy' },
  { id: 'asics',       label: 'ASICS' },
  { id: 'puma',        label: 'Puma' },
  { id: 'reebok',      label: 'Reebok' },
  { id: 'converse',    label: 'Converse' },
  { id: 'vans',        label: 'Vans' },
  { id: 'salomon',     label: 'Salomon' },
  { id: 'on',          label: 'On' },
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
        <h2 className="font-syne text-3xl font-bold text-onboarding-text">
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
              transition={{ delay: i * 0.04, type: 'spring', stiffness: 260, damping: 22 }}
              onClick={() => toggle(brand.id)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              className={`relative flex flex-col items-center gap-1 rounded-2xl py-5 px-2 text-sm font-semibold transition-colors ${
                active
                  ? 'bg-brand-purple text-brand-purple-foreground ring-2 ring-brand-purple ring-offset-2 ring-offset-onboarding-bg'
                  : 'bg-onboarding-surface text-onboarding-text hover:bg-onboarding-surface/80'
              }`}
            >
              <span className="text-base">{brand.label}</span>
              <AnimatePresence>
                {active && (
                  <motion.span
                    key="check"
                    initial={{ opacity: 0, scale: 0, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="absolute top-2 right-2 text-xs font-bold"
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
            <div className="rounded-xl bg-brand-purple/10 border border-brand-purple/25 px-4 py-3 text-sm text-brand-purple font-medium">
              Nice — tracking {selected.length * 50}+ drops in your sizes.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BrandStep;
