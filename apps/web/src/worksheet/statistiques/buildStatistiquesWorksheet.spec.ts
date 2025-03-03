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
    filters: [
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
        key: '42',
        label: 'Département : 42 · Loire',
        type: 'departements',
      },
      {
        label: 'Accompagnement individuel',
        key: 'individuel',
        type: 'types',
      },
      {
        label: 'Atelier collectif',
        key: 'collectif',
        type: 'types',
      },
      {
        label: 'Médiateur',
        key: 'mediateur',
        type: 'profil',
      },
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
        label: 'Marcel Sans accompagnements',
        key: 'afcbdd63-7dd9-4342-9fa6-084e7a785406',
        type: 'beneficiaires',
      },
      {
        label: 'Georges Maximal',
        key: '7d6091bc-dc91-4d1b-b357-f101e9eb6217',
        type: 'beneficiaires',
      },
    ],
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
    filters: [
      {
        key: '69382',
        label: 'Commune : Lyon 2eme · 69002',
        type: 'communes',
      },
      {
        label: 'Accompagnement individuel',
        key: 'individuel',
        type: 'types',
      },
      {
        label: 'Marie Doe',
        key: '303381cc-3da7-433d-a553-1a5f76465989',
        type: 'mediateurs',
      },
      {
        label: 'Médiateur',
        key: 'mediateur',
        type: 'profil',
      },
    ],
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

const mainTitle = { start: 1, length: 1 }
const info = { start: mainTitle.start + mainTitle.length, length: 6 }
const filterTitle = { start: info.start + info.length, length: 1 }
const filters = { start: filterTitle.start + filterTitle.length, length: 9 }
const generalesTitle = { start: filters.start + filters.length, length: 1 }
const generales = {
  start: generalesTitle.start + generalesTitle.length,
  length: 8,
}
const activitesTitle = { start: generales.start + generales.length, length: 1 }
const activites = {
  start: activitesTitle.start + activitesTitle.length,
  length: 6,
}
const mediationNumeriqueTitle = {
  start: activites.start + activites.length,
  length: 1,
}
const mediationNumerique = {
  start: mediationNumeriqueTitle.start + mediationNumeriqueTitle.length,
  length: 15,
}
const demarcheAdministrativeTitle = {
  start: mediationNumerique.start + mediationNumerique.length,
  length: 1,
}
const demarcheAdministrative = {
  start: demarcheAdministrativeTitle.start + demarcheAdministrativeTitle.length,
  length: 11,
}
const materielTitle = {
  start: demarcheAdministrative.start + demarcheAdministrative.length,
  length: 1,
}
const materiel = {
  start: materielTitle.start + materielTitle.length,
  length: 6,
}
const canauxTitle = {
  start: materiel.start + materiel.length,
  length: 1,
}
const canaux = {
  start: canauxTitle.start + canauxTitle.length,
  length: 5,
}
const dureeTitle = {
  start: canaux.start + canaux.length,
  length: 1,
}
const duree = {
  start: dureeTitle.start + dureeTitle.length,
  length: 5,
}
const nombreActivitesTitle = {
  start: duree.start + duree.length,
  length: 1,
}
const nombreActivites = {
  start: nombreActivitesTitle.start + nombreActivitesTitle.length,
  length: 2,
}
const beneficiairesTitle = {
  start: nombreActivites.start + nombreActivites.length,
  length: 1,
}
const beneficiairesGenreTitle = {
  start: beneficiairesTitle.start + beneficiairesTitle.length,
  length: 1,
}
const beneficiairesGenre = {
  start: beneficiairesGenreTitle.start + beneficiairesGenreTitle.length,
  length: 4,
}
const trancheAgeTitle = {
  start: beneficiairesGenre.start + beneficiairesGenre.length,
  length: 1,
}
const trancheAge = {
  start: trancheAgeTitle.start + trancheAgeTitle.length,
  length: 9,
}
const statusSocialTitle = {
  start: trancheAge.start + trancheAge.length,
  length: 1,
}
const statusSocial = {
  start: statusSocialTitle.start + statusSocialTitle.length,
  length: 6,
}
const communesBeneficiairesTitle = {
  start: statusSocial.start + statusSocial.length,
  length: 1,
}
const communesBeneficiaires = {
  start: communesBeneficiairesTitle.start + communesBeneficiairesTitle.length,
  length: 3,
}

