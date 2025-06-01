export interface Party {
    id: string
    name: string
    shortName: string
    color: string
    description: string
    ideology: string
}

export interface PartyLeader {
    name: string
    imageUrl?: string
}

export interface ElectionParty extends Party {
    leader: PartyLeader
    incumbent?: boolean
}

// Available Political Parties
export const PARTIES: Party[] = [
    {
        id: 'liberal',
        name: 'Liberal Party of Canada',
        shortName: 'LPC',
        color: '#EA6D6A',
        description: 'Centre to centre-left party focused on progressive policies, social liberalism, and economic pragmatism.',
        ideology: 'Centre to Centre-left'
    },
    {
        id: 'conservative',
        name: 'Conservative Party of Canada',
        shortName: 'CPC',
        color: '#6495ED',
        description: 'Centre to centre-right party advocating for fiscal conservatism, traditional values, and free market economics',
        ideology: 'Centre to Centre-right'
    },
    {
        id: 'ndp',
        name: 'New Democratic Party',
        shortName: 'NDP',
        color: '#F4A460',
        description: 'Scoial democratic party promoting workers\' rights, social justice, and progressive taxation.',
        ideology: 'Centre-left to Left'
    },
    {
        id: 'bloc',
        name: 'Bloc Québécois',
        shortName: 'BQ',
        color: '#87CEFA',
        description: 'Quebec nationalist party focusedon protecting Quebec\'s interest in federal politics and promoting Quebecois sovereignty.',
        ideology: 'Quebec nationalism, Centre-left'
    },
    {
        id: 'green',
        name: 'Green Party of Canada',
        shortName: 'Green',
        color: '#99C955',
        description: 'Environmental party advocating for climate action, sustainability, and social justice.',
        ideology: 'Green politics'
    }
]

// Party Leaders For Each Election
export const ELECTION_PARTY_LEADERS: Record<number, Record<string, PartyLeader>> = {
    2025: {
        liberal: { name: 'Mark Carney' },
        conservative: { name: 'Pierre Poilievre' },
        ndp: { name: 'Jagmeet Singh' },
        bloc: { name: 'Yves-François Blanchet' },
        green: { name: 'Elizabeth May & Jonathan Pedneault' }
    },
    2021: {
        liberal: { name: 'Justin Trudeau' },
        conservative: { name: 'Erin O\'Toole' },
        ndp: { name: 'Jagmeet Singh' },
        bloc: { name: 'Yves-François Blanchet' },
        green: { name: 'Annamie Paul' }
    },
    2019: {
        liberal: { name: 'Justin Trudeau' },
        conservative: { name: 'Andrew Scheer' },
        ndp: { name: 'Jagmeet Singh' },
        bloc: { name: 'Yves-François Blanchet' },
        green: { name: 'Elizabeth May' }
    },
    2015: {
        liberal: { name: 'Justin Trudeau' },
        conservative: { name: 'Stephen Harper' },
        ndp: { name: 'Thomas Mulcair' },
        bloc: { name: 'Gilles Duceppe' },
        green: { name: 'Elizabeth May' }
    },
    2011: {
        liberal: { name: 'Michael Ignatieff' },
        conservative: { name: 'Stephen Harper' },
        ndp: { name: 'Jack Layton' },
        bloc: { name: 'Gilles Duceppe' },
        green: { name: 'Elizabeth' }
    },
    2008: {
        liberal: { name: 'Stéphen Dion' },
        conservative: { name: 'Stephen Harper' },
        ndp: { name: 'Jack Layton' },
        bloc: { name: 'Gilles Duceppe' },
        green: { name: 'Elizabeth May' }
    },
    2006: {
        liberal: { name: 'Paul Martin' },
        conservative: { name: 'Stephen Harper' },
        ndp: { name: 'Jack Layton' },
        bloc: { name: 'Gilles Duceppe' }
    }
}

// Get party leader for specific election
export function getElectionParties(electionYear: number): ElectionParty[] {
    const leaders = ELECTION_PARTY_LEADERS[electionYear];
    if (!leaders) {
        throw new Error(`No leadership data available for ${electionYear}`)
    }

    return PARTIES.map(party => ({
        ...party,
        leader: leaders[party.id],
        incumbent: getIncumbentStatus(party.id, electionYear)
    }))
}

function getIncumbentStatus(partyId: string, electionYear: number): boolean {
    const incumbents: Record<number, string> = {
        2025: 'liberal',
        2021: 'liberal',
        2019: 'liberal',
        2015: 'conservative',
        2011: 'conservative',
        2008: 'conservative',
        2006: 'liberal'
    }

    return incumbents[electionYear] === partyId
}