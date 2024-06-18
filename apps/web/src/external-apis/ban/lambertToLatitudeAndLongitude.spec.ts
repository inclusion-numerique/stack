import { lambertToLatitudeAndLongitude } from '@app/web/external-apis/ban/lambertToLatitudeAndLongitude'

const testCases = [
  {
    lambert: [652_461.22, 6_862_050.56],
    wgs84: { latitude: 48.856_737, longitude: 2.352_092 }, // Paris
  },
  {
    lambert: [700_000, 6_600_000],
    wgs84: { latitude: 46.5, longitude: 3 }, // Origin of Lambert 93
  },
] satisfies {
  lambert: [number, number]
  wgs84: { latitude: number; longitude: number }
}[]

describe('coordinatesToLatitudeAndLongitude', () => {
  test.each(testCases)(
    'should convert Lambert 93 coordinates $lambert to WGS84 $wgs84',
    ({ lambert, wgs84 }) => {
      const result = lambertToLatitudeAndLongitude(lambert)
      expect(result.latitude).toBeCloseTo(wgs84.latitude, 4)
      expect(result.longitude).toBeCloseTo(wgs84.longitude, 4)
    },
  )
})
