export type Vibe = 'retro' | 'performance' | 'hype' | 'everyday' | 'luxe' | 'outdoor'

export type ShopperType = 'reseller' | 'collector' | 'hype-buyer' | 'casual' | 'grail-hunter'

export type AlertPrefs = {
  priceDrops: boolean
  newReleases: boolean
  restocks: boolean
}

export type OnboardingState = {
  step: number
  sizes: string[]
  brands: string[]
  shopperType: ShopperType | null
  budget: [number, number]
  alerts: AlertPrefs
}

export const INITIAL_STATE: OnboardingState = {
  step: 0,
  sizes: [],
  brands: [],
  shopperType: null,
  budget: [50, 300],
  alerts: { priceDrops: true, newReleases: true, restocks: false },
}

export const SHOPPER_TYPE_LABELS: Record<ShopperType, string> = {
  reseller: 'MARKET MOVER',
  collector: 'SHELF WORTHY',
  'hype-buyer': 'HYPE TRACKER',
  casual: 'DAILY WEARER',
  'grail-hunter': 'GRAIL MODE',
}

const RESELLER_SIGNALS = ['jordan', 'supreme', 'travis', 'off-white']
const COLLECTOR_SIGNALS = ['nike', 'new-balance', 'new balance', 'saucony', 'asics']
const HYPE_SIGNALS = ['yeezy', 'adidas', 'balenciaga']
const GRAIL_SIGNALS = ['off-white', 'travis', 'fear of god', 'fear-of-god']

export function inferShopperType(brands: string[]): ShopperType {
  let reseller = 0, collector = 0, hype = 0, grail = 0
  for (const b of brands) {
    const bl = b.toLowerCase()
    if (RESELLER_SIGNALS.some(s => bl.includes(s))) reseller++
    if (COLLECTOR_SIGNALS.some(s => bl.includes(s))) collector++
    if (HYPE_SIGNALS.some(s => bl.includes(s))) hype++
    if (GRAIL_SIGNALS.some(s => bl.includes(s))) grail++
  }
  const max = Math.max(reseller, collector, hype, grail)
  if (max === 0) return 'casual'
  if (max === grail) return 'grail-hunter'
  if (max === reseller) return 'reseller'
  if (max === hype) return 'hype-buyer'
  if (max === collector) return 'collector'
  return 'casual'
}

export const TOTAL_STEPS = 8
