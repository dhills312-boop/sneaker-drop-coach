import { motion } from 'framer-motion';
import AnimationSlot from './AnimationSlot';
import welcomeAnim from '@/assets/lottie/Welcome.json';

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep = ({ onNext }: WelcomeStepProps) => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-6 text-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
    >
      <AnimationSlot label="logo-particle-reveal" animationData={welcomeAnim} className="w-48 h-48" />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18, duration: 0.35 }}
    >
      <h1 className="font-syne text-5xl font-extrabold tracking-tight text-onboarding-text">
        Hype<span className="text-brand-purple">Feed</span>
      </h1>
    </motion.div>

    <motion.p
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.28, duration: 0.32 }}
      className="text-onboarding-muted text-lg max-w-sm"
    >
      AI-powered sneaker deals &amp; drops, personalized to your taste.
    </motion.p>

    <motion.button
      onClick={onNext}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.3 }}
      whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(124,58,237,0.5)' }}
      whileTap={{ scale: 0.95 }}
      className="mt-2 rounded-full bg-brand-purple px-10 py-4 font-syne text-lg font-bold text-brand-purple-foreground"
    >
      Get Started →
    </motion.button>
  </div>
);

export default WelcomeStep;
