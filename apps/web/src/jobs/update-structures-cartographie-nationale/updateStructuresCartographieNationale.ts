import { createHash } from 'node:crypto'
import { SchemaLieuMediationNumerique } from '@gouvfr-anct/lieux-de-mediation-numerique'

type StructureToDelete = {
  id: string
  replaceById?: string
}

export type ChangesToApply = {
  structuresCartographieNationaleToUpsert: Map<
    string,
    SchemaLieuMediationNumerique & { hash: string }
  >
  structuresCartographieNationaleToDelete: StructureToDelete[]
  structuresToMerge: {
    ids: string[]
    mergedStructure: SchemaLieuMediationNumerique
  }[]
}

const getInitialChanges = (
  structuresCartographieNationaleToDelete: StructureToDelete[],
) => ({
  structuresCartographieNationaleToUpsert: new Map(),
  structuresCartographieNationaleToDelete,
  structuresToMerge: [],
})

const hashFor = (item: SchemaLieuMediationNumerique): string =>
  createHash('sha256').update(JSON.stringify(item)).digest('hex')

const toExistingStructuresMapEntries = (
  schemaLieuMediationNumerique: SchemaLieuMediationNumerique,
): [string, SchemaLieuMediationNumerique] => [
  hashFor(schemaLieuMediationNumerique),
  schemaLieuMediationNumerique,
]

const onlyCoopNumeriqueIds = (id: string): boolean =>
  id.includes('Coop-numérique')

const appendCoopStructureToMerge = (
  previousChanges: ChangesToApply,
  ids: string[],
  mergedStructure: SchemaLieuMediationNumerique,
) => ({
  ...previousChanges,
  structuresToMerge: [
    ...previousChanges.structuresToMerge,
    {
      ids: ids
        .filter(onlyCoopNumeriqueIds)
        .map((id) => id.replace('Coop-numérique_', '')),
      mergedStructure: {
        ...mergedStructure,
        id: ids.filter(onlyCoopNumeriqueIds).join('__'),
      },
    },
  ],
})

const byMergeCount = (
  structureA: SchemaLieuMediationNumerique,
  structureB: SchemaLieuMediationNumerique,
) => structureB.id.split('__').length - structureA.id.split('__').length

const toId = ({ id }: { id: string }): string => id

export const updateStructures = (
  existingStructures: SchemaLieuMediationNumerique[],
  structuresImportedFromCartographie: SchemaLieuMediationNumerique[],
): ChangesToApply => {
  const existingStructuresMap = new Map(
    existingStructures.map(toExistingStructuresMapEntries),
  )

  const existingStructuresIds = existingStructures.map(toId)
  const structuresImportedFromCartographieIds =
    structuresImportedFromCartographie.sort(byMergeCount).map(toId)

  return structuresImportedFromCartographie.reduce(
    (
      changesToApply: ChangesToApply,
      structureImportedFromCartographie: SchemaLieuMediationNumerique,
    ): ChangesToApply => {
      const ids = structureImportedFromCartographie.id.split('__')

      if (
        (ids.filter(onlyCoopNumeriqueIds).length === 1 &&
          structureImportedFromCartographie.source === 'coop-numerique') ||
        existingStructuresMap.has(hashFor(structureImportedFromCartographie))
      ) {
        return changesToApply
      }

      if (
        ids.filter(onlyCoopNumeriqueIds).length > 1 &&
        structureImportedFromCartographie.source === 'coop-numerique'
      ) {
        return appendCoopStructureToMerge(
          changesToApply,
          ids,
          structureImportedFromCartographie,
        )
      }

      const structureImportedFromCartographieWithCoopId: SchemaLieuMediationNumerique =
        {
          ...structureImportedFromCartographie,
          id: structureImportedFromCartographie.id.replaceAll(
            /__Coop-numérique_[^_\s]+|Coop-numérique_[^_\s]+__/giu,
            '',
          ),
        }

      if (
        ids.filter(onlyCoopNumeriqueIds).length > 1 &&
        structureImportedFromCartographie.source !== 'coop-numerique'
      ) {
        return appendCoopStructureToMerge(
          {
            structuresCartographieNationaleToUpsert:
              changesToApply.structuresCartographieNationaleToUpsert.set(
                structureImportedFromCartographieWithCoopId.id,
                {
                  ...structureImportedFromCartographieWithCoopId,
                  hash: hashFor(structureImportedFromCartographieWithCoopId),
                },
              ),
            structuresCartographieNationaleToDelete: [
              ...changesToApply.structuresCartographieNationaleToDelete,
              ...existingStructuresIds
                .filter(
                  (existingId) =>
                    !ids.every((id) => existingId.includes(id)) &&
                    existingId !==
                      structureImportedFromCartographieWithCoopId.id,
                )
                .map((existingId) => ({
                  id: existingId,
                  replaceById: structureImportedFromCartographieWithCoopId.id,
                })),
            ],
            structuresToMerge: [],
          },
          ids,
          structureImportedFromCartographie,
        )
      }

      return {
        structuresCartographieNationaleToUpsert:
          changesToApply.structuresCartographieNationaleToUpsert.set(
            structureImportedFromCartographieWithCoopId.id,
            {
              ...structureImportedFromCartographieWithCoopId,
              hash: hashFor(structureImportedFromCartographieWithCoopId),
            },
          ),
        structuresCartographieNationaleToDelete: [
          ...changesToApply.structuresCartographieNationaleToDelete,
          ...existingStructuresIds
            .filter(
              (existingId) =>
                !ids.every((id) => existingId.includes(id)) &&
                existingId !== structureImportedFromCartographieWithCoopId.id,
            )
            .map((existingId) => ({
              id: existingId,
              replaceById: structureImportedFromCartographieWithCoopId.id,
            })),
        ],
        structuresToMerge: [],
      }
    },
    getInitialChanges(
      existingStructuresIds
        .filter(
          (existingId) =>
            !structuresImportedFromCartographieIds.some((importedId) =>
              importedId.includes(existingId),
            ),
        )
        .map((id) => {
          const replaceById = structuresImportedFromCartographieIds.find(
            (importedId) => id.includes(importedId),
          )
          return replaceById == null ? { id } : { id, replaceById }
        }),
    ),
  )
}
