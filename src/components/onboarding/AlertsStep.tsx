import { motion } from 'framer-motion';
import type { AlertPrefs } from '@/types/onboarding';
import { Switch } from '@/components/ui/switch';
import AnimationSlot from './AnimationSlot';
import robotAnim from '@/assets/lottie/Robot-Bot_3D.json';

interface AlertsStepProps {
  alerts: AlertPrefs;
  onChange: (alerts: AlertPrefs) => void;
}

const ALERT_OPTIONS: { key: keyof AlertPrefs; label: string; desc: string }[] = [
  { key: 'priceDrops',   label: 'Price Drops',   desc: 'Get notified when prices fall in your size' },
  { key: 'newReleases',  label: 'New Releases',  desc: 'Be first to know about new drops' },
  { key: 'restocks',     label: 'Restocks',      desc: 'Sold-out pairs back in your size' },
];

const AlertsStep = ({ alerts, onChange }: AlertsStepProps) => {
  const toggle = (key: keyof AlertPrefs) => {
    onChange({ ...alerts, [key]: !alerts[key] });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Robot + AI question */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col items-center gap-4 rounded-2xl bg-onboarding-surface p-5 text-center"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <AnimationSlot
            label="robot-bot"
            animationData={robotAnim}
            className="h-24 w-24"
          />
        </motion.div>
        <div>
          <h2 className="font-syne text-2xl font-bold text-onboarding-text mb-2">
            Want HypeFeed AI to alert you before drops happen?
          </h2>
          <p className="text-onboarding-muted text-sm">
            Based on your size, budget, and past W's — we'll only ping you when it actually matters.
          </p>
        </div>
      </motion.div>

      {/* Alert toggles */}
      <div className="flex flex-col gap-3">
        {ALERT_OPTIONS.map((opt, i) => (
          <motion.div
            key={opt.key}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.28 }}
            className="flex items-center gap-4 rounded-2xl bg-onboarding-surface p-5"
          >
            <div className="flex-1">
              <p className="font-semibold text-onboarding-text">{opt.label}</p>
              <p className="text-xs text-onboarding-muted mt-0.5">{opt.desc}</p>
            </div>
            <Switch
              checked={alerts[opt.key]}
              onCheckedChange={() => toggle(opt.key)}
              className="data-[state=checked]:bg-brand-purple shrink-0"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AlertsStep;
