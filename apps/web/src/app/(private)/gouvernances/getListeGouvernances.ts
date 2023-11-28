import type { Prisma } from '@prisma/client'
import { gouvernanceListSelect } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { prismaClient } from '@app/web/prismaClient'

export const gouvernancesDansRegionWhere = (codeRegion: string) =>
  ({
    departement: {
      codeRegion,
    },
  }) satisfies Prisma.GouvernanceWhereInput

export const gouvernancesDansDepartementWhere = (codeDepartement: string) =>
  ({
    departementCode: codeDepartement,
  }) satisfies Prisma.GouvernanceWhereInput

const queryListe = (where?: Prisma.GouvernanceWhereInput) =>
  prismaClient.gouvernance.findMany({
    where: {
      supression: null,
      ...where,
    },
    select: gouvernanceListSelect,
    orderBy: [
      {
        v2Enregistree: 'asc',
      },
      {
        creation: 'desc',
      },
    ],
  })

export type ListeGouvernance = Awaited<ReturnType<typeof queryListe>>
export type ListeGouvernanceItem = ListeGouvernance[number]

export const getListeGouvernanceNational = async () => queryListe()

export const getListeGouvernanceRegion = async (codeRegion: string) =>
  queryListe(gouvernancesDansRegionWhere(codeRegion))

export const getListeGouvernanceDepartement = async (codeDepartement: string) =>
  queryListe(gouvernancesDansDepartementWhere(codeDepartement))
