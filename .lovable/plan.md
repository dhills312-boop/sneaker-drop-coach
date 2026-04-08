

## HypeFeed Onboarding Shell

Build a 7-step onboarding flow (welcome → size → brand → vibe → budget → alerts → reveal) based on your scaffold files.

### What gets created

| File | Purpose |
|------|---------|
| `src/types/onboarding.ts` | Shared types & initial state (from your upload) |
| `src/components/onboarding/OnboardingFlow.tsx` | Main orchestrator — owns state, localStorage persistence, step navigation |
| `src/components/onboarding/StepIndicator.tsx` | Progress dots |
| `src/components/onboarding/AnimationSlot.tsx` | Dashed-box placeholder for future Lottie/Rive animations |
| `src/components/onboarding/WelcomeStep.tsx` | Step 0 — splash + "Get Started" |
| `src/components/onboarding/SizeStep.tsx` | Step 1 — shoe size picker (grid of toggleable chips) |
| `src/components/onboarding/BrandStep.tsx` | Step 2 — brand selector (Nike, Adidas, NB, etc.) |
| `src/components/onboarding/VibeStep.tsx` | Step 3 — vibe cards (retro, performance, hype, everyday, luxe, outdoor) |
| `src/components/onboarding/BudgetStep.tsx` | Step 4 — dual-handle budget range slider |
| `src/components/onboarding/AlertsStep.tsx` | Step 5 — toggle switches for price drops, new releases, restocks |
| `src/components/onboarding/RevealStep.tsx` | Step 6 — "building your feed" loader → confetti payoff |

### Routing & fonts

- Add `/onboarding` route in `App.tsx` rendering `<OnboardingFlow />`
- Set Index page to redirect or link to `/onboarding`
- Add **Syne** font (Google Fonts link in `index.html`) and `font-syne` utility in Tailwind config

### Design system

- Dark background (`#0D0D0D`) with brand purple accent (`#7C3AED`)
- Bold typography using Syne for headings
- Pill/chip-style selectors with purple active state
- Smooth step transitions

### State management

- `useState` in `OnboardingFlow` with `localStorage` persistence under `hf_onboarding_state`
- State cleared on completion
- Back/Next navigation with validation (require at least 1 selection per step)

### Animation slots

Each step includes an `<AnimationSlot label="..." />` placeholder ready for Lottie/Rive drop-in later — no animation libraries installed yet.

