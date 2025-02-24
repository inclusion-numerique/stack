import { computeProportion } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/allocatePercentages'
import type { MesStatistiquesPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/getMesStatistiquesPageData'
import { dureeAccompagnementStatisticsRanges } from '@app/web/cra/cra'
import { numberToPercentage } from '@app/web/utils/formatNumber'
import type { Workbook, Worksheet } from 'exceljs'
import {
  type BuildStatistiquesWorksheetInput,
  buildStatistiquesWorksheet,
} from './buildStatistiquesWorksheet'

const DATE = new Date('2024-09-11T17:42:00.000Z')

const STATISTIQUES_WORKSHEET_INPUT_BASE: Omit<
  BuildStatistiquesWorksheetInput,
  'mediateur' | 'filters'
> = {
  worksheetGenerationDate: DATE,
  user: {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    role: 'User',
    mediateur: {
      id: '5',
      conseillerNumerique: { id: '4' },
    },
    coordinateur: null,
  },
  statistiques: {
    totalCounts: {
      activites: {
        total: 20,
        collectifs: { total: 4, proportion: 20, participants: 28 },
        individuels: { total: 8, proportion: 40 },
        demarches: { total: 8, proportion: 40 },
      },
      accompagnements: {
        total: 44,
        individuels: { total: 8, proportion: 40 },
        collectifs: { total: 28, proportion: 20 },
        demarches: { total: 8, proportion: 40 },
      },
      beneficiaires: {
        total: 23,
        nouveaux: 6,
        suivis: 2,
        anonymes: 21,
      },
    },
    beneficiaires: {
      genres: [
        {
          label: 'Masculin',
          count: 2,
          proportion: 10,
        },
        {
          label: 'Féminin',
          count: 0,
          proportion: 0,
        },
        {
          label: 'Non communiqué',
          count: 18,
          proportion: 90,
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
          count: 8,
          proportion: 34.8,
        },
        {
          label: '18 - 24 ans',
          count: 1,
          proportion: 4.3,
        },
        {
          label: '12 - 17 ans',
          count: 0,
          proportion: 0,
        },
        {
          label: 'Moins de 12 ans',
          count: 0,
          proportion: 0,
        },
        {
          label: 'Non communiqué',
          count: 3,
          proportion: 13,
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
          label: 'Gérer ses contenus numériques',
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
      typeLieu: [
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
      durees: dureeAccompagnementStatisticsRanges.map(({ label }, index) => ({
        label,
        count: index === 2 ? 20 : 0,
        proportion: index === 2 ? 100 : 0,
      })),
    },
    structures: [
      {
        nom: 'Exemple de Mediateque',
        count: 4,
        proportion: 100,
        label: 'Exemple de Mediateque',
      },
    ],
  } as MesStatistiquesPageData,
}

const STATISTIQUES_WORKSHEET_INPUT_FOR_MEDIATEUR: BuildStatistiquesWorksheetInput =
  {
    ...STATISTIQUES_WORKSHEET_INPUT_BASE,
    mediateur: {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      role: 'User',
      mediateur: {
        id: '5',
        conseillerNumerique: { id: '4' },
      },
      coordinateur: null,
    },
    filters: {
      du: '01/08/2024',
      au: '31/08/2024',
      typeLieu: 'Commune',
      nomLieu: 'Lyon',
      type: 'Accompagnement',
      beneficiaire: null,
      mediateur: null,
      lieu: null,
      periode: null,
      profil: 'mediateur',
    },
  }

const STATISTIQUES_WORKSHEET_INPUT_FOR_COORDINATEUR: BuildStatistiquesWorksheetInput =
  {
    ...STATISTIQUES_WORKSHEET_INPUT_BASE,
    mediateur: {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      role: 'User',
      mediateur: null,
      coordinateur: {
        id: '1',
        conseillerNumeriqueId: '2',
        mediateursCoordonnes: [],
      },
    },
    filters: {
      du: '01/08/2024',
      au: '31/08/2024',
      typeLieu: 'Commune',
      nomLieu: 'Lyon',
      type: 'Accompagnement',
      beneficiaire: null,
      mediateur: 'Marie Doe',
      lieu: null,
      periode: null,
      profil: 'mediateur',
    },
  }

const expectQuantifiedShareRows = (
  // label, count
  expectedRows: [string, number][],
) => {
  const proportionTotal = expectedRows.reduce(
    (total, [, count]) => total + count,
    0,
  )

  return expectedRows.map(([label, count]) => [
    undefined,
    label,
    count,
    numberToPercentage(computeProportion(count, proportionTotal)),
  ])
}

describe('build statistiques worksheet for médiateur', () => {
  let workbook: Workbook
  let worksheet: Worksheet

  beforeAll(() => {
    workbook = buildStatistiquesWorksheet(
      STATISTIQUES_WORKSHEET_INPUT_FOR_MEDIATEUR,
    )
    const generatedWorksheet = workbook.getWorksheet('Statistiques')
    if (!generatedWorksheet) {
      throw new Error('Worksheet "Statistiques" not found')
    }
    worksheet = generatedWorksheet
  })

  it('should create a workbook with Statistiques worksheet', () => {
    expect(worksheet).toBeDefined()
  })

  it('should contains bold `Informations export` in Statistiques worksheet at position A1', () => {
    const exportTitleCell = worksheet.getCell('A1')

    expect(exportTitleCell?.value).toBe('Informations export')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains Informations export in Statistiques worksheet from row 2 to 6', () => {
    const rows = worksheet.getRows(2, 6)?.map((row) => row.values)

    expect(rows).toEqual([
      [undefined, 'Nom', 'Doe'],
      [undefined, 'Prénom', 'John'],
      [undefined, 'Rôle', 'Conseiller Numérique'],
      [undefined, 'Date d’export', '11/09/2024'],
      [undefined, 'Heure d’export', '17:42'],
      [],
    ])
  })

  it('should contains bold `Filtres :` in Statistiques worksheet at position A8', () => {
    const exportTitleCell = worksheet.getCell('A8')

    expect(exportTitleCell?.value).toBe('Filtres')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains Filters in Statistiques worksheet from row 9 to 15', () => {
    const rows = worksheet.getRows(9, 7)?.map((row) => row.values)

    expect(rows).toEqual([
      [undefined, 'Début de période', '01/08/2024'],
      [undefined, 'Fin de période', '31/08/2024'],
      [undefined, 'Type de lieu', 'Commune'],
      [undefined, 'Nom du lieu', 'Lyon'],
      [undefined, 'Type d’accompagnement', 'Accompagnement'],
      [undefined, 'Profil', 'mediateur'],
      [],
    ])
  })

  it('should contains bold `Statistiques générales sur vos accompagnements` in Statistiques worksheet at position A16', () => {
    const exportTitleCell = worksheet.getCell('A16')

    expect(exportTitleCell?.value).toBe(
      'Statistiques générales sur vos accompagnements',
    )
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains statistiques general in Statistiques worksheet from row 17 to 24', () => {
    const rows = worksheet.getRows(17, 8)?.map((row) => row.values)

    expect(rows).toEqual([
      [undefined, 'Accompagnements au total', 44],
      [undefined, 'Bénéficiaires accompagnés', 23],
      [undefined, 'Nouveaux bénéficiaires', 6],
      [undefined, 'Bénéficiaires suivis', 2],
      [undefined, 'Bénéficiaires anonymes', 21],
      [
        undefined,
        'Accompagnements sur les 12 derniers mois',
        'Oct.',
        'Nov.',
        'Déc.',
        'Jan.',
        'Fév.',
        'Mars',
        'Avr.',
        'Mai',
        'Juin',
        'Juil.',
        'Août',
        'Sep.',
      ],
      [undefined, '', 2, 6, 8, 6, 12, 12, 14, 9, 10, 4, 2, 7],
      [],
    ])
  })

  it('should contains bold `Statistiques sur vos activités` in Statistiques worksheet at position A25', () => {
    const exportTitleCell = worksheet.getCell('A25')

    expect(exportTitleCell?.value).toBe('Statistiques sur vos activités')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains statistiques activités in Statistiques worksheet from row 26 to 30', () => {
    const rows = worksheet.getRows(26, 6)?.map((row) => row.values)

    expect(rows).toEqual([
      [undefined, 'Accompagnements individuels', 8, '40 %'],
      [undefined, 'Ateliers collectifs', 4, '20 %'],
      [undefined, 'Nombre total de participants aux ateliers', 28],
      [undefined, 'Aide aux démarches administratives', 8, '40 %'],
      [undefined, 'Nombre total d’activités', 20],
      [],
    ])
  })

  it('should contains bold `Thématiques Médiation numérique` in Statistiques worksheet at position A32', () => {
    const exportTitleCell = worksheet.getCell('A32')

    expect(exportTitleCell?.value).toBe('Thématiques Médiation numérique')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains Thématiques Médiation numérique in Statistiques worksheet from row 33 to 46', () => {
    const rows = worksheet.getRows(33, 15)?.map((row) => row.values)

    expect(rows).toEqual([
      ...expectQuantifiedShareRows([
        ['Prendre en main du matériel', 0],
        ['Navigation sur internet', 0],
        ['E-mail', 6],
        ['Bureautique', 0],
        ['Réseaux sociaux communication', 4],
        ['Santé', 6],
        ['Banque et achats en ligne', 0],
        ['Entrepreneuriat', 0],
        ['Insertion professionnelle', 2],
        ['Prévention en sécurité numérique', 0],
        ['Parentalité', 2],
        ['Scolarité et numérique', 0],
        ['Gérer ses contenus numériques', 0],
        ['Culture numérique', 4],
      ]),
      [],
    ])
  })

  it('should contains bold `Thématiques Démarches administratives` in Statistiques worksheet at position A48', () => {
    const exportTitleCell = worksheet.getCell('A48')

    expect(exportTitleCell?.value).toBe('Thématiques Démarches administratives')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains Thématiques Démarches administratives in Statistiques worksheet from row 49 to 58', () => {
    const rows = worksheet.getRows(49, 11)?.map((row) => row.values)

    expect(rows).toEqual([
      ...expectQuantifiedShareRows([
        ['Papiers - Élections Citoyenneté', 0],
        ['Famille - Scolarité', 2],
        ['Social - Santé', 6],
        ['Travail - Formation', 0],
        ['Logement', 2],
        ['Transports - Mobilité', 2],
        ['Argent - Impôts', 0],
        ['Justice', 2],
        ['Étrangers - Europe', 2],
        ['Loisirs - Sports Culture', 0],
      ]),
      [],
    ])
  })

  it('should contains bold `Matériel utilisés` in Statistiques worksheet at position A60', () => {
    const exportTitleCell = worksheet.getCell('A60')

    expect(exportTitleCell?.value).toBe('Matériel utilisés')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains Matériel utilisés in Statistiques worksheet from row 61 to 65', () => {
    const rows = worksheet.getRows(61, 6)?.map((row) => row.values)

    expect(rows).toEqual([
      ...expectQuantifiedShareRows([
        ['Ordinateur', 6],
        ['Téléphone', 2],
        ['Tablette', 2],
        ['Autre matériel', 2],
        ['Pas de matériel', 0],
      ]),
      [],
    ])
  })

  it('should contains bold `Canaux des activités` in Statistiques worksheet at position A67', () => {
    const exportTitleCell = worksheet.getCell('A67')

    expect(exportTitleCell?.value).toBe('Canaux des activités')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains Canaux des activités in Statistiques worksheet from row 68 to 72', () => {
    const rows = worksheet.getRows(68, 5)?.map((row) => row.values)

    expect(rows).toEqual([
      ...expectQuantifiedShareRows([
        ['Lieu d’activité', 0],
        ['À domicile', 4],
        ['À distance', 12],
        ['Autre lieu', 4],
      ]),
      [],
    ])
  })

  it('should contains bold `Durées des activités` in Statistiques worksheet at position A73', () => {
    const exportTitleCell = worksheet.getCell('A73')

    expect(exportTitleCell?.value).toBe('Durées des activités')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains Durées des activités in Statistiques worksheet from row 74 to 77', () => {
    const rows = worksheet.getRows(74, 5)?.map((row) => row.values)

    expect(rows).toEqual([
      ...expectQuantifiedShareRows([
        [dureeAccompagnementStatisticsRanges[0].label, 0],
        [dureeAccompagnementStatisticsRanges[1].label, 0],
        [dureeAccompagnementStatisticsRanges[2].label, 20],
        [dureeAccompagnementStatisticsRanges[3].label, 0],
      ]),
      [],
    ])
  })

  it('should contains bold `Nombre d’activités par lieux` in Statistiques worksheet at position A79', () => {
    const exportTitleCell = worksheet.getCell('A79')

    expect(exportTitleCell?.value).toBe('Nombre d’activités par lieux')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains Nombre d’activités par lieux in Statistiques worksheet from row 80 to 81', () => {
    const rows = worksheet.getRows(80, 2)?.map((row) => row.values)

    expect(rows).toEqual([[undefined, 'Exemple de Mediateque', 4, '100 %'], []])
  })

  it('should contains bold `Statistiques sur vos bénéficiaires` in Statistiques worksheet at position A82', () => {
    const exportTitleCell = worksheet.getCell('A82')

    expect(exportTitleCell?.value).toBe('Statistiques sur vos bénéficiaires')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains bold `Genre` in Statistiques worksheet at position A83', () => {
    const exportTitleCell = worksheet.getCell('A83')

    expect(exportTitleCell?.value).toBe('Genre')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains Statistiques bénéficiaires in Statistiques worksheet from row 84 to 86', () => {
    const rows = worksheet.getRows(84, 4)?.map((row) => row.values)

    expect(rows).toEqual([
      ...expectQuantifiedShareRows([
        ['Masculin', 2],
        ['Féminin', 0],
        ['Non communiqué', 18],
      ]),
      [],
    ])
  })

  it('should contains bold `Tranches d’âge` in Statistiques worksheet at position A88', () => {
    const exportTitleCell = worksheet.getCell('A88')

    expect(exportTitleCell?.value).toBe('Tranches d’âge')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains Tranches d’âge in Statistiques worksheet from row 89 to 96', () => {
    const rows = worksheet.getRows(89, 9)?.map((row) => row.values)

    expect(rows).toEqual([
      ...expectQuantifiedShareRows([
        ['70 ans et plus', 0],
        ['60 - 69 ans', 0],
        ['40 - 59 ans', 11],
        ['25 - 39 ans', 8],
        ['18 - 24 ans', 1],
        ['12 - 17 ans', 0],
        ['Moins de 12 ans', 0],
        ['Non communiqué', 3],
      ]),
      [],
    ])
  })

  it('should contains bold `Statuts` in Statistiques worksheet at position A98', () => {
    const exportTitleCell = worksheet.getCell('A98')

    expect(exportTitleCell?.value).toBe('Statuts')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains Statuts in Statistiques worksheet from row 99 to 104', () => {
    const rows = worksheet.getRows(99, 6)?.map((row) => row.values)

    expect(rows).toEqual([
      ...expectQuantifiedShareRows([
        ['Retraité', 0],
        ['Sans emploi', 0],
        ['En emploi', 17],
        ['Scolarisé', 4],
        ['Non communiqué ou hétérogène', 2],
      ]),
      [],
    ])
  })

  it('should contains bold `Commune de résidence des bénéficiaires` in Statistiques worksheet at position A105', () => {
    const exportTitleCell = worksheet.getCell('A105')

    expect(exportTitleCell?.value).toBe(
      'Commune de résidence des bénéficiaires',
    )
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it('should contains Commune de résidence des bénéficiaires in Statistiques worksheet from row 106 to 108', () => {
    const rows = worksheet.getRows(106, 3)?.map((row) => row.values)

    expect(rows).toEqual([
      ...expectQuantifiedShareRows([
        ['Paris · 75001', 2],
        ['Lyon 2eme · 69002', 1],
      ]),
      [],
    ])
  })
})

describe('build statistiques worksheet for coordinateur', () => {
  let workbook: Workbook
  let worksheet: Worksheet

  beforeAll(() => {
    workbook = buildStatistiquesWorksheet(
      STATISTIQUES_WORKSHEET_INPUT_FOR_COORDINATEUR,
    )
    const generatedWorksheet = workbook.getWorksheet('Statistiques')
    if (!generatedWorksheet) {
      throw new Error('Worksheet "Statistiques" not found')
    }
    worksheet = generatedWorksheet
  })

  it('should contains médiateur filter in Statistiques worksheet in row 16 when', () => {
    const rows = worksheet.getRows(15, 2)?.map((row) => row.values)

    expect(rows).toEqual([[undefined, 'Médiateur', 'Marie Doe'], []])
  })
})
