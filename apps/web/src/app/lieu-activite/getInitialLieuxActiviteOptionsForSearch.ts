import type { SelectOption } from '@app/ui/components/Form/utils/options'
import { prismaClient } from '@app/web/prismaClient'

export const mediateurStructureSelect = ({
  mediateurId,
}: {
  mediateurId: string
}) => ({
  nom: true,
  id: true,
  _count: {
    select: {
      activites: {
        where: {
          mediateurId,
        },
      },
    },
  },
})

export const getInitialLieuxActiviteOptionsForSearch = async ({
  mediateurId,
}: {
  mediateurId: string
}) => {
  const structureSelect = mediateurStructureSelect({
    mediateurId,
  })

  const lieuxActivite = await prismaClient.mediateurEnActivite.findMany({
    where: {
      mediateurId,
      suppression: null,
    },
    select: {
      id: true,
      structure: {
        select: structureSelect,
      },
    },
    orderBy: [
      {
        structure: {
          activites: {
            _count: 'desc',
          },
        },
      },
      {
        structure: {
          nom: 'asc',
        },
      },
    ],
  })

  const mostUsedLieuActivite = lieuxActivite.at(0)

  const lieuxActiviteOptions = lieuxActivite.map(
    ({ structure: { id, nom } }) =>
      ({
        value: id,
        label: nom,
      }) satisfies SelectOption,
  )

  return {
    lieuxActiviteOptions,
    mostUsedLieuActivite,
  }
}

export type MostUsedLieuActiviteForSearch = Awaited<
  ReturnType<typeof getInitialLieuxActiviteOptionsForSearch>
>
