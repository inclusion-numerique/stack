import { DepartementGeoJson } from '@app/web/utils/map/departementGeoJson'
import { getStructuresData } from '@app/web/components/Prefet/structuresData'
import { ConumCras, getConumCrasByDepartement } from '@app/web/data/cnfsCra'

export type Statistic = {
  id: string
  label: string
  value: number
  collapsable?: boolean
  statistics?: Statistic[]
}

type SourcedStatistic = {
  id: string
  label: string
  value: number
  updated: Date
  source: string
}

type Category = {
  id: string
  label?: string
  statistics: Statistic[]
}

export type StatisticBox = {
  id: string
  label: string
  value: number
  statistics: (SourcedStatistic | Category | Statistic)[]
  withDescription?: boolean
}

export type PercentageBox = {
  id: string
  label: string
  updated: Date
  source: string
  statistics: Statistic[]
}

export type Box = StatisticBox | PercentageBox

export type Boxes = {
  id?: string
  label?: string
  description?: string
  boxes: Box[]
}

const memoizedDepartementsData = new Map<string, DepartementDashboardData>()

const computeDepartementData = async (departement: DepartementGeoJson) => {
  const structuresData = await getStructuresData(departement)
  const allConumCras = await getConumCrasByDepartement()
  const conumCras = allConumCras[departement.code]
  if (!conumCras) {
    throw new Error(`No conum CRAs for departement ${departement.code}`)
  }

  const inclusionLocations = {
    id: 'lieux-d-inclusion-numérique',
    label: "Lieux d'Inclusion Numérique",
    withDescription: true,
    value: structuresData.count.total,
    statistics: [
      {
        id: 'typologie-de-structures',
        label: 'Typologie de structures',
        statistics: [
          {
            id: 'public',
            label: 'Public',
            value: structuresData.count.typologie.publique,
            collapsable: true,
            statistics: [
              {
                id: 'Commune',
                label: 'Commune',
                value: structuresData.count.typologie.commune,
              },
              {
                id: 'EPCI',
                label: 'EPCI',
                value: structuresData.count.typologie.epci,
              },
              {
                id: 'Departement',
                label: 'Departement',
                value: structuresData.count.typologie.departement,
              },
              {
                id: 'Autre',
                label: 'Autre',
                value: structuresData.count.typologie.autre,
              },
            ],
          },
          {
            id: 'Associations',
            label: 'Associations',
            value: structuresData.count.typologie.association,
          },
          {
            id: 'Autres acteurs privés',
            label: 'Autres acteurs privés',
            value: structuresData.count.typologie.privee,
          },
          {
            id: 'Non défini',
            label: 'Non défini',
            value: structuresData.count.typologie.nonDefini,
          },
        ],
      },
      {
        id: 'labels',
        label: 'Labels',
        statistics: [
          {
            id: 'structures-accueillant-des-cnfs',
            label: 'Structures accueillant des CNFS',
            value: structuresData.count.labels.conseillerNumerique,
          },
          {
            id: 'structures-labellisées-france-services',
            label: 'Structures labellisées France Services',
            value: structuresData.count.labels.franceServices,
          },
          {
            id: 'structures-habilitées-aidants-connect',
            label: 'Structures habilitées Aidants Connect',
            value: structuresData.count.labels.aidantConnect,
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
            value: structuresData.count.territoiresPrioritaires.qpv,
          },
          {
            id: 'structures-en-zone-de-revitalisation-rurale-zrr',
            label: 'Structures en zone de revitalisation rurale (ZRR)',
            value: structuresData.count.territoiresPrioritaires.zrr,
          },
        ],
      },
    ],
  } satisfies Box

  const aidantConnectLocations = {
    id: 'aidants-numériques-identifiés',
    label: 'Aidants Numériques identifiés',
    // TODO
    value: 0,
    statistics: [
      {
        id: 'conseillers',
        statistics: [
          {
            id: 'conseillers-numériques',
            label: 'Conseillers Numériques',
            // TODO
            value: 0,
            statistics: [
              {
                id: 'dont-conseillers-coordinateurs',
                label: 'dont Conseillers Coordinateurs',
                // TODO
                value: 0,
              },
            ],
          },
          {
            id: 'aidants-habilités-à-aidant-connect',
            label: 'Aidants habilités à Aidant connect',
            // TODO
            value: 0,
          },
        ],
      },
    ],
  } satisfies Box

  const main = { inclusionLocations, aidantConnectLocations }

  // TODO base total?
  const totalCras =
    conumCras.moins12ans +
    conumCras.de12a18ans +
    conumCras.de18a35ans +
    conumCras.de35a60ans +
    conumCras.plus60ans

  const publicsAccompagnes = {
    id: 'publics-accompagnés',
    label: `Publics accompagnés - ${departement.name}`,
    description: 'Données incomplètes',
    boxes: [
      {
        id: 'usagers-accompagnés',
        label: 'Usagers accompagnés',
        // TODO usagers pas CRA, total ?
        value: totalCras,
        statistics: [
          {
            id: 'par-des-conseillers-numériques',
            label: 'Par des Conseillers Numériques',
            // TODO usagers pas CRA
            value: totalCras,
            updated: new Date(ConumCras.updated),
            source: 'conseiller-numerique.gouv.fr',
          },
          {
            id: 'par-des-aidants-habilités-à-aidants-connect',
            label: 'Par des Aidants habilités à Aidants Connect',
            // TODO
            value: 0,
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
            value: (100 * conumCras.plus60ans) / totalCras,
          },
          {
            id: '30',
            label: '35-60 ans',
            value: (100 * conumCras.de35a60ans) / totalCras,
          },
          {
            id: '18',
            label: '18-35 ans',
            value: (100 * conumCras.de18a35ans) / totalCras,
          },
          {
            id: '12',
            label: '12-18 ans',
            value: (100 * conumCras.de12a18ans) / totalCras,
          },
          {
            id: '-12',
            label: 'Moins de 12 ans',
            value: (100 * conumCras.moins12ans) / totalCras,
          },
        ],
      },
      {
        id: 'status-des-usagers',
        label: 'Status des usagers',
        updated: new Date(ConumCras.updated),
        source: 'conseiller-numerique.gouv.fr',
        statistics: [
          {
            id: 'nr',
            label: 'Non renseigné',
            value: (100 * conumCras.heterogene) / totalCras,
          },
          {
            id: 'retraite',
            label: 'Retraité',
            value: (100 * conumCras.retraite) / totalCras,
          },
          {
            id: 'en-emploi',
            label: 'En emploi',
            value: (100 * conumCras.enEmploi) / totalCras,
          },
          {
            id: 'sans-emploi',
            label: 'Sans emploi',
            value: (100 * conumCras.sansEmploi) / totalCras,
          },
          {
            id: 'scolarisee',
            label: 'Scolarisé(e)',
            value: (100 * conumCras.etudiant) / totalCras,
          },
        ],
      },
    ],
  } satisfies Boxes

  const accompagnements = {
    id: 'accompagnements',
    label: `Accompagnements - ${departement.name}`,
    description: 'Données incomplètes',
    boxes: [
      {
        id: 'accompagnement',
        label: 'Accompagnement',
        value:
          conumCras.de12a18ans +
          conumCras.de18a35ans +
          conumCras.de35a60ans +
          conumCras.plus60ans,
        statistics: [
          {
            id: 'accompagnements-de-médiation-numérique',
            label: 'Accompagnements de médiation numérique',
            value:
              conumCras.de12a18ans +
              conumCras.de18a35ans +
              conumCras.de35a60ans +
              conumCras.plus60ans,
            updated: new Date(ConumCras.updated),
            source: 'conseiller-numerique.gouv.fr',
          },
          {
            id: 'accompagnements-pour-réaliser-des-démarches-en-lignes',
            label: 'Accompagnements pour réaliser des démarches en lignes',
            // TODO
            value: 0,
            updated: new Date('2021-09-04'),
            source: 'aidantsconnect.beta.gouv.fr',
          },
        ],
      },
      {
        id: 'accompagnements-de-médiation-numérique',
        label:
          'Les 3 principaux thèmes d’accompagnements de médiation numérique',
        updated: new Date(ConumCras.updated),
        source: 'conseiller-numerique.gouv.fr',
        statistics: [
          {
            id: 'prise-en-main',
            label: 'Prendre en main du matériel',
            // TODO
            value: 0,
          },
          {
            id: 'naviguation',
            label: 'Naviguer sur internet',
            // TODO
            value: 0,
          },
          {
            id: 'courriels',
            label: 'Courriels',
            // TODO
            value: 0,
          },
          {
            id: 'autres',
            label: 'Autres thématiques',
            // TODO
            value: 100,
          },
        ],
      },
      {
        id: 'réaliser-des-démarches-en-lignes',
        label:
          'Les 3 principaux thèmes d’accompagnements pour réaliser des démarches en lignes',
        updated: new Date('2021-09-04'),
        source: 'aidantsconnect.beta.gouv.fr',
        statistics: [
          {
            id: 'social',
            label: 'Social',
            // TODO
            value: 0,
          },
          {
            id: 'travail',
            label: 'Travail',
            // TODO
            value: 0,
          },
          {
            id: 'argent',
            label: 'Argent',
            // TODO
            value: 0,
          },
          {
            id: 'autres',
            label: 'Autres thématiques',
            // TODO
            value: 100,
          },
        ],
      },
    ],
  } satisfies Boxes

  const detailed = { publicsAccompagnes, accompagnements }

  return { main, detailed }
}

export const getDepartementData = async (departement: DepartementGeoJson) => {
  const memoized = memoizedDepartementsData.get(departement.code)
  if (memoized) {
    return memoized
  }

  const data = await computeDepartementData(departement)
  memoizedDepartementsData.set(departement.code, data)
  return data
}

export type DepartementDashboardData = Awaited<
  ReturnType<typeof computeDepartementData>
>
