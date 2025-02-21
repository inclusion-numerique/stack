import { createReadStream } from 'node:fs'
import { createInterface } from 'node:readline'
import { staticFile } from '@app/web/staticDirectory'

export type Commune = {
  codeInsee: string
  nom: string
  codePostal: string // Can be multiple, comma separated
}

const filePath = staticFile('communes.csv')

const createCommuneReadline = () => {
  const fileStream = createReadStream(filePath)
  const readline = createInterface({
    input: fileStream,
    crlfDelay: Number.POSITIVE_INFINITY, // Recognize all instances of CR LF ('\r\n') in input as a single line break
  })
  return readline
}

const parseCommuneCsvLine = (line: string): Commune => {
  // Split the line into 3 parts: Code Insee, Commune, and the rest as Code Postal
  const parts = line.split(',', 2) // Split into 3 parts: two commas

  const codeInsee = parts[0]
  const nom = parts[1]

  // Extract the third part by adding lengths of the first two parts
  const thirdPartLength = parts[0].length + parts[1].length + 2 // Add 2 for the commas

  // The third part is the postalCode, which might contain commas and quotes
  const codePostal = line.slice(thirdPartLength) // Slice the third part and trim whitespace

  return { codeInsee, nom, codePostal }
}

// CodeInsee, Commune, CodePostal
type SerializedCommune = [string, string, string]

const communeMap = new Map<string, SerializedCommune>()

const buildCommuneMap = async () => {
  const readline = createCommuneReadline()

  for await (const line of readline) {
    const commune = parseCommuneCsvLine(line)
    communeMap.set(commune.codeInsee, [
      commune.codeInsee,
      commune.nom,
      commune.codePostal,
    ])
  }
}

const cleanupCommuneCodePostal = (commune: Commune) => {
  if (commune.codePostal.startsWith('"') && commune.codePostal.endsWith('"')) {
    // eslint-disable-next-line no-param-reassign
    commune.codePostal = commune.codePostal.slice(1, -1).trim() // Remove quotes and trim whitespace
  }
  return commune
}

/**
 * Lazy loads communes.csv file and then o(1) lookup commune by codeInsee
 */
export const createCommunesClient = async () => {
  if (communeMap.size === 0) {
    await buildCommuneMap()
  }

  return {
    findCommuneByInsee: (code: string): Commune | null => {
      const commune = communeMap.get(code)
      if (!commune) {
        return null
      }
      return cleanupCommuneCodePostal({
        codeInsee: commune[0],
        nom: commune[1],
        codePostal: commune[2],
      })
    },
  }
}

export type CommunesClient = Awaited<ReturnType<typeof createCommunesClient>>
