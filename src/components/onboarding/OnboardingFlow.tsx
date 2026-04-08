import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_STATE, TOTAL_STEPS, type OnboardingState, type Vibe, type AlertPrefs } from '@/types/onboarding';
import StepIndicator from './StepIndicator';
import WelcomeStep from './WelcomeStep';
import SizeStep from './SizeStep';
import BrandStep from './BrandStep';
import VibeStep from './VibeStep';
import BudgetStep from './BudgetStep';
import AlertsStep from './AlertsStep';
import RevealStep from './RevealStep';

const STORAGE_KEY = 'hf_onboarding_state';

function loadState(): OnboardingState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_STATE;
}

const OnboardingFlow = () => {
  const [state, setState] = useState<OnboardingState>(loadState);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const update = (patch: Partial<OnboardingState>) =>
    setState((prev) => ({ ...prev, ...patch }));

  const next = () => update({ step: Math.min(state.step + 1, TOTAL_STEPS - 1) });
  const back = () => update({ step: Math.max(state.step - 1, 0) });

  const canProceed = (): boolean => {
    switch (state.step) {
      case 1: return state.sizes.length > 0;
      case 2: return state.brands.length > 0;
      case 3: return state.vibes.length > 0;
      default: return true;
    }
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
        return <VibeStep selected={state.vibes} onChange={(vibes: Vibe[]) => update({ vibes })} />;
      case 4:
        return <BudgetStep budget={state.budget} onChange={(budget) => update({ budget })} />;
      case 5:
        return <AlertsStep alerts={state.alerts} onChange={(alerts: AlertPrefs) => update({ alerts })} />;
      case 6:
        return <RevealStep onFinish={finish} />;
      default:
        return null;
    }
  };

  const showNav = state.step > 0 && state.step < TOTAL_STEPS - 1;

  return (
    <div className="min-h-screen bg-onboarding-bg text-onboarding-text font-inter">
      {state.step === 0 ? (
        renderStep()
      ) : (
        <div className="mx-auto flex min-h-screen max-w-md flex-col px-5 py-8">
          <div className="flex items-center justify-center mb-8">
            <StepIndicator current={state.step} />
          </div>

          <div className="flex-1">{renderStep()}</div>

          {showNav && (
            <div className="flex items-center gap-3 pt-6">
              <button
                onClick={back}
                className="flex-1 rounded-full border border-onboarding-muted/30 py-3.5 font-semibold text-onboarding-muted transition-colors hover:border-onboarding-text hover:text-onboarding-text"
              >
                Back
              </button>
              <button
                onClick={next}
                disabled={!canProceed()}
                className="flex-1 rounded-full bg-brand-purple py-3.5 font-semibold text-brand-purple-foreground transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OnboardingFlow;
