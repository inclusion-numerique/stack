import { OptionTuple, OptionTuples } from '@app/web/utils/options'
import { prismaClient } from '@app/web/prismaClient'
import { communeNameWithCodePostaux } from '@app/web/data/communeNameWithCodePostaux'

export type PerimetreEpciOptions = {
  nom: string
  codeEpci: string
  nombreCommunes: number
  communes: OptionTuples
}

export type PerimetreDepartementOptions = {
  epcis: PerimetreEpciOptions[]
}

export type PerimetreDepartementWithInfoOptions = {
  nom: string
  codeDepartement: string
} & PerimetreDepartementOptions

export const getPerimetreDepartementOptions = async (
  codeDepartements: string[],
): Promise<PerimetreDepartementOptions> => {
  const epcis = await prismaClient.epci.findMany({
    where: {
      communes: {
        some: {
          codeDepartement: {
            in: codeDepartements,
          },
        },
      },
    },
    orderBy: {
      code: 'asc',
    },
    select: {
      nom: true,
      code: true,
      communes: {
        where: {
          codeDepartement: {
            in: codeDepartements,
          },
        },
        select: {
          nom: true,
          code: true,
          codesPostaux: {
            select: {
              codePostal: {
                select: {
                  code: true,
                },
              },
            },
          },
        },
      },
    },
  })

  return {
    epcis: epcis.map(({ nom, code, communes }) => ({
      nom,
      codeEpci: code,
      nombreCommunes: communes.length,
      communes: communes.map(
        (commune) =>
          [commune.code, communeNameWithCodePostaux(commune)] as OptionTuple,
      ),
    })),
  }
}

export const getPerimetreRegionOptions = (
  departements: { nom: string; code: string }[],
): Promise<PerimetreDepartementWithInfoOptions[]> =>
  Promise.all(
    departements.map(async (departement) => {
      const departementOptions = await getPerimetreDepartementOptions([
        departement.code,
      ])
      return {
        nom: departement.nom,
        codeDepartement: departement.code,
        epcis: departementOptions.epcis,
      }
    }),
  )
