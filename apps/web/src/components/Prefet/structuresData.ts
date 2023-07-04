import { isPointInPolygon } from 'geolib'
import { DepartementGeoJson } from '@app/web/utils/map/departementGeoJson'

import {
  DataInclusionStructure,
  DataInclusionTypologies,
} from '@app/web/data/dataInclusionSchema'
import { fakeDelay } from '@app/web/utils/fakeDelay'
import dataInclusionStructuresData from '../../../public/data/structures-inclusion-20230628-data-inclusion-sans-doublons.json'

const dataInclusionStructures =
  dataInclusionStructuresData as DataInclusionStructure[]

export const structureTypes = ['associations', 'public', 'private'] as const
export type StructureType = (typeof structureTypes)[number]

const randomStructureType = (): StructureType =>
  structureTypes[Math.floor(Math.random() * 100) % 3]

export type DoraStructure = {
  _di_geocodage_code_insee: null
  _di_geocodage_score: null
  id: '08f6fc15-bb98-4562-850b-507783c53ef0'
  siret: '20005376700014'
  rna: null
  nom: 'REGION AUVERGNE-RHONE-ALPES'
  commune: 'LYON CEDEX 02 CS 20033'
  code_postal: '69269'
  code_insee: '69382'
  adresse: '1 ESP FRANCOIS MITTERRAND'
  complement_adresse: null
  longitude: 4.820_078
  latitude: 45.740_575
  typologie: null
  telephone: null
  courriel: null
  site_web: null
  presentation_resume: null
  presentation_detail: null
  source: 'dora'
  date_maj: '2022-03-13'
  antenne: false
  lien_source: 'https://dora.fabrique.social.gouv.fr/structures/region-auvergne-rhon'
  horaires_ouverture: null
  accessibilite: null
  labels_nationaux: []
  labels_autres: []
  thematiques: []
}
export type DoraStructuresResponse = {
  items: DoraStructure[]
}

export type Structure = {
  type: 'Feature'
  geometry: {
    type: 'Point'
    coordinates: [number, number]
  }
  properties: {
    id: string
    type: StructureType
    name: string
    adresse: string
    source: string
  }
}

export const getRandomStructures = (
  departement: DepartementGeoJson,
): Structure[] => {
  const [[minLat, minLng], [maxLat, maxLng]] = departement.bounds

  const randomCoordinates = (): [number, number] => [
    Math.random() * (maxLat - minLat) + minLat,
    Math.random() * (maxLng - minLng) + minLng,
  ]

  return Array.from({ length: 250 })
    .map((_, index): Structure => {
      const type = randomStructureType()
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: randomCoordinates(),
        },
        properties: {
          type,
          id: `random-${index}`,
          name: 'Nom de la structure',
          adresse: '',
          source: 'Données de démonstration',
        },
      }
    })
    .filter((structure) =>
      isPointInPolygon(
        structure.geometry.coordinates,
        departement.source.data.geometry.coordinates.flat() as [
          number,
          number,
        ][],
      ),
    )
}

export const getStructuresData = async (departement: DepartementGeoJson) => {
  await fakeDelay()
  const inclusionStructures = dataInclusionStructures.filter(
    ({ code_postal }) => code_postal.startsWith(departement.code),
  )

  const structures = inclusionStructures.map((structure): Structure => {
    const type =
      !!structure.typologie && structure.typologie in DataInclusionTypologies
        ? DataInclusionTypologies[structure.typologie].type
        : 'private'

    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [structure.longitude, structure.latitude],
      },
      properties: {
        type,
        id: structure.id,
        name: structure.nom,
        adresse: structure.adresse,
        source: 'Data inclusion',
      },
    }
  })

  return { structures, inclusionStructures }
}

export type StructuresData = Awaited<ReturnType<typeof getStructuresData>>
