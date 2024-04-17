import { createWriteStream } from 'node:fs'
import { readFile } from 'node:fs/promises'
import type { Stream } from 'node:stream'
import { cwdVarFile } from '@app/config/varDirectory'
import axios from 'axios'

const dataInclusionStructuresUrl = () =>
  `https://www.data.gouv.fr/fr/datasets/r/4fc64287-e869-4550-8fb9-b1e0b7809ffa`

const dataInclusionStructuresFilePath = cwdVarFile(
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
  commune: string

  // Code postal rattaché à l'adresse de la structure
  codePostal: string

  // Code INSEE de la commune rattachée à l'adresse de la structure (peut être null)
  codeInsee: string | null

  // Adresse de la structure
  adresse: string

  // Complément d'adresse pour préciser la localisation exacte (peut être null)
  complementAdresse: string | null

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
  siteWeb: string | null

  // Description courte de la structure (peut être null)
  presentationResume: string | null

  // Description détaillée de la structure (peut être null)
  presentationDetail: string | null

  // Source des données (peut être null)
  source: string | null

  // Indique si la structure est une antenne
  antenne: boolean

  // Date de dernière mise à jour des données
  dateMaj: number

  // URL vers la source des données (peut être null)
  lienSource: string | null

  // Horaires d'ouverture de la structure (peut être null)
  horairesOuverture: string | null

  // URL vers les informations d'accessibilité de la structure (peut être null)
  accessibilite: string | null

  // Labels nationaux obtenus par la structure (peut être une liste vide)
  labelsNationaux: string[]

  // Autres labels obtenus par la structure (peut être une liste vide)
  labelsAutres: string[]

  // Thématiques abordées par la structure (peut être une liste vide)
  thematiques: string[]
}

export const downloadDataInclusionStructures = async () => {
  // Download and write to file using stream, fetch, and fs write stream
  const response = await axios.get<Stream>(dataInclusionStructuresUrl(), {
    responseType: 'stream',
  })

  if (response.status !== 200) {
    throw new Error(
      `Failed to download data inclusion structures: ${response.statusText}`,
    )
  }
  const writeStream = createWriteStream(dataInclusionStructuresFilePath)

  const streamPromise = new Promise((resolve, reject) => {
    writeStream.on('finish', resolve)
    writeStream.on('error', reject)
  })
  response.data.pipe(writeStream)

  await streamPromise

  return dataInclusionStructuresFilePath
}

export const getStructuresFromLocalFile = async () => {
  // Read and parse json with read file promise from dataInclusionStructuresFilePath
  const data = await readFile(dataInclusionStructuresFilePath, 'utf8')

  const structures = JSON.parse(data) as DataInclusionStructure[]

  return structures
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
    if (current.dateMaj > accumulator) {
      return current.dateMaj
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
