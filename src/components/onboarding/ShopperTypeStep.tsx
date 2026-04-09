import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ShopperType } from '@/types/onboarding';
import { inferShopperType } from '@/types/onboarding';
import { SHOPPER_ICON_MAP } from './ShoeIcons';

const SHOPPER_TYPES: {
  id: ShopperType;
  label: string;
  sublabel: string;
  accent: string;
}[] = [
  { id: 'reseller',     label: 'The Reseller',    sublabel: 'Buy low. Sell high. Stay strapped.', accent: '#F59E0B' },
  { id: 'collector',    label: 'The Collector',    sublabel: 'Every pair has a story.',             accent: '#60A5FA' },
  { id: 'hype-buyer',   label: 'The Hype Buyer',   sublabel: 'First in line. Always.',             accent: '#F87171' },
  { id: 'casual',       label: 'The Daily Wearer',  sublabel: 'Comfort over clout.',               accent: '#34D399' },
  { id: 'grail-hunter', label: 'The Grail Hunter',  sublabel: 'Chasing unicorns.',                 accent: '#A78BFA' },
];

interface ShopperTypeStepProps {
  brands: string[];
  onSelect: (type: ShopperType) => void;
}

const ShopperTypeStep = ({ brands, onSelect }: ShopperTypeStepProps) => {
  const suggested = inferShopperType(brands);
  const [hovered, setHovered] = useState<ShopperType | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="font-syne text-3xl font-extrabold gradient-text-purple">
          What kind of sneakerhead are you?
        </h2>
        <p className="text-onboarding-muted text-sm mt-2">
          Pick the one that fits. No wrong answers.
        </p>
      </motion.div>

      <div className="flex flex-col gap-2.5">
        {SHOPPER_TYPES.map((t, i) => {
          const isSuggested = t.id === suggested;
          const isHov = hovered === t.id;
          const Icon = SHOPPER_ICON_MAP[t.id];

          return (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, type: 'spring', stiffness: 240, damping: 22 }}
              onClick={() => onSelect(t.id)}
              onHoverStart={() => setHovered(t.id)}
              onHoverEnd={() => setHovered(null)}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-3 rounded-2xl p-4 transition-all duration-200 card-elevated text-left ${
                isHov ? 'glass-card-active' : 'glass-card'
              }`}
              style={{
                borderColor: isSuggested
                  ? t.accent + '80'
                  : isHov
                  ? 'rgba(124,58,237,0.35)'
                  : 'hsl(260 20% 22% / 0.5)',
                borderWidth: 1,
                borderStyle: 'solid',
              }}
            >
              <div className="w-11 h-11 shrink-0 flex items-center justify-center">
                {Icon && (
                  <Icon
                    color={isHov || isSuggested ? t.accent : 'rgba(255,255,255,0.35)'}
                    size={40}
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-syne font-bold text-sm text-onboarding-text">
                    {t.label}
                  </span>
                  {isSuggested && (
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{
                        background: t.accent + '25',
                        color: t.accent,
                      }}
                    >
                      AI PICK
                    </span>
                  )}
                </div>
                <p className="text-xs text-onboarding-muted mt-0.5">{t.sublabel}</p>
              </div>
              <motion.span
                animate={{ opacity: isHov ? 1 : 0, x: isHov ? 0 : 4 }}
                className="text-sm shrink-0"
                style={{ color: t.accent }}
              >
                →
              </motion.span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ShopperTypeStep;
