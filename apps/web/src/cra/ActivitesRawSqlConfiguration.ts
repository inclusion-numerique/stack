import { Prisma } from '@prisma/client'
import { RawDataTableSqlConfiguration } from '@app/web/data-table/RawDataTableSqlConfiguration'
import { ActivitesDataTableConfiguration } from '@app/web/cra/ActivitesDataTable'

export const ActivitesRawSqlConfiguration = {
  date: {
    rawOrderBySql: (direction) => Prisma.raw(`date ${direction}`),
    rawFilterSqls: {
      au: (value: string[]) => Prisma.raw(`date <= ${value[0]}`),
      du: (value: string[]) => Prisma.raw(`date >= ${value[0]}`),
    },
  },
  type: {
    rawOrderBySql: (direction) => Prisma.raw(`type_order ${direction}`),
    rawFilterSqls: {
      type: (value: string[]) => Prisma.raw(`type = ${value[0]}`),
    },
  },
} satisfies RawDataTableSqlConfiguration<ActivitesDataTableConfiguration>
