import { motion } from 'framer-motion';
import AnimationSlot from './AnimationSlot';
import welcomeAnim from '@/assets/lottie/Welcome.json';

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep = ({ onNext }: WelcomeStepProps) => (
  <div className="relative flex flex-col items-center justify-center min-h-screen gap-6 px-6 text-center overflow-hidden">
    {/* Ambient gradient blobs */}
    <motion.div
      className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full opacity-20 blur-[100px]"
      style={{ background: 'radial-gradient(circle, hsl(263 90% 58%), transparent 70%)' }}
      animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] rounded-full opacity-15 blur-[80px]"
      style={{ background: 'radial-gradient(circle, hsl(340 95% 60%), transparent 70%)' }}
      animate={{ scale: [1, 1.2, 1], x: [0, -20, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    />

    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 160, damping: 16, delay: 0.1 }}
      className="relative z-10"
    >
      <div className="glow-purple rounded-full">
        <AnimationSlot label="logo-particle-reveal" animationData={welcomeAnim} className="w-48 h-48" />
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative z-10"
    >
      <h1 className="font-syne text-6xl font-extrabold tracking-tight">
        <span className="text-onboarding-text">Hype</span>
        <span className="gradient-text-purple">Feed</span>
      </h1>
    </motion.div>

    <motion.p
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.45 }}
      className="text-onboarding-muted text-lg max-w-xs leading-relaxed relative z-10"
    >
      AI-powered sneaker deals &amp; drops, personalized to your taste.
    </motion.p>

    <motion.button
      onClick={onNext}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.4 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="relative z-10 mt-4 rounded-full btn-premium px-12 py-4 font-syne text-lg font-bold text-brand-purple-foreground tracking-wide"
    >
      Get Started →
    </motion.button>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="text-onboarding-muted/50 text-xs relative z-10 mt-2"
    >
      Takes less than 60 seconds
    </motion.p>
  </div>
);

export default WelcomeStep;
