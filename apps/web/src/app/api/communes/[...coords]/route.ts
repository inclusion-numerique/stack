import { NextRequest, NextResponse } from 'next/server'
import geojsonvt from 'geojson-vt'
import communes from './georef-france-commune.json'

const tileIndex = geojsonvt(communes, {})

export default async function handleRequest(
  req: NextRequest,
  res: NextResponse,
) {
  console.log(req)
  const {
    coords: [z, x, y],
  } = req.query

  console.log(x, y, z)
  const tiles = tileIndex?.getTile(z, x, y)?.features

  res.setHeader('Access-Control-Allow-Origin', '*')

  if (!tiles) {
    res.status(204).send()
    return
  }

  res.setHeader('Content-Type', 'application/protobuf')
  res.status(200).send(tiles)
}
