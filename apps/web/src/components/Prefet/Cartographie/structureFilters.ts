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

export const applyStructureFilter = (
  structure: DepartementCartographieDataStructure,
  { territoiresPrioritaires, labels, typologie }: StructureFilters,
) => {
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
  if (type === 'privee' && !typologie.privee) {
    return false
  }
  if (type === 'association' && !typologie.association) {
    return false
  }

  if (type === 'nonDefini' && !typologie.nonDefini) {
    return false
  }

  if (type === 'publique') {
    // Public type all have a subtype, we only consider the subtypes
    if (sousTypePublic === 'commune' && !typologie.commune) {
      return false
    }
    if (sousTypePublic === 'epci' && !typologie.epci) {
      return false
    }
    if (sousTypePublic === 'departement' && !typologie.departement) {
      return false
    }
    if (sousTypePublic === 'autre' && !typologie.autre) {
      return false
    }
  }

  // Filtering out labels
  if (labelConseillersNumerique && !labels.conseillerNumerique) {
    return false
  }
  if (labelAidantsConnect && !labels.aidantConnect) {
    return false
  }
  if (labelFranceServices && !labels.franceServices) {
    return false
  }
  if (
    !labelConseillersNumerique &&
    !labelAidantsConnect &&
    !labelFranceServices &&
    !labels.aucun
  ) {
    return false
  }

  // Filtering out territoires prioritaires
  if (zrr && !territoiresPrioritaires.zrr) {
    return false
  }
  if (qpv && !territoiresPrioritaires.qpv) {
    return false
  }
  if (!zrr && !qpv && !territoiresPrioritaires.aucun) {
    return false
  }

  return true
}
