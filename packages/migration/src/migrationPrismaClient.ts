import { PrismaClient } from '@prisma/client'

// https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
const globalForPrisma = global as unknown as {
  migrationPrismaClient: PrismaClient | undefined
}

export const migrationPrismaClient = globalForPrisma.migrationPrismaClient ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.migrationPrismaClient = migrationPrismaClient
}
