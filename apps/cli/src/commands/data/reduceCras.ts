import path from 'node:path'
import { writeFile } from 'node:fs/promises'
import { Command } from '@commander-js/extra-typings'
import { getDepartementCodeFromPostalCode } from '@app/web/data/getDepartementCodeFromPostalCode'
import { parseCsvFileWithMapper } from '@app/web/data/parseCsvFile'
import { getDataFilePath } from '@app/web/data/dataFiles'
import {
  ReducedConumCras,
  Theme,
  themeKeys,
  themesSet,
} from '@app/web/data/conumCras'

const crasCsvFile = path.resolve(
  __dirname,
  '../../../../../var',
  'cras_2023-07-26T08_53_21.237230614Z.csv',
)

type CrasCsvRow = {
  ID: string
  ConseillerId: string
  DateAccompagnement: string
  NomCommune: string
  Statut: '{:etudiant 0, :sansEmploi 0, :enEmploi 0, :retraite 1, :heterogene 0}'
  CodePostal: string
  Accompagnement: '{:individuel 0, :atelier 0, :redirection 0}'
  Themes: '["autre"]'
  Activite: string
  Moins12ans: string
  De12a18ans: string
  De18a35ans: string
  De35a60ans: string
  Plus60ans: string
  NbParticipants: string
  NbParticipantsRecurrents: string
  Duree: '30-60'
  Canal: 'rattachement' | 'distance' | 'domicile' | 'autre'
  PermanenceId: ''
  StructureId: string
}

// e.g. '{:etudiant 0, :sansEmploi 0, :enEmploi 0, :retraite 1, :heterogene 0}'
const transformDict = (mongoDict: string) => {
  const sliced = mongoDict.slice(1, -1)

  // Split the string into key-value pairs
  const parts = sliced.split(', ')

  // Initialize the result object
  const object: Record<string, number> = {}

  // Process each key-value pair
  for (const part of parts) {
    const [key, value] = part.split(' ')
    // Remove the leading colon from the key
    const cleanKey = key.slice(1)
    // Convert the value to a number
    const asNumber = Number.parseInt(value, 10)
    // Add the key-value pair to the result object
    object[cleanKey] = asNumber
  }

  return object
}

/**
 * Result example
 * {
 *   departement: '50',
 *   codePostal: '50420',
 *   nParticipants: 1,
 *   themes: [ 'smartphone' ],
 *   statut: {
 *     etudiant: 0,
 *     sansEmploi: 1,
 *     enEmploi: 0,
 *     retraite: 0,
 *     heterogene: 0
 *   },
 *   accompagnement: { individuel: 0, atelier: 0, redirection: 0 },
 *   activite: 'individuel',
 *   moins12ans: 0,
 *   de12a18ans: 0,
 *   de18a35ans: 0,
 *   de35a60ans: 1,
 *   plus60ans: 0
 * }
 */
const preprocessData = ({
  CodePostal,
  NbParticipants,
  NbParticipantsRecurrents,
  Accompagnement,
  Themes,
  Statut,
  Activite,
  Moins12ans,
  De12a18ans,
  De18a35ans,
  De35a60ans,
  Plus60ans,
}: CrasCsvRow) => {
  if (CodePostal === 'undef' || CodePostal === 'null ') {
    return null
  }

  const trimmed = CodePostal.trim()
  const cleanCodePostal = trimmed.startsWith('0')
    ? trimmed.padEnd(5, '0')
    : trimmed.padStart(5, '0')

  return {
    departement: getDepartementCodeFromPostalCode(cleanCodePostal),
    codePostal: CodePostal,
    nAccompagnements: Number.parseInt(NbParticipants, 10),
    nParticipantsRecurrents: Number.parseInt(
      NbParticipantsRecurrents || '0',
      10,
    ),
    themes: JSON.parse(Themes.replaceAll('" "', '", "')) as string[],
    statut: transformDict(Statut),
    accompagnement: transformDict(Accompagnement),
    activite: Activite,
    moins12ans: Number.parseInt(Moins12ans, 10),
    de12a18ans: Number.parseInt(De12a18ans, 10),
    de18a35ans: Number.parseInt(De18a35ans, 10),
    de35a60ans: Number.parseInt(De35a60ans, 10),
    plus60ans: Number.parseInt(Plus60ans, 10),
  }
}

type Preprocessed = Exclude<ReturnType<typeof preprocessData>, null>

type ReducedResult = Map<string, ReducedConumCras>

const reduceData = (mapped: Preprocessed[]): ReducedResult => {
  const result = new Map<string, ReducedConumCras>()
  for (const data of mapped.values()) {
    let reduced = result.get(data.departement)

    if (!reduced) {
      reduced = {
        departement: data.departement,
        usagers: 0,
        accompagnements: 0,
        themes: {},
        statut: {
          etudiant: 0,
          sansEmploi: 0,
          enEmploi: 0,
          retraite: 0,
          heterogene: 0,
        },
        accompagnement: {
          individuel: 0,
          atelier: 0,
          redirection: 0,
        },
        activite: {
          collectif: 0,
          ponctuel: 0,
          individuel: 0,
        },
        moins12ans: 0,
        de12a18ans: 0,
        de18a35ans: 0,
        de35a60ans: 0,
        plus60ans: 0,
      }

      result.set(data.departement, reduced)
    }

    reduced.accompagnements += data.nAccompagnements
    reduced.usagers += Math.max(
      // We have CRAs whith more recurrents than participants...
      data.nAccompagnements - data.nParticipantsRecurrents,
      0,
    )
    for (const maybeTheme of data.themes) {
      const theme = maybeTheme as Theme

      if (!themesSet.has(theme)) {
        throw new Error(`Missing theme ${theme} add it to CRA model`)
      }

      reduced.themes[themeKeys[theme]] =
        (reduced.themes[themeKeys[theme]] ?? 0) + 1
    }
    for (const [key, value] of Object.entries(data.statut)) {
      reduced.statut[key as keyof ReducedConumCras['statut']] += value
    }
    for (const [key, value] of Object.entries(data.accompagnement)) {
      reduced.accompagnement[key as keyof ReducedConumCras['accompagnement']] +=
        value
    }
    reduced.activite[data.activite as keyof ReducedConumCras['activite']] =
      (reduced.activite[data.activite as keyof ReducedConumCras['activite']] ??
        0) + 1
    reduced.moins12ans += data.moins12ans
    reduced.de12a18ans += data.de12a18ans
    reduced.de18a35ans += data.de18a35ans
    reduced.de35a60ans += data.de35a60ans
    reduced.plus60ans += data.plus60ans
  }

  return result
}

export const reduceCras = new Command()
  .command('data:reduce-cras')
  .action(async () => {
    const unfilteredRows = await parseCsvFileWithMapper(
      crasCsvFile,
      preprocessData,
    )
    const rows = unfilteredRows.filter(
      (row): row is Preprocessed => row !== null,
    )

    const reduced = reduceData(rows)

    const allThemes = new Set<string>()
    const allActivites = new Set<string>()
    const allAccompagnements = new Set<string>()

    for (const item of reduced.values()) {
      for (const theme of Object.keys(item.themes)) {
        allThemes.add(theme)
      }
      for (const activite of Object.keys(item.activite)) {
        allActivites.add(activite)
      }
      for (const accompagnement of Object.keys(item.accompagnement)) {
        allAccompagnements.add(accompagnement)
      }
    }

    await writeFile(
      getDataFilePath('conum - departement-cras.json'),
      JSON.stringify([...reduced.values()]),
    )
  })
