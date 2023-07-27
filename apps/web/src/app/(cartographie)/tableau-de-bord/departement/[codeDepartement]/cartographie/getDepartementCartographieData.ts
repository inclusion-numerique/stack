/* eslint no-plusplus: 0 */
import { prismaClient } from '@app/web/prismaClient'
import { titleCase } from '@app/web/utils/titleCase'
import {
  countStructuresForCartographieSummary,
  countStructuresForCommuneSummary,
} from '@app/web/components/Prefet/Cartographie/countStructures'
import { createWhereStructureInDepartement } from '@app/web/data/query/whereStructureInDepartement'

type StructureFeature<T> = {
  type: 'Feature'
  geometry: {
    type: 'Point'
    coordinates: [number, number]
  }
  properties: T
}

const memoizedDepartementsData = new Map<string, DepartementCartographieData>()

const listStructures = (codeDepartement: string) =>
  prismaClient.structureCartographieNationale.findMany({
    where: createWhereStructureInDepartement(codeDepartement),
    select: {
      id: true,
      nom: true,
      type: true,
      latitude: true,
      longitude: true,
      adresse: true,
      codeCommune: true,
      codePostal: true,
      sousTypePublic: true,
      labelAidantsConnect: true,
      labelFranceServices: true,
      labelConseillersNumerique: true,
      structureAidantsConnect: {
        select: {
          aidants: true,
        },
      },
      permanenceConseillerNumerique: {
        select: {
          _count: {
            select: { enPermanence: true },
          },
        },
      },
    },
  })

export type DepartementCartographieStructureItem = Awaited<
  ReturnType<typeof listStructures>
>[number]

const getDepartement = (codeDepartement: string) =>
  prismaClient.departement.findUniqueOrThrow({
    where: { code: codeDepartement },
    select: {
      code: true,
      nom: true,
      bounds: true,
      communes: {
        select: {
          code: true,
          nom: true,
          latitude: true,
          longitude: true,
          population: true,
          ifn: {
            select: {
              total: true,
              no4gCoverageRate: true,
              noThdCoverageRate: true,
              povertyRate: true,
              nscol15pRate: true,
              older65Rate: true,
            },
          },
          codesPostaux: {
            select: {
              codePostal: {
                select: { code: true },
              },
            },
          },
        },
      },
    },
  })

type Departement = Awaited<ReturnType<typeof getDepartement>>

const computeDepartementCartographieData = async (codeDepartement: string) => {
  const [departement, epcis, structures] = await Promise.all([
    getDepartement(codeDepartement),
    prismaClient.epci.findMany({
      where: {
        communes: {
          some: {
            codeDepartement,
          },
        },
      },
      select: {
        code: true,
        nom: true,
        ifn: {
          select: {
            total: true,
            no4gCoverageRate: true,
            noThdCoverageRate: true,
            povertyRate: true,
            nscol15pRate: true,
            older65Rate: true,
          },
        },
      },
    }),
    listStructures(codeDepartement),
  ])

  const communesByCode = new Map<string, Departement['communes'][number]>(
    departement.communes.map((commune) => [commune.code, commune]),
  )

  const structuresByCommuneCode = new Map<
    string,
    DepartementCartographieStructureItem[]
  >()
  for (const structure of structures) {
    if (!structure.codeCommune) {
      continue
    }
    let existing = structuresByCommuneCode.get(structure.codeCommune)
    if (!existing) {
      existing = []
      structuresByCommuneCode.set(structure.codeCommune, existing)
    }

    existing.push(structure)
  }

  const structureFeatures: StructureFeature<{
    id: string
    type: string
    sousTypePublic: string | null
    nom: string
    adresse: string
    codeCommune: string
    codePostal: string
    commune: string

    aidantsConnect: number

    conseillersNumeriques: number

    labelConseillersNumerique: boolean
    labelFranceServices: boolean
    labelAidantsConnect: boolean

    zrr: boolean
    qpv: boolean
  }>[] = []

  for (const {
    id,
    type,
    nom,
    adresse,
    codeCommune,
    sousTypePublic,
    latitude,
    codePostal,
    structureAidantsConnect,
    longitude,
    permanenceConseillerNumerique,
    labelConseillersNumerique,
    labelAidantsConnect,
    labelFranceServices,
  } of structures) {
    const commune = codeCommune ? communesByCode.get(codeCommune) : null
    if (!commune || !longitude || !latitude) {
      continue
    }

    const properties = {
      id,
      type,
      sousTypePublic,
      nom: titleCase(nom),
      adresse,
      codePostal,
      codeCommune: commune.code,
      commune: commune.nom,

      aidantsConnect: structureAidantsConnect?.aidants ?? 0,

      conseillersNumeriques:
        // eslint-disable-next-line no-underscore-dangle
        permanenceConseillerNumerique?._count.enPermanence ?? 0,

      labelConseillersNumerique,
      labelFranceServices,
      labelAidantsConnect,

      // TODO Add QPV this to the schema
      zrr: false,
      qpv: false,
    }

    structureFeatures.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
      properties,
    })
  }

  const computedCommunes = []

  for (const {
    nom,
    code,
    ifn,
    longitude,
    latitude,
    codesPostaux,
    population,
  } of departement.communes) {
    const communeStructures = structuresByCommuneCode.get(code) ?? []

    computedCommunes.push({
      nom,
      code,
      ifn,
      centre: {
        type: 'Point',
        coordinates: [latitude, longitude],
      },
      population,
      codesPostaux: codesPostaux.map(({ codePostal }) => codePostal.code),
      count: countStructuresForCommuneSummary(communeStructures),
    })
  }

  return {
    departement: {
      code: departement.code,
      nom: departement.nom,
      bounds: departement.bounds as [[number, number], [number, number]],
    },
    structures: structureFeatures,
    count: countStructuresForCartographieSummary(structures),
    communes: computedCommunes,
    epcis,
  }
}

export const getDepartementCartographieData = async (
  codeDepartement: string,
) => {
  const memoized = memoizedDepartementsData.get(codeDepartement)
  if (memoized) {
    return memoized
  }

  const data = await computeDepartementCartographieData(codeDepartement)
  memoizedDepartementsData.set(codeDepartement, data)
  return data
}

export type DepartementCartographieData = Awaited<
  ReturnType<typeof computeDepartementCartographieData>
>

export type DepartementCartographieDataStructure =
  DepartementCartographieData['structures'][number]

export type DepartementCartographieDataCommune =
  DepartementCartographieData['communes'][number]

export type DepartementCartographieDataCount =
  DepartementCartographieData['count']
