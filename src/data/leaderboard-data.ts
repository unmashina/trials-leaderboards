import { faker } from '@faker-js/faker'

// ─── Types ───────────────────────────────────────────────────────────

export interface EvolutionEntry {
  rank: number
  flag: string
  name: string
  faults: number
  time: string
  role?: 'developer'
}

export interface FusionEntry {
  rank: number
  club: string | null
  flag: string
  name: string
  medal: 'platinum' | 'gold' | 'silver' | 'bronze'
  faults: number
  time: string
}

export interface RisingEntry {
  rank: number
  flag: string
  platform: 'ubisoft' | null
  name: string
  bike: string
  faults: number
  score: number
  medal: 'diamond'
  time: string
}

// ─── Seed data from original HTML ────────────────────────────────────

const evolutionSeed = [
  { flag: 'fr', name: 'SUPA93', faults: 0, time: '00:27.030', role: 'developer' as const },
  { flag: 'fr', name: 'Enzo59277', faults: 0, time: '00:27.484' },
  { flag: 'us', name: 'SlaVkaAssassin', faults: 0, time: '00:27.583' },
  { flag: 'au', name: 'GT4HD', faults: 0, time: '00:27.824' },
  { flag: 'be', name: 'lolblackO1', faults: 0, time: '00:28.030' },
  { flag: 'fr', name: 'xLuxussss', faults: 0, time: '00:28.130' },
  { flag: 'de', name: 'NickR543', faults: 0, time: '00:28.484' },
]

const fusionSeed = [
  { club: null, flag: 'us', name: 'Sakura_Rozu', medal: 'platinum' as const, faults: 0, time: '00:00.003' },
  { club: null, flag: 'us', name: 'KreepMcNasty', medal: 'platinum' as const, faults: 0, time: '00:00.003' },
  { club: null, flag: 'de', name: 'thisisyllw', medal: 'platinum' as const, faults: 0, time: '00:00.003' },
  { club: null, flag: 'ru', name: 'ThomasDream', medal: 'platinum' as const, faults: 0, time: '00:00.003' },
  { club: null, flag: 'ru', name: 'nevl25', medal: 'platinum' as const, faults: 0, time: '00:00.003' },
  { club: null, flag: 'be', name: 'The_Legend267', medal: 'platinum' as const, faults: 0, time: '00:00.003' },
  { club: 'cobra2', flag: 'de', name: '[Nick] Arow66', medal: 'platinum' as const, faults: 0, time: '00:00.003' },
  { club: null, flag: 'ua', name: 'lex_47', medal: 'platinum' as const, faults: 0, time: '00:00.003' },
  { club: null, flag: 'ru', name: 'Shirotan_xx', medal: 'platinum' as const, faults: 0, time: '00:00.003' },
  { club: null, flag: 'ru', name: 'YATO_JP', medal: 'platinum' as const, faults: 0, time: '00:00.003' },
]

const risingSeed = [
  { flag: 'be', platform: null as 'ubisoft' | null, name: 'Luxuus', bike: 'RHINO', faults: 0, score: 359970, medal: 'diamond' as const, time: '00:10.015' },
  { flag: 'fr', platform: null as 'ubisoft' | null, name: 'xMakaveli', bike: 'RHINO', faults: 0, score: 359846, medal: 'diamond' as const, time: '00:10.077' },
  { flag: 'it', platform: 'ubisoft' as const, name: 'v_HaroS', bike: 'RHINO', faults: 0, score: 359544, medal: 'diamond' as const, time: '00:10.228' },
  { flag: 'uk', platform: null as 'ubisoft' | null, name: 'Weeezio', bike: 'RHINO', faults: 0, score: 359492, medal: 'diamond' as const, time: '00:10.254' },
  { flag: 'uk', platform: 'ubisoft' as const, name: 'JAMZlO', bike: 'RHINO', faults: 0, score: 359356, medal: 'diamond' as const, time: '00:10.322' },
  { flag: 'uk', platform: 'ubisoft' as const, name: 'Owen_God', bike: 'RHINO', faults: 0, score: 359240, medal: 'diamond' as const, time: '00:10.380' },
  { flag: 'au', platform: 'ubisoft' as const, name: 'jjlurman', bike: 'RHINO', faults: 0, score: 359202, medal: 'diamond' as const, time: '00:10.399' },
  { flag: 'fr', platform: null as 'ubisoft' | null, name: 'Kxsmo', bike: 'RHINO', faults: 0, score: 359168, medal: 'diamond' as const, time: '00:10.416' },
  { flag: 'uk', platform: 'ubisoft' as const, name: 'runkimrun', bike: 'RHINO', faults: 0, score: 359068, medal: 'diamond' as const, time: '00:10.466' },
]

// ─── Available flags per game ────────────────────────────────────────

