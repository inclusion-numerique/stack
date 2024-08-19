import type { Prisma } from '@prisma/client'
import {
  DataTableConfiguration,
  DataTableFilterValues,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { accompagnementTypeLabels } from '@app/web/cra/cra'
import ActiviteRowShowDetailsButton from '@app/web/cra/ActiviteRowShowDetailsButton'
import styles from '@app/web/app/coop/mes-activites/(liste)/MesActivitesListePage.module.css'
import { Activite } from '@app/web/cra/activitesQueries'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'

export type ActivitesDataTableConfiguration = DataTableConfiguration<
  Activite,
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
      filters: [
        // {
        //   name: 'du',
        //   title: 'Du',
        //   render: (value) => `TODO RENDER du`,
        //   applyWhereCondition: (query, value) => ({
        //     OR: [
        //       { craIndividuel: { date: { gte: query } } },
        //       { craCollectif: { date: { gte: query } } },
        //       { craDemarcheAdministrative: { date: { gte: query } } },
        //     ],
        //   }),
        // },
        // {
        //   name: 'au',
        //   title: 'Au',
        //   render: (value) => `TODO RENDER au`,
        //   applyWhereCondition: (query, value) => ({
        //     OR: [
        //       { craIndividuel: { date: { lte: query } } },
        //       { craCollectif: { date: { lte: query } } },
        //       { craDemarcheAdministrative: { date: { lte: query } } },
        //     ],
        //   }),
        // },
      ],
    },
    {
      name: 'type',
      header: 'Type',
      csvHeaders: ['Type'],
      csvValues: ({ type }) => [accompagnementTypeLabels[type]],
      cell: ({ type }) => accompagnementTypeLabels[type],
      sortable: true,
      filters: [
        // {
        //   name: 'type',
        //   title: 'Type',
        //   render: (value) => `TODO RENDER type`,
        //   applyWhereCondition: (query, value) => ({
        //     OR: [
        //       // TODO
        //     ],
        //   }),
        // },
      ],
    },
    {
      name: 'beneficiaire',
      header: 'Bénéficiaire',
      csvHeaders: ['Bénéficiaire'],
      csvValues: (activite) => [
        activite.type === 'collectif'
          ? `${activite.cra.participants.length + activite.cra.participantsAnonymes.total} participants`
          : getBeneficiaireDisplayName(activite.cra.beneficiaire),
      ],
      cell: (activite) =>
        activite.type === 'collectif'
          ? `${activite.cra.participants.length + activite.cra.participantsAnonymes.total} participants`
          : getBeneficiaireDisplayName(activite.cra.beneficiaire),
    },
    {
      name: 'lieu',
      header: 'Lieu',
      csvHeaders: ['Lieu'],
      csvValues: () => [],
      cell: (activite) =>
        'lieuActivite' in activite.cra && activite.cra.lieuActivite
          ? activite.cra.lieuActivite.nom
          : activite.type === 'collectif'
            ? activite.cra.lieuAccompagnementAutreCommune
              ? `${activite.cra.lieuAccompagnementAutreCommune} · ${activite.cra.lieuAccompagnementAutreCodePostal}`
              : '-'
            : activite.cra.lieuAccompagnement === 'ADistance'
              ? 'À distance'
              : activite.cra.lieuAccompagnementDomicileCommune
                ? `${activite.cra.lieuAccompagnementDomicileCommune} · ${activite.cra.lieuAccompagnementDomicileCodePostal}`
                : '-',
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
