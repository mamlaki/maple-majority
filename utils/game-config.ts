export type GameMode = 'default' | 'historical' | 'custom'

export interface GameConfig {
    mode: GameMode
    totalWeeks: number
    debateWeek?: number
    maxPointsPerQuestion: number
    pollingAccuracyRange: number
    totalSeats: number
    keyIssues?: string[]
}

export const DEFAULT_GAME_CONFIG: Partial<GameConfig> = {
    totalWeeks: 12,
    debateWeek: 8,
    maxPointsPerQuestion: 10,
    pollingAccuracyRange: 0.15
}

export interface GameModeOption {
    id: GameMode
    name: string
    description: string
}

export const GAME_MODES: GameModeOption[] = [
    {
        id: 'historical',
        name: 'Historical Mode',
        description: 'Experience the election with accurate timelines, issues, and party leaders.'
    },
    {
        id: 'default',
        name: 'Standard Mode',
        description: 'Play with a standardized 12-week campaign timeline, but with historical key issues and party leaders.'
    },
    {
        id: 'custom',
        name: 'Custom Mode',
        description: 'Customize campaign length, difficulty, party leaders, seat counts, and more! (Coming Soon)'
    }
]

export function createGameConfig(
    electionYear: number,
    mode: GameMode,
    elections: import ('./elections').ElectionData[]
): GameConfig {
    const election = elections.find(e => e.year === electionYear)
    if (!election) {
        throw new Error(`Election year ${electionYear} not found`)
    }

    const baseConfig: GameConfig = {
        mode,
        totalSeats: election.totalSeats,
        maxPointsPerQuestion: DEFAULT_GAME_CONFIG.maxPointsPerQuestion!,
        pollingAccuracyRange: DEFAULT_GAME_CONFIG.pollingAccuracyRange!,
        totalWeeks: DEFAULT_GAME_CONFIG.totalWeeks!,
        debateWeek: DEFAULT_GAME_CONFIG.debateWeek
    }

    return baseConfig
}