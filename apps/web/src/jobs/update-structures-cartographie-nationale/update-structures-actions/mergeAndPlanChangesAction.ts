import {
  ChangesToApply,
  hasMultipleCoopStructure,
  latestChangesFromExternalSourceFor,
  splitIds,
  UpdateStructuresActionsPayload,
} from './common'
import { mergeCoopStructures } from './mergeCoopStructureAction'
import { planChanges } from './planChangesAction'

const trigger =
  ({
    structureImported,
    ids,
  }: UpdateStructuresActionsPayload & { ids: string[] }) =>
  () =>
    hasMultipleCoopStructure(ids) &&
    latestChangesFromExternalSourceFor(structureImported)

const action =
  (payload: UpdateStructuresActionsPayload) => (): ChangesToApply => {
    const { structuresToMerge } = mergeCoopStructures(payload).action()
    const {
      structuresCartographieNationaleToInsert,
      structuresCartographieNationaleToUpdate,
      structuresCartographieNationaleToDelete,
    } = planChanges(payload).action()

    return {
      ...payload.changesToApply,
      structuresToMerge,
      structuresCartographieNationaleToInsert,
      structuresCartographieNationaleToUpdate,
      structuresCartographieNationaleToDelete,
    }
  }

export const mergeAndPlanChanges = (
  payload: UpdateStructuresActionsPayload,
) => ({
  trigger: trigger({ ...payload, ids: splitIds(payload.structureImported) }),
  action: action(payload),
})
