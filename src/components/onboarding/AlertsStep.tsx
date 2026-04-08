import type { AlertPrefs } from '@/types/onboarding';
import { Switch } from '@/components/ui/switch';
import AnimationSlot from './AnimationSlot';
import robotAnim from '@/assets/lottie/Robot-Bot_3D.json';

interface AlertsStepProps {
  alerts: AlertPrefs;
  onChange: (alerts: AlertPrefs) => void;
}

const ALERT_OPTIONS: { key: keyof AlertPrefs; label: string; desc: string; slot: string }[] = [
  { key: 'priceDrops', label: 'Price Drops', desc: 'Get notified when prices fall', slot: 'icon-price-drop' },
  { key: 'newReleases', label: 'New Releases', desc: 'Be first to know about new drops', slot: 'icon-new-release' },
  { key: 'restocks', label: 'Restocks', desc: 'Sold-out pairs back in your size', slot: 'icon-restock' },
];

const AlertsStep = ({ alerts, onChange }: AlertsStepProps) => {
  const toggle = (key: keyof AlertPrefs) => {
    onChange({ ...alerts, [key]: !alerts[key] });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <AnimationSlot label="robot-bot" animationData={robotAnim} className="h-20 w-20 shrink-0" />
        <div>
          <h2 className="font-syne text-3xl font-bold text-onboarding-text">
            Stay in the loop
          </h2>
          <p className="text-onboarding-muted text-sm">Choose what alerts you want</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {ALERT_OPTIONS.map((opt) => (
          <div
            key={opt.key}
            className="flex items-center gap-4 rounded-2xl bg-onboarding-surface p-5"
          >
            <AnimationSlot label={opt.slot} className="h-12 w-12 !p-1 shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-onboarding-text">{opt.label}</p>
              <p className="text-xs text-onboarding-muted">{opt.desc}</p>
            </div>
            <Switch
              checked={alerts[opt.key]}
              onCheckedChange={() => toggle(opt.key)}
              className="data-[state=checked]:bg-brand-purple"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsStep;
