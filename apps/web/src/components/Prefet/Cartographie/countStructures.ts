/* eslint no-plusplus: 0 */

import type { DepartementCartographieStructureItem } from '@app/web/app/(cartographie)/tableau-de-bord/departement/[codeDepartement]/cartographie/getDepartementCartographieData'
import { AidantsConnectDemarcheLabels } from '@app/web/data/aidantsConnectStructures'
import type { DepartementDashboardStructureItem } from '@app/web/app/(private)/tableau-de-bord/departement/[codeDepartement]/getDepartementDashboardData'

export const countStructuresForCartographieSummary = (
  structures: Pick<
    DepartementCartographieStructureItem,
    | 'type'
    | 'sousTypePublic'
    | 'labelFranceServices'
    | 'labelAidantsConnect'
    | 'labelConseillersNumerique'
  >[],
) => {
  const count = {
    total: 0,
    type: {
      publique: 0,
      association: 0,
      privee: 0,
      nonDefini: 0,
    },
    sousTypePublic: {
      commune: 0,
      epci: 0,
      departement: 0,
      autre: 0,
    },
    label: {
      conseillerNumerique: 0,
      franceServices: 0,
      aidantsConnect: 0,
      aucun: 0,
    },
    territoire: {
      qpv: 0,
      zrr: 0,
      nonDefini: 0,
    },
  }
  for (const structure of structures) {
    count.total += 1
    switch (structure.type) {
      case 'publique': {
        count.type.publique += 1
        break
      }
      case 'privee': {
        count.type.privee += 1
        break
      }
      case 'association': {
        count.type.association += 1
        break
      }
      default: {
        count.type.nonDefini += 1
        break
      }
    }

    switch (structure.sousTypePublic) {
      case 'commune': {
        count.sousTypePublic.commune += 1
        break
      }
      case 'epci': {
        count.sousTypePublic.epci += 1
        break
      }
      case 'departement': {
        count.sousTypePublic.departement += 1
        break
      }
      case 'autre': {
        count.sousTypePublic.autre += 1
        break
      }
      default: {
        break
      }
    }

    // TODO ZRR and QPV are not in the data
    count.territoire.nonDefini++

    if (structure.labelConseillersNumerique) {
      count.label.conseillerNumerique += 1
    }
    if (structure.labelFranceServices) {
      count.label.franceServices += 1
    }
    if (structure.labelAidantsConnect) {
      count.label.aidantsConnect += 1
    }

    if (
      !structure.labelConseillersNumerique &&
      !structure.labelFranceServices &&
      !structure.labelAidantsConnect
    ) {
      count.label.aucun += 1
    }
  }

  return count
}

export type StructuresCountForCartographieSummary = ReturnType<
  typeof countStructuresForCartographieSummary
>

export const countStructuresForCommuneSummary = (
  structures: DepartementCartographieStructureItem[],
) => {
  const count = {
    structures: countStructuresForCartographieSummary(structures),
    aidantsConnect: 0,
    conseillersNumeriques: 0,
  }

  for (const structure of structures) {
    count.aidantsConnect += structure.structureAidantsConnect?.aidants ?? 0
    count.conseillersNumeriques +=
      // eslint-disable-next-line no-underscore-dangle
      structure.permanenceConseillerNumerique?._count?.enPermanence ?? 0
  }

  return count
}

export type StructuresCountForCommuneSummary = ReturnType<
  typeof countStructuresForCommuneSummary
>

export const countStructuresForDepartementDashboard = (
  structures: DepartementDashboardStructureItem[],
) => {
  const count = {
    structures: countStructuresForCartographieSummary(structures),
    aidantsConnect: {
      aidants: 0,
      usagersUniques: 0,
      totalDemarches: 0,
      demarches: {
        argent: 0,
        etranger: 0,
        famille: 0,
        justice: 0,
        loisirs: 0,
        papier: 0,
        social: 0,
        transport: 0,
        travail: 0,
        logement: 0,
      },
      top4AndOther: [] as { label: string; count: number }[],
    },
  }

  for (const structure of structures) {
    count.aidantsConnect.aidants +=
      structure.structureAidantsConnect?.aidants ?? 0

    count.aidantsConnect.totalDemarches +=
      structure.structureAidantsConnect?.totalDemarches ?? 0

    count.aidantsConnect.usagersUniques +=
      structure.structureAidantsConnect?.usagersUniques ?? 0

    for (const demarcheType of Object.keys(count.aidantsConnect.demarches)) {
      if (!structure.structureAidantsConnect) {
        continue
      }
      count.aidantsConnect.demarches[
        demarcheType as keyof typeof count.aidantsConnect.demarches
      ] +=
        structure.structureAidantsConnect[
          demarcheType as keyof typeof count.aidantsConnect.demarches
        ]
    }

    // Counting and computing top 3 themes
    const demarcheTypesArray: { label: string; count: number }[] = []
    for (const demarcheType of Object.keys(count.aidantsConnect.demarches)) {
      demarcheTypesArray.push({
        label:
          AidantsConnectDemarcheLabels[
            demarcheType as keyof typeof AidantsConnectDemarcheLabels
          ],
        count:
          count.aidantsConnect.demarches[
            demarcheType as keyof typeof count.aidantsConnect.demarches
          ],
      })
    }
    demarcheTypesArray.sort((a, b) => b.count - a.count)
    const top4 = demarcheTypesArray.slice(0, 4)
    const rest = demarcheTypesArray.slice(4)
    const totalRest = rest.reduce(
      (accumulator, current) => accumulator + current.count,
      0,
    )
    count.aidantsConnect.top4AndOther = [
      ...top4,
      { label: 'Autres thématiques', count: totalRest },
    ]
  }

  return count
}

export type StructuresCountForDepartementDashboard = ReturnType<
  typeof countStructuresForDepartementDashboard
>
