import type { SessionUser } from '@app/web/auth/sessionUser'
import type { MediateurUser } from '@app/web/auth/userTypeGuards'
import type {
  ActivitesFiltersLabels,
  FilterType,
} from '@app/web/cra/generateActivitesFiltersLabels'
import { getUserRoleLabel } from '@app/web/utils/getUserRoleLabel'
import { onlyDefinedAndNotNull } from '@app/web/utils/onlyDefinedAndNotNull'
import type { Workbook, Worksheet } from 'exceljs'

export type WorksheetUser = Pick<
  SessionUser,
  'firstName' | 'lastName' | 'role' | 'id' | 'coordinateur'
> & {
  mediateur: Pick<
    MediateurUser['mediateur'],
    'id' | 'conseillerNumerique'
  > | null
}

export const addTitleRow =
  (worksheet: Worksheet) => (title: string, options?: { bgColor?: string }) => {
    const row = worksheet.addRow([title])
    const cell = row.getCell(1)
    cell.font = { bold: true }
    if (options?.bgColor) {
      cell.fill = {
        bgColor: { argb: options.bgColor },
        pattern: 'solid',
        type: 'pattern',
      }
    }
    row.getCell(1).font = { bold: true }

    return row
  }

const defaultCellLength = 10
const getMaxStringLength = (strings: (string | null | undefined)[]) =>
  Math.max(
    ...strings
      .filter(onlyDefinedAndNotNull)
      .map((value) => value?.length ?? defaultCellLength),
  ) || defaultCellLength

export type AutosizeColumnsOptions = {
  fixedColumns?: Record<number, number>
  extraPadding?: number
  minWidth?: number // Defaults to 10
}
// Adjust column width automatically based on content
export const autosizeColumns = (
  worksheet: Worksheet,
  options?: AutosizeColumnsOptions,
) => {
  for (const column of worksheet.columns) {
    if (
      options?.fixedColumns &&
      column.number &&
      options.fixedColumns[column.number]
    ) {
      column.width = options.fixedColumns[column.number]
      continue
    }

    let columnMaxLength = options?.minWidth ?? 10

    if (!column.eachCell) continue

    column.eachCell({ includeEmpty: false }, (cell) => {
      const cellLength = getMaxStringLength(cell.text.split('\n'))

      if (cellLength > columnMaxLength) {
        columnMaxLength = cellLength
      }
    })
    column.width = columnMaxLength + (options?.extraPadding ?? 0)
  }
}

export const setWorkbookMetadata =
  (workbook: Workbook) =>
  ({ worksheetGenerationDate }: { worksheetGenerationDate: Date }) => {
    workbook.creator = 'La coop de la médiation numérique'
    workbook.lastModifiedBy = 'La coop de la médiation numérique'
    workbook.created = worksheetGenerationDate
    workbook.modified = worksheetGenerationDate
    workbook.lastPrinted = worksheetGenerationDate
  }

export const addExportMetadata =
  (worksheet: Worksheet) =>
  ({
    date,
    user,
    activitesCount,
  }: {
    user: WorksheetUser
    date: Date
    activitesCount?: number
  }) => {
    addTitleRow(worksheet)('Informations export')

    return worksheet.addRows(
      [
        ['Nom', user.lastName ?? '-'],
        ['Prénom', user.firstName ?? '-'],
        ['Rôle', getUserRoleLabel(user)],
        typeof activitesCount === 'number'
          ? ['Activités', activitesCount]
          : undefined,
        ['Date d’export', date.toLocaleDateString('fr-FR')],
        [
          'Heure d’export',
          date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        ],
        [],
      ].filter(Boolean),
    )
  }

const onlyType = (type: string) => (filter: { type: string }) =>
  filter.type === type

const toLabel = ({ label }: { label: string }) => label

export const addFilters =
  (worksheet: Worksheet) =>
  (
    filters: ActivitesFiltersLabels,
    {
      mediateurScope,
      excludeFilters = [],
    }: {
      mediateurScope: null | Pick<SessionUser, 'firstName' | 'lastName'>
      excludeFilters?: FilterType[]
    },
  ) => {
    addTitleRow(worksheet)('Filtres')

    return worksheet.addRows(
      [
        !excludeFilters.includes('periode')
          ? [
              'Période',
              filters.find((filter) => filter.type === 'periode')?.label ?? '-',
            ]
          : undefined,
        !excludeFilters.includes('lieux')
          ? [
              'Lieux d’accompagnement',
              filters
                .filter(onlyType('lieux'))
                .map(({ label }) => label)
                .join(', ') || '-',
            ]
          : undefined,
        !excludeFilters.includes('communes')
          ? [
              'Communes',
              filters.filter(onlyType('communes')).map(toLabel).join(', ') ||
                '-',
            ]
          : undefined,
        !excludeFilters.includes('departements')
          ? [
              'Départements',
              filters
                .filter(onlyType('departements'))
                .map(toLabel)
                .join(', ') || '-',
            ]
          : undefined,
        !excludeFilters.includes('types')
          ? [
              'Type d’accompagnement',
              filters.filter(onlyType('types')).map(toLabel).join(', ') || '-',
            ]
          : undefined,
        !excludeFilters.includes('conseiller_numerique')
          ? [
              'Rôle',
              filters.find((filter) => filter.type === 'conseiller_numerique')
                ?.label ?? '-',
            ]
          : undefined,
        !excludeFilters.includes('beneficiaires') &&
        filters.filter(onlyType('beneficiaires')).length > 0
          ? [
              'Bénéficiaires',
              filters
                .filter(onlyType('beneficiaires'))
                .map(toLabel)
                .join(', ') || '-',
            ]
          : undefined,
        !excludeFilters.includes('mediateurs') &&
        filters.filter(onlyType('mediateurs')).length > 0
          ? [
              'Médiateurs',
              filters.filter(onlyType('mediateurs')).map(toLabel).join(', ') ||
                '-',
            ]
          : undefined,
        mediateurScope
          ? [
              'Médiateur',
              `${mediateurScope.firstName} ${mediateurScope.lastName}`,
            ]
          : undefined,
        [],
      ].filter(Boolean),
    )
  }
