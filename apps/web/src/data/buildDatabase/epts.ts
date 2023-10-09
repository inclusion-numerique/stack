/**
 * Les EPTs sont des sous EPCI du Grand Paris
 */

export const epts = new Map(
  [
    {
      code: '200057867',
      nom: 'Plaine Commune',
    },
    {
      code: '200057875',
      nom: 'Est Ensemble',
    },
    {
      code: '200057941',
      nom: 'Paris Est Marne et Bois',
    },
    {
      code: '200057966',
      nom: 'Vallée Sud-Grand Paris',
    },
    {
      code: '200057974',
      nom: 'Grand Paris Seine Ouest',
    },
    {
      code: '200057982',
      nom: 'Paris Ouest La Défense',
    },
    {
      code: '200057990',
      nom: 'Boucle Nord de Seine',
    },
    {
      code: '200058006',
      nom: 'Grand Paris Sud Est Avenir',
    },
    {
      code: '200058014',
      nom: 'Grand-Orly Seine Bièvre',
    },
    {
      code: '200058097',
      nom: 'Paris Terres d’Envol',
    },
    {
      code: '200058790',
      nom: 'Grand Paris Grand Est',
    },
  ].map((ept) => [
    ept.code,
    { ...ept, epciParentCode: '200054781', population: 0 },
  ]),
)
