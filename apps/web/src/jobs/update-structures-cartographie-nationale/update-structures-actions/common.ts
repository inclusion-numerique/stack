import { SchemaLieuMediationNumerique } from '@gouvfr-anct/lieux-de-mediation-numerique'

export type StructureToDelete = {
  id: string
  replaceById?: string
}

export type ChangesToApply = {
  structuresCartographieNationaleToInsert: Map<
    string,
    SchemaLieuMediationNumerique & { hash: string }
  >
  structuresCartographieNationaleToUpdate: Map<
    string,
    SchemaLieuMediationNumerique & { hash: string }
  >
  structuresCartographieNationaleToDelete: StructureToDelete[]
  structuresToMerge: {
    ids: string[]
    mergedStructure: SchemaLieuMediationNumerique
  }[]
}

export type UpdateStructuresActionsPayload = {
  structureImported: SchemaLieuMediationNumerique
  existingStructuresMap: Map<string, string>
  changesToApply: ChangesToApply
  existingStructuresIds: string[]
}

export type UpdateStructuresAction = {
  trigger: () => boolean
  action: () => ChangesToApply
}

export type ExistingStructure = { id: string; hash: string }

export const onlyExternalIds = (id: string): boolean =>
  !id.includes('Coop-numérique')

export const onlyCoopNumeriqueIds = (id: string): boolean =>
  id.includes('Coop-numérique')

export const hasMultipleCoopStructure = (ids: string[]) =>
  ids.filter(onlyCoopNumeriqueIds).length > 1

export const latestChangesFromExternalSourceFor = (
  structureImported: SchemaLieuMediationNumerique,
) => structureImported.source !== 'Coop numérique'

export const splitIds = ({ id }: { id: string }) => id.split('__')

export const isIncludedIn = (id: string) => (innerId: string) =>
  id.includes(innerId)
