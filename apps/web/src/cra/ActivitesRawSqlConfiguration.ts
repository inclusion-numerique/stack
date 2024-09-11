import { Prisma } from '@prisma/client'
import type { RawDataTableSqlConfiguration } from '@app/web/data-table/RawDataTableSqlConfiguration'
import type { ActivitesDataTableConfiguration } from '@app/web/cra/ActivitesDataTableConfiguration'

export const ActivitesRawSqlConfiguration = {
  date: {
    rawOrderBySql: (direction) =>
      Prisma.raw(`date ${direction}, activites.creation ${direction}`),
    rawFilterSqls: {
      au: (value: string[]) => Prisma.raw(`date <= ${value[0]}`),
      du: (value: string[]) => Prisma.raw(`date >= ${value[0]}`),
    },
  },
  type: {
    rawOrderBySql: (direction) => Prisma.raw(`type_order ${direction}`),
    rawFilterSqls: {
      type: (value: string[]) => Prisma.raw(`type = ${value[0].toLowerCase()}`),
    },
  },
} satisfies RawDataTableSqlConfiguration<ActivitesDataTableConfiguration>
