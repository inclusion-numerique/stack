import { generateUtilisateursFiltersLabels } from './generateUtilisateursFiltersLabels'

const COMMUNES_OPTIONS = [
  { value: '69382', label: 'Lyon 2eme · 69002' },
  { value: '75101', label: 'Paris 1er · 75001' },
]
const DEPARTEMENTS_OPTIONS = [
  { value: '69', label: '69 · Rhône' },
  { value: '75', label: '75 · Paris' },
]
const LIEUX_ACTIVITE_OPTIONS = [
  {
    value: '36929ed7-3b6f-4ed3-9924-b5e1a6c27096',
    label: 'Exemple de Mediateque',
    extra: {
      nom: 'Exemple de Mediateque',
      adresse: '2 rue des livres, 69002 Lyon 2eme',
      activites: 4,
      mostUsed: true,
    },
  },
  {
    value: '36f20d7e-90ed-4932-911a-55320617ad56',
    label: 'Exemple de Centre Social',
    extra: {
      nom: 'Exemple de Centre Social',
      adresse: '3 rue des amis, 75003 Paris 3eme',
      activites: 0,
      mostUsed: false,
    },
  },
]

describe('generate activites filters labels', () => {
  it('should generate no labels', () => {
    const labels = generateUtilisateursFiltersLabels(
      {},
      {
        communesOptions: COMMUNES_OPTIONS,
        departementsOptions: DEPARTEMENTS_OPTIONS,
        lieuxActiviteOptions: LIEUX_ACTIVITE_OPTIONS,
      },
    )

    expect(labels).toEqual([])
  })

  it('should generate all labels', () => {
    const labels = generateUtilisateursFiltersLabels(
      {
        lieux: ['36929ed7-3b6f-4ed3-9924-b5e1a6c27096'],
        communes: ['69382'],
        departements: ['69'],
        statut: 'inscription',
      },
      {
        communesOptions: COMMUNES_OPTIONS,
        departementsOptions: DEPARTEMENTS_OPTIONS,
        lieuxActiviteOptions: LIEUX_ACTIVITE_OPTIONS,
      },
    )

    expect(labels).toEqual([
      {
        key: 'inscription',
        label: 'Inscription en cours',
        type: 'statut',
      },
      {
        label: 'Exemple de Mediateque',
        key: '36929ed7-3b6f-4ed3-9924-b5e1a6c27096',
        type: 'lieux',
      },
      {
        key: '69382',
        label: 'Lyon 2eme · 69002',
        type: 'communes',
      },
      {
        key: '69',
        label: '69 · Rhône',
        type: 'departements',
      },
    ])
  })
})
