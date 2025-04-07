import { apiClientScopeLabels } from '@app/web/app/administration/clients-api/apiClient'
import { ApiClientListItem } from '@app/web/app/administration/clients-api/getApiClientsListPageData'
import type {
  DataTableConfiguration,
  DataTableFilterValues,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'
import { dateAsDayAndTime } from '@app/web/utils/dateAsDayAndTime'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import type { Prisma } from '@prisma/client'

export type ApiClientsDataTableConfiguration = DataTableConfiguration<
  ApiClientListItem,
  Prisma.ApiClientWhereInput,
  Prisma.ApiClientOrderByWithRelationInput
>

export const ApiClientsDataTable = {
  csvFilename: () => `coop-${dateAsIsoDay(new Date())}-apiClients`,
  rowKey: ({ id }) => id,
  rowLink: ({ id }) => ({ href: `/administration/clients-api/${id}` }),
  columns: [
    {
      name: 'name',
      header: 'Nom',
      csvHeaders: ['Nom'],
      csvValues: ({ name }) => [name],
      cell: ({ name }) => name,
    },
    {
      name: 'client_id',
      header: 'Client ID',
      csvHeaders: ['Client ID'],
      csvValues: ({ id }) => [id],
      cell: ({ id }) => id,
    },
    {
      name: 'scopes',
      header: 'Permissions',
      csvHeaders: ['Permissions'],
      csvValues: ({ scopes }) => [scopes.join(', ')],
      cell: ({ scopes }) =>
        scopes.map((scope) => apiClientScopeLabels[scope]).join(', '),
    },
    {
      name: 'valid_from',
      header: 'Début de validité',
      csvHeaders: ['Début de validité'],
      csvValues: ({ validFrom }) => [validFrom.toISOString()],
      cell: ({ validFrom }) => dateAsDayAndTime(validFrom),
    },
    {
      name: 'valid_until',
      header: 'Fin de validité',
      csvHeaders: ['Fin de validité'],
      csvValues: ({ validUntil }) => [validUntil?.toISOString()],
      cell: ({ validUntil }) =>
        validUntil ? dateAsDayAndTime(validUntil) : 'Jamais',
    },
    {
      name: 'created_at',
      header: 'Créé le',
      csvHeaders: ['Créé le'],
      csvValues: ({ created }) => [created.toISOString()],
      cell: ({ created }) => dateAsDayAndTime(created),
    },
    {
      name: 'updated_at',
      header: 'Mis à jour le',
      csvHeaders: ['Mis à jour le'],
      csvValues: ({ updated }) => [updated.toISOString()],
      cell: ({ updated }) => dateAsDayAndTime(updated),
    },
  ],
} satisfies ApiClientsDataTableConfiguration

export type ApiClientsDataTableSearchParams =
  DataTableSearchParams<ApiClientsDataTableConfiguration>

export type ApiClientsDataTableFilterValues =
  DataTableFilterValues<ApiClientsDataTableConfiguration>
