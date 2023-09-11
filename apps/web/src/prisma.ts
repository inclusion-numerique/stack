import type { Prisma } from '@prisma/client'

/**
 * This is a workaround to avoid having to import broken Prisma types from other packages in the workspace.
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AppPrisma {
  export type TransactionClient = Prisma.TransactionClient
  export type UserCreateInput = Prisma.UserCreateInput
  export type FormulaireGouvernanceCreateInput =
    Prisma.FormulaireGouvernanceCreateInput
}
