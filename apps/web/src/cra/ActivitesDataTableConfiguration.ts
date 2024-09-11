import type { Prisma } from '@prisma/client'
import type { DataTableConfiguration } from '@app/web/data-table/DataTableConfiguration'
import type { ActiviteForList } from '@app/web/cra/activitesQueries'

export type ActivitesDataTableConfiguration = DataTableConfiguration<
  ActiviteForList,
  Prisma.ActiviteWhereInput,
  Prisma.ActiviteOrderByWithRelationInput
>
