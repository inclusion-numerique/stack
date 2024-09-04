/**
 * Create a mutation for the audit log, without blocking the main thread
 */
import type { Prisma } from '@prisma/client'
import * as Sentry from '@sentry/nextjs'
import { prismaClient } from '@app/web/prismaClient'

export const addMutationLogAsync = (
  data: Prisma.MutationUncheckedCreateInput,
) =>
  prismaClient.mutation.create({
    data: {
      ...data,
    },
  })

export const addMutationLog = (data: Prisma.MutationUncheckedCreateInput) => {
  addMutationLogAsync(data).catch((error) =>
    Sentry.captureException(error, {
      data: {
        addMutationData: data,
      },
    }),
  )
}
