type Statistic = {
  id: string
  label: string
  value: number
  statistics?: Statistic[]
}

type SourcedStatistic = {
  id: string
  label: string
  value: number
  updated: Date
  source: string
}

type Category = {
  id: string
  label?: string
  statistics: Statistic[]
}

export type Bloc = {
  id: string
  label: string
  value: number
  statistics: (SourcedStatistic | Category | Statistic)[]
}

export type Blocs = {
  id?: string
  label?: string
  blocs: Bloc[]
}

export const data: Blocs[] = [
  {
    blocs: [
      {
        id: 'lieux-d-inclusion-numérique',
        label: "Lieux d'Inclusion Numérique",
        value: 123,
        statistics: [
          {
            id: 'typologie-de-structures',
            label: 'Typologie de structures',
            statistics: [
              {
                id: 'public',
                label: 'Public',
                value: 43,
              },
              {
                id: 'Associations',
                label: 'Associations',
                value: 87,
              },
              {
                id: 'Associations',
                label: 'Autres acteurs privés',
                value: 24,
              },
            ],
          },
          {
            id: 'labels',
            label: 'Labels',
            statistics: [
              {
                id: 'structures-accueillant-des-cnfs',
                label: 'Structures accueillant des CNFS',
                value: 12,
              },
              {
                id: 'structures-labellisées-france-services',
                label: 'Structures labellisées France Services',
                value: 32,
              },
              {
                id: 'structures-habilitées-aidants-connect',
                label: 'Structures habilitées Aidants Connect',
                value: 76,
              },
            ],
          },
          {
            id: 'territoires-prioritaires',
            label: 'Territoires prioritaires',
            statistics: [
              {
                id: 'structures-en-quartier-prioritaire-de-la-ville-qpv',
                label: 'Structures en quartier prioritaire de la ville (QPV)',
                value: 12,
              },
              {
                id: 'structures-en-zone-de-revitalisation-rurale-zrr',
                label: 'Structures en zone de revitalisation rurale (ZRR)',
                value: 32,
              },
            ],
          },
        ],
      },
      {
        id: 'aidants-numériques-identifiés',
        label: 'Aidants Numériques identifiés',
        value: 123,
        statistics: [
          {
            id: 'conseillers',
            statistics: [
              {
                id: 'conseillers-numériques',
                label: 'Conseillers Numériques',
                value: 43,
                statistics: [
                  {
                    id: 'dont-conseillers-coordinateurs',
                    label: 'dont Conseillers Coordinateurs',
                    value: 2,
                  },
                ],
              },
              {
                id: 'aidants-habilités-à-aidant-connect',
                label: 'Aidants habilités à Aidant connect',
                value: 12,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'publics-accompagnés-dans-les-ardennes',
    label: 'Publics accompagnés dans les Ardennes',
    blocs: [
      {
        id: 'usagers-accompagnés',
        label: 'Usagers accompagnés',
        value: 123,
        statistics: [
          {
            id: 'par-des-conseillers-numériques',
            label: 'Par des Conseillers Numériques',
            value: 12,
            updated: new Date('2021-09-04'),
            source: 'conseiller-numerique.gouv.fr',
          },
          {
            id: 'par-des-aidants-habilités-à-aidants-connect',
            label: 'Par des Aidants habilités à Aidants Connect',
            value: 12,
            updated: new Date('2021-09-04'),
            source: 'https://aidantsconnect.beta.gouv.fr/',
          },
        ],
      },
    ],
  },
  {
    id: 'accompagnements-dans-les-ardennes',
    label: 'Accompagnements dans les Ardennes',
    blocs: [
      {
        id: 'accompagnement',
        label: 'Accompagnement',
        value: 123,
        statistics: [
          {
            id: 'accompagnements-de-médiation-numérique',
            label: 'Accompagnements de médiation numérique',
            value: 12,
            updated: new Date('2021-09-04'),
            source: 'conseiller-numerique.gouv.fr',
          },
          {
            id: 'accompagnements-pour-réaliser-des-démarches-en-lignes',
            label: 'Accompagnements pour réaliser des démarches en lignes',
            value: 12,
            updated: new Date('2021-09-04'),
            source: 'https://aidantsconnect.beta.gouv.fr/',
          },
        ],
      },
    ],
  },
]
