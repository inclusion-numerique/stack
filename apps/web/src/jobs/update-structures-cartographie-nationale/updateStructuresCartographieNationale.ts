import { SchemaLieuMediationNumerique } from '@gouvfr-anct/lieux-de-mediation-numerique'
import {
  ChangesToApply,
  ExistingStructure,
  isIncludedIn,
  splitIds,
  UpdateStructuresAction,
  UpdateStructuresActionsPayload,
} from './update-structures-actions/common'
import { mergeAndPlanChanges } from './update-structures-actions/mergeAndPlanChangesAction'
import { mergeCoopStructures } from './update-structures-actions/mergeCoopStructureAction'
import { planChanges } from './update-structures-actions/planChangesAction'

const byMergeCount = (
  a: SchemaLieuMediationNumerique,
  b: SchemaLieuMediationNumerique,
) => splitIds(b).length - splitIds(a).length

const toId = ({ id }: { id: string }): string => id

const includesAnyPartOf = (id: string) => (parentId: string) =>
  id.split('__').every(isIncludedIn(parentId))

const onlyExistingIds = (ids: string[]) => (id: string) =>
  !ids.some(includesAnyPartOf(id))

const onlyReplaceId = (id: string) => (importedId: string) =>
  id.includes(importedId)

const toStructureToDelete = (ids: string[]) => (id: string) => {
  const replaceById = ids.find(onlyReplaceId(id))
  return replaceById == null ? { id } : { id, replaceById }
}
const initialChanges = (existingIds: string[], importedIds: string[]) => ({
  structuresCartographieNationaleToInsert: new Map(),
  structuresCartographieNationaleToUpdate: new Map(),
  structuresCartographieNationaleToDelete: existingIds
    .filter(onlyExistingIds(importedIds))
    .map(toStructureToDelete(importedIds)),
  structuresToMerge: [],
})

const toActionChanges = (
  changes: ChangesToApply,
  { trigger, action }: UpdateStructuresAction,
): ChangesToApply => (trigger() ? action() : changes)

const actionsToApply = (payload: UpdateStructuresActionsPayload) => [
  planChanges(payload),
  mergeCoopStructures(payload),
  mergeAndPlanChanges(payload),
]

const toChangesToApply =
  (
    existingStructuresMap: Map<string, string>,
    existingStructuresIds: string[],
  ) =>
  (
    changesToApply: ChangesToApply,
    structureImported: SchemaLieuMediationNumerique,
  ): ChangesToApply =>
    actionsToApply({
      existingStructuresMap,
      existingStructuresIds,
      structureImported,
      changesToApply,
    }).reduce(toActionChanges, changesToApply)

export const updateStructures = (
  existingStructures: ExistingStructure[],
  structuresImportedFromCartographie: SchemaLieuMediationNumerique[],
): ChangesToApply => {
  const existingStructuresIds = existingStructures.map(toId)
  return structuresImportedFromCartographie.reduce(
    toChangesToApply(
      new Map(
        existingStructures.map((existingStructure) => [
          existingStructure.hash,
          existingStructure.id,
        ]),
      ),
      existingStructuresIds,
    ),
    initialChanges(
      existingStructuresIds,
      structuresImportedFromCartographie.sort(byMergeCount).map(toId),
    ),
  )
}
