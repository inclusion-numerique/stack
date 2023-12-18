import { writeFileSync } from 'node:fs'
import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import { legacyBasesIdsToTransformToProfile } from '@app/migration/modelMigrations/legacyBasesToTransformToProfile'

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

  // Write this to typescript file in workspace root / var / as a typescript object {legacyBaseId => legacyOwnerId}
  writeFileSync(
    './legacyBaseOwnerFromLegacyBaseId.ts',
    `
// This file is generated during migration from getLegacyBaseOwnerFromLegacyBaseId.ts
// This is the ids of legacy user for which base have been transformed to v2 profile
export const legacyBaseOwnerFromLegacyBaseId = new Map([
${bases
  .filter(
    ({ id, owner_id }) =>
      owner_id !== null && legacyBasesIdsToTransformToProfile.has(Number(id)),
  )
  .map(({ id, owner_id }) => `  [${Number(id)}, ${Number(owner_id)}]`)
  .join(',\n')},
])
 `,
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
