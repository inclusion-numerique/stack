import type { Structure } from '@app/web/components/Prefet/structuresData'

export const countStructures = (structures: Structure[]) => {
  const result = {
    total: 0,
    typologie: {
      publique: 0,
      association: 0,
      privee: 0,
      nonDefini: 0,

      // Subtypes of public
      commune: 0,
      epci: 0,
      departement: 0,
      autre: 0,
    },
    labels: {
      conseillerNumerique: 0,
      franceServices: 0,
      aidantConnect: 0,
      aucun: 0,
    },
    territoiresPrioritaires: {
      qpv: 0,
      zrr: 0,
      aucun: 0,
    },
  }

  for (const {
    properties: {
      type,
      subtype,
      inZrr,
      inQpv,
      cnfsLabel,
      aidantsConnectLabel,
      franceServicesLabel,
    },
  } of structures) {
    result.total += 1
    switch (type) {
      case 'publique': {
        result.typologie.publique += 1
        break
      }
      case 'privee': {
        result.typologie.privee += 1
        break
      }
      case 'association': {
        result.typologie.association += 1
        break
      }
      default: {
        result.typologie.nonDefini += 1
        break
      }
    }

    switch (subtype) {
      case 'commune': {
        result.typologie.commune += 1
        break
      }
      case 'epci': {
        result.typologie.epci += 1
        break
      }
      case 'departement': {
        result.typologie.departement += 1
        break
      }
      case 'autre': {
        result.typologie.autre += 1
        break
      }
      default: {
        break
      }
    }

    if (inZrr) {
      result.territoiresPrioritaires.zrr += 1
    }
    if (inQpv) {
      result.territoiresPrioritaires.qpv += 1
    }
    if (!inZrr && !inQpv) {
      result.territoiresPrioritaires.aucun += 1
    }
    if (cnfsLabel) {
      result.labels.conseillerNumerique += 1
    }
    if (aidantsConnectLabel) {
      result.labels.aidantConnect += 1
    }
    if (franceServicesLabel) {
      result.labels.franceServices += 1
    }
    if (!cnfsLabel && !aidantsConnectLabel && !franceServicesLabel) {
      result.labels.aucun += 1
    }
  }
  return result
}

export type StructuresCount = ReturnType<typeof countStructures>
