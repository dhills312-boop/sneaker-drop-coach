export type Vibe = 'retro' | 'performance' | 'hype' | 'everyday' | 'luxe' | 'outdoor'

export type AlertPrefs = {
  priceDrops: boolean
  newReleases: boolean
  restocks: boolean
}

export type OnboardingState = {
  step: number
  sizes: string[]
  brands: string[]
  vibes: Vibe[]
  budget: [number, number]
  alerts: AlertPrefs
}

export const INITIAL_STATE: OnboardingState = {
  step: 0,
  sizes: [],
  brands: [],
  vibes: [],
  budget: [50, 300],
  alerts: { priceDrops: true, newReleases: true, restocks: false },
}

export const TOTAL_STEPS = 7
