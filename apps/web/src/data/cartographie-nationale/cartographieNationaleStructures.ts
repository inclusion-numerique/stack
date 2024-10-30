import { createWriteStream } from 'node:fs'
import { readFile } from 'node:fs/promises'
import type { Stream } from 'node:stream'
import axios from 'axios'
import * as Sentry from '@sentry/nextjs'
import { SchemaLieuMediationNumerique } from '@gouvfr-anct/lieux-de-mediation-numerique'
import { createVarDirectory } from '@app/config/createVarDirectory'
import { varFile } from '@app/config/varDirectory'

const cartographieNationaleStructuresUrl =
  'https://cartographie.societenumerique.gouv.fr/api/v0/lieux-inclusion-numerique'

const cartographieNationaleStructuresFilePath = varFile(
  'cartographie-nationale-structures.json',
)

export const downloadCartographieNationaleStructures = async () => {
  createVarDirectory()
  // Download and write to file using stream, fetch, and fs write stream
  const response = await axios.get<Stream>(cartographieNationaleStructuresUrl, {
    responseType: 'stream',
  })

  if (response.status !== 200) {
    throw new Error(
      `Failed to download cartographie structures: ${response.statusText}`,
    )
  }
  const writeStream = createWriteStream(cartographieNationaleStructuresFilePath)

  const streamPromise = new Promise((resolve, reject) => {
    writeStream.on('finish', resolve)
    writeStream.on('error', reject)
  })
  response.data.pipe(writeStream)

  await streamPromise

  return cartographieNationaleStructuresFilePath
}

export const getStructuresCartographieNationaleFromLocalFile = async () => {
  // Read and parse json with read file promise from cartographieNationaleStructuresFilePath
  const data = await readFile(cartographieNationaleStructuresFilePath, 'utf8')

  try {
    return JSON.parse(data) as SchemaLieuMediationNumerique[]
  } catch (error) {
    Sentry.captureException(error)

    throw new Error('Cannot parse structures json')
  }
}
