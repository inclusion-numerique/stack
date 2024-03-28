import {
  DataTableConfiguration,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'
import { compareMultiple } from '@app/web/utils/compareMultiple'
import { numberToEuros } from '@app/web/utils/formatNumber'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import { AdministrationBesoinSubventionDataRow } from '@app/web/app/(with-navigation)/administration/besoins-subventions/getAdministrationBesoinsSubventions'

export const AdministrationBesoinsSubventionsDataTable = {
  csvFilename: () => `fne-${dateAsIsoDay(new Date())}-besoins`,
  rowKey: ({ label }) => label,
  defaultSortableInMemory: (a, b) =>
    compareMultiple(
      a.categorie.localeCompare(b.categorie),
      a.label.localeCompare(b.label),
    ),
  rowInMemorySearchableString: ({ label, categorie }) =>
    `${label} ${categorie}`,
  columns: [
    {
      name: 'besoin',
      header: 'Besoin',
      csvHeaders: ['Besoin'],
      csvValues: ({ label }) => [label],
      cellAsTh: true,
      cell: ({ label }) => label,
      sortable: (a, b) => a.label.localeCompare(b.label),
    },
    {
      name: 'categorie',
      header: 'Catégorie',
      csvHeaders: ['Catégorie'],
      csvValues: ({ categorie }) => [categorie],
      cell: ({ categorie }) => categorie,
      defaultSortable: true,
    },
    {
      name: 'montant',
      header: 'Montant demandé',
      csvHeaders: ['Montant demandé'],
      csvValues: ({ montant }) => [montant.toNumber()],
      sortable: (a, b) => a.montant.sub(b.montant).toNumber(),
      cellClassName: 'fr-text--right',
      cell: ({ montant }) => (montant.gt(0) ? numberToEuros(montant) : null),
    },
    {
      name: 'actions',
      header: 'Actions',
      csvHeaders: ['Actions'],
      csvValues: ({ actions }) => [actions],
      cellClassName: 'fr-text--right',
      cell: ({ actions }) => actions || null,
      sortable: (a, b) => (a.actions ?? 0) - (b.actions ?? 0),
    },
  ],
} satisfies DataTableConfiguration<AdministrationBesoinSubventionDataRow>

export type AdministrationBesoinsSubventionsDataTableSearchParams =
  DataTableSearchParams<typeof AdministrationBesoinsSubventionsDataTable>
