import type { ActiviteForList } from '@app/web/cra/activitesQueries'
import type { DataTableConfiguration } from '@app/web/data-table/DataTableConfiguration'
import type { Prisma } from '@prisma/client'

export type ActivitesDataTableConfiguration = DataTableConfiguration<
  ActiviteForList,
  Prisma.ActiviteWhereInput,
  Prisma.ActiviteOrderByWithRelationInput
>
