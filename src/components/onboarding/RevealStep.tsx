import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimationSlot from './AnimationSlot';
import aiLoaderAnim from '@/assets/lottie/Ai_loading_model.json';
import confettiAnim from '@/assets/lottie/success-celebration.json';
import trophyAnim from '@/assets/lottie/Trophy.json';

interface RevealStepProps {
  onFinish: () => void;
}

const LOADING_STEPS = [
  'Analyzing your brand picks…',
  'Scanning drop calendars…',
  'Calibrating your alerts…',
  'Feed ready.',
];

const RevealStep = ({ onFinish }: RevealStepProps) => {
  const [phase, setPhase] = useState<'loading' | 'done'>('loading');
  const [loadIdx, setLoadIdx] = useState(0);

  // Cycle through loading steps then flip to done
  useEffect(() => {
    if (phase !== 'loading') return;
    if (loadIdx < LOADING_STEPS.length - 1) {
      const t = setTimeout(() => setLoadIdx((i) => i + 1), 550);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase('done'), 700);
    return () => clearTimeout(t);
  }, [loadIdx, phase]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 text-center px-4">
      <AnimatePresence mode="wait">
        {phase === 'loading' ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center gap-6 w-full"
          >
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <AnimationSlot
                label="loader-feed-building"
                animationData={aiLoaderAnim}
                className="w-40 h-40"
              />
            </motion.div>

            <h2 className="font-syne text-2xl font-bold text-onboarding-text">
              Building your feed…
            </h2>

            <div className="flex flex-col gap-2 w-full max-w-xs text-left">
              {LOADING_STEPS.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: i <= loadIdx ? 1 : 0.2, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                  className="flex items-center gap-2.5 text-sm"
                >
                  <motion.div
                    animate={{
                      backgroundColor:
                        i < loadIdx
                          ? '#10B981'
                          : i === loadIdx
                          ? '#7C3AED'
                          : 'rgba(255,255,255,0.15)',
                      scale: i === loadIdx ? [1, 1.3, 1] : 1,
                    }}
                    transition={{
                      duration: 0.4,
                      repeat: i === loadIdx ? Infinity : 0,
                      repeatDelay: 0.5,
                    }}
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                  />
                  <span
                    className={
                      i <= loadIdx ? 'text-onboarding-text font-medium' : 'text-onboarding-muted'
                    }
                  >
                    {step}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Confetti + trophy stacked */}
            <div className="relative w-48 h-48">
              <AnimationSlot
                label="confetti-burst"
                animationData={confettiAnim}
                loop={false}
                className="absolute inset-0 w-full h-full"
              />
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 18 }}
                className="absolute inset-0"
              >
                <AnimationSlot
                  label="trophy"
                  animationData={trophyAnim}
                  loop={false}
                  className="w-full h-full"
                />
              </motion.div>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-syne text-3xl font-bold text-onboarding-text"
            >
              You're all set! 🎉
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-onboarding-muted max-w-sm"
            >
              Your personalized sneaker feed is ready. Let's find your next pair.
            </motion.p>

            <motion.button
              onClick={onFinish}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(124,58,237,0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="mt-2 rounded-full bg-brand-purple px-10 py-4 font-syne text-lg font-bold text-brand-purple-foreground"
            >
              Enter HypeFeed →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RevealStep;
