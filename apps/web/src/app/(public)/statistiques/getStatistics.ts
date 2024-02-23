export type StatisticsTimeframe = 'semaine' | 'mois' | 'total'

// In french for query params
export type StatisticsParams = {
  recherche?: StatisticsTimeframe
  fonctionnalites?: StatisticsTimeframe
}

export const statisticsTimeframeLabels: {
  [key in StatisticsTimeframe]: string
} = {
  semaine: 'Par semaine',
  mois: 'Par mois',
  total: 'Cumulé',
}
export const getStatistics = (_params: StatisticsParams) =>
  Promise.resolve({
    kpi: {
      publications: {
        count: 344,
        public: 235,
        private: 109,
      },
      views: {
        count: 14_719,
        lastMonth: 818,
        change: 17,
      },
      rates: {
        count: 448,
        average: 7.3,
      },
    },
    search: {
      data: [
        {
          period: '23 Oct.',
          searchExecutions: 420,
          resourceViews: 758,
          savedResources: 125,
        },
        {
          period: '23 Nov.',
          searchExecutions: 550,
          resourceViews: 422,
          savedResources: 963,
        },
        {
          period: '23 Déc.',
          searchExecutions: 280,
          resourceViews: 596,
          savedResources: 415,
        },
        {
          period: '23 Jan.',
          searchExecutions: 770,
          resourceViews: 567,
          savedResources: 758,
        },
      ],
    },
    creation: {
      ressources: {
        data: [
          { period: '23 Oct.', drafts: 745, publics: 375, privates: 783 },
          { period: '23 Nov.', drafts: 387, publics: 489, privates: 534 },
          { period: '23 Déc.', drafts: 735, publics: 698, privates: 867 },
          { period: '23 Jan.', drafts: 287, publics: 987, privates: 782 },
        ],
        proportions: {
          drafts: 22,
          publics: 43,
          privates: 35,
        },
      },
      profils: {
        data: [
          { period: '23 Oct.', publics: 385, privates: 654 },
          { period: '23 Nov.', publics: 378, privates: 554 },
          { period: '23 Déc.', publics: 453, privates: 222 },
          { period: '23 Jan.', publics: 876, privates: 879 },
        ],
        proportions: {
          publics: 68,
          privates: 32,
        },
      },
      bases: {
        data: [
          { period: '23 Oct.', publics: 687, privates: 376 },
          { period: '23 Nov.', publics: 789, privates: 287 },
          { period: '23 Déc.', publics: 453, privates: 387 },
          { period: '23 Jan.', publics: 978, privates: 193 },
        ],
        proportions: {
          publics: 76,
          privates: 24,
        },
      },
    },
    usage: {
      thematiques: [
        { label: 'Logiciels et outils numériques', value: 144 },
        { label: 'Communication en ligne/réseaux sociaux', value: 88 },
        { label: 'Risques liés aux usages du numérique', value: 75 },
        { label: 'Numérique inclusif', value: 66 },
      ],
      publics: [
        { label: 'Tous publics', value: 144 },
        { label: 'Adultes', value: 88 },
        { label: 'Médiateurs numériques', value: 75 },
        {
          label: 'Professionnels de l’accompagnement (social, numérique…)',
          value: 66,
        },
      ],
    },
  })

export type Statistics = Awaited<ReturnType<typeof getStatistics>>
