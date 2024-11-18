import type { SelectOption } from '@app/ui/components/Form/utils/options'
import { prismaClient } from '@app/web/prismaClient'

export const mediateurStructureSelect = ({
  mediateurIds,
}: {
  mediateurIds: string[]
}) => ({
  nom: true,
  id: true,
  _count: {
    select: {
      activites: {
        where: {
          mediateurId: { in: mediateurIds },
        },
      },
    },
  },
})

export const getInitialLieuxActiviteOptionsForSearch = async ({
  mediateurIds,
}: {
  mediateurIds: string[]
}) => {
  const structureSelect = mediateurStructureSelect({
    mediateurIds,
  })

  const lieuxActivite = await prismaClient.mediateurEnActivite.findMany({
    where: {
      mediateurId: { in: mediateurIds },
      suppression: null,
    },
    select: {
      id: true,
      structure: { select: structureSelect },
    },
    distinct: ['structureId'],
    orderBy: [
      { structure: { activites: { _count: 'desc' } } },
      { structure: { nom: 'asc' } },
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
