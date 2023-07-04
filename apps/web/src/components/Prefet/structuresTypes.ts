export const structureTypes = ['associations', 'public', 'private'] as const
export type StructureType = (typeof structureTypes)[number]
