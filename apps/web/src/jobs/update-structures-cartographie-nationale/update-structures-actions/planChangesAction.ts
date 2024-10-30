import { createHash } from 'node:crypto'
import { SchemaLieuMediationNumerique } from '@gouvfr-anct/lieux-de-mediation-numerique'
import {
  ChangesToApply,
  isIncludedIn,
  latestChangesFromExternalSourceFor,
  splitIds,
  UpdateStructuresActionsPayload,
} from './common'

export const hashFor = (item: SchemaLieuMediationNumerique): string =>
  createHash('sha256').update(JSON.stringify(item)).digest('hex')

const withoutCoopIds = ({ id }: SchemaLieuMediationNumerique): string =>
  id.replaceAll(/__Coop-numérique_[^_\s]+|Coop-numérique_[^_\s]+__/giu, '')

const toStructureToDelete =
  ({ id: replaceById }: SchemaLieuMediationNumerique) =>
  (id: string) => ({ id, replaceById })

const onlyIdsToDeleteFor =
  (importedSplitIds: string[]) => (existingStructureId: string) =>
    importedSplitIds.some((id) => existingStructureId.includes(id)) &&
    !importedSplitIds
      .filter((id) => !id.includes('Coop-numérique'))
      .every(isIncludedIn(existingStructureId))

const idsToDelete =
  (importedSplitIds: string[]) =>
  (
    existingStructuresIds: string[],
    structureWithoutCoopId: SchemaLieuMediationNumerique,
  ) =>
    existingStructuresIds
      .filter(onlyIdsToDeleteFor(importedSplitIds))
      .map(toStructureToDelete(structureWithoutCoopId))

const trigger =
  ({
    structureImported,
    existingStructuresMap,
    hash,
  }: UpdateStructuresActionsPayload & { hash: string }) =>
  () =>
    latestChangesFromExternalSourceFor(structureImported) &&
    !existingStructuresMap.has(hash)

const insertOrUpdate =
  (existingStructuresIds: string[]) =>
  ({
    changesToApply,
    structureImported,
    hash,
  }: Pick<
    UpdateStructuresActionsPayload,
    'changesToApply' | 'structureImported'
  > & {
    hash: string
  }) =>
    existingStructuresIds.includes(structureImported.id)
      ? {
          structuresCartographieNationaleToInsert:
            changesToApply.structuresCartographieNationaleToInsert,
          structuresCartographieNationaleToUpdate:
            changesToApply.structuresCartographieNationaleToUpdate.set(
              structureImported.id,
              { ...structureImported, hash },
            ),
        }
      : {
          structuresCartographieNationaleToInsert:
            changesToApply.structuresCartographieNationaleToInsert.set(
              structureImported.id,
              { ...structureImported, hash },
            ),
          structuresCartographieNationaleToUpdate:
            changesToApply.structuresCartographieNationaleToUpdate,
        }

const action =
  ({
    changesToApply,
    structureImported,
    existingStructuresIds,
    importedSplitIds,
    hash,
  }: UpdateStructuresActionsPayload & {
    importedSplitIds: string[]
    hash: string
  }) =>
  (): ChangesToApply => ({
    structuresToMerge: changesToApply.structuresToMerge,
    ...insertOrUpdate(existingStructuresIds)({
      changesToApply,
      structureImported,
      hash,
    }),
    structuresCartographieNationaleToDelete: [
      ...changesToApply.structuresCartographieNationaleToDelete,
      ...idsToDelete(importedSplitIds)(
        existingStructuresIds,
        structureImported,
      ),
    ],
  })

const toStructureWithoutCoopIds = (
  structure: SchemaLieuMediationNumerique,
) => ({
  ...structure,
  id: withoutCoopIds(structure),
})

export const planChanges = (payload: UpdateStructuresActionsPayload) => {
  const structureWithoutCoopId = toStructureWithoutCoopIds(
    payload.structureImported,
  )

  const hash = hashFor(structureWithoutCoopId)

  return {
    trigger: trigger({ ...payload, hash }),
    action: action({
      ...payload,
      structureImported: structureWithoutCoopId,
      importedSplitIds: splitIds(payload.structureImported),
      hash,
    }),
  }
}
