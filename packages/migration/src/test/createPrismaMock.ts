import { mockDeep } from 'jest-mock-extended'
import type { PrismaClient } from '@prisma/client'
import type { PrismaClient as MigrationPrismaClient } from '@prisma/migration-client'

export const createMockPrisma = () => mockDeep<PrismaClient>()

export const createMockMigrationPrisma = () => mockDeep<MigrationPrismaClient>()
