export const structureTypes = [
  'association',
  'publique',
  'privee',
  'nonDefini',
] as const
export type StructureType = (typeof structureTypes)[number]

export const structureSubtypes = [
  'commune',
  'epci',
  'departement',
  'autre',
] as const
export type StructureSubtype = (typeof structureSubtypes)[number]

export const structureSubtypeLabel: { [key in StructureSubtype]: string } = {
  commune: 'Commune',
  epci: 'EPCI',
  departement: 'Département',
  autre: 'Autre',
}

export const structureTypeImage: { [key in StructureType]: string } = {
  association: '/images/structure/association-1.png',
  nonDefini: '/images/structure/nondefini-1.png',
  privee: '/images/structure/prive-1.png',
  publique: '/images/structure/publi-1.png',
}

export const structureTypeSelectedImage: { [key in StructureType]: string } = {
  association: '/images/structure/association-2.png',
  nonDefini: '/images/structure/nondefini-2.png',
  privee: '/images/structure/prive-2.png',
  publique: '/images/structure/public-2.png',
}
