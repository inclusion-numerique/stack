import styles from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/MesActivitesListePage.module.css'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { typeActiviteLabels } from '@app/web/cra/cra'
import type { DataTableSearchParams } from '@app/web/data-table/DataTableConfiguration'
import type { ActivitesDataTableConfiguration } from '@app/web/cra/ActivitesDataTableConfiguration'

export const ActivitesDataTable = {
  csvFilename: () => `coop-${dateAsIsoDay(new Date())}-activites`,
  rowKey: ({ id }) => id,
  columns: [
    {
      name: 'date',
      header: 'Date',
      csvHeaders: ['Date'],
      defaultSortable: true,
      defaultSortableDirection: 'desc',
      cellAsTh: true,
      sortable: true,
      csvValues: ({ date }) => [dateAsIsoDay(date)],
      cell: ({ date }) => dateAsDay(date),
    },
    {
      name: 'type',
      header: 'Type',
      csvHeaders: ['Type'],
      csvValues: ({ type }) => [typeActiviteLabels[type]],
      cell: ({ type }) => typeActiviteLabels[type],
      cellClassName: styles.typeCell,
      sortable: true,
    },
    {
      name: 'beneficiaire',
      header: 'Bénéficiaire',
      csvHeaders: ['Bénéficiaire'],
      csvValues: (activite) => [
        activite.type === 'Collectif'
          ? `${activite.accompagnements.length} participants`
          : getBeneficiaireDisplayName(
              activite.accompagnements[0]?.beneficiaire ?? {},
            ),
      ],
      cell: (activite) =>
        activite.type === 'Collectif'
          ? `${activite.accompagnements.length} participants`
          : getBeneficiaireDisplayName(
              activite.accompagnements[0]?.beneficiaire ?? {},
            ),
      cellClassName: styles.beneficiaireCell,
    },
    {
      name: 'lieu',
      header: 'Lieu',
      csvHeaders: ['Lieu'],
      csvValues: () => [],
      cell: ({ structure, lieuCommune, lieuCodePostal, typeLieu }) =>
        typeLieu === 'LieuActivite' && structure
          ? structure.nom
          : typeLieu === 'ADistance'
            ? 'À distance'
            : lieuCommune
              ? `${lieuCommune} · ${lieuCodePostal}`
              : '-',
      cellClassName: styles.lieuCell,
    },
  ],
} satisfies ActivitesDataTableConfiguration

export type ActivitesDataTableSearchParams = DataTableSearchParams<
  ActivitesDataTableConfiguration,
  ActivitesFilters
>
