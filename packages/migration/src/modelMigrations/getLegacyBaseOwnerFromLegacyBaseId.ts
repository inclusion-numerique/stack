import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'

export const getLegacyBaseOwnerFromLegacyBaseId = async () => {
  const bases = await migrationPrismaClient.main_base.findMany({
    select: {
      id: true,
      owner_id: true,
    },
  })

  const legacyOwnerIdFromLegacyBaseId = new Map(
    bases.map(({ id, owner_id }) => [id, owner_id]),
  )

  return (legacyBaseId: bigint) => {
    const found = legacyOwnerIdFromLegacyBaseId.get(legacyBaseId)
    if (!found) {
      throw new Error(`No legacy owner found for legacy base ${legacyBaseId}`)
    }
    return found
  }
}

export type LegacyBaseOwnerFromLegacyBaseId = Awaited<
  ReturnType<typeof getLegacyBaseOwnerFromLegacyBaseId>
>
