import type { Workbook, Worksheet } from 'exceljs'
import { getUserRoleLabel } from '@app/web/utils/getUserRoleLabel'
import type { SessionUser } from '@app/web/auth/sessionUser'
import { ActivitesFiltersLabels } from '@app/web/cra/generateActivitesFiltersLabels'
import type { AuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { onlyDefinedAndNotNull } from '@app/web/utils/onlyDefinedAndNotNull'

export type WorksheetUser = Pick<
  SessionUser,
  'firstName' | 'lastName' | 'role' | 'id' | 'coordinateur'
> & {
  mediateur: Pick<
    AuthenticatedMediateur['mediateur'],
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
    // eslint-disable-next-line no-param-reassign
    workbook.creator = 'La coop de la médiation numérique'
    // eslint-disable-next-line no-param-reassign
    workbook.lastModifiedBy = 'La coop de la médiation numérique'
    // eslint-disable-next-line no-param-reassign
    workbook.created = worksheetGenerationDate
    // eslint-disable-next-line no-param-reassign
    workbook.modified = worksheetGenerationDate
    // eslint-disable-next-line no-param-reassign
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

export const addFilters =
  (worksheet: Worksheet) =>
  (
    filters: ActivitesFiltersLabels,
    {
      mediateurScope,
    }: {
      mediateurScope: null | Pick<SessionUser, 'firstName' | 'lastName'>
    },
  ) => {
    addTitleRow(worksheet)('Filtres')

    return worksheet.addRows(
      [
        ['Début de période', filters.du ?? '-'],
        ['Fin de période', filters.au ?? '-'],
        ['Type de lieu', filters.typeLieu ?? '-'],
        ['Nom du lieu', filters.nomLieu ?? '-'],
        ['Type d’accompagnement', filters.type ?? '-'],
        filters.beneficiaire
          ? ['Bénéficiaire', filters.beneficiaire]
          : undefined,
        filters.mediateur ? ['Médiateur', `${filters.mediateur}`] : undefined,
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
