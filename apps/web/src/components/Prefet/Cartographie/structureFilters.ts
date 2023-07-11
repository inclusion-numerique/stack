import { Structure } from '@app/web/components/Prefet/structuresData'

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
  structure: Structure,
  { territoiresPrioritaires, labels, typologie }: StructureFilters,
) => {
  const {
    type,
    subtype,
    cnfsLabel,
    aidantsConnectLabel,
    franceServicesLabel,
    inZrr,
    inQpv,
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
    if (subtype === 'commune' && !typologie.commune) {
      return false
    }
    if (subtype === 'epci' && !typologie.epci) {
      return false
    }
    if (subtype === 'departement' && !typologie.departement) {
      return false
    }
    if (subtype === 'autre' && !typologie.autre) {
      return false
    }
  }

  // Filtering out labels
  if (cnfsLabel && !labels.conseillerNumerique) {
    return false
  }
  if (aidantsConnectLabel && !labels.aidantConnect) {
    return false
  }
  if (franceServicesLabel && !labels.franceServices) {
    return false
  }
  if (
    !cnfsLabel &&
    !aidantsConnectLabel &&
    !franceServicesLabel &&
    !labels.aucun
  ) {
    return false
  }

  // Filtering out territoires prioritaires
  if (inZrr && !territoiresPrioritaires.zrr) {
    return false
  }
  if (inQpv && !territoiresPrioritaires.qpv) {
    return false
  }
  if (!inZrr && !inQpv && !territoiresPrioritaires.aucun) {
    return false
  }

  return true
}
