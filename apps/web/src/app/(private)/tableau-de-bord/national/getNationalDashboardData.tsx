/* eslint no-plusplus: 0 */
import { CraConseillerNumeriqueParDepartement } from '@prisma/client'
import { ConumCras } from '@app/web/data/cnfsCra'
import { prismaClient } from '@app/web/prismaClient'
import { countStructuresForDepartementDashboard } from '@app/web/components/Dashboard/Cartographie/countStructures'
import { getTopCrasTypes } from '@app/web/components/Dashboard/Cartographie/getTopCrasTypes'
import {
  BoxData,
  BoxesData,
} from '@app/web/app/(private)/tableau-de-bord/departement/[codeDepartement]/getDepartementDashboardData'

let memoizedNationalData: NationalDashboardData | undefined

const aggregateConumCras = (
  conumCras: CraConseillerNumeriqueParDepartement[],
): CraConseillerNumeriqueParDepartement => {
  const summed: CraConseillerNumeriqueParDepartement = {
    codeDepartement: '',
    usagers: 0,
    accompagnements: 0,
    ageMoins12ans: 0,
    age12a18ans: 0,
    age18a35ans: 0,
    age35a60ans: 0,
    agePlus60ans: 0,
    statutEtudiant: 0,
    statutSansEmploi: 0,
    statutEnEmploi: 0,
    statutRetraite: 0,
    statutHeterogene: 0,
    accompagnementAtelier: 0,
    accompagnementIndividuel: 0,
    accompagnementRedirection: 0,
    activiteCollectif: 0,
    activiteIndividuel: 0,
    activitePonctuel: 0,
    themeAutre: 0,
    themeEquipementInformatique: 0,
    themeDemarcheEnLigne: 0,
    themeSmartphone: 0,
    themeCourriel: 0,
    themeInternet: 0,
    themeVocabulaire: 0,
    themeTraitementTexte: 0,
    themeContenusNumeriques: 0,
    themeTrouverEmploi: 0,
    themeEchanger: 0,
    themeTpePme: 0,
    themeAccompagnerEnfant: 0,
    themeSecurite: 0,
    themeFraudeEtHarcelement: 0,
    themeSante: 0,
    themeDiagnostic: 0,
    themeBudget: 0,
    themeScolaire: 0,
  }
  const keys = Object.keys(
    summed,
  ) as (keyof CraConseillerNumeriqueParDepartement)[]

  for (const cra of conumCras) {
    for (const key of keys) {
      const value = cra[key]

      if (typeof value !== 'number') {
        continue
      }
      ;(summed[key] as number) += value
    }
  }
  return summed
}

