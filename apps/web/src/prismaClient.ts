import { PrismaClient } from '@prisma/client'

// See https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
declare global {
  // eslint-disable-next-line no-var
  var prismaClient: PrismaClient | undefined
}
export const prismaClient = global.prismaClient ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prismaClient = prismaClient
}
