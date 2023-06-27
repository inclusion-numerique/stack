import { isPointInPolygon } from 'geolib'
import { DepartementGeoJson } from '@app/web/utils/map/departementGeoJson'
import { fakeDelay } from '@app/web/utils/fakeDelay'

export const structureTypes = ['associations', 'public', 'private']

const randomStructureType = () =>
  structureTypes[Math.floor(Math.random() * 100) % 3]

export const getStructuresData = async (departement: DepartementGeoJson) => {
  await fakeDelay()

  const [[minLat, minLng], [maxLat, maxLng]] = departement.bounds

  const randomCoordinates = (): [number, number] => [
    Math.random() * (maxLat - minLat) + minLat,
    Math.random() * (maxLng - minLng) + minLng,
  ]

  const structures = Array.from({ length: 250 })
    .map(() => {
      const type = randomStructureType()
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: randomCoordinates(),
        },
        properties: { type, name: 'Nom de la structure' },
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

  return { structures }
}

export type StructuresData = Awaited<ReturnType<typeof getStructuresData>>