const computeNationalDashboardData = async () => {
  /**
   * We are using basic prisma queries and counting programmatically to provide type safety.
   * It would be more performant and less verbose to use SQL COUNT with filters.
   * But the query would be less readable.
   */
  const [countCoconums, structures, conumCrasList, conums] = await Promise.all([
    prismaClient.coordinateurConseillerNumerique.count(),
    prismaClient.structureCartographieNationale.findMany({
      select: {
        id: true,
        type: true,
        sousTypePublic: true,
        labelAidantsConnect: true,
        labelFranceServices: true,
        labelConseillersNumerique: true,
        structureAidantsConnect: true,
        zrr: true,
        qpv: true,
      },
    }),
    prismaClient.craConseillerNumeriqueParDepartement.findMany({}),
    prismaClient.conseillerNumerique.count(),
  ])

  // Aggregate all conumCras
  const conumCras = aggregateConumCras(conumCrasList)

  const structuresCount = countStructuresForDepartementDashboard(structures)

  const inclusionLocations = {
    id: 'lieux-d-inclusion-numérique',
    label: "Lieux d'inclusion numérique",
    withDescription: true,
    value: structuresCount.structures.total,
    statistics: [
      {
        id: 'typologie-de-structures',
        label: 'Typologie des lieux d’inclusion numérique',
        statistics: [
          {
            id: 'public',
            label: 'Public',
            value: structuresCount.structures.type.publique,
            collapsable: true,
            statistics: [
              {
                id: 'Commune',
                label: 'Commune',
                value: structuresCount.structures.sousTypePublic.commune,
              },
              {
                id: 'EPCI',
                label: 'EPCI',
                value: structuresCount.structures.sousTypePublic.epci,
              },
              {
                id: 'Departement',
                label: 'Departement',
                value: structuresCount.structures.sousTypePublic.departement,
              },
              {
                id: 'Autre',
                label: 'Autre',
                value: structuresCount.structures.sousTypePublic.autre,
              },
            ],
          },
          {
            id: 'Associations',
            label: 'Associations',
            value: structuresCount.structures.type.association,
          },
          {
            id: 'Autres acteurs privés',
            label: 'Autre acteurs privés',
            value: structuresCount.structures.type.privee,
          },
          {
            id: 'Non défini',
            label: 'Non défini',
            value: structuresCount.structures.type.nonDefini,
          },
        ],
      },
      {
        id: 'labels',
        label: 'Labels',
        statistics: [
          {
            id: 'lieux-accueillant-des-conseillers-numerique',
            label: 'Lieux accueillant des conseillers numérique',
            value: structuresCount.structures.label.conseillerNumerique,
          },
          {
            id: 'points-d-accueil-numerique-labellises-france-services',
            label: 'Points d’accueil numérique labellisés France services',
            value: structuresCount.structures.label.franceServices,
          },
          {
            id: 'points-d-accueil-habilites-aidants-connect',
            label: 'Points d’accueil habilités Aidants Connect',
            value: structuresCount.structures.label.aidantsConnect,
          },
        ],
      },
      {
        id: 'territoires-prioritaires',
        label: 'Territoires prioritaires',
        statistics: [
          {
            id: 'structures-en-quartier-prioritaire-de-la-ville-qpv',
            label: 'Structures en quartier prioritaire de la ville (QPV)',
            value: structuresCount.structures.territoire.qpv,
          },
          {
            id: 'structures-en-zone-de-revitalisation-rurale-zrr',
            label: 'Structures en zone de revitalisation rurale (ZRR)',
            value: structuresCount.structures.territoire.zrr,
          },
        ],
      },
    ],
  } satisfies BoxData

  const aidantConnectLocations = {
    id: 'aidants-numériques-identifiés',
    label: 'Aidants Numériques identifiés',
    value: conums + structuresCount.aidantsConnect.aidants,
    statistics: [
      {
        id: 'conseillers',
        statistics: [
          {
            id: 'conseillers-numériques',
            label: 'Conseillers Numériques',
            value: conums,
          },
          {
            id: 'dont Conseillers Coordinateurs',
            label: 'dont Conseillers Coordinateurs',
            info: 'coordinateursConseillerNumerique',
            value: countCoconums,
          },
          {
            id: 'aidants-habilités-à-aidant-connect',
            label: 'Aidants habilités à Aidant connect',
            value: structuresCount.aidantsConnect.aidants,
          },
        ],
      },
    ],
  } satisfies BoxData

  const main = { inclusionLocations, aidantConnectLocations }

  const totalAccompagnementsConum = conumCras
    ? conumCras.ageMoins12ans +
      conumCras.age12a18ans +
      conumCras.age18a35ans +
      conumCras.age35a60ans +
      conumCras.agePlus60ans
    : 0

  const accompagnementConumPercentage = (value?: number) => {
    if (!conumCras) {
      return 0
    }
    return (100 * (value ?? 0)) / totalAccompagnementsConum
  }

  const publicsAccompagnes = {
    id: 'publics-accompagnés',
    label: `Publics accompagnés`,
    boxes: [
      {
        id: 'usagers-accompagnés',
        label: 'Usagers accompagnés',
        value:
          (conumCras?.usagers ?? 0) +
          structuresCount.aidantsConnect.usagersUniques,
        statistics: [
          {
            id: 'par-des-conseillers-numériques',
            label: 'Par des Conseillers Numériques',
            value: conumCras?.usagers ?? 0,
            updated: new Date(ConumCras.updated),
            source: 'conseiller-numerique.gouv.fr',
          },
          {
            id: 'par-des-aidants-habilités-à-aidants-connect',
            label: 'Par des Aidants habilités à Aidants Connect',
            value: structuresCount.aidantsConnect.usagersUniques,
            updated: new Date(ConumCras.updated),
            source: 'aidantsconnect.beta.gouv.fr',
          },
        ],
      },
      {
        id: 'âge-des-usagers',
        label: 'Âge des usagers',
        updated: new Date(ConumCras.updated),
        source: 'conseiller-numerique.gouv.fr',
        statistics: [
          {
            id: '60',
            label: '60 ans et plus',
            value: accompagnementConumPercentage(conumCras?.agePlus60ans),
          },
          {
            id: '30',
            label: '35-60 ans',
            value: accompagnementConumPercentage(conumCras?.age35a60ans),
          },
          {
            id: '18',
            label: '18-35 ans',
            value: accompagnementConumPercentage(conumCras?.age18a35ans),
          },
          {
            id: '12',
            label: '12-18 ans',
            value: accompagnementConumPercentage(conumCras?.age12a18ans),
          },
          {
            id: '-12',
            label: 'Moins de 12 ans',
            value: accompagnementConumPercentage(conumCras?.ageMoins12ans),
          },
        ],
      },
      {
        id: 'statut-des-usagers',
        label: 'Statut des usagers',
        updated: new Date(ConumCras.updated),
        source: 'conseiller-numerique.gouv.fr',
        statistics: [
          {
            id: 'nr',
            label: 'Non renseigné',
            value: accompagnementConumPercentage(conumCras?.statutHeterogene),
          },
          {
            id: 'retraite',
            label: 'Retraité',
            value: accompagnementConumPercentage(conumCras?.statutRetraite),
          },
          {
            id: 'en-emploi',
            label: 'En emploi',
            value: accompagnementConumPercentage(conumCras?.statutEnEmploi),
          },
          {
            id: 'sans-emploi',
            label: 'Sans emploi',
            value: accompagnementConumPercentage(conumCras?.statutSansEmploi),
          },
          {
            id: 'scolarisee',
            label: 'Scolarisé(e)',
            value: accompagnementConumPercentage(conumCras?.statutEtudiant),
          },
        ],
      },
    ],
  } satisfies BoxesData

  const top4CraThemes = getTopCrasTypes(conumCras)

  const accompagnements = {
    id: 'accompagnements',
    label: `Accompagnements`,
    boxes: [
      {
        id: 'accompagnements',
        label: 'Accompagnements',
        value:
          (conumCras?.accompagnements ?? 0) +
          structuresCount.aidantsConnect.totalDemarches,
        statistics: [
          {
            id: 'accompagnements-de-médiation-numérique',
            label: 'Accompagnements de médiation numérique',
            value: conumCras?.accompagnements ?? 0,
            updated: new Date(ConumCras.updated),
            source: 'conseiller-numerique.gouv.fr',
          },
          {
            id: 'accompagnements-pour-réaliser-des-démarches-en-lignes',
            label: 'Accompagnements pour réaliser des démarches en lignes',
            value: structuresCount.aidantsConnect.totalDemarches,
            updated: new Date('2023-08-04'),
            source: 'aidantsconnect.beta.gouv.fr',
          },
        ],
      },
      {
        id: 'accompagnements-de-médiation-numérique',
        label:
          'Les 4 principaux thèmes d’accompagnements de médiation numérique',
        updated: new Date(ConumCras.updated),
        source: 'conseiller-numerique.gouv.fr',
        statistics: top4CraThemes.top4.map(({ label, count }) => ({
          id: label,
          label,
          value: (100 * count) / top4CraThemes.total,
        })),
      },
      {
        id: 'réaliser-des-démarches-en-lignes',
        label:
          'Les 4 principaux thèmes d’accompagnements pour réaliser des démarches en lignes',
        updated: new Date('2023-08-04'),
        source: 'aidantsconnect.beta.gouv.fr',
        statistics: structuresCount.aidantsConnect.top4AndOther.map(
          ({ label, count }) => ({
            id: label,
            label,
            value:
              (100 * count) / structuresCount.aidantsConnect.totalDemarches,
          }),
        ),
      },
    ],
  } satisfies BoxesData

  const detailed = { publicsAccompagnes, accompagnements }

  return { main, detailed }
}

export const getNationalDashboardData = async () => {
  if (memoizedNationalData) {
    return memoizedNationalData
  }

  const data = await computeNationalDashboardData()
  memoizedNationalData = data
  return data
}

export type NationalDashboardData = Awaited<
  ReturnType<typeof computeNationalDashboardData>
>
