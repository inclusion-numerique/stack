import { PrismaClient } from '@prisma/client'
import type { Prisma } from '@prisma/client'

// https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
const globalForPrisma = global as unknown as {
  prismaClient: PrismaClient | undefined
}

export const prismaClient =
  globalForPrisma.prismaClient ??
  new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
    ],
  })

prismaClient.$on('query' as never, (event: Prisma.QueryEvent) => {
  console.log(`${event.query} ${event.params}`)
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prismaClient = prismaClient
}
