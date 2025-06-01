export interface Party {
    id: string
    name: string
    shortName: string
    color: string
    description: string
    ideology: string
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