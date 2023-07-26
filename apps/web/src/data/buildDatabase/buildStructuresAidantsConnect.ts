import { output } from '@app/cli/output'
import type { Prisma } from '@prisma/client'
import { getAidantsConnectStructures } from '@app/web/data/aidantsConnectStructures'
import { BuildStructuresCartographieNationaleOutput } from '@app/web/data/buildDatabase/buildStructuresCartographieNationale'

export const buildStructuresAidantsConnect = async ({
  structuresCartographieNationale,
}: {
  structuresCartographieNationale: BuildStructuresCartographieNationaleOutput
}) => {
  output('-- Getting data from csv file...')

  const structures = await getAidantsConnectStructures()
  const data: Prisma.StructureAidantsConnectCreateManyInput[] = []

  output(`-- Preparing data (${structures.length})...`)

  for (const structure of structures) {
    let errors: Record<string, string> | undefined

    const structureCartographieNationaleId =
      structuresCartographieNationale.byAidantsConnectId.get(structure.id)

    if (!structureCartographieNationaleId) {
      errors = {}

      errors.structureCartographieNationaleId = `Introuvable dans data inclusion ${JSON.stringify(
        {
          cityCode: structure.cityCode,
          address: structure.address,
          zipCode: structure.zipCode,
          city: structure.city,
          siret: structure.siret,
        },
      )}`
    }

    const { total, ...demarchesDetails } = structure.demarches

    data.push({
      id: structure.id,
      structureCartographieNationaleId,
      isActive: structure.isActive,

      aidants: structure.aidants,
      usagersUniques: structure.usagersUniques,

      totalDemarches: total,

      ...demarchesDetails,
      errors,
    })
  }

  return { data }
}

export type BuildStructuresAidantsConnect = Awaited<
  ReturnType<typeof buildStructuresAidantsConnect>
>
