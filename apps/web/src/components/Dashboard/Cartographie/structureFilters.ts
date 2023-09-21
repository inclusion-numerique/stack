import { DepartementCartographieDataStructure } from '@app/web/app/(cartographie)/tableau-de-bord/departement/[codeDepartement]/cartographie/getDepartementCartographieData'

export type StructureFilters = {
  typologie: {
    publique: boolean
    association: boolean
    privee: boolean
    nonDefini: boolean

    // Subtypes of public
    commune: boolean
    epci: boolean
    departement: boolean
    autre: boolean
  }
  labels: {
    conseillerNumerique: boolean
    franceServices: boolean
    aidantConnect: boolean
    aucun: boolean
  }
  territoiresPrioritaires: {
    qpv: boolean
    zrr: boolean
    aucun: boolean
  }
}

export const isFilterEmpty = (filter: StructureFilters) =>
  Object.values(filter)
    .flatMap((subtree) => Object.values(subtree))
    .every((value) => !value)

export const applyStructureFilter = (
  structure: DepartementCartographieDataStructure,
  filters: StructureFilters,
) => {
  const { territoiresPrioritaires, labels, typologie } = filters

  const {
    type,
    sousTypePublic,
    labelAidantsConnect,
    labelFranceServices,
    labelConseillersNumerique,
    zrr,
    qpv,
  } = structure.properties

  // Filtering out main type
  if (type === 'privee' && typologie.privee) {
    return true
  }
  if (type === 'association' && typologie.association) {
    return true
  }

  if (type === 'nonDefini' && typologie.nonDefini) {
    return true
  }

  if (type === 'publique') {
    // Public type all have a subtype, we only consider the subtypes
    if (sousTypePublic === 'commune' && typologie.commune) {
      return true
    }
    if (sousTypePublic === 'epci' && typologie.epci) {
      return true
    }
    if (sousTypePublic === 'departement' && typologie.departement) {
      return true
    }
    if (sousTypePublic === 'autre' && typologie.autre) {
      return true
    }
  }

  // Filtering out labels
  if (labelConseillersNumerique && labels.conseillerNumerique) {
    return true
  }
  if (labelAidantsConnect && labels.aidantConnect) {
    return true
  }
  if (labelFranceServices && labels.franceServices) {
    return true
  }
  if (
    !labelConseillersNumerique &&
    !labelAidantsConnect &&
    !labelFranceServices &&
    labels.aucun
  ) {
    return true
  }

  // Filtering out territoires prioritaires
  if (zrr && territoiresPrioritaires.zrr) {
    return true
  }
  if (qpv && territoiresPrioritaires.qpv) {
    return true
  }
  if (!zrr && !qpv && territoiresPrioritaires.aucun) {
    return true
  }

  return false
}
