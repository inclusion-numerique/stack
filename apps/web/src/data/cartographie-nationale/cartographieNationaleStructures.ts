import { createWriteStream } from 'node:fs'
import { readFile } from 'node:fs/promises'
import type { Stream } from 'node:stream'
import { varFile } from '@app/config/varDirectory'
import axios from 'axios'
import { createVarDirectory } from '@app/config/createVarDirectory'
import * as Sentry from '@sentry/nextjs'
import { LieuStandardMediationNumerique } from '@app/web/data/standard-mediation-numerique/LieuStandardMediationNumerique'
import { validateValidSiretDigits } from '@app/web/siret/siretValidation'
import { validateValidRnaDigits } from '@app/web/rna/rnaValidation'

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
    const structures = JSON.parse(data) as LieuStandardMediationNumerique[]

    return structures
  } catch (error) {
    Sentry.captureException(error)

    throw new Error('Cannot parse structures json')
  }
}

export const getStructuresMetadata = async () => {
  // Read and parse json with read file promise from cartographieNationaleStructuresFilePath

  const structures = await getStructuresCartographieNationaleFromLocalFile()

  const withPivot = structures.filter((s) => s.pivot)
  const withSiret = withPivot.filter((s) => validateValidSiretDigits(s.pivot))
  const withRna = withPivot.filter((s) => validateValidRnaDigits(s.pivot))

  const sourceSansPivotMap = new Map<string | null, number>()

  for (const sansPivot of structures.filter((s) => !s.pivot)) {
    sourceSansPivotMap.set(
      sansPivot.source ?? null,
      (sourceSansPivotMap.get(sansPivot.source ?? null) ?? 0) + 1,
    )
  }

  const sourceSansPivot: { [source: string]: number } = Object.fromEntries(
    [...sourceSansPivotMap.entries()]
      .map(([source, count]): [string, number] => [
        source ?? '_aucune-source',
        count,
      ])
      .sort((a, b) => b[1] - a[1]),
  )

  const sourcesStructuresMap = new Map<string | null, number>()

  for (const structure of structures) {
    sourcesStructuresMap.set(
      structure.source ?? null,
      (sourcesStructuresMap.get(structure.source?? null) ?? 0) + 1,
    )
  }

  const sourcesStructures: { [source: string]: number } = Object.fromEntries(
    [...sourcesStructuresMap.entries()]
      .map(([source, count]): [string, number] => [
        source ?? '_aucune-source',
        count,
      ])
      .sort((a, b) => b[1] - a[1]),
  )

  const lastUpdate = structures.reduce((accumulator, current) => {
    if(!current.date_maj) return accumulator
    const maj = new Date(current.date_maj).getTime()

    if (maj > accumulator) {
      return maj
    }
    return accumulator
  }, 0)

  return {
    lastUpdate: new Date(lastUpdate).toISOString(),
    count: structures.length,
    siret: {
      count: withSiret.length,
      percentage: (100 * withSiret.length) / structures.length,
    },
    rna: {
      count: withRna.length,
      percentage: (100 * withRna.length) / structures.length,
    },
    sourceSansPivot,
    sourcesStructures,
  }
}
