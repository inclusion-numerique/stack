import * as Excel from 'exceljs'
import {
  autosizeColumns,
  setWorkbookMetadata,
} from '@app/web/worksheet/buildWorksheetHelpers'
import { dateAsMonth, dateAsMonthFull } from '@app/web/utils/dateAsMonth'
import {
  CrasV1StatKey,
  MonthlyStatistiquesV1,
  StatistiquesV1,
} from '@app/web/app/coop/(full-width-layout)/archives-v1/computeStatistiquesCrasV1'

export type BuildArchivesStatistiquesV1WorksheetInput = {
  stats: StatistiquesV1
  scopeTitle: string
}

const statsStartRow = 2

const titles = {
  Général: statsStartRow + 1,
  'Accompagnements poursuivis': statsStartRow + 10,
  'Canaux d’accompagnements': statsStartRow + 15,
  'Temps en accompagnements': statsStartRow + 21,
  'Durée des accompagnements': statsStartRow + 27,
  'Tranches d’âge des usagers': statsStartRow + 33,
  'Statut des usagers': statsStartRow + 40,
  'Thèmes des accompagnements': statsStartRow + 47,
}

const rowForStat: { [index in CrasV1StatKey]: number } = {
  total: statsStartRow + 2,
  accompagnements: statsStartRow + 3,
  personnes_accompagnees: statsStartRow + 4,
  individuels: statsStartRow + 5,
  collectifs: statsStartRow + 6,
  participants_ateliers: statsStartRow + 7,
  ponctuels: statsStartRow + 8,

  // one empty, one with title
  suivi_individuel: statsStartRow + 11,
  suivi_atelier: statsStartRow + 12,
  suivi_redirection: statsStartRow + 13,

  // one empty, one with title
  canal_domicile: statsStartRow + 16,
  canal_distance: statsStartRow + 17,
  canal_rattachement: statsStartRow + 18,
  canal_autre: statsStartRow + 19,

  // one empty, one with title
  temps_total: statsStartRow + 22,
  temps_individuel: statsStartRow + 23,
  temps_collectif: statsStartRow + 24,
  temps_ponctuel: statsStartRow + 25,

  // one empty, one with title
  duree_0_30: statsStartRow + 28,
  duree_30_60: statsStartRow + 29,
  duree_60_120: statsStartRow + 30,
  duree_120_plus: statsStartRow + 31,

  // one empty, one with title
  age_moins_12_ans: statsStartRow + 34,
  age_de_12_a_18_ans: statsStartRow + 35,
  age_de_18_a_35_ans: statsStartRow + 36,
  age_de_35_a_60_ans: statsStartRow + 37,
  age_plus_60_ans: statsStartRow + 38,

  // one empty, one with title
  statut_etudiant: statsStartRow + 41,
  statut_sans_emploi: statsStartRow + 42,
  statut_en_emploi: statsStartRow + 43,
  statut_retraite: statsStartRow + 44,
  statut_heterogene: statsStartRow + 45,

  // one empty, one with title
  theme_accompagner_enfant: statsStartRow + 48,
  theme_budget: statsStartRow + 49,
  theme_contenus_numeriques: statsStartRow + 50,
  theme_courriel: statsStartRow + 51,
  theme_vocabulaire: statsStartRow + 52,

  theme_demarche_en_ligne: statsStartRow + 53,
  theme_diagnostic: statsStartRow + 54,
  theme_echanger: statsStartRow + 55,
  theme_equipement_informatique: statsStartRow + 56,
  theme_fraude_et_harcelement: statsStartRow + 57,
  theme_internet: statsStartRow + 58,
  theme_sante: statsStartRow + 59,
  theme_scolaire: statsStartRow + 60,
  theme_securite: statsStartRow + 61,
  theme_smartphone: statsStartRow + 62,
  theme_tpe_pme: statsStartRow + 63,
  theme_traitement_texte: statsStartRow + 64,
  theme_trouver_emploi: statsStartRow + 65,
  theme_autre: statsStartRow + 66,
}

const lastRow = statsStartRow + 66

