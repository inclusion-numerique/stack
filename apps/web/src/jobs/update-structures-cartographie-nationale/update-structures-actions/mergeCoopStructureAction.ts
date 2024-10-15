import { SchemaLieuMediationNumerique } from '@gouvfr-anct/lieux-de-mediation-numerique'
import {
  ChangesToApply,
  hasMultipleCoopStructure,
  onlyCoopNumeriqueIds,
  onlyExternalIds,
  splitIds,
  UpdateStructuresActionsPayload,
} from './common'

const mergedIdsFor =
  (mergedStructure: SchemaLieuMediationNumerique) => (ids: string[]) => ({
    ...mergedStructure,
    id: ids.filter(onlyExternalIds).join('__'),
  })

const toOriginalCoopIds = (id: string) => id.replace('Coop-numérique_', '')

const structureToMerge =
  (ids: string[]) => (structureImported: SchemaLieuMediationNumerique) => ({
    ids: ids.filter(onlyCoopNumeriqueIds).map(toOriginalCoopIds),
    mergedStructure: mergedIdsFor(structureImported)(ids),
  })

const latestChangesFromCoopFor = (
  structureImported: SchemaLieuMediationNumerique,
) => structureImported.source === 'Coop numérique'

const trigger =
  ({
    structureImported,
    ids,
  }: UpdateStructuresActionsPayload & { ids: string[] }) =>
  () =>
    hasMultipleCoopStructure(ids) && latestChangesFromCoopFor(structureImported)

const action =
  ({
    changesToApply,
    structureImported,
    ids,
  }: UpdateStructuresActionsPayload & { ids: string[] }) =>
  (): ChangesToApply => ({
    ...changesToApply,
    structuresToMerge: [
      ...changesToApply.structuresToMerge,
      structureToMerge(ids)(structureImported),
    ],
  })

export const mergeCoopStructures = (
  payload: UpdateStructuresActionsPayload,
) => {
  const ids = splitIds(payload.structureImported)
  return {
    trigger: trigger({ ...payload, ids }),
    action: action({ ...payload, ids }),
  }
}