const evolutionFlags = ['fr', 'us', 'au', 'be', 'de', 'uk', 'nl', 'se', 'no', 'dk', 'fi', 'es', 'it', 'jp', 'br', 'ru', 'pl', 'ch', 'at', 'nz']
const fusionFlags = ['us', 'de', 'ru', 'be', 'ua', 'fr', 'gb', 'nl', 'se', 'no', 'dk', 'fi', 'es', 'it', 'jp', 'br', 'pl', 'ch', 'at', 'au']
const risingFlags = ['fr', 'it', 'uk', 'au', 'de', 'us', 'nl', 'se', 'be', 'es', 'jp', 'br', 'ru']
const risingBikes = ['RHINO', 'MANTIS', 'PIT VIPER', 'HELIUM', 'SQUID', 'RABBIT']
const fusionClubs = [null, null, null, null, null, 'cobra', 'cobra2']
const fusionMedals: FusionEntry['medal'][] = ['platinum', 'gold', 'silver', 'bronze']

// ─── Time helpers ────────────────────────────────────────────────────

function formatTime(ms: number): string {
  const totalSeconds = ms / 1000
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${seconds.toFixed(3).padStart(6, '0')}`
}

function parseTime(t: string): number {
  const [min, sec] = t.split(':')
  return (parseInt(min) * 60 + parseFloat(sec)) * 1000
}

// ─── Generator functions ─────────────────────────────────────────────

function generateGamerTag(): string {
  const styles = [
    () => faker.internet.username().replace(/[^a-zA-Z0-9_]/g, ''),
    () => `${faker.word.adjective()}${faker.person.firstName()}${faker.number.int({ min: 1, max: 999 })}`,
    () => `x${faker.person.firstName()}x`,
    () => `${faker.hacker.abbreviation()}_${faker.person.lastName()}`,
  ]
  return faker.helpers.arrayElement(styles)()
}

// Use a fixed seed for deterministic data across requests
faker.seed(42)

function generateEvolutionData(count: number): EvolutionEntry[] {
  const entries: EvolutionEntry[] = []
  let baseTimeMs = parseTime(evolutionSeed[0].time)

  // Add seed data first
  for (let i = 0; i < evolutionSeed.length; i++) {
    entries.push({ rank: i + 1, ...evolutionSeed[i] })
  }

  // Generate additional entries with increasing times
  for (let i = evolutionSeed.length; i < count; i++) {
    baseTimeMs += faker.number.int({ min: 10, max: 800 })
    const faults = faker.helpers.weightedArrayElement([
      { value: 0, weight: 60 },
      { value: 1, weight: 25 },
      { value: 2, weight: 10 },
      { value: 3, weight: 5 },
    ])
    entries.push({
      rank: i + 1,
      flag: faker.helpers.arrayElement(evolutionFlags),
      name: generateGamerTag(),
      faults,
      time: formatTime(baseTimeMs),
    })
  }
  return entries
}

function generateFusionData(count: number): FusionEntry[] {
  const entries: FusionEntry[] = []
  let baseTimeMs = parseTime(fusionSeed[0].time)

  for (let i = 0; i < fusionSeed.length; i++) {
    entries.push({ rank: i + 1, ...fusionSeed[i] })
  }

  for (let i = fusionSeed.length; i < count; i++) {
    baseTimeMs += faker.number.int({ min: 1, max: 500 })
    const faults = faker.helpers.weightedArrayElement([
      { value: 0, weight: 50 },
      { value: 1, weight: 30 },
      { value: 2, weight: 15 },
      { value: 3, weight: 5 },
    ])
    // Medal degrades with rank
    let medal: FusionEntry['medal'] = 'platinum'
    if (i > 200) medal = 'gold'
    if (i > 500) medal = 'silver'
    if (i > 800) medal = 'bronze'

    entries.push({
      rank: i + 1,
      club: faker.helpers.arrayElement(fusionClubs),
      flag: faker.helpers.arrayElement(fusionFlags),
      name: generateGamerTag(),
      medal,
      faults,
      time: formatTime(baseTimeMs),
    })
  }
  return entries
}

function generateRisingData(count: number): RisingEntry[] {
  const entries: RisingEntry[] = []
  let baseScore = risingSeed[0].score
  let baseTimeMs = parseTime(risingSeed[0].time)

  for (let i = 0; i < risingSeed.length; i++) {
    entries.push({ rank: i + 1, ...risingSeed[i] })
  }

  for (let i = risingSeed.length; i < count; i++) {
    baseScore -= faker.number.int({ min: 5, max: 200 })
    baseTimeMs += faker.number.int({ min: 5, max: 300 })
    const faults = faker.helpers.weightedArrayElement([
      { value: 0, weight: 55 },
      { value: 1, weight: 28 },
      { value: 2, weight: 12 },
      { value: 3, weight: 5 },
    ])
    entries.push({
      rank: i + 1,
      flag: faker.helpers.arrayElement(risingFlags),
      platform: faker.helpers.arrayElement([null, null, 'ubisoft' as const]),
      name: generateGamerTag(),
      bike: faker.helpers.arrayElement(risingBikes),
      faults,
      score: Math.max(0, baseScore),
      medal: 'diamond',
      time: formatTime(baseTimeMs),
    })
  }
  return entries
}

// ─── Pre-generated datasets ──────────────────────────────────────────

export const evolutionLeaderboard = generateEvolutionData(500)
export const fusionLeaderboard = generateFusionData(1000)
export const risingLeaderboard = generateRisingData(300)