const titleForStat: { [index in CrasV1StatKey]: string } = {
  total: 'Nombre de CRAs enregistrés',
  accompagnements: 'Nombre d’accompagnements',
  personnes_accompagnees: 'Nombre d’usagers accompagnés',

  individuels: 'Accompagnements individuels',
  collectifs: 'Ateliers collectifs',
  participants_ateliers: 'Total des participants aux ateliers',
  ponctuels: 'Demandes ponctuelles',

  suivi_individuel: 'Poursuite en accompagnement individuels',
  suivi_atelier: 'Poursuite en atelier collectif',
  suivi_redirection: 'Redirections vers une autre structure agréée',

  canal_domicile: 'À domicile',
  canal_distance: 'À distance',
  canal_rattachement: 'Lieu d’activité',
  canal_autre: 'Autre lieu',

  temps_total: 'Total d’heures',
  temps_individuel: 'Individuels',
  temps_collectif: 'Collectifs',
  temps_ponctuel: 'Ponctuels',

  duree_0_30: 'Moins de 30 minutes',
  duree_30_60: '30-60 minutes',
  duree_60_120: '60-120 minutes',
  duree_120_plus: 'Plus de 120 minutes',

  age_moins_12_ans: 'Moins de 12 ans',
  age_de_12_a_18_ans: '12-18 ans',
  age_de_18_a_35_ans: '18-35 ans',
  age_de_35_a_60_ans: '35-60 ans',
  age_plus_60_ans: 'Plus de 60 ans',

  statut_etudiant: 'Scolarisé(e)',
  statut_sans_emploi: 'Sans emploi',
  statut_en_emploi: 'En emploi',
  statut_retraite: 'Retraité',
  statut_heterogene: 'Non renseigné',

  theme_accompagner_enfant: 'Accompagner un aidant',
  theme_budget: 'Budget',
  theme_contenus_numeriques: 'Gestion de contenus numériques',
  theme_courriel: 'Courriels',
  theme_vocabulaire: 'Culture numérique',
  theme_demarche_en_ligne: 'Démarche en ligne',
  theme_diagnostic: 'Diagnostic numérique',
  theme_echanger: 'Échanger avec ses proches',
  theme_equipement_informatique: 'Prendre en main du matériel',
  theme_fraude_et_harcelement: 'Fraude et harcèlement',
  theme_internet: 'Naviguer sur Internet',
  theme_sante: 'Santé',
  theme_scolaire: 'Scolaire',
  theme_securite: 'Sécuriser un équipement',
  theme_smartphone: 'Smartphone',
  theme_tpe_pme: 'Numérique et TPE/PME',
  theme_traitement_texte: 'Bureautique',
  theme_trouver_emploi: 'Emploi et formation',
  theme_autre: 'Autre',
}

const createSetCell =
  (worksheet: Excel.Worksheet) =>
  (
    row: number,
    column: number,
    value: string | number,
    options?: {
      percentage?: boolean
      numFmt?: string
      font?: Excel.Cell['font']
    },
  ) => {
    const cell = worksheet.getCell(row, column)
    if (typeof value === 'number') {
      // no format for maximum compatibility with pages, open office, etc.
    }
    if (options?.numFmt) {
      cell.numFmt = options.numFmt
    }
    if (options?.percentage) {
      cell.numFmt = '0.00%'
    }
    if (options?.font) {
      cell.font = options.font
    }
    cell.value = value
  }
type CellSetter = ReturnType<typeof createSetCell>

const addTitlesColumns = (setCell: CellSetter) => {
  for (const [title, row] of Object.entries(titles)) {
    setCell(row, 1, title, { font: { bold: true } })
  }

  for (const [key, row] of Object.entries(rowForStat)) {
    const title = titleForStat[key as CrasV1StatKey]
    setCell(row, 1, title)
  }
}

const addTotalsColumns = (
  setCell: CellSetter,
  totalStats: MonthlyStatistiquesV1,
  worksheet: Excel.Worksheet,
) => {
  const column = 2
  const percentageColumn = column + 1
  // worksheet.mergeCells(statsStartRow, column, statsStartRow, percentageColumn)
  setCell(statsStartRow, column, 'Total', {
    font: { bold: true },
  })

  for (const [key, row] of Object.entries(rowForStat)) {
    const value = totalStats[key as CrasV1StatKey] || 0
    setCell(row, column, value, {
      font: { bold: true },
    })
  }

  for (const [key, percentage] of Object.entries(totalStats.percentages)) {
    const row = rowForStat[key as CrasV1StatKey]
    setCell(row, percentageColumn, percentage, {
      numFmt: '0.0%',
    })
  }

  // Add right border from titles to lastRow
  // eslint-disable-next-line no-plusplus
  for (let row = statsStartRow; row <= lastRow; row++) {
    const cell = worksheet.getCell(row, percentageColumn)
    cell.border = {
      right: { style: 'thin' },
    }
  }
}

