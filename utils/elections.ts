export interface HistoricalCampaignData {
    campaignStartDate: string
    campaignEndDate: string
    totalWeeks: number
    debateWeek?: number
    keyIssues: string[]
}

export interface ElectionData {
    year: number
    name: string
    description: string
    totalSeats: number
    majoritySeats: number
    called?: string
    held?: string
    historical?: HistoricalCampaignData
}

export const ELECTIONS: ElectionData[] = [
    {
        year: 2025,
        name: 'Strong and Free',
        description: '...',
        totalSeats: 343,
        majoritySeats: 172,
        called: '2025-03-23',
        held: '2025-04-28',
        historical: {
            campaignStartDate: '2025-03-23',
            campaignEndDate: '2025-04-28',
            totalWeeks: 5,
            debateWeek: 4,
            keyIssues: ['U.S. Tariffs & Sovereignty Threats', 'Cost of Living', 'Housing Affordability', 'Crime'],  
        }
    },
    {
        year: 2021,
        name: 'Amidst a Pandemic',
        description: '...',
        totalSeats: 338,
        majoritySeats: 170,
        called: '2021-8-15',
        held: '2021-09-20',
        historical: {
            campaignStartDate: '2021-08-15',
            campaignEndDate: '2021-09-20',
            totalWeeks: 5,
            debateWeek: 4,
            keyIssues: ['COVID-19 Response', 'Economic Recovery', 'Housing Affordability', 'Climate Change']
        }
    },
    {
        year: 2019,
        name: 'Red Retreat',
        description: '...',
        totalSeats: 338,
        majoritySeats: 170,
        called: '2019-09-11',
        held: '2019-10-21',
        historical: {
            campaignStartDate: '2019-09-11',
            campaignEndDate: '2019-10-21',
            totalWeeks: 5,
            debateWeek: 4,
            keyIssues: ['Healthcare', 'Cost of Living', 'Climate Change', 'Economic Growth']
        }
    },
    {
        year: 2015,
        name: 'Sunny Ways',
        description: '...',
        totalSeats: 338,
        majoritySeats: 170,
        called: '2015-08-04',
        held: '2015-10-19',
        historical: {
            campaignStartDate: '2015-08-04',
            campaignEndDate: '2015-10-19',
            totalWeeks: 11,
            debateWeek: 10,
            keyIssues: ['Cost of Living', 'Healthcare', 'Climate Change', 'Government Transparency']
        }
    },
    {
        year: 2011,
        name: 'Orange Wave',
        description: '...',
        totalSeats: 308,
        majoritySeats: 155,
        called: '2011-03-26',
        held: '2011-05-02',
        historical: {
            campaignStartDate: '2011-03-26',
            campaignEndDate: '2011-05-02',
            totalWeeks: 5,
            debateWeek: 3,
            keyIssues: ['Recession Recovery & Fiscal Responsibility', 'Healthcare', 'Climate Change', 'Government Transparency']
        }
    },
    {
        year: 2008,
        name: 'Financial Crisis',
        description: '...',
        totalSeats: 308,
        majoritySeats: 155,
        called: '2008-09-07',
        held: '2008-10-14',
        historical: {
            campaignStartDate: '2008-09-07',
            campaignEndDate: '2008-10-14',
            totalWeeks: 5,
            debateWeek: 3,
            keyIssues: ['2008 Financial Crisis', 'Climate Change', 'War in Afghanistan & National Security']
        }
    },
    {
        year: 2006,
        name: 'Blue Breakthrough',
        description: '...',
        totalSeats: 308,
        majoritySeats: 155,
        called: '2005-11-29',
        held: '2006-01-23',
        historical: {
            campaignStartDate: '2005-11-29',
            campaignEndDate: '2006-01-23',
            totalWeeks: 8,
            debateWeek: 5,
            keyIssues: ['Sponsorship Scandal', 'Fiscal Responsibility', 'Healthcare', 'Climate Change']
        }
    }
]