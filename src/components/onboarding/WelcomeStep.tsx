import AnimationSlot from './AnimationSlot';
import welcomeAnim from '@/assets/lottie/Welcome.json';

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep = ({ onNext }: WelcomeStepProps) => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-6 text-center">
    <AnimationSlot label="logo-particle-reveal" animationData={welcomeAnim} className="w-40 h-40" />
    <h1 className="font-syne text-5xl font-extrabold tracking-tight text-onboarding-text">
      Hype<span className="text-brand-purple">Feed</span>
    </h1>
    <p className="text-onboarding-muted text-lg max-w-sm">
      AI-powered sneaker deals & drops, personalized to your taste.
    </p>
    <button
      onClick={onNext}
      className="mt-4 rounded-full bg-brand-purple px-10 py-4 font-syne text-lg font-bold text-brand-purple-foreground transition-transform hover:scale-105 active:scale-95"
    >
      Get Started
    </button>
  </div>
);

export default WelcomeStep;
