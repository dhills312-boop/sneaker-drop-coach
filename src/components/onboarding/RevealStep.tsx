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

  useEffect(() => {
    if (phase !== 'loading') return;
    if (loadIdx < LOADING_STEPS.length - 1) {
      const t = setTimeout(() => setLoadIdx((i) => i + 1), 650);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase('done'), 800);
    return () => clearTimeout(t);
  }, [loadIdx, phase]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[70vh] gap-8 text-center px-4 overflow-hidden">
      {/* Ambient glow for done phase */}
      {phase === 'done' && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full opacity-20 blur-[100px]"
            style={{ background: 'radial-gradient(circle, hsl(263 90% 58%), hsl(340 95% 60%), transparent 70%)' }}
          />
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {phase === 'loading' ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-6 w-full relative z-10"
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

            <h2 className="font-syne text-2xl font-bold gradient-text-purple">
              Building your feed…
            </h2>

            {/* Progress bar */}
            <div className="w-full max-w-xs h-1 rounded-full bg-onboarding-surface overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, hsl(263 90% 58%), hsl(340 95% 60%))' }}
                initial={{ width: '0%' }}
                animate={{ width: `${((loadIdx + 1) / LOADING_STEPS.length) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>

            <div className="flex flex-col gap-2.5 w-full max-w-xs text-left">
              {LOADING_STEPS.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: i <= loadIdx ? 1 : 0.2, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <motion.div
                    animate={{
                      backgroundColor:
                        i < loadIdx ? '#10B981' : i === loadIdx ? '#7C3AED' : 'rgba(255,255,255,0.1)',
                      scale: i === loadIdx ? [1, 1.4, 1] : 1,
                      boxShadow: i === loadIdx ? '0 0 8px rgba(124,58,237,0.5)' : '0 0 0px transparent',
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: i === loadIdx ? Infinity : 0,
                      repeatDelay: 0.4,
                    }}
                    className="w-2 h-2 rounded-full shrink-0"
                  />
                  <span className={i <= loadIdx ? 'text-onboarding-text font-medium' : 'text-onboarding-muted'}>
                    {step}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 16 }}
            className="flex flex-col items-center gap-6 relative z-10"
          >
            <div className="relative w-52 h-52">
              <AnimationSlot
                label="confetti-burst"
                animationData={confettiAnim}
                loop={false}
                className="absolute inset-0 w-full h-full"
              />
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 240, damping: 16 }}
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="font-syne text-4xl font-extrabold gradient-text-purple"
            >
              You're all set! 🎉
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-onboarding-muted max-w-sm leading-relaxed"
            >
              Your personalized sneaker feed is ready. Let's find your next pair.
            </motion.p>

            <motion.button
              onClick={onFinish}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="mt-2 rounded-full btn-premium px-12 py-4 font-syne text-lg font-bold text-brand-purple-foreground tracking-wide"
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
