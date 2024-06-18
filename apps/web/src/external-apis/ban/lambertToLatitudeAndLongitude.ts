const LON_MERID_IERS = 3
const N = 0.725_607_765
const C = 11_754_255.426
const E = 0.081_819_191_042_816
export const XS = 700_000
export const YS = 12_655_612.05

export const lambertToLatitudeAndLongitude = ([x, y]: [number, number]) => {
  const R = Math.hypot(x - XS, YS - y)
  const gamma = Math.atan((x - XS) / (YS - y))
  const latiso = Math.log(C / R) / N

  let phi = 2 * Math.atan(Math.exp(latiso)) - Math.PI / 2

  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < 7; index++) {
    phi =
      2 * Math.atan(Math.exp(latiso + Math.atanh(E * Math.sin(phi)) * E)) -
      Math.PI / 2
  }

  const latitude = (phi * 180) / Math.PI
  const longitude = ((gamma / N) * 180) / Math.PI + LON_MERID_IERS

  return { latitude, longitude }
}