// Each month have 2 columns
const addMontlyStatColumns = (
  column: number,
  setCell: CellSetter,
  monthly: MonthlyStatistiquesV1,
  worksheet: Excel.Worksheet,
) => {
  const percentageColumn = column + 1
  // worksheet.mergeCells(statsStartRow, column, statsStartRow, percentageColumn)
  setCell(statsStartRow, column, dateAsMonth(new Date(monthly.month)), {
    font: { bold: true },
  })

  for (const [key, row] of Object.entries(rowForStat)) {
    const value = monthly[key as CrasV1StatKey] || 0
    setCell(row, column, value, {
      font: { bold: true },
    })
  }

  for (const [key, percentage] of Object.entries(monthly.percentages)) {
    const row = rowForStat[key as CrasV1StatKey]
    setCell(row, percentageColumn, percentage, {
      numFmt: '0.0%',
    })
  }

  // Add right border from titles to lastRow
  // eslint-disable-next-line no-plusplus
  for (let row = statsStartRow; row <= lastRow; row++) {
    const cell = worksheet.getCell(row, percentageColumn)
    cell.border = {
      right: { style: 'thin' },
    }
  }
}

export const buildArchivesStatistiquesV1Worksheet = ({
  stats,
  scopeTitle,
}: BuildArchivesStatistiquesV1WorksheetInput): Excel.Workbook => {
  const workbook = new Excel.Workbook()

  setWorkbookMetadata(workbook)

  const worksheet = workbook.addWorksheet('Statistiques mensuelles')

  const { firstMonth, lastMonth, monthlyStats, totalStats } = stats

  const titleRow1 = worksheet.addRow([])
  titleRow1.getCell(1).value =
    `Archives - Coop V.1 - Statistiques mensuelles - ${scopeTitle}`
  titleRow1.getCell(1).font = { bold: true }

  const titleRow2 = worksheet.addRow([])
  titleRow2.getCell(1).value =
    `${dateAsMonthFull(firstMonth)} à ${dateAsMonthFull(lastMonth)}`
  // titleRow2.getCell(1).font = { bold: true }

  const setCell = createSetCell(worksheet)

  addTitlesColumns(setCell)

  addTotalsColumns(setCell, totalStats, worksheet)

  for (const [index, monthly] of Object.values(monthlyStats).map(
    (value, valueIndex): [number, MonthlyStatistiquesV1] => [valueIndex, value],
  )) {
    const column = index * 2 + 4
    addMontlyStatColumns(column, setCell, monthly, worksheet)
  }

  const monthsCount = monthlyStats.length

  // add border top to startRow for monthsCount *2 columns, skip first column
  // eslint-disable-next-line no-plusplus
  for (let column = 2; column < monthsCount * 2 + 4; column++) {
    const cell = worksheet.getCell(statsStartRow, column)
    cell.border = {
      top: { style: 'thin' },
    }
  }

  // add border bottom to lastRow for 1+monthsCount *2 columns, and first column
  // eslint-disable-next-line no-plusplus
  for (let column = 1; column <= monthsCount * 2 + 3; column++) {
    const cell = worksheet.getCell(lastRow, column)
    cell.border = {
      bottom: { style: 'thin' },
    }
  }

  const statColumnWidth = 8

  const monthColumnSizes = Object.fromEntries(
    Array.from({
      length:
        // Months  + Totals
        (monthsCount + 1) * 2,
    }).map((_, index) => [index + 2, statColumnWidth]),
  )

  autosizeColumns(worksheet, {
    fixedColumns: {
      1: 41,
      ...monthColumnSizes,
    },
  })

  // Sticky header rows for easier navigation
  worksheet.views = [{ state: 'frozen', ySplit: statsStartRow, xSplit: 1 }]

  return workbook
}
