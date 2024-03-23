import { prismaClient } from '@app/web/prismaClient'
import { getDemandesSubventionsForFormSelect } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'

export const getDepartementsAdministrationInfo = async ({
  codeDepartement,
}: {
  codeDepartement?: string
}) => {
  const departements = await prismaClient.departement.findMany({
    select: {
      code: true,
      nom: true,
      dotation202406: true,
      gouvernancesRemontees: {
        where: {
          v2Enregistree: {
            not: null,
          },
        },
        select: {
          ...getDemandesSubventionsForFormSelect,
          _count: {
            select: {
              membres: true,
            },
          },
        },
      },
    },
    where: {
      code: codeDepartement,
    },
    orderBy: {
      code: 'asc',
    },
  })

  return departements
}

export type DepartementAdministrationInfo = Awaited<
  ReturnType<typeof getDepartementsAdministrationInfo>
>
