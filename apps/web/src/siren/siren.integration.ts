import { searchCommunity } from '@stack/web/siren/siren'

describe('siren', () => {
  it('Searches with multiple words', async () => {
    const query = 'lyon 1er'
    const result = await searchCommunity(query)
    expect(result.results).toStrictEqual([
      {
        id: '98461-lyon',
        code: '69123',
        text: 'Lyon (Commune – 69001, 69002, 69003, 69004, 69005, 69006, 69007, 69008, 69009)',
        name: 'Lyon',
        scale: 'Commune',
        zipcodes: [
          '69001',
          '69002',
          '69003',
          '69004',
          '69005',
          '69006',
          '69007',
          '69008',
          '69009',
        ],
      },
    ])
  })

  it.skip('Searches without duplicates', async () => {
    const result = await searchCommunity('Grenoble')
    expect(result.results).toStrictEqual([
      {
        id: '85429-grenoble',
        text: 'Grenoble (Commune – 38000, 38100)',
        name: 'Grenoble',
        scale: 'Commune',
        zipcodes: ['38000', '38100'],
      },
      {
        id: '92953-grenois',
        text: 'Grenois (Commune – 58420)',
        name: 'Grenois',
        scale: 'Commune',
        zipcodes: ['58420'],
      },
      {
        id: '108176-grenoble-alpes-metropole',
        text: 'Grenoble-Alpes-Métropole (EPCI)',
        name: 'Grenoble-Alpes-Métropole',
        scale: 'EPCI',
        zipcodes: null,
      },
      {
        id: '85428-grenay',
        text: 'Grenay (Commune – 38540)',
        name: 'Grenay',
        scale: 'Commune',
        zipcodes: ['38540'],
      },
      {
        id: '95241-grenay',
        text: 'Grenay (Commune – 62160)',
        name: 'Grenay',
        scale: 'Commune',
        zipcodes: ['62160'],
      },
      {
        id: '82695-grenade',
        text: 'Grenade (Commune – 31330)',
        name: 'Grenade',
        scale: 'Commune',
        zipcodes: ['31330'],
      },
      {
        id: '90268-grenant',
        text: 'Grenant (Commune – 52500)',
        name: 'Grenant',
        scale: 'Commune',
        zipcodes: ['52500'],
      },
      {
        id: '92351-grening',
        text: 'Gréning (Commune – 57660)',
        name: 'Gréning',
        scale: 'Commune',
        zipcodes: ['57660'],
      },
      {
        id: '82697-le-gres',
        text: 'Le Grès (Commune – 31480)',
        name: 'Le Grès',
        scale: 'Commune',
        zipcodes: ['31480'],
      },
      {
        id: '99866-le-grez',
        text: 'Le Grez (Commune – 72140)',
        name: 'Le Grez',
        scale: 'Commune',
        zipcodes: ['72140'],
      },
    ])
  })
})
