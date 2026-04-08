

## Integrate Lottie Animations into Onboarding

Install `lottie-react` and replace the dashed-box `AnimationSlot` placeholders with real Lottie animations using the uploaded JSON files.

### Animation mapping

| Lottie File | Where it goes | Replaces |
|---|---|---|
| `Welcome.json` | WelcomeStep | `logo-particle-reveal` placeholder |
| `Ai_loading_model.json` | RevealStep loading phase | `loader-feed-building` placeholder + pulse dots |
| `success_confetti.json` | RevealStep done phase (background) | `confetti-burst` placeholder |
| `Trophy.json` | RevealStep done phase (foreground, layered over confetti) | Additional celebration element |
| `Business_Analytics.json` | BudgetStep | `budget-sneaker-morph` placeholder |
| `Robot-Bot_3D.json` | AlertsStep header area | New decorative element above "Stay in the loop" |
| `Loading_Dots_Blue.json` | Not used (the AI loader already covers the loading state) | — |
| `Success_celebration.json` | Not used (success_confetti covers this) | — |
| `Hexagon_loading.json` | StepIndicator or skip | Optional accent; skip for now |
| `.riv` file | Skipped — requires Rive runtime, out of scope | — |

### Files changed

1. **Install** `lottie-react`
2. **Copy** 5 Lottie JSON files to `src/assets/lottie/`
3. **Rewrite `AnimationSlot.tsx`** — accept an optional `animationData` prop; when provided, render `<Lottie>` instead of the dashed placeholder
4. **Update `WelcomeStep.tsx`** — import `Welcome.json`, pass to AnimationSlot
5. **Update `BudgetStep.tsx`** — import `Business_Analytics.json`
6. **Update `AlertsStep.tsx`** — add Robot-Bot animation above the heading
7. **Update `RevealStep.tsx`** — use `Ai_loading_model.json` for loading phase, layer `success_confetti.json` + `Trophy.json` for done phase

### Technical details

- `AnimationSlot` gains an optional `animationData` prop (Lottie JSON object). When present, renders `<Lottie animationData={data} loop autoplay />` with the same sizing/rounding classes. When absent, falls back to the current dashed placeholder.
- RevealStep done phase stacks confetti (full-width, absolute positioned behind) with trophy (centered, foreground) using `relative`/`absolute` positioning.
- All Lottie files imported as ES modules from `src/assets/lottie/` for proper bundling.