const range = ({ start, length }: { start: number; length: number }) => {
  return `in Statistiques worksheet from row ${start} to ${start + length}`
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

  it(`should contains bold 'Informations export' ${range(mainTitle)}`, () => {
    const exportTitleCell = worksheet.getCell(`A${mainTitle.start}`)

    expect(exportTitleCell?.value).toBe('Informations export')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it(`should contains Informations export ${range(info)}`, () => {
    const rows = worksheet
      .getRows(info.start, info.length)
      ?.map((row) => row.values)

    expect(rows).toEqual([
      [undefined, 'Nom', 'Doe'],
      [undefined, 'Prénom', 'John'],
      [undefined, 'Rôle', 'Conseiller Numérique'],
      [undefined, 'Date d’export', '11/09/2024'],
      [undefined, 'Heure d’export', '17:42'],
      [],
    ])
  })

  it(`should contains bold 'Filtres :' in Statistiques worksheet at position A${filterTitle.start}`, () => {
    const exportTitleCell = worksheet.getCell(`A${filterTitle.start}`)

    expect(exportTitleCell?.value).toBe('Filtres')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it(`should contains Filters ${range(filters)}`, () => {
    const rows = worksheet
      .getRows(filters.start, filters.length)
      ?.map((row) => row.values)

    expect(rows).toEqual([
      [undefined, 'Période', '29.01.2025 - 11.02.2025'],
      [
        undefined,
        'Lieux d’accompagnement',
        'Lieu d’activité : Exemple de Mediateque',
      ],
      [undefined, 'Communes', 'Commune : Lyon 2eme · 69002'],
      [
        undefined,
        'Départements',
        'Département : 69 · Rhône, Département : 42 · Loire',
      ],
      [
        undefined,
        'Type d’accompagnement',
        'Accompagnement individuel, Atelier collectif',
      ],
      [undefined, 'Profil', 'Médiateur'],
      [
        undefined,
        'Bénéficiaires',
        'Marcel Sans accompagnements, Georges Maximal',
      ],
      [
        undefined,
        'Médiateurs',
        'Coordinateur Inscrit avec tout (Mes statistiques), Médiateur Avec activités',
      ],
      [],
    ])
  })

  it(`should contains bold 'Statistiques générales sur vos accompagnements' in Statistiques worksheet at position A${generalesTitle.start}`, () => {
    const exportTitleCell = worksheet.getCell(`A${generalesTitle.start}`)

    expect(exportTitleCell?.value).toBe(
      'Statistiques générales sur vos accompagnements',
    )
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it(`should contains statistiques general ${range(generales)}`, () => {
    const rows = worksheet
      .getRows(generales.start, generales.length)
      ?.map((row) => row.values)

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

  it(`should contains bold 'Statistiques sur vos activités' in Statistiques worksheet at position A${activitesTitle.start}`, () => {
    const exportTitleCell = worksheet.getCell(`A${activitesTitle.start}`)

    expect(exportTitleCell?.value).toBe('Statistiques sur vos activités')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it(`should contains statistiques activités ${range(activites)}`, () => {
    const rows = worksheet
      .getRows(activites.start, activites.length)
      ?.map((row) => row.values)

    expect(rows).toEqual([
      [undefined, 'Accompagnements individuels', 8, '40 %'],
      [undefined, 'Ateliers collectifs', 4, '20 %'],
      [undefined, 'Nombre total de participants aux ateliers', 28],
      [undefined, 'Aide aux démarches administratives', 8, '40 %'],
      [undefined, 'Nombre total d’activités', 20],
      [],
    ])
  })

  it(`should contains bold 'Thématiques Médiation numérique' in Statistiques worksheet at position A${mediationNumeriqueTitle.start}`, () => {
    const exportTitleCell = worksheet.getCell(
      `A${mediationNumeriqueTitle.start}`,
    )

    expect(exportTitleCell?.value).toBe('Thématiques Médiation numérique')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it(`should contains Thématiques Médiation numérique ${range(mediationNumerique)}`, () => {
    const rows = worksheet
      .getRows(mediationNumerique.start, mediationNumerique.length)
      ?.map((row) => row.values)

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

  it(`should contains bold 'Thématiques Démarches administratives' in Statistiques worksheet at position A${demarcheAdministrativeTitle.start}`, () => {
    const exportTitleCell = worksheet.getCell(
      `A${demarcheAdministrativeTitle.start}`,
    )

    expect(exportTitleCell?.value).toBe('Thématiques Démarches administratives')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it(`should contains Thématiques Démarches administratives ${range(demarcheAdministrative)}`, () => {
    const rows = worksheet
      .getRows(demarcheAdministrative.start, demarcheAdministrative.length)
      ?.map((row) => row.values)

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

  it(`should contains bold 'Matériel utilisés' in Statistiques worksheet at position A${materielTitle.start}`, () => {
    const exportTitleCell = worksheet.getCell(`A${materielTitle.start}`)

    expect(exportTitleCell?.value).toBe('Matériel utilisés')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it(`should contains Matériel utilisés ${range(materiel)}`, () => {
    const rows = worksheet
      .getRows(materiel.start, materiel.length)
      ?.map((row) => row.values)

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

  it(`should contains bold 'Canaux des activités' in Statistiques worksheet at position A${canauxTitle.start}`, () => {
    const exportTitleCell = worksheet.getCell(`A${canauxTitle.start}`)

    expect(exportTitleCell?.value).toBe('Canaux des activités')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it(`should contains Canaux des activités ${range(canaux)}`, () => {
    const rows = worksheet
      .getRows(canaux.start, canaux.length)
      ?.map((row) => row.values)

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

  it(`should contains bold 'Durées des activités' in Statistiques worksheet at position A${dureeTitle.start}`, () => {
    const exportTitleCell = worksheet.getCell(`A${dureeTitle.start}`)

    expect(exportTitleCell?.value).toBe('Durées des activités')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it(`should contains Durées des activités ${range(duree)}`, () => {
    const rows = worksheet
      .getRows(duree.start, duree.length)
      ?.map((row) => row.values)

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

  it(`should contains bold 'Nombre d’activités par lieux' in Statistiques worksheet at position ${nombreActivitesTitle.start}`, () => {
    const exportTitleCell = worksheet.getCell(`A${nombreActivitesTitle.start}`)

    expect(exportTitleCell?.value).toBe('Nombre d’activités par lieux')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it(`should contains Nombre d’activités par lieux ${range(nombreActivites)}`, () => {
    const rows = worksheet
      .getRows(nombreActivites.start, nombreActivites.length)
      ?.map((row) => row.values)

    expect(rows).toEqual([[undefined, 'Exemple de Mediateque', 4, '100 %'], []])
  })

  it(`should contains bold 'Statistiques sur vos bénéficiaires' in Statistiques worksheet at position A${beneficiairesTitle.start}`, () => {
    const exportTitleCell = worksheet.getCell(`A${beneficiairesTitle.start}`)

    expect(exportTitleCell?.value).toBe('Statistiques sur vos bénéficiaires')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it(`should contains bold 'Genre' in Statistiques worksheet at position A${beneficiairesGenreTitle.start}`, () => {
    const exportTitleCell = worksheet.getCell(
      `A${beneficiairesGenreTitle.start}`,
    )

    expect(exportTitleCell?.value).toBe('Genre')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it(`should contains Statistiques bénéficiaires ${range(beneficiairesGenre)}`, () => {
    const rows = worksheet
      .getRows(beneficiairesGenre.start, beneficiairesGenre.length)
      ?.map((row) => row.values)

    expect(rows).toEqual([
      ...expectQuantifiedShareRows([
        ['Masculin', 2],
        ['Féminin', 0],
        ['Non communiqué', 18],
      ]),
      [],
    ])
  })

  it(`should contains bold 'Tranches d’âge' in Statistiques worksheet at position A${trancheAgeTitle.start}`, () => {
    const exportTitleCell = worksheet.getCell(`A${trancheAgeTitle.start}`)

    expect(exportTitleCell?.value).toBe('Tranches d’âge')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it(`should contains Tranches d’âge ${range(trancheAge)}`, () => {
    const rows = worksheet
      .getRows(trancheAge.start, trancheAge.length)
      ?.map((row) => row.values)

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

  it(`should contains bold 'Statuts' in Statistiques worksheet at position A${statusSocialTitle.start}`, () => {
    const exportTitleCell = worksheet.getCell(`A${statusSocialTitle.start}`)

    expect(exportTitleCell?.value).toBe('Statuts')
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it(`should contains Statuts ${range(statusSocial)}`, () => {
    const rows = worksheet
      .getRows(statusSocial.start, statusSocial.length)
      ?.map((row) => row.values)

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

  it(`should contains bold 'Commune de résidence des bénéficiaires' in Statistiques worksheet at position A${communesBeneficiairesTitle.start}`, () => {
    const exportTitleCell = worksheet.getCell(
      `A${communesBeneficiairesTitle.start}`,
    )

    expect(exportTitleCell?.value).toBe(
      'Commune de résidence des bénéficiaires',
    )
    expect(exportTitleCell?.font.bold).toBe(true)
  })

  it(`should contains Commune de résidence des bénéficiaires ${communesBeneficiaires}`, () => {
    const rows = worksheet
      .getRows(communesBeneficiaires.start, communesBeneficiaires.length)
      ?.map((row) => row.values)

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
