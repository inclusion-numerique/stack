import { createWriteStream } from 'node:fs'
import { readFile } from 'node:fs/promises'
import type { Stream } from 'node:stream'
import { createVarDirectory } from '@app/config/createVarDirectory'
import { varFile } from '@app/config/varDirectory'
import * as Sentry from '@sentry/nextjs'
import axios from 'axios'

const dataInclusionStructuresUrl = () =>
  `https://www.data.gouv.fr/fr/datasets/r/4fc64287-e869-4550-8fb9-b1e0b7809ffa`

const dataInclusionStructuresFilePath = varFile(
  'data-inclusion-structures.json',
)

// https://www.data.inclusion.beta.gouv.fr/schemas-de-donnees-de-loffre/schema-des-structures-et-services-dinsertion
export type DataInclusionStructure = {
  // Identifiant unique de la structure
  id: string

  // Code SIRET de la structure (peut être null)
  siret: string | null

  // Numéro RNA de la structure (peut être null)
  rna: string | null

  // Nom de la structure
  nom: string

  // Nom de la commune rattachée à l'adresse de la structure
  commune: string | null

  // Code postal rattaché à l'adresse de la structure
  code_postal: string | null

  // Code INSEE de la commune rattachée à l'adresse de la structure (peut être null)
  code_insee: string | null

  // Adresse de la structure
  adresse: string | null

  // Complément d'adresse pour préciser la localisation exacte (peut être null)
  complement_adresse: string | null

  // Longitude géographique de la structure (peut être null)
  longitude: number | null

  // Latitude géographique de la structure (peut être null)
  latitude: number | null

  // Type de la structure (peut être null)
  typologie: string | null

  // Numéro de téléphone de la structure (peut être null)
  telephone: string | null

  // Adresse email de la structure (peut être null)
  courriel: string | null

  // URL du site web de la structure (peut être null)
  site_web: string | null

  // Description courte de la structure (peut être null)
  presentation_resume: string | null

  // Description détaillée de la structure (peut être null)
  presentation_detail: string | null

  // Source des données (peut être null)
  source: string | null

  // Indique si la structure est une antenne
  antenne: boolean | null

  // Date de dernière mise à jour des données
  date_maj: number

  // URL vers la source des données (peut être null)
  lien_source: string | null

  // Horaires d'ouverture de la structure (peut être null)
  horaires_ouverture: string | null

  // URL vers les informations d'accessibilité de la structure (peut être null)
  accessibilite: string | null

  // Labels nationaux obtenus par la structure (peut être une liste vide)
  labels_nationaux: string[] | null

  // Autres labels obtenus par la structure (peut être une liste vide)
  labels_autres: string[] | null

  // Thématiques abordées par la structure (peut être une liste vide)
  thematiques: string[] | null
}

export const downloadDataInclusionStructures = async () => {
  createVarDirectory()
  // Download and write to file using stream, fetch, and fs write stream
  const response = await axios.get<Stream>(dataInclusionStructuresUrl(), {
    responseType: 'stream',
  })

  if (response.status !== 200) {
    throw new Error(
      `Failed to download cartographie nationale structures: ${response.statusText}`,
    )
  }
  const writeStream = createWriteStream(dataInclusionStructuresFilePath)

  const streamPromise = new Promise((resolve, reject) => {
    writeStream.on('finish', () => resolve(true))
    writeStream.on('error', reject)
  })
  response.data.pipe(writeStream)

  await streamPromise

  return dataInclusionStructuresFilePath
}

export const getStructuresFromLocalFile = async () => {
  // Read and parse json with read file promise from dataInclusionStructuresFilePath
  const data = await readFile(dataInclusionStructuresFilePath, 'utf8')

  try {
    const structures = JSON.parse(data) as DataInclusionStructure[]

    return structures
  } catch (error) {
    Sentry.captureException(error)

    throw new Error('Cannot parse structures json')
  }
}

export const getStructuresMetadata = async () => {
  // Read and parse json with read file promise from dataInclusionStructuresFilePath

  const structures = await getStructuresFromLocalFile()

  const withSiret = structures.filter((s) => s.siret)
  const withRna = structures.filter((s) => s.rna)

  const sourceSansSiretMap = new Map<string | null, number>()

  for (const sansSiret of structures.filter((s) => !s.siret)) {
    sourceSansSiretMap.set(
      sansSiret.source,
      (sourceSansSiretMap.get(sansSiret.source) ?? 0) + 1,
    )
  }

  const sourceSansSiret: { [source: string]: number } = Object.fromEntries(
    [...sourceSansSiretMap.entries()]
      .map(([source, count]): [string, number] => [
        source ?? '_aucune-source',
        count,
      ])
      .sort((a, b) => b[1] - a[1]),
  )

  const sourcesStructuresMap = new Map<string | null, number>()

  for (const structure of structures) {
    sourcesStructuresMap.set(
      structure.source,
      (sourcesStructuresMap.get(structure.source) ?? 0) + 1,
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
    if (current.date_maj > accumulator) {
      return current.date_maj
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
    sourceSansSiret,
    sourcesStructures,
  }
}
