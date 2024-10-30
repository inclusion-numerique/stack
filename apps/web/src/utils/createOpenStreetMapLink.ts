export const createOpenStreetMapLink = ({
  coordinates,
}: {
  coordinates: number[]
}) =>
  `https://www.openstreetmap.org/?mlat=${coordinates[1]}&mlon=${coordinates[0]}#map=zoom-level/latitude/longitude`
