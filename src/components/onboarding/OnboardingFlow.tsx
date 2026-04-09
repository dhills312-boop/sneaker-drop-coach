import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { INITIAL_STATE, TOTAL_STEPS, type OnboardingState, type ShopperType, type AlertPrefs } from '@/types/onboarding';
import StepIndicator from './StepIndicator';
import WelcomeStep from './WelcomeStep';
import SizeStep from './SizeStep';
import BrandStep from './BrandStep';
import ShopperTypeStep from './ShopperTypeStep';
import BudgetStep from './BudgetStep';
import AlertsStep from './AlertsStep';
import GradientSweepStep from './GradientSweepStep';
import RevealStep from './RevealStep';
import Particles from './Particles';

const STORAGE_KEY = 'hf_onboarding_state';

function loadState(): OnboardingState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_STATE;
}

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    filter: 'blur(4px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
    filter: 'blur(4px)',
  }),
};

const OnboardingFlow = () => {
  const [state, setState] = useState<OnboardingState>(loadState);
  const [direction, setDirection] = useState(1);
  const prevStep = useRef(state.step);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    setDirection(state.step > prevStep.current ? 1 : -1);
    prevStep.current = state.step;
  }, [state.step]);

  const update = (patch: Partial<OnboardingState>) =>
    setState((prev) => ({ ...prev, ...patch }));

  const next = () => update({ step: Math.min(state.step + 1, TOTAL_STEPS - 1) });
  const back = () => update({ step: Math.max(state.step - 1, 0) });

  const canProceed = (): boolean => {
    switch (state.step) {
      case 1: return state.sizes.length > 0;
      case 2: return state.brands.length > 0;
      case 3: return state.shopperType !== null;
      default: return true;
    }
  };

  const handleShopperSelect = (type: ShopperType) => {
    update({ shopperType: type, step: state.step + 1 });
  };

  const finish = () => {
    localStorage.removeItem(STORAGE_KEY);
    navigate('/');
  };

  const renderStep = () => {
    switch (state.step) {
      case 0:
        return <WelcomeStep onNext={next} />;
      case 1:
        return <SizeStep selected={state.sizes} onChange={(sizes) => update({ sizes })} />;
      case 2:
        return <BrandStep selected={state.brands} onChange={(brands) => update({ brands })} />;
      case 3:
        return <ShopperTypeStep brands={state.brands} onSelect={handleShopperSelect} />;
      case 4:
        return <BudgetStep budget={state.budget} onChange={(budget) => update({ budget })} />;
      case 5:
        return <AlertsStep alerts={state.alerts} onChange={(alerts: AlertPrefs) => update({ alerts })} />;
      case 6:
        return (
          <GradientSweepStep
            brands={state.brands}
            sizes={state.sizes}
            shopperType={state.shopperType ?? 'casual'}
            onNext={next}
          />
        );
      case 7:
        return <RevealStep onFinish={finish} />;
      default:
        return null;
    }
  };

  // Hide nav on welcome (0), shopper type (3, auto-advances), gradient sweep (6, has own button), reveal (7)
  const showNav = state.step > 0 && state.step < TOTAL_STEPS - 1 && state.step !== 3 && state.step !== 6;

  return (
    <div className="relative min-h-screen bg-onboarding-bg text-onboarding-text font-inter overflow-hidden noise-overlay">
      <Particles />
      {state.step === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {renderStep()}
        </motion.div>
      ) : (
        <div className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col px-5 py-8">
          <div className="flex items-center justify-center mb-8">
            <StepIndicator current={state.step} />
          </div>

          <div className="flex-1 relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={state.step}
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {showNav && (
            <motion.div
              className="flex items-center gap-3 pt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.25 }}
            >
              <button
                onClick={back}
                className="flex-1 rounded-full py-3.5 font-semibold text-onboarding-muted transition-all duration-200 glass-card hover:text-onboarding-text hover:glow-purple-sm"
              >
                Back
              </button>
              <button
                onClick={next}
                disabled={!canProceed()}
                className="flex-1 rounded-full btn-premium py-3.5 font-bold text-brand-purple-foreground transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-30 disabled:hover:scale-100 disabled:shadow-none"
              >
                Next
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default OnboardingFlow;
