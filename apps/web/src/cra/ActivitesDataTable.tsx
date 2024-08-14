import type { Prisma } from '@prisma/client'
import {
  DataTableConfiguration,
  DataTableFilterValues,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import { SearchActiviteResultRow } from '@app/web/cra/searchActivite'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { accompagnementTypeLabels } from '@app/web/cra/cra'
import ActiviteRowShowDetailsButton from '@app/web/cra/ActiviteRowShowDetailsButton'
import styles from '@app/web/app/coop/mes-activites/(liste)/MesActivitesListePage.module.css'

export type ActivitesDataTableConfiguration = DataTableConfiguration<
  SearchActiviteResultRow,
  Prisma.ActiviteMediateurWhereInput,
  Prisma.ActiviteMediateurOrderByWithRelationInput
>

export const ActivitesDataTable = {
  csvFilename: () => `coop-${dateAsIsoDay(new Date())}-activites`,
  rowKey: ({ cra: { id } }) => id,
  columns: [
    {
      name: 'date',
      header: 'Date',
      csvHeaders: ['Date'],
      defaultSortable: true,
      defaultSortableDirection: 'desc',
      cellAsTh: true,
      sortable: true,
      csvValues: ({ cra: { date } }) => [dateAsIsoDay(date)],
      cell: ({ cra: { date } }) => dateAsDay(date),
    },
    {
      name: 'type',
      header: 'Type',
      csvHeaders: ['Type'],
      csvValues: ({ type }) => [accompagnementTypeLabels[type]],
      cell: ({ type }) => accompagnementTypeLabels[type],
      sortable: true,
    },
    {
      name: 'beneficiaire',
      header: 'Bénéficiaire',
      csvHeaders: ['Bénéficiaire'],
      csvValues: () => ['TODO'],
      cell: () => 'TODO',
    },
    {
      name: 'lieu',
      header: 'Lieu',
      csvHeaders: ['Lieu'],
      csvValues: () => ['TODO'],
      cell: () => 'TODO',
    },
    {
      name: 'actions',
      header: '',
      csvHeaders: [],
      csvValues: () => [],
      cellClassName: styles.activiteRowMoreButtonCell,
      cell: (activite) => <ActiviteRowShowDetailsButton activite={activite} />,
    },
  ],
} satisfies ActivitesDataTableConfiguration

export type ActivitesDataTableSearchParams =
  DataTableSearchParams<ActivitesDataTableConfiguration>

export type ActivitesDataTableFilterValues =
  DataTableFilterValues<ActivitesDataTableConfiguration>
