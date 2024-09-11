/* eslint-disable no-sparse-arrays */

import { ActivitesFiltersLabels } from '@app/web/cra/generateActivitesFiltersLabels'
import { AuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { MesStatistiquesPageData } from '@app/web/app/coop/mes-statistiques/getMesStatistiquesPageData'
import { buildStatistiquesWorksheet } from './buildStatistiquesWorksheet'

const DATE = new Date('2024-09-11T17:42:00.000Z')

const STATISTIQUES_WORKSHEET_INPUT: {
  user: Pick<
    AuthenticatedMediateur,
    'firstName' | 'lastName' | 'role' | 'mediateur' | 'coordinateur'
  >
  filters: Partial<ActivitesFiltersLabels>
  statistiques: MesStatistiquesPageData
} = {
  user: {
    firstName: 'John',
    lastName: 'Doe',
    role: 'User',
    mediateur: {
      id: '5',
      conseillerNumerique: { id: '4' },
      _count: { enActivite: 4 },
    },
    coordinateur: null,
  },
  filters: {
    du: '01/08/2024',
    au: '31/08/2024',
    typeLieu: 'Commune',
    nomLieu: 'Lyon',
    type: 'Accompagnement',
  },
  statistiques: {
    totalCounts: {
      activites: {
        collectifs: { total: 4, proportion: 20, participants: 28 },
      },
      accompagnements: {
        total: 44,
        individuels: { total: 8, proportion: 18.21 },
        collectifs: { total: 28, proportion: 63.6 },
        demarches: { total: 8, proportion: 18.2 },
      },
      beneficiaires: {
        total: 23,
        suivis: 2,
        anonymes: 21,
      },
    },
    beneficiaires: {
      genres: [
        {
          label: 'Masculin',
          count: 1,
          proportion: 4.35,
        },
        {
          label: 'Féminin',
          count: 0,
          proportion: 0,
        },
        {
          label: 'Non communiqué',
          count: 22,
          proportion: 95.65,
        },
      ],
      trancheAges: [
        {
          label: '70 ans et plus',
          count: 0,
          proportion: 0,
        },
        {
          label: '60 - 69 ans',
          count: 0,
          proportion: 0,
        },
        {
          label: '40 - 59 ans',
          count: 11,
          proportion: 47.83,
        },
        {
          label: '25 - 39 ans',
          count: 6,
          proportion: 26.01,
        },
        {
          label: '18 - 24 ans',
          count: 1,
          proportion: 4.35,
        },
        {
          label: 'Mineur(e)',
          count: 0,
          proportion: 0,
        },
        {
          label: 'Non communiqué',
          count: 5,
          proportion: 21.74,
        },
      ],
      statutsSocial: [
        {
          label: 'Retraité',
          count: 0,
          proportion: 0,
        },
        {
          label: 'Sans emploi',
          count: 0,
          proportion: 0,
        },
        {
          label: 'En emploi',
          count: 17,
          proportion: 73.91,
        },
        {
          label: 'Scolarisé',
          count: 4,
          proportion: 17.39,
        },
        {
          label: 'Non communiqué ou hétérogène',
          count: 2,
          proportion: 8.7,
        },
      ],
      communes: [
        {
          count: 2,
          label: 'Paris · 75001',
          proportion: 66.667,
        },
        {
          count: 1,
          label: 'Lyon 2eme · 69002',
          proportion: 33.33,
        },
      ],
    },
    accompagnementsParMois: [
      { count: 2, label: 'Oct.' },
      { count: 6, label: 'Nov.' },
      { count: 8, label: 'Déc.' },
      { count: 6, label: 'Jan.' },
      { count: 12, label: 'Fév.' },
      { count: 12, label: 'Mars' },
      { count: 14, label: 'Avr.' },
      { count: 9, label: 'Mai' },
      { count: 10, label: 'Juin' },
      { count: 4, label: 'Juil.' },
      { count: 2, label: 'Août' },
      { count: 7, label: 'Sep.' },
    ],
    activites: {
      thematiques: [
        {
          label: 'Prendre en main du matériel',
          count: 0,
          proportion: 0,
        },
        {
          label: 'Navigation sur internet',
          count: 0,
          proportion: 0,
        },
        {
          label: 'E-mail',
          count: 6,
          proportion: 25,
        },
        {
          label: 'Bureautique',
          count: 0,
          proportion: 0,
        },
        {
          label: 'Réseaux sociaux communication',
          count: 4,
          proportion: 16.67,
        },
        {
          label: 'Santé',
          count: 6,
          proportion: 25,
        },
        {
          label: 'Banque et achats en ligne',
          count: 0,
          proportion: 0,
        },
        {
          label: 'Entrepreneuriat',
          count: 0,
          proportion: 0,
        },
        {
          label: 'Insertion professionnelle',
          count: 2,
          proportion: 8.33,
        },
        {
          label: 'Prévention en sécurité numérique',
          count: 0,
          proportion: 0,
        },
        {
          label: 'Parentalité',
          count: 2,
          proportion: 8.33,
        },
        {
          label: 'Scolarité et numérique',
          count: 0,
          proportion: 0,
        },
        {
          label: 'Créer avec le numérique',
          count: 0,
          proportion: 0,
        },
        {
          label: 'Culture numérique',
          count: 4,
          proportion: 16.67,
        },
      ],
      thematiquesDemarches: [
        {
          label: 'Papiers - Élections Citoyenneté',
          count: 0,
          proportion: 0,
        },
        {
          label: 'Famille - Scolarité',
          count: 2,
          proportion: 12.5,
        },
        {
          label: 'Social - Santé',
          count: 6,
          proportion: 37.5,
        },
        {
          label: 'Travail - Formation',
          count: 0,
          proportion: 0,
        },
        {
          label: 'Logement',
          count: 2,
          proportion: 12.5,
        },
        {
          label: 'Transports - Mobilité',
          count: 2,
          proportion: 12.5,
        },
        {
          label: 'Argent - Impôts',
          count: 0,
          proportion: 0,
        },
        {
          label: 'Justice',
          count: 2,
          proportion: 12.5,
        },
        {
          label: 'Étrangers - Europe',
          count: 2,
          proportion: 12.5,
        },
        {
          label: 'Loisirs - Sports Culture',
          count: 0,
          proportion: 0,
        },
      ],
      materiels: [
        {
          label: 'Ordinateur',
          count: 6,
          proportion: 50,
        },
        {
          label: 'Téléphone',
          count: 2,
          proportion: 16.67,
        },
        {
          label: 'Tablette',
          count: 2,
          proportion: 16.67,
        },
        {
          label: 'Autre matériel',
          count: 2,
          proportion: 16.67,
        },
        {
          label: 'Pas de matériel',
          count: 0,
          proportion: 0,
        },
      ],
      mergedTypeLieu: [
        {
          label: 'Lieu d’activité',
          count: 0,
          proportion: 0,
        },
        {
          label: 'À domicile',
          count: 4,
          proportion: 20,
        },
        {
          label: 'À distance',
          count: 12,
          proportion: 60,
        },
        {
          label: 'Autre lieu',
          count: 4,
          proportion: 20,
        },
      ],
      durees: [
        {
          label: '30min',
          count: 0,
          proportion: 0,
        },
        {
          label: '1h',
          count: 0,
          proportion: 0,
        },
        {
          label: '1h30',
          count: 20,
          proportion: 100,
        },
        {
          label: '2h',
          count: 0,
          proportion: 0,
        },
      ],
    },
    structures: [
      {
        nom: 'Exemple de Mediateque',
        count: 4,
        proportion: 100,
      },
    ],
  } as MesStatistiquesPageData,
}

describe('buildStatistiquesWorksheet', () => {
  it('should create a workbook with Statistiques worksheet', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    expect(worksheet).toBeDefined()
  })

  it('should contains bold `Informations export` in Statistiques worksheet at position A1', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const exportTitleCell = worksheet?.getCell('A1')

    expect(exportTitleCell?.value).toBe('Informations export')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains Informations export in Statistiques worksheet from row 2 to 6', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const rows = worksheet?.getRows(2, 6)?.map((row) => row.values)

    expect(rows).toStrictEqual([
      [, 'Nom', 'Doe'],
      [, 'Prénom', 'John'],
      [, 'Rôle', 'Conseiller numérique'],
      [, "Date d'export", '11/09/2024'],
      [, "Heure d'export", '17:42'],
      [],
    ])
  })

  it('should contains bold `Filtres :` in Statistiques worksheet at position A8', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const exportTitleCell = worksheet?.getCell('A8')

    expect(exportTitleCell?.value).toBe('Filtres :')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains Filters in Statistiques worksheet from row 9 to 15', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const rows = worksheet?.getRows(9, 6)?.map((row) => row.values)

    expect(rows).toStrictEqual([
      [, 'Début de période', '01/08/2024'],
      [, 'Fin de période', '31/08/2024'],
      [, 'Type de lieu', 'Commune'],
      [, 'Nom du lieu', 'Lyon'],
      [, "Type d'accompagnement", 'Accompagnement'],
      [],
    ])
  })

  it('should contains bold `Statistiques générales sur vos accompagnements` in Statistiques worksheet at position A15', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const exportTitleCell = worksheet?.getCell('A15')

    expect(exportTitleCell?.value).toBe(
      'Statistiques générales sur vos accompagnements',
    )
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains statistiques general in Statistiques worksheet from row 16 to 21', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const rows = worksheet?.getRows(16, 6)?.map((row) => row.values)

    expect(rows).toStrictEqual([
      [, 'Accompagnements au total', 44],
      [, 'Bénéficiaires accompagnés', 23],
      [, 'Bénéficiaires suivis', 2],
      [, 'Nom Bénéficiaires anonymes', 21],
      [
        ,
        'Accompagnements sur les 12 derniers mois',
        2,
        6,
        8,
        6,
        12,
        12,
        14,
        9,
        10,
        4,
        2,
        7,
      ],
      [],
    ])
  })

  it('should contains bold `Statistiques sur vos activités` in Statistiques worksheet at position A22', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const exportTitleCell = worksheet?.getCell('A22')

    expect(exportTitleCell?.value).toBe('Statistiques sur vos activités')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains statistiques activités in Statistiques worksheet from row 23 to 26', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const rows = worksheet?.getRows(23, 5)?.map((row) => row.values)

    expect(rows).toStrictEqual([
      [, 'Accompagnements individuels', 8, '18.21%'],
      [, 'Ateliers collectifs', 28, '63.60%'],
      [, 'Aide aux démarches administratives', 8, '18.20%'],
      [, 'Nombre total de participants aux ateliers', 28],
      [],
    ])
  })

  it('should contains bold `Thématiques Médiation numérique` in Statistiques worksheet at position A28', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const exportTitleCell = worksheet?.getCell('A28')

    expect(exportTitleCell?.value).toBe('Thématiques Médiation numérique')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains Thématiques Médiation numérique in Statistiques worksheet from row 29 to 34', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const rows = worksheet?.getRows(29, 15)?.map((row) => row.values)

    expect(rows).toStrictEqual([
      [, 'Prendre en main du matériel', 0, '0%'],
      [, 'Navigation sur internet', 0, '0%'],
      [, 'E-mail', 6, '25%'],
      [, 'Bureautique', 0, '0%'],
      [, 'Réseaux sociaux communication', 4, '16.67%'],
      [, 'Santé', 6, '25%'],
      [, 'Banque et achats en ligne', 0, '0%'],
      [, 'Entrepreneuriat', 0, '0%'],
      [, 'Insertion professionnelle', 2, '8.33%'],
      [, 'Prévention en sécurité numérique', 0, '0%'],
      [, 'Parentalité', 2, '8.33%'],
      [, 'Scolarité et numérique', 0, '0%'],
      [, 'Créer avec le numérique', 0, '0%'],
      [, 'Culture numérique', 4, '16.67%'],
      [],
    ])
  })

  it('should contains bold `Thématiques Démarches administratives` in Statistiques worksheet at position A44', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const exportTitleCell = worksheet?.getCell('A44')

    expect(exportTitleCell?.value).toBe('Thématiques Démarches administratives')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains Thématiques Démarches administratives in Statistiques worksheet from row 45 to 55', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const rows = worksheet?.getRows(45, 11)?.map((row) => row.values)

    expect(rows).toStrictEqual([
      [, 'Papiers - Élections Citoyenneté', 0, '0%'],
      [, 'Famille - Scolarité', 2, '12.5%'],
      [, 'Social - Santé', 6, '37.5%'],
      [, 'Travail - Formation', 0, '0%'],
      [, 'Logement', 2, '12.5%'],
      [, 'Transports - Mobilité', 2, '12.5%'],
      [, 'Argent - Impôts', 0, '0%'],
      [, 'Justice', 2, '12.5%'],
      [, 'Étrangers - Europe', 2, '12.5%'],
      [, 'Loisirs - Sports Culture', 0, '0%'],
      [],
    ])
  })

  it('should contains bold `Matériel utilisés` in Statistiques worksheet at position A44', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const exportTitleCell = worksheet?.getCell('A56')

    expect(exportTitleCell?.value).toBe('Matériel utilisés')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains Matériel utilisés in Statistiques worksheet from row 57 to 61', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const rows = worksheet?.getRows(57, 6)?.map((row) => row.values)

    expect(rows).toStrictEqual([
      [, 'Ordinateur', 6, '50%'],
      [, 'Téléphone', 2, '16.67%'],
      [, 'Tablette', 2, '16.67%'],
      [, 'Autre matériel', 2, '16.67%'],
      [, 'Pas de matériel', 0, '0%'],
      [],
    ])
  })

  it('should contains bold `Canaux des activités` in Statistiques worksheet at position A63', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const exportTitleCell = worksheet?.getCell('A63')

    expect(exportTitleCell?.value).toBe('Canaux des activités')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains Canaux des activités in Statistiques worksheet from row 64 to 68', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const rows = worksheet?.getRows(64, 5)?.map((row) => row.values)

    expect(rows).toStrictEqual([
      [, 'Lieu d’activité', 0, '0%'],
      [, 'À domicile', 4, '20%'],
      [, 'À distance', 12, '60%'],
      [, 'Autre lieu', 4, '20%'],
      [],
    ])
  })

  it('should contains bold `Durées des activités` in Statistiques worksheet at position A68', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const exportTitleCell = worksheet?.getCell('A69')

    expect(exportTitleCell?.value).toBe('Durées des activités')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains Durées des activités in Statistiques worksheet from row 70 to 75', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const rows = worksheet?.getRows(70, 5)?.map((row) => row.values)

    expect(rows).toStrictEqual([
      [, '30min', 0, '0%'],
      [, '1h', 0, '0%'],
      [, '1h30', 20, '100%'],
      [, '2h', 0, '0%'],
      [],
    ])
  })

  it("should contains bold `Nombre d'activités par lieux` in Statistiques worksheet at position A75", () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const exportTitleCell = worksheet?.getCell('A75')

    expect(exportTitleCell?.value).toBe("Nombre d'activités par lieux")
    expect(exportTitleCell?.font.bold).toBe(true)
    expect(exportTitleCell?.fill).toStrictEqual({
      bgColor: { argb: 'F4CCCCFF' },
      pattern: 'solid',
      type: 'pattern',
    })
  })

  it("should contains Nombre d'activités par lieux in Statistiques worksheet from row 76 to 77", () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const rows = worksheet?.getRows(76, 2)?.map((row) => row.values)

    expect(rows).toStrictEqual([[, 'Exemple de Mediateque', 4, '100%'], []])
  })

  it('should contains bold `Statistiques sur vos bénéficiaires` in Statistiques worksheet at position A78', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const exportTitleCell = worksheet?.getCell('A78')

    expect(exportTitleCell?.value).toBe('Statistiques sur vos bénéficiaires')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains bold `Statistiques sur vos bénéficiaires` in Statistiques worksheet at position A79', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const exportTitleCell = worksheet?.getCell('A79')

    expect(exportTitleCell?.value).toBe('Genre')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains Statistiques bénéficiaires in Statistiques worksheet from row 80 to 84', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const rows = worksheet?.getRows(80, 4)?.map((row) => row.values)

    expect(rows).toStrictEqual([
      [, 'Masculin', 1, '4.35%'],
      [, 'Féminin', 0, '0%'],
      [, 'Non communiqué', 22, '95.65%'],
      [],
    ])
  })

  it('should contains bold `Tranches d’âge` in Statistiques worksheet at position A84', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const exportTitleCell = worksheet?.getCell('A84')

    expect(exportTitleCell?.value).toBe('Tranches d’âge')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains Tranches d’âge in Statistiques worksheet from row 85 to 92', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const rows = worksheet?.getRows(85, 8)?.map((row) => row.values)

    expect(rows).toStrictEqual([
      [, '70 ans et plus', 0, '0%'],
      [, '60 - 69 ans', 0, '0%'],
      [, '40 - 59 ans', 11, '47.83%'],
      [, '25 - 39 ans', 6, '26.01%'],
      [, '18 - 24 ans', 1, '4.35%'],
      [, 'Mineur(e)', 0, '0%'],
      [, 'Non communiqué', 5, '21.74%'],
      [],
    ])
  })

  it('should contains bold `Statuts` in Statistiques worksheet at position A93', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const exportTitleCell = worksheet?.getCell('A93')

    expect(exportTitleCell?.value).toBe('Statuts')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains Statuts in Statistiques worksheet from row 94 to 100', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const rows = worksheet?.getRows(94, 6)?.map((row) => row.values)

    expect(rows).toStrictEqual([
      [, 'Retraité', 0, '0%'],
      [, 'Sans emploi', 0, '0%'],
      [, 'En emploi', 17, '73.91%'],
      [, 'Scolarisé', 4, '17.39%'],
      [, 'Non communiqué ou hétérogène', 2, '8.7%'],
      [],
    ])
  })

  it('should contains bold `Commune de résidence des bénéficiaires` in Statistiques worksheet at position A100', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const exportTitleCell = worksheet?.getCell('A100')

    expect(exportTitleCell?.value).toBe(
      'Commune de résidence des bénéficiaires',
    )
    expect(exportTitleCell?.font.bold).toBe(true)
    expect(exportTitleCell?.fill).toStrictEqual({
      bgColor: { argb: 'F4CCCCFF' },
      pattern: 'solid',
      type: 'pattern',
    })
  })

  it('should contains Commune de résidence des bénéficiaires in Statistiques worksheet from row 101 to 104', () => {
    const workbook = buildStatistiquesWorksheet(DATE)(
      STATISTIQUES_WORKSHEET_INPUT,
    )
    const worksheet = workbook.getWorksheet('Statistiques')

    const rows = worksheet?.getRows(101, 3)?.map((row) => row.values)

    expect(rows).toStrictEqual([
      [, 'Paris · 75001', 2, '66.667%'],
      [, 'Lyon 2eme · 69002', 1, '33.33%'],
      [],
    ])
  })
})

/* eslint-enable */
