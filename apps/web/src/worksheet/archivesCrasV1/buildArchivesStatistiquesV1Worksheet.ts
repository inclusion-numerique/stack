import * as Excel from 'exceljs'
import {
  autosizeColumns,
  setWorkbookMetadata,
} from '@app/web/worksheet/buildWorksheetHelpers'
import { dateAsMonth, dateAsMonthFull } from '@app/web/utils/dateAsMonth'
import {
  CrasV1StatRow,
  MonthlyStatistiquesV1,
  StatistiquesV1,
} from '@app/web/app/coop/(full-width-layout)/archives-v1/computeStatistiquesCrasV1'

export type BuildArchivesStatistiquesV1WorksheetInput = {
  stats: StatistiquesV1
  conseiller: {
    name: string
  }
}

const statsStartRow = 5

const titles = {
  Général: statsStartRow,
}
const rowForStat: { [index in keyof CrasV1StatRow]: number } = {
  total: statsStartRow + 1,
}

const titleForStat: { [index in keyof CrasV1StatRow]: string } = {}

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
      cell.numFmt = '#\u00A0##0' // Utiliser un espace échappé pour le séparateur des milliers
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
  // TODO all the titles
}

// Each month have 2 columns
const addMontlyStatColumns = (
  column: number,
  setCell: CellSetter,
  monthly: MonthlyStatistiquesV1,
  worksheet: Excel.Worksheet,
) => {
  const percentageColumn = column + 1
  worksheet.mergeCells(statsStartRow, column, statsStartRow, percentageColumn)
  setCell(statsStartRow, column, dateAsMonth(new Date(monthly.month)), {
    font: { bold: true },
  })

  // TODO add stats and percentages
}

export const buildArchivesStatistiquesV1Worksheet = ({
  stats,
  conseiller,
}: BuildArchivesStatistiquesV1WorksheetInput): Excel.Workbook => {
  const workbook = new Excel.Workbook()

  setWorkbookMetadata(workbook)

  const worksheet = workbook.addWorksheet('Statistiques mensuelles')

  const { firstMonth, lastMonth, monthlyStats } = stats

  const titleRow1 = worksheet.addRow([])
  titleRow1.getCell(1).value = 'Archives - Coop V.1'
  titleRow1.getCell(1).font = { bold: true }

  const titleRow2 = worksheet.addRow([])
  titleRow2.getCell(1).value = 'Statistiques mensuelles'
  titleRow2.getCell(1).font = { bold: true }

  worksheet.addRow([
    `${conseiller.name} : de ${dateAsMonthFull(firstMonth)} à ${dateAsMonthFull(lastMonth)}`,
  ])

  const setCell = createSetCell(worksheet)

  addTitlesColumns(setCell)

  for (const [index, monthly] of Object.values(monthlyStats).map(
    (value, valueIndex): [number, MonthlyStatistiquesV1] => [valueIndex, value],
  )) {
    const column = index * 2 + 2
    addMontlyStatColumns(column, setCell, monthly, worksheet)
  }

  autosizeColumns(worksheet)

  // Sticky header rows for easier navigation
  worksheet.views = [{ state: 'frozen', ySplit: statsStartRow }]

  return workbook
}
