const BRANDS = [
  { id: 'nike', label: 'Nike', emoji: '✓' },
  { id: 'adidas', label: 'Adidas', emoji: '✓' },
  { id: 'new-balance', label: 'New Balance', emoji: '✓' },
  { id: 'jordan', label: 'Jordan', emoji: '✓' },
  { id: 'yeezy', label: 'Yeezy', emoji: '✓' },
  { id: 'asics', label: 'ASICS', emoji: '✓' },
  { id: 'puma', label: 'Puma', emoji: '✓' },
  { id: 'reebok', label: 'Reebok', emoji: '✓' },
  { id: 'converse', label: 'Converse', emoji: '✓' },
  { id: 'vans', label: 'Vans', emoji: '✓' },
  { id: 'salomon', label: 'Salomon', emoji: '✓' },
  { id: 'on', label: 'On', emoji: '✓' },
];

interface BrandStepProps {
  selected: string[];
  onChange: (brands: string[]) => void;
}

const BrandStep = ({ selected, onChange }: BrandStepProps) => {
  const toggle = (id: string) => {
    onChange(
      selected.includes(id)
        ? selected.filter((b) => b !== id)
        : [...selected, id]
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-syne text-3xl font-bold text-onboarding-text">
        Pick your brands
      </h2>
      <p className="text-onboarding-muted text-sm">Tap all the brands you're into</p>
      <div className="grid grid-cols-3 gap-3">
        {BRANDS.map((brand) => {
          const active = selected.includes(brand.id);
          return (
            <button
              key={brand.id}
              onClick={() => toggle(brand.id)}
              className={`flex flex-col items-center gap-1 rounded-2xl py-5 px-2 text-sm font-semibold transition-all ${
                active
                  ? 'bg-brand-purple text-brand-purple-foreground ring-2 ring-brand-purple ring-offset-2 ring-offset-onboarding-bg'
                  : 'bg-onboarding-surface text-onboarding-text hover:bg-onboarding-surface/80'
              }`}
            >
              <span className="text-lg">{brand.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BrandStep;
