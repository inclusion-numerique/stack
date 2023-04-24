import type { PrismaClient } from '@prisma/client'
import type { PrismaClient as MigrationPrismaClient } from '@prisma/migration-client'
import { mockDeep } from 'jest-mock-extended'

export const createMockPrisma = () => mockDeep<PrismaClient>()

export const createMockMigrationPrisma = () => mockDeep<MigrationPrismaClient>()
