import type { Prisma } from '@prisma/client'
import {
  DataTableConfiguration,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import ActiviteRowShowDetailsButton from '@app/web/cra/ActiviteRowShowDetailsButton'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'
import { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import styles from '@app/web/app/coop/mes-activites/(liste)/MesActivitesListePage.module.css'
import { ActiviteForList } from '@app/web/cra/activitesQueries'
import { typeActiviteLabels } from '@app/web/cra/cra'

export type ActivitesDataTableConfiguration = DataTableConfiguration<
  ActiviteForList,
  Prisma.ActiviteWhereInput,
  Prisma.ActiviteOrderByWithRelationInput
>

export const ActivitesDataTable = {
  csvFilename: () => `coop-${dateAsIsoDay(new Date())}-activites`,
  rowKey: ({ id }) => id,
  rowButton: (activite) => <ActiviteRowShowDetailsButton activite={activite} />,
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
      cell: ({
        structure,
        lieuCommune,
        lieuCodePostal,
        typeLieu,
        typeLieuAtelier,
      }) =>
        (typeLieu === 'LieuActivite' || typeLieuAtelier === 'LieuActivite') &&
        structure
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
