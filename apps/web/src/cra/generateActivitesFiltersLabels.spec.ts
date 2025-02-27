import { generateActivitesFiltersLabels } from './generateActivitesFiltersLabels'

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
const MEDIATEURS_OPTIONS = [
  {
    label: 'Coordinateur Inscrit avec tout (Mes statistiques)',
    value: {
      mediateurId: '379a0d7e-54ac-4db6-95c4-3752cdd05d32',
      email:
        'coordinateur-inscrit-avec-tout@coop-mediation-numerique.anct.gouv.fr',
    },
  },
  {
    label: 'Médiateur Avec activités',
    value: {
      mediateurId: '303381cc-3da7-433d-a553-1a5f76465989',
      email: 'mediateur-avec-activites@coop-mediation-numerique.anct.gouv.fr',
    },
  },
  {
    label: 'Conseiller Num Inscrit',
    value: {
      mediateurId: '1ae07d95-316c-489f-893a-d17052c883b7',
      email: 'conseiller-num-inscrit@coop-mediation-numerique.anct.gouv.fr',
    },
  },
]
const BENEFICIAIRES_OPTIONS = [
  {
    label: 'Marcel Sans accompagnements',
    value: {
      id: 'afcbdd63-7dd9-4342-9fa6-084e7a785406',
      mediateurId: '379a0d7e-54ac-4db6-95c4-3752cdd05d32',
      prenom: 'Marcel',
      nom: 'Sans accompagnements',
      communeResidence: {
        id: '38140',
        nom: 'Crolles',
        codePostal: '38920',
        codeInsee: '38140',
        commune: 'Crolles',
        latitude: 0,
        longitude: 0,
        contexte: '',
        label: 'Crolles',
      },
      trancheAge: 'VingtCinqTrenteNeuf' as const,
      anneeNaissance: null,
      creation: '2024-08-03T00:00:00.000Z',
      _count: { accompagnements: 0 },
    },
  },
  {
    label: 'Georges Maximal',
    value: {
      id: '7d6091bc-dc91-4d1b-b357-f101e9eb6217',
      mediateurId: '379a0d7e-54ac-4db6-95c4-3752cdd05d32',
      prenom: 'Georges',
      nom: 'Maximal',
      communeResidence: {
        id: '69382',
        nom: 'Lyon',
        codePostal: '69002',
        codeInsee: '69382',
        commune: 'Lyon',
        latitude: 0,
        longitude: 0,
        contexte: '',
        label: 'Lyon',
      },
      trancheAge: 'QuaranteCinquanteNeuf' as const,
      anneeNaissance: 1980,
      creation: '2024-01-01T00:00:00.000Z',
      _count: { accompagnements: 1 },
    },
  },
  {
    label: 'Juliette Minimale',
    value: {
      id: 'd1f66756-4566-465c-acc7-e6f59898ed42',
      mediateurId: '379a0d7e-54ac-4db6-95c4-3752cdd05d32',
      prenom: 'Juliette',
      nom: 'Minimale',
      trancheAge: null,
      anneeNaissance: null,
      creation: '2024-01-01T00:00:00.000Z',
      _count: { accompagnements: 3 },
    },
  },
]

describe('generate activites filters labels', () => {
  it('should generate no labels', () => {
    const labels = generateActivitesFiltersLabels(
      {},
      {
        communesOptions: COMMUNES_OPTIONS,
        departementsOptions: DEPARTEMENTS_OPTIONS,
        lieuxActiviteOptions: LIEUX_ACTIVITE_OPTIONS,
        mediateursOptions: MEDIATEURS_OPTIONS,
        beneficiairesOptions: BENEFICIAIRES_OPTIONS,
      },
    )

    expect(labels).toEqual([])
  })

  it('should generate all labels', () => {
    const labels = generateActivitesFiltersLabels(
      {
        types: ['individuel', 'demarche', 'collectif'],
        mediateurs: [
          '379a0d7e-54ac-4db6-95c4-3752cdd05d32',
          '1ae07d95-316c-489f-893a-d17052c883b7',
          '303381cc-3da7-433d-a553-1a5f76465989',
        ],
        profil: 'mediateur',
        du: '2025-01-29',
        au: '2025-02-11',
        lieux: ['36929ed7-3b6f-4ed3-9924-b5e1a6c27096'],
        communes: ['69382'],
        departements: ['69'],
        beneficiaires: [
          'afcbdd63-7dd9-4342-9fa6-084e7a785406',
          '7d6091bc-dc91-4d1b-b357-f101e9eb6217',
          'd1f66756-4566-465c-acc7-e6f59898ed42',
        ],
      },
      {
        communesOptions: COMMUNES_OPTIONS,
        departementsOptions: DEPARTEMENTS_OPTIONS,
        lieuxActiviteOptions: LIEUX_ACTIVITE_OPTIONS,
        mediateursOptions: MEDIATEURS_OPTIONS,
        beneficiairesOptions: BENEFICIAIRES_OPTIONS,
      },
    )

    expect(labels).toEqual([
      {
        label: 'Coordinateur Inscrit avec tout (Mes statistiques)',
        key: '379a0d7e-54ac-4db6-95c4-3752cdd05d32',
        type: 'mediateurs',
      },
      {
        label: 'Médiateur Avec activités',
        key: '303381cc-3da7-433d-a553-1a5f76465989',
        type: 'mediateurs',
      },
      {
        label: 'Conseiller Num Inscrit',
        key: '1ae07d95-316c-489f-893a-d17052c883b7',
        type: 'mediateurs',
      },
      {
        label: 'Médiateur',
        key: 'mediateur',
        type: 'profil',
      },
      {
        label: '29.01.2025 - 11.02.2025',
        key: ['du', 'au'],
        type: 'periode',
      },
      {
        label: 'Lieu d’activité : Exemple de Mediateque',
        key: '36929ed7-3b6f-4ed3-9924-b5e1a6c27096',
        type: 'lieux',
      },
      {
        key: '69382',
        label: 'Commune : Lyon 2eme · 69002',
        type: 'communes',
      },
      {
        key: '69',
        label: 'Département : 69 · Rhône',
        type: 'departements',
      },
      {
        label: 'Accompagnement individuel',
        key: 'individuel',
        type: 'types',
      },
      {
        label: 'Aide aux démarches administratives',
        key: 'demarche',
        type: 'types',
      },
      {
        label: 'Atelier collectif',
        key: 'collectif',
        type: 'types',
      },
      {
        label: 'Marcel Sans accompagnements',
        key: 'afcbdd63-7dd9-4342-9fa6-084e7a785406',
        type: 'beneficiaires',
      },
      {
        label: 'Georges Maximal',
        key: '7d6091bc-dc91-4d1b-b357-f101e9eb6217',
        type: 'beneficiaires',
      },
      {
        label: 'Juliette Minimale',
        key: 'd1f66756-4566-465c-acc7-e6f59898ed42',
        type: 'beneficiaires',
      },
    ])
  })
})
