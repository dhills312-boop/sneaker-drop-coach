import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import gradientSweepData from '@/assets/lottie/gradient-sweep.json';
import { SHOPPER_TYPE_LABELS, type ShopperType } from '@/types/onboarding';

interface GradientSweepStepProps {
  brands: string[];
  sizes: string[];
  shopperType: ShopperType;
  onNext: () => void;
}

const GradientSweepStep = ({ brands, sizes, shopperType, onNext }: GradientSweepStepProps) => {
  const stats = [
    { label: 'BRANDS TRACKED', value: brands.length, isNum: true },
    { label: 'SIZES MONITORED', value: sizes.length, isNum: true },
    { label: 'DROPS/MONTH', value: `${(brands.length * 50).toLocaleString()}+`, isNum: false },
    { label: 'YOUR TYPE', value: SHOPPER_TYPE_LABELS[shopperType] ?? 'DAILY WEARER', isNum: false },
  ];

  return (
    <div className="relative rounded-2xl overflow-hidden min-h-[380px]">
      {/* Gradient Sweep Lottie as full background */}
      <div className="absolute inset-0 z-0">
        <Lottie
          animationData={gradientSweepData}
          loop
          autoplay
          className="w-full h-full object-cover opacity-70"
        />
      </div>

      {/* Content layer */}
      <div className="relative z-10 p-6 flex flex-col gap-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-syne text-3xl font-black leading-tight tracking-tight text-white"
        >
          YOUR FEED IS
          <br />
          <span className="text-purple-300">BUILDING.</span>
        </motion.h2>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 260, damping: 20 }}
              className="rounded-xl p-4 backdrop-blur-[12px]"
              style={{
                background: 'rgba(0,0,0,0.45)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div className="text-[10px] font-bold text-white/40 tracking-widest mb-1.5">
                {s.label}
              </div>
              <div
                className={`font-black text-white leading-none ${
                  s.isNum ? 'text-3xl' : 'text-base'
                }`}
              >
                {s.value}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={onNext}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          whileHover={{ scale: 1.03, boxShadow: '0 0 28px rgba(196,181,253,0.5)' }}
          whileTap={{ scale: 0.95 }}
          className="w-full rounded-xl py-3.5 font-bold text-white text-sm tracking-wide backdrop-blur-[8px]"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.9), rgba(79,70,229,0.9))',
            border: '1px solid rgba(196,181,253,0.3)',
          }}
        >
          Build my profile →
        </motion.button>
      </div>
    </div>
  );
};

export default GradientSweepStep;
