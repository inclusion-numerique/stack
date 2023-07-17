import { DepartementGeoJson } from '@app/web/utils/map/departementGeoJson'
import { DataInclusionTypologies } from '@app/web/data/dataInclusionSchema'
import { getDataInclusionStructures } from '@app/web/data/dataInclusion'
import {
  getAidantsConnectStructures,
  mapAidantsConnectStructuresBySiret,
} from '@app/web/data/aidantsConnectStructures'
import { isValidSiret } from '@app/web/data/siret'
import {
  StructureSubtype,
  StructureType,
} from '@app/web/components/Prefet/structuresTypes'
import { titleCase } from '@app/web/utils/titleCase'
import {
  getCnfsPermanences,
  mapCnfsPermanencesById,
} from '@app/web/data/cnfsPermanences'
import {
  countStructures,
  StructuresCount,
} from '@app/web/components/Prefet/Cartographie/countStructures'

export type Structure = {
  type: 'Feature'
  geometry: {
    type: 'Point'
    coordinates: [number, number]
  }
  properties: {
    id: string
    type: StructureType
    lng: number
    lat: number
    // Only defined if "publique"
    subtype: StructureSubtype | null
    name: string
    adresse: string
    postalCode: string
    // Code Insee
    cityCode: string | null
    city: string
    updated: string
    sourceLabel: string
    sourceUrl: string

    // Null indicates that the data is not available from the source
    conseillersNumeriques: number | null
    aidantsHabilitesAidantsConnect: number | null
    cnfsLabel: boolean | null
    franceServicesLabel: boolean | null
    aidantsConnectLabel: boolean | null
    inQpv: boolean | null
    inZrr: boolean | null
  }
}

export type StructuresData = { structures: Structure[]; count: StructuresCount }

const memoizedStructures = new Map<string, StructuresData>()

export const getStructuresData = async (
  departement: DepartementGeoJson,
): Promise<StructuresData> => {
  const memoized = memoizedStructures.get(departement.code)
  if (memoized) {
    return memoized
  }

  // TODO We will fetch all this from insitu graphql endpoint instead
  const allDataInclusionStructures = await getDataInclusionStructures()
  const allCnfsPermanences = await getCnfsPermanences()
  const allAidantsConnectStructures = await getAidantsConnectStructures()

  const dataInclusionStructures = allDataInclusionStructures.filter(
    ({ code_departement }) => code_departement === departement.code,
  )

  const cnfsPermanencesById = mapCnfsPermanencesById(allCnfsPermanences)
  const aidantsConnectStructuresBySiret = mapAidantsConnectStructuresBySiret(
    allAidantsConnectStructures,
  )

  // We use data inclusion as the base for the list of all structures
  // Then add information from Cnfs and aidants connect sources
  const structures = dataInclusionStructures.map((structure): Structure => {
    const dataInclusionTypologie =
      !!structure.typologie && structure.typologie in DataInclusionTypologies
        ? DataInclusionTypologies[structure.typologie]
        : null

    const type = dataInclusionTypologie?.type ?? 'nonDefini'

    const subtype =
      dataInclusionTypologie && 'subtype' in dataInclusionTypologie
        ? dataInclusionTypologie.subtype
        : null

    const cnfsPermanence = structure.cnfsPermanenceId
      ? cnfsPermanencesById.byKey.get(structure.cnfsPermanenceId)
      : undefined

    const infoFromCnfsStructure = cnfsPermanence
      ? {
          conseillersNumeriques: cnfsPermanence?.aidants?.length ?? 0,
        }
      : {
          conseillersNumeriques: null,
        }

    const missingInfo = {
      inZrr: null,
      inQpv: null,
    }

    const aidantsConnectStructure = isValidSiret(structure.siret)
      ? aidantsConnectStructuresBySiret.bySiret.get(structure.siret)
      : undefined

    // TODO Check that this is the best way to infer these data
    const infoFromAidantsConnectStructure = aidantsConnectStructure
      ? {
          // TODO We will need to use the data from the "real" insitu api to join a nd get the number of aidants
          aidantsHabilitesAidantsConnect: null,
        }
      : {
          aidantsHabilitesAidantsConnect: null,
        }

    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        // E.G. MDM Felix Brun has missing coordinates
        // We keep those to aggregate them later,  but we don't use them for the m ap
        coordinates: [structure.longitude ?? 0, structure.latitude ?? 0],
      },
      properties: {
        id: structure.id,
        type,
        subtype,
        lng: structure.longitude ?? 0,
        lat: structure.latitude ?? 0,
        name: titleCase(structure.nom),
        adresse: structure.adresse,
        postalCode: structure.code_postal,
        cityCode: structure.code_insee ?? null,
        city: titleCase(structure.commune),
        updated: structure.date_maj,
        sourceLabel: 'Data inclusion',
        sourceUrl: 'https://www.data.inclusion.beta.gouv.fr',
        cnfsLabel: structure.conseillerNumeriqueLabel,
        franceServicesLabel: structure.franceServicesLabel,
        aidantsConnectLabel: structure.aidantsConnectLabel,
        ...missingInfo,
        ...infoFromAidantsConnectStructure,
        ...infoFromCnfsStructure,
      },
    }
  })

  const result = { structures, count: countStructures(structures) }
  memoizedStructures.set(departement.code, result)
  return result
}

// Keeping this in case it is useful for testing / storybook / e2e ..
//
// const randomStructureType = (): StructureType =>
//   structureTypes[M ath.floor(Math.random() * 100) % 3]
//
// export con st getRandomStructures = (
//   departement: DepartementGeoJ son,
// ): Structure[] => {
//   const [ [minLat, minLng], [maxLat, maxLng]] =  departement.bounds
//
//   const randomCoordinates = (): [number, number] => [
//     Math.rand om() * (maxLat - minLat) + minLat,
//     Math.random() * (maxLng - minLng) + minLng,
//   ]
//
//   return  Array.from({ length: 250 })
//     .map((_, index): Structure => {
//       const type = randomStruct ureType()
//       return {
//          type: 'Feature',
//         geometry: {
//           type: 'Po int',
//           coordinat es: randomCoordinates() ,
//         },
//         p roperties: {
//           type,
//           id : `random-${in dex}`,
//           name: 'Nom de la structu re',
//           adresse: '',
//           source: 'Données de démonstration' ,
//         },
//       }
//     })
//     .filter((structure) =>
//       isPointInPoly gon(
//         struc ture.geometry.coordinates,
//         departement.source. data.geometry.coordinates.flat() as [
//           number,
//           number,
//         ][],
//       ),
//     )
// }
