import { output } from '@app/cli/output'
import { SchemaLieuMediationNumerique } from '@gouvfr-anct/lieux-de-mediation-numerique'
import { prismaClient } from '@app/web/prismaClient'
import { createStopwatch } from '@app/web/utils/stopwatch'
import { addMutationLog } from '@app/web/utils/addMutationLog'
import { structureCartographieNationaleToPrismaModel } from './transform/structureCartographieNationaleToPrismaModel'
import { structureToPrismaModel } from './transform/structureToPrismaModel'

type CoopIdsToMergeInSingleStructure = {
  coopIds: string[]
  structure: SchemaLieuMediationNumerique
}

const reset =
  (structuresCartographieNationale: SchemaLieuMediationNumerique[]) =>
  (now: Date) =>
    prismaClient
      .$transaction([
        prismaClient.structure.updateMany({
          data: { structureCartographieNationaleId: null },
        }),
        prismaClient.structureCartographieNationale.deleteMany(),
        prismaClient.structureCartographieNationale.createMany({
          data: structuresCartographieNationale.map((structure) => ({
            ...structureCartographieNationaleToPrismaModel(structure),
            creationImport: now,
            modificationImport: now,
            creation: now,
            modification: now,
          })),
        }),
      ])
      .then(([_preparation, deleted, created]) => ({
        deleted: deleted.count,
        created: created.count,
      }))

const latestChangesFromCoop = (structure: SchemaLieuMediationNumerique) =>
  structure.source === 'Coop numérique'

const COOP_ID_PREFIX = 'Coop-numérique_'
const ID_SEPARATOR = '__'

const extractCoopIds = (structureId: string): string[] =>
  structureId
    .split(ID_SEPARATOR)
    .filter((id: string) => id.startsWith(COOP_ID_PREFIX))
    .map((id: string) => id.replace(COOP_ID_PREFIX, ''))

const atLeastOneCoopId = ({ id }: { id: string }) =>
  extractCoopIds(id).length > 0

const groupCoopIdsByCartoghraphieId = (
  structure: SchemaLieuMediationNumerique,
): CoopIdsToMergeInSingleStructure => ({
  coopIds: extractCoopIds(structure.id),
  structure,
})

const linkToCoopStructure =
  (now: Date) =>
  ({
    coopIds: [structureId, ...idsToDelete],
    structure,
  }: CoopIdsToMergeInSingleStructure) =>
    prismaClient.$transaction(async (prisma) => {
      await prisma.structure.update({
        where: { id: structureId },
        data: {
          ...(latestChangesFromCoop(structure)
            ? structureToPrismaModel(structure, now)
            : {}),
          structureCartographieNationaleId: structure.id,
        },
      })

      if (idsToDelete.length > 0) {
        await Promise.all([
          prisma.employeStructure.updateMany({
            where: { structureId: { in: idsToDelete } },
            data: { structureId },
          }),
          prisma.mediateurEnActivite.updateMany({
            where: { structureId: { in: idsToDelete } },
            data: { structureId },
          }),
          prisma.activite.updateMany({
            where: { structureId: { in: idsToDelete } },
            data: { structureId },
          }),
        ])

        await prisma.structure.deleteMany({
          where: { id: { in: idsToDelete } },
        })
      }
    })

export const updateStructureFromCartoDataApi =
  ({
    structuresCartographieNationale,
    now = new Date(),
  }: {
    structuresCartographieNationale: SchemaLieuMediationNumerique[]
    now?: Date
  }) =>
  async () => {
    const stopwatch = createStopwatch()

    output('1. Reset structures from cartographie nationale')
    const { created, deleted } = await reset(structuresCartographieNationale)(
      now,
    )

    output('2. Find structures linked to cartographie nationale')
    const structuresLinkedToCarto = structuresCartographieNationale
      .filter(atLeastOneCoopId)
      .map(groupCoopIdsByCartoghraphieId)

    output(
      `3. link ${structuresLinkedToCarto.length} structures from cartographie nationale to coop structures`,
    )
    for (const structureLinkedToCarto of structuresLinkedToCarto) {
      // eslint-disable-next-line no-await-in-loop
      await linkToCoopStructure(now)(structureLinkedToCarto)
    }
    output(`4. updated finished successfully`)
    addMutationLog({
      userId: null,
      nom: 'MiseAJourStructuresCartographieNationale',
      duration: stopwatch.stop().duration,
      data: {
        deleted,
        created,
        structuresLinkedToCarto: structuresLinkedToCarto.length,
      },
    })
  }
