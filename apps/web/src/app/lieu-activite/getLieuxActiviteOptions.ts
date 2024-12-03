import type { SelectOption } from '@app/ui/components/Form/utils/options'
import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'

export const mediateurStructureSelect = ({
  mediateurIds,
}: {
  mediateurIds: string[]
}) =>
  ({
    nom: true,
    id: true,
    adresse: true,
    codePostal: true,
    commune: true,
    _count: {
      select: {
        activites: {
          where: {
            mediateurId: { in: mediateurIds },
          },
        },
      },
    },
  }) satisfies Prisma.StructureSelect

export type LieuActiviteOption = SelectOption<
  string,
  {
    nom: string
    adresse: string
    activites: number
    mostUsed: boolean
  }
>

export const getLieuxActiviteOptions = async ({
  mediateurIds,
}: {
  mediateurIds: string[]
}): Promise<LieuActiviteOption[]> => {
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

  return lieuxActivite.map(
    (
      {
        structure: {
          id,
          nom,
          commune,
          codePostal,
          adresse,
          _count: { activites },
        },
      },
      index,
    ) =>
      ({
        value: id,
        label: nom,
        extra: {
          nom,
          adresse: `${adresse}, ${codePostal} ${commune}`,
          activites,
          mostUsed: index === 0 && activites > 0,
        },
      }) satisfies LieuActiviteOption,
  )
}
