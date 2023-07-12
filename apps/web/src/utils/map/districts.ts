import { GeoApiCity } from '@app/web/types/City'

export const districts: Record<string, Omit<GeoApiCity, 'codeEpci'>[]> = {
  paris: [
    {
      centre: {
        type: 'Point',
        coordinates: [2.3359, 48.862],
      },
      population: 16_030,
      codesPostaux: ['75001'],
      nom: 'Paris 1er Arrondissement',
      code: '75101',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [2.3411, 48.8677],
      },
      population: 21_130,
      codesPostaux: ['75002'],
      nom: 'Paris 2e Arrondissement',
      code: '75102',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [2.3593, 48.8626],
      },
      population: 33_402,
      codesPostaux: ['75003'],
      nom: 'Paris 3e Arrondissement',
      code: '75103',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [2.3569, 48.8541],
      },
      population: 29_064,
      codesPostaux: ['75004'],
      nom: 'Paris 4e Arrondissement',
      code: '75104',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [2.3514, 48.8454],
      },
      population: 57_380,
      codesPostaux: ['75005'],
      nom: 'Paris 5e Arrondissement',
      code: '75105',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [2.3307, 48.8495],
      },
      population: 39_625,
      codesPostaux: ['75006'],
      nom: 'Paris 6e Arrondissement',
      code: '75106',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [2.3115, 48.8548],
      },
      population: 48_520,
      codesPostaux: ['75007'],
      nom: 'Paris 7e Arrondissement',
      code: '75107',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [2.3111, 48.8732],
      },
      population: 35_631,
      codesPostaux: ['75008'],
      nom: 'Paris 8e Arrondissement',
      code: '75108',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [2.3379, 48.8771],
      },
      population: 60_168,
      codesPostaux: ['75009'],
      nom: 'Paris 9e Arrondissement',
      code: '75109',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [2.3624, 48.876],
      },
      population: 83_459,
      codesPostaux: ['75010'],
      nom: 'Paris 10e Arrondissement',
      code: '75110',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [2.3816, 48.8601],
      },
      population: 144_292,
      codesPostaux: ['75011'],
      nom: 'Paris 11e Arrondissement',
      code: '75111',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [2.4173, 48.8342],
      },
      population: 140_311,
      codesPostaux: ['75012'],
      nom: 'Paris 12e Arrondissement',
      code: '75112',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [2.3656, 48.8303],
      },
      population: 177_833,
      codesPostaux: ['75013'],
      nom: 'Paris 13e Arrondissement',
      code: '75113',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [2.323, 48.8297],
      },
      population: 133_967,
      codesPostaux: ['75014'],
      nom: 'Paris 14e Arrondissement',
      code: '75114',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [2.2937, 48.8417],
      },
      population: 229_472,
      codesPostaux: ['75015'],
      nom: 'Paris 15e Arrondissement',
      code: '75115',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [2.263, 48.8572],
      },
      population: 162_820,
      codesPostaux: ['75016', '75116'],
      nom: 'Paris 16e Arrondissement',
      code: '75116',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [2.305, 48.8874],
      },
      population: 166_336,
      codesPostaux: ['75017'],
      nom: 'Paris 17e Arrondissement',
      code: '75117',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [2.3487, 48.8919],
      },
      population: 191_135,
      codesPostaux: ['75018'],
      nom: 'Paris 18e Arrondissement',
      code: '75118',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [2.3878, 48.8871],
      },
      population: 183_211,
      codesPostaux: ['75019'],
      nom: 'Paris 19e Arrondissement',
      code: '75119',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [2.3966, 48.8625],
      },
      population: 192_120,
      codesPostaux: ['75020'],
      nom: 'Paris 20e Arrondissement',
      code: '75120',
    },
  ],
  lyon: [
    {
      centre: {
        type: 'Point',
        coordinates: [4.8264, 45.7701],
      },
      population: 29_303,
      codesPostaux: ['69001'],
      nom: 'Lyon 1er Arrondissement',
      code: '69381',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [4.8265, 45.7464],
      },
      population: 30_318,
      codesPostaux: ['69002'],
      nom: 'Lyon 2e Arrondissement',
      code: '69382',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [4.8685, 45.7514],
      },
      population: 101_838,
      codesPostaux: ['69003'],
      nom: 'Lyon 3e Arrondissement',
      code: '69383',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [4.826, 45.7805],
      },
      population: 35_683,
      codesPostaux: ['69004'],
      nom: 'Lyon 4e Arrondissement',
      code: '69384',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [4.8012, 45.756],
      },
      population: 49_546,
      codesPostaux: ['69005'],
      nom: 'Lyon 5e Arrondissement',
      code: '69385',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [4.8548, 45.7753],
      },
      population: 52_621,
      codesPostaux: ['69006'],
      nom: 'Lyon 6e Arrondissement',
      code: '69386',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [4.8393, 45.7321],
      },
      population: 84_310,
      codesPostaux: ['69007'],
      nom: 'Lyon 7e Arrondissement',
      code: '69387',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [4.8695, 45.7342],
      },
      population: 85_980,
      codesPostaux: ['69008'],
      nom: 'Lyon 8e Arrondissement',
      code: '69388',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [4.8128, 45.7836],
      },
      population: 52_629,
      codesPostaux: ['69009'],
      nom: 'Lyon 9e Arrondissement',
      code: '69389',
    },
  ],
  marseille: [
    {
      centre: {
        type: 'Point',
        coordinates: [5.3828, 43.3002],
      },
      population: 39_265,
      codesPostaux: ['13001'],
      nom: 'Marseille 1er Arrondissement',
      code: '13201',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [5.3496, 43.3225],
      },
      population: 23_898,
      codesPostaux: ['13002'],
      nom: 'Marseille 2e Arrondissement',
      code: '13202',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [5.3806, 43.3113],
      },
      population: 52_277,
      codesPostaux: ['13003'],
      nom: 'Marseille 3e Arrondissement',
      code: '13203',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [5.4002, 43.3063],
      },
      population: 49_636,
      codesPostaux: ['13004'],
      nom: 'Marseille 4e Arrondissement',
      code: '13204',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [5.4006, 43.2925],
      },
      population: 45_098,
      codesPostaux: ['13005'],
      nom: 'Marseille 5e Arrondissement',
      code: '13205',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [5.3814, 43.2876],
      },
      population: 40_734,
      codesPostaux: ['13006'],
      nom: 'Marseille 6e Arrondissement',
      code: '13206',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [5.3274, 43.2796],
      },
      population: 34_596,
      codesPostaux: ['13007'],
      nom: 'Marseille 7e Arrondissement',
      code: '13207',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [5.3256, 43.215],
      },
      population: 82_155,
      codesPostaux: ['13008'],
      nom: 'Marseille 8e Arrondissement',
      code: '13208',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [5.4523, 43.2366],
      },
      population: 76_053,
      codesPostaux: ['13009'],
      nom: 'Marseille 9e Arrondissement',
      code: '13209',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [5.4243, 43.2743],
      },
      population: 59_131,
      codesPostaux: ['13010'],
      nom: 'Marseille 10e Arrondissement',
      code: '13210',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [5.4787, 43.2877],
      },
      population: 57_519,
      codesPostaux: ['13011'],
      nom: 'Marseille 11e Arrondissement',
      code: '13211',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [5.4418, 43.3071],
      },
      population: 61_931,
      codesPostaux: ['13012'],
      nom: 'Marseille 12e Arrondissement',
      code: '13212',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [5.4301, 43.3528],
      },
      population: 91_959,
      codesPostaux: ['13013'],
      nom: 'Marseille 13e Arrondissement',
      code: '13213',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [5.3915, 43.3468],
      },
      population: 60_968,
      codesPostaux: ['13014'],
      nom: 'Marseille 14e Arrondissement',
      code: '13214',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [5.3653, 43.3531],
      },
      population: 79_092,
      codesPostaux: ['13015'],
      nom: 'Marseille 15e Arrondissement',
      code: '13215',
    },
    {
      centre: {
        type: 'Point',
        coordinates: [5.3161, 43.3642],
      },
      population: 16_009,
      codesPostaux: ['13016'],
      nom: 'Marseille 16e Arrondissement',
      code: '13216',
    },
  ],
}
