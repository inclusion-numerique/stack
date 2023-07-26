import type { PrismaClient, Prisma } from '@prisma/client'

export type PrismaTransaction = Parameters<
  Parameters<PrismaClient['$transaction']>[0]
>[0]

export type CreateManyDataType<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends (...args: any) => Prisma.PrismaPromise<Prisma.Enumerable<any>>,
> = Exclude<Parameters<T>[0], undefined>['data']
