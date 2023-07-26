import { output } from '@app/cli/output'
import type { Prisma } from '@prisma/client'
import { getConumCoordinateurs } from '@app/web/data/conumCoordinateurs'
import { getDepartementCodeFromPostalCode } from '@app/web/data/getDepartementCodeFromPostalCode'

export const buildCoordinateursConum = async () => {
  output(
    '-- Getting data from https://api.conseiller-numerique.gouv.fr/coordinateurs...',
  )

  const coordinateurs = await getConumCoordinateurs()

  output(`-- Preparing data (${coordinateurs.length})...`)

  const data: Prisma.CoordinateurConseillerNumeriqueCreateManyInput[] = []

  for (const coordinateur of coordinateurs) {
    data.push({
      codeDepartement: getDepartementCodeFromPostalCode(
        coordinateur.codePostal,
      ),
      id: coordinateur.id,
      conseillersNumeriquesCoordonnees:
        coordinateur.nombreDePersonnesCoordonnees,
      structuresCoordonnees:
        coordinateur.nombreDeStructuresAvecDesPersonnesCoordonnees,
    })
  }

  output('-- Inserting data...')

  return { data }
}

export type BuildCoordinateursConumOutput = Awaited<
  ReturnType<typeof buildCoordinateursConum>
>
